// Лоадер: силует логотипа заповнюється кольором, поки сторінка вантажиться.
//
// Ховаємо його, коли React уже намалював сторінку і підвантажились шрифти, а НЕ на
// window.load: ця подія чекає на ВСІ ресурси, зокрема важке відео героя (preload="auto")
// та зовнішні скрипти (Font Awesome, Stripe), і лоадер висів би зайву секунду-дві.
//
// Реального відсотка завантаження браузер не дає, тому прогрес "ледачий":
// швидко росте на початку й уповільнюється біля ~92%.
(function () {
    const mask = document.querySelector('.mask');
    if (!mask) return;

    const fill = mask.querySelector('.loader__fill');
    const MIN_VISIBLE_MS = 350;    // щоб на швидкому з'єднанні лоадер не "блимав"
    const FULL_HOLD_MS = 200;      // скільки показувати повністю заповнений логотип
    const FONTS_WAIT_MS = 700;     // скільки максимум чекати шрифти
    const HARD_LIMIT_MS = 8000;    // страховка: на випадок, якщо сторінка так і не змонтувалась
    const FADE_MS = 400;           // має збігатися з transition у .mask (public/index.css)
    const started = Date.now();
    let progress = 0;
    let finished = false;

    function render() {
        if (!fill) return;
        const value = `inset(${100 - progress}% 0 0 0)`;
        fill.style.clipPath = value;
        fill.style.webkitClipPath = value;
    }

    const progressTimer = setInterval(() => {
        progress += (92 - progress) * 0.1;
        render();
    }, 60);

    function finish() {
        if (finished) return;
        finished = true;
        clearInterval(progressTimer);
        clearInterval(readyTimer);

        const wait = Math.max(0, MIN_VISIBLE_MS - (Date.now() - started));

        setTimeout(() => {
            progress = 100;
            render();

            setTimeout(() => {
                mask.classList.add('hide');
                setTimeout(() => mask.remove(), FADE_MS + 50);
            }, FULL_HOLD_MS);
        }, wait);
    }

    function fontsReady() {
        const timeout = new Promise(resolve => setTimeout(resolve, FONTS_WAIT_MS));
        if (document.fonts && document.fonts.ready) {
            return Promise.race([document.fonts.ready, timeout]);
        }
        return timeout;
    }

    // React-бандл виконується пізніше за цей скрипт, тож чекаємо, поки з'явиться вміст #root
    const readyTimer = setInterval(() => {
        const root = document.getElementById('root');
        if (root && root.childElementCount > 0) {
            clearInterval(readyTimer);
            fontsReady().then(finish);
        }
    }, 50);

    // Страховки
    setTimeout(finish, HARD_LIMIT_MS);
    window.addEventListener('load', () => {
        const root = document.getElementById('root');
        if (root && root.childElementCount > 0) finish();
    });
})();
