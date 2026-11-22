import * as React from "react";

import './TiltedGridHero.css';

/* ── Крива стрічка ───────────────────────────────────────────────
 * JS/CSS-версія компонента з shadcn-шаблону (без Tailwind і TypeScript).
 *
 * Один ряд зображень тече справа наліво по внутрішній стороні циліндра.
 * Центр дивиться на вас плоско, краї вигинаються до глядача, а самі краї
 * розчиняються у фоні сторінки.
 *
 * CSS-блок не вміє гнутися, тому кожна плитка розрізана на SLICES вертикальних
 * смужок — плоских граней циліндра, кожна з яких показує свою частку картинки.
 * Смужки нерухомі всередині плитки, кожна повернута на кілька градусів навколо
 * осі циліндра, а рухається вся плитка (preserve-3d): один rotateY навколо тієї ж
 * осі проносить її по дузі. Плитка — це одна анімація, тож смужки не можуть
 * розійтися або показати різні картинки. Затримка анімації задає, де на дузі
 * плитка стоїть. Смуга рухається лише через transform на компоситорі,
 * а розчинення країв — статична маска.
 *
 * Єдиний JS: ResizeObserver, що рахує розміри петлі, і обробник, який віддає
 * плитці наступну картинку щоразу, коли вона заходить за край (поза екраном).
 * ─────────────────────────────────────────────────────────────── */

// Смужок на плитку. Кожна — кілька градусів дуги, замало щоб бути видимою гранню;
// менше — і по верхньому/нижньому краю з'являються кути.
const SLICES = 16;

// Відстань від камери до екрана в радіусах циліндра. Трохи за віссю, щоб краї
// підходили впритул до об'єктива й розбухали.
const CAMERA = 1.6;

/**
 * Радіус циліндра (частка ширини героя), при якому край кадру
 * стоїть на `bend` радіан дуги: r·sinθ · CAMERA / (CAMERA − 1 + cosθ) = width / 2.
 */
function arc(bend) {
    return (CAMERA - 1 + Math.cos(bend)) / (2 * CAMERA * Math.sin(bend));
}

// Плитка ніколи не ширша за цю частку героя, щоб на телефоні було видно сусідів,
// а не один край у край.
const MAX_WIDTH = 55;

/**
 * Розкладає петлю по циліндру. Кути повертаються в градусах: `unit` — дуга однієї
 * висоти плитки, `limit` — як далеко центр плитки може піти, поки вона повністю
 * за кадром, `sweep` — де лежать краї петлі. Петля сягає за `limit`, тож плитка
 * переходить на початок лише поза екраном, і кількість плиток округлена до
 * цілого, щоб проміжок не розтягувався.
 */
function measure(width, height, tile, aspect, gap, bend) {
    const h = Math.min(
        (tile / 100) * height,
        ((MAX_WIDTH / 100) * width) / aspect,
    );
    const radius = width * arc(bend);
    if (!(h > 0) || !(radius > 0)) {
        return {columns: 2, sweep: 0, unit: 0, limit: 0};
    }
    const deg = (rad) => (rad * 180) / Math.PI;
    const unit = deg(h / radius);
    const pitch = (aspect + gap / 100) * unit;
    const limit = deg(bend) + (aspect * unit) / 2;
    // Обмежено, щоб стиснутий до смужки герой не монтував тисячі плиток.
    const columns = Math.min(60, Math.max(2, Math.ceil((2 * limit) / pitch)));
    const round = (n) => +n.toFixed(4);
    const sweep = round((columns * pitch) / 2);
    return {
        columns,
        sweep,
        unit: round(unit),
        limit: round(Math.min(sweep, limit)),
    };
}

// React 17 не має useId, тож даємо кожному екземпляру власний номер для імен анімацій
let instanceCounter = 0;

