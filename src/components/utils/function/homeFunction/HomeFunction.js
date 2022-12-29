export function HomeFunction() {

    function onEntry(entry) {
        entry.forEach(change => {
            if (change.isIntersecting) {
                change.target.classList.add('element-show');
            }
        });
    }

    let options = {
        threshold: [0.5]
    };
    let observer = new IntersectionObserver(onEntry, options);
    let elements = document.querySelectorAll('.element-animation');

    for (let elm of elements) {
        observer.observe(elm);
    }
}

export function Up() {
    window.addEventListener('scroll', function () {
        const scroll = document.querySelector('.upward');

        if (scroll) {
            scroll.classList.toggle('active-scroll', window.scrollY > 500);
        }
    })
}

export function scrollTopTop() {
    window.scrollTo({top: 0})
}