/**
 * props:
 *  - images        — [{src, alt?}], йдуть по рядку по черзі; плитка бере наступну
 *                    картинку щоразу, як заходить за край; короткі списки повторюються
 *  - speed         — секунд на просування ряду на одну плитку (за замовч. 4)
 *  - tileHeight    — висота плитки, % висоти героя (26)
 *  - aspectRatio   — ширина плитки / висота (16/9)
 *  - gap           — проміжок між плитками, % висоти плитки (6)
 *  - axis          — вертикальний центр ряду, % висоти героя (56)
 *  - curve         — на скільки градусів ряд загнувся до краю кадру, 5–85 (80)
 *  - fade          — ширина розчинення на кожному краї, % ширини героя (12)
 *  - children      — вміст поверх стрічки
 *  - className, style
 */
export function TiltedGridHero({
    images,
    speed = 4,
    tileHeight = 26,
    aspectRatio = 16 / 9,
    gap = 6,
    axis = 56,
    curve = 80,
    fade = 12,
    children,
    className,
    style,
    ...props
}) {
    const ref = React.useRef(null);
    const idRef = React.useRef(null);
    if (idRef.current === null) idRef.current = ++instanceCounter;
    const id = idRef.current;
    const orbit = `tgh-o-${id}`;
    const tile = `tgh-t-${id}`;
    const bend = (Math.min(85, Math.max(5, curve)) * Math.PI) / 180;

    // null, поки спостерігач не виміряв героя. До того стрічка прихована, щоб
    // перший кадр, розкладений під хибний розмір, ніколи не показувався.
    const [layout, setLayout] = React.useState(null);

    // Яку картинку показує плитка — позиція в послідовності. Змінюється тільки коли
    // плитка заходить за край (поза екраном), тож ресайз теж не міняє картинку на очах.
    const [shown, setShown] = React.useState({});

    React.useEffect(() => {
        const el = ref.current;
        if (!el) return undefined;
        const ro = new ResizeObserver(([entry]) => {
            const {width, height} = entry.contentRect;
            const next = measure(width, height, tileHeight, aspectRatio, gap, bend);
            setLayout((prev) =>
                prev && prev.columns === next.columns &&
                prev.sweep === next.sweep &&
                prev.unit === next.unit
                    ? prev
                    : next,
            );
        });
        ro.observe(el);
        return () => ro.disconnect();
    }, [tileHeight, aspectRatio, gap, bend]);

    // Тягнемо всі картинки заздалегідь: плитка бере наступну перед самим
    // поверненням у кадр — пізно починати завантаження.
    React.useEffect(() => {
        for (const {src} of images) new Image().src = src;
    }, [images]);

    const {columns, sweep, unit, limit} =
        layout || measure(1200, 560, tileHeight, aspectRatio, gap, bend);

    // Усі довжини кратні висоті плитки, яка слідує за висотою героя,
    // поки MAX_WIDTH не обмежить її на вузьких екранах.
    const u = (n) =>
        `calc(${+n.toFixed(4)} * min(${tileHeight}cqh, ${+(
            MAX_WIDTH / aspectRatio
        ).toFixed(4)}cqw))`;

    const r = 100 * arc(bend);
    const radius = `${+r.toFixed(3)}cqw`;
    // До осі, навколо неї, і назад: блок сидить на циліндрі під кутом rotateY.
    const turn = (deg) =>
        `translateZ(${radius}) rotateY(${+deg.toFixed(4)}deg) translateZ(-${radius})`;

    // За межею `limit` плитка повністю поза екраном, тож там вона прихована.
    // Краї петлі, де вона замикається, потрапляють у цю ділянку, як і плитки,
    // що розвертаються за камеру.
    const hide = +(((sweep - limit) / (2 * sweep || 1)) * 100).toFixed(4);
    const css =
        `@keyframes ${orbit}{` +
        `from{transform:${turn(-sweep)}}to{transform:${turn(sweep)}}` +
        `0%,${hide}%,${100 - hide}%,100%{visibility:hidden}` +
        `${hide + 0.001}%,${100 - hide - 0.001}%{visibility:visible}}` +
        // Пауза замість прибирання руху лишає стрічку цілою: кожна плитка вже
        // поставлена від'ємною затримкою, тож завмирає готовою картинкою.
        `@media(prefers-reduced-motion:reduce){.${tile}{animation-play-state:paused}}`;

    const share = aspectRatio / SLICES;
    const duration = columns * speed;
    const mask = `linear-gradient(90deg,transparent,#000 ${fade}%,#000 ${
        100 - fade
    }%,transparent)`;

    return (
        <div
            ref={ref}
            className={`tgh${className ? ` ${className}` : ''}`}
            {...props}
            style={{containerType: "size", ...style}}
        >
            <style>{css}</style>

            <div
                aria-hidden
                className="tgh__band"
                style={{
                    opacity: layout ? 1 : 0,
                    // Спільна точка сходу на центральній лінії ряду: краї ростуть
                    // рівномірно вгору й вниз, коли йдуть до глядача.
                    perspective: `${+(r * CAMERA).toFixed(3)}cqw`,
                    perspectiveOrigin: `50% ${axis}%`,
                    maskImage: mask,
                    WebkitMaskImage: mask,
                }}
            >
                {Array.from({length: columns}, (_, t) => {
                    // Плитка `columns - 1` стартує найближче до виходу, плитка 0 — найдалі,
                    // тож це нумерує плитки в порядку їх появи.
                    const first = columns - 1 - t;
                    const img = images[(shown[t] !== undefined ? shown[t] : first) % Math.max(images.length, 1)];
                    return (
                        <div
                            key={t}
                            className={`${tile} tgh__tile`}
                            style={{
                                left: `calc(50% - ${u(aspectRatio / 2)})`,
                                top: `calc(${axis}% - ${u(0.5)})`,
                                width: u(aspectRatio),
                                height: u(1),
                                transformStyle: "preserve-3d",
                                // Плитка t стартує на t плиток уздовж петлі.
                                animation: `${orbit} ${duration}s linear ${-t * speed}s infinite`,
                            }}
                            onAnimationIteration={(e) => {
                                // elapsedTime рахує цілі кола, включно з пропущеними подіями.
                                const lap = Math.round(e.elapsedTime / duration);
                                setShown((prev) => {
                                    const next = lap * columns + first;
                                    return prev[t] === next ? prev : {...prev, [t]: next};
                                });
                            }}
                        >
                            {Array.from({length: SLICES}, (_, k) => (
                                <div
                                    key={k}
                                    className={
                                        'tgh__strip' +
                                        (k === 0 ? ' tgh__strip--first' : '') +
                                        (k === SLICES - 1 ? ' tgh__strip--last' : '')
                                    }
                                    style={{
                                        // Кожна смужка стартує в центрі плитки й повернута навколо
                                        // осі на своє місце на дузі.
                                        left: u((aspectRatio - share) / 2),
                                        // На піксель ширша за свою частку, щоб сусідні грані
                                        // перекривались і між ними не було волосини. Остання
                                        // сусіда не має — їй перекривати нікого.
                                        width: k === SLICES - 1 ? u(share) : `calc(${u(share)} + 1px)`,
                                        height: u(1),
                                        transform: turn(
                                            (aspectRatio / 2 - (k + 0.5) * share) * unit,
                                        ),
                                    }}
                                >
                                    {img ? (
                                        <img
                                            src={img.src}
                                            alt={k === 0 ? (img.alt || "") : ""}
                                            draggable={false}
                                            className="tgh__img"
                                            style={{
                                                left: u(-k * share),
                                                width: u(aspectRatio),
                                                height: u(1),
                                            }}
                                        />
                                    ) : null}
                                </div>
                            ))}
                        </div>
                    );
                })}
            </div>

            {children}
        </div>
    );
}

export default TiltedGridHero;
