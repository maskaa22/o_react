import * as React from "react";

import './ScrollReelTestimonials.css';

/* ----------------------------------------------------------------
 * ScrollReelTestimonials
 *
 * Лента портретів, що прокручується в протилежні боки + поява тексту
 * посимвольно. Середня колонка — справжній вертикальний список портретів,
 * який зсувається на один "крок" за перехід; бічні колонки рухаються у
 * протилежний бік. Старий блок тексту зникає цілком, потім символи нового
 * з'являються по черзі.
 *
 * Це JS/CSS-версія компонента з shadcn-шаблону (без Tailwind і TypeScript).
 *
 * props:
 *  - testimonials: [{quote, author, image, alt?}]
 *  - charStaggerMs: затримка між символами, мс (за замовчуванням 6)
 *  - className: додаткові класи для зовнішнього контейнера
 * ---------------------------------------------------------------- */

/* Геометрія: крок між центрами портретів у середній колонці =
 * 3 * (клітинка 121.33px + проміжок 8px) = 388px */
const CELL = 121.33;
const GAP = 8;
const STEP = 3 * (CELL + GAP);

const EXIT_MS = 240;   // старий текст прибрано / новий змонтовано
const SLIDE_MS = 800;  // тривалість зсуву колонок + блокування кліків

const EASE_INOUT = "cubic-bezier(0.65,0,0.35,1)";

/* Порожня розмита клітинка */
function Cell() {
    return <div aria-hidden="true" className="sr-cell"/>;
}

/* Портрет: знебарвлення + діагональний відблиск */
function Featured({src, alt}) {
    return (
        <div className="sr-featured">
            <img src={src} alt={alt || ""} loading="lazy" className="sr-featured__img"/>
            <div aria-hidden="true" className="sr-featured__desat"/>
            <div aria-hidden="true" className="sr-featured__sheen"/>
        </div>
    );
}

/* Розбиття на символи. Пробіли лежать між span-ами слів як текстові вузли,
 * тому природний перенос рядків зберігається. Кожен символ з'являється з
 * власним animation-delay. */
function Chars({text, startIndex, staggerMs}) {
    let idx = startIndex;
    const words = text.split(" ");

    return (
        <>
            {words.map((word, wi) => {
                const wordSpan = (
                    <span className="sr-word">
                        {Array.from(word).map((ch, ci) => {
                            const delay = idx * staggerMs;
                            idx++;
                            return (
                                <span key={ci} className="sr-char" style={{animationDelay: `${delay}ms`}}>
                                    {ch}
                                </span>
                            );
                        })}
                    </span>
                );
                if (wi < words.length - 1) idx++;
                return (
                    <React.Fragment key={wi}>
                        {wordSpan}
                        {wi < words.length - 1 ? " " : null}
                    </React.Fragment>
                );
            })}
        </>
    );
}

export function ScrollReelTestimonials({testimonials, charStaggerMs = 6, className}) {
    /* Стан навігації й стан відображення розділені, щоб блок, який зникає,
     * і блок, який з'являється, ніколи не рендерились разом. */
    const [index, setIndex] = React.useState(0);
    const [displayIndex, setDisplayIndex] = React.useState(0);
    const [exiting, setExiting] = React.useState(false);
    const [mounted, setMounted] = React.useState(false);
    const animating = React.useRef(false);
    const timeouts = React.useRef([]);

    const count = testimonials.length;

    React.useEffect(() => {
        /* Анімацію колонок вмикаємо тільки після першого малювання, щоб лента
         * одразу стояла у стартовій позиції без "в'їзду". */
        const raf = requestAnimationFrame(() =>
            requestAnimationFrame(() => setMounted(true))
        );
        const pending = timeouts.current;
        return () => {
            cancelAnimationFrame(raf);
            pending.forEach(clearTimeout);
        };
    }, []);

    const paginate = React.useCallback((dir) => {
        if (animating.current) return;
        const next = index + dir;
        if (next < 0 || next >= count) return;
        animating.current = true;

        setIndex(next);
        setExiting(true);

        timeouts.current.push(
            setTimeout(() => {
                setDisplayIndex(next);
                setExiting(false);
            }, EXIT_MS)
        );
        timeouts.current.push(
            setTimeout(() => {
                animating.current = false;
            }, SLIDE_MS)
        );
    }, [index, count]);

    const onKeyDown = (e) => {
        if (e.key === "ArrowRight") {
            e.preventDefault();
            paginate(1);
        }
        if (e.key === "ArrowLeft") {
            e.preventDefault();
            paginate(-1);
        }
    };

    /* Середня колонка: 3 порожні клітинки, далі портрет + 2 клітинки між
     * відгуками, наприкінці ще 3 порожні. */
    const middleItems = React.useMemo(() => {
        const items = [];
        for (let i = 0; i < 3; i++) items.push({type: "cell"});
        testimonials.forEach((_, i) => {
            items.push({type: "featured", i});
            if (i < count - 1) {
                items.push({type: "cell"}, {type: "cell"});
            }
        });
        for (let i = 0; i < 3; i++) items.push({type: "cell"});
        return items;
    }, [testimonials, count]);

    if (!count) return null;

    const sideCellCount = 4 + 2 * count;
    const centerIdx = (count - 1) / 2;
    const middleY = (centerIdx - index) * STEP;
    const sideY = -middleY;

    const colStyle = (y) => ({
        transform: `translateY(${y}px)`,
        transition: mounted ? `transform ${SLIDE_MS}ms ${EASE_INOUT}` : "none"
    });

    const current = testimonials[displayIndex];

    return (
        <div
            role="region"
            aria-roledescription="carousel"
            aria-label="Відгуки"
            tabIndex={0}
            onKeyDown={onKeyDown}
            className={`sr${className ? ` ${className}` : ''}`}
        >
            {/* Лента */}
            <div aria-hidden="true" className="sr-reel">
                <div className="sr-reel__stage">
                    <div className="sr-col" style={colStyle(sideY)}>
                        {Array.from({length: sideCellCount}).map((_, i) => <Cell key={i}/>)}
                    </div>

                    <div className="sr-col" style={colStyle(middleY)}>
                        {middleItems.map((item, i) =>
                            item.type === "featured" ? (
                                <Featured key={i} src={testimonials[item.i].image} alt={testimonials[item.i].alt}/>
                            ) : (
                                <Cell key={i}/>
                            )
                        )}
                    </div>

                    <div className="sr-col" style={colStyle(sideY)}>
                        {Array.from({length: sideCellCount}).map((_, i) => <Cell key={i}/>)}
                    </div>
                </div>
            </div>

            {/* Текст */}
            <div className="sr-content">
                <div className="sr-content__top">
                    <svg className="sr-quote-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path
                            d="M4.58 17.32C3.55 16.23 3 15 3 13.01c0-3.5 2.46-6.64 6.03-8.19l.9 1.38c-3.34 1.8-4 4.15-4.25 5.62.54-.28 1.24-.38 1.93-.31 1.8.17 3.23 1.65 3.23 3.49a3.5 3.5 0 0 1-3.5 3.5c-1.07 0-2.1-.49-2.75-1.18zm10 0C13.55 16.23 13 15 13 13.01c0-3.5 2.46-6.64 6.03-8.19l.9 1.38c-3.34 1.8-4 4.15-4.25 5.62.54-.28 1.24-.38 1.93-.31 1.8.17 3.23 1.65 3.23 3.49a3.5 3.5 0 0 1-3.5 3.5c-1.07 0-2.1-.49-2.75-1.18z"/>
                    </svg>

                    <div className="sr-stage" aria-live="polite">
                        {/* Невидима копія в потоці задає висоту сцени під поточну цитату
                          * при будь-якій ширині, тож перенесений текст не обрізається. */}
                        <div aria-hidden="true" className="sr-ghost">
                            <p className="sr-quote">{current.quote}</p>
                            <p className="sr-author">{current.author}</p>
                        </div>
                        <div key={displayIndex} className={`sr-live${exiting ? ' sr-exit' : ''}`}>
                            <p className="sr-quote">
                                <Chars text={current.quote} startIndex={0} staggerMs={charStaggerMs}/>
                            </p>
                            <p className="sr-author">
                                <Chars text={current.author} startIndex={current.quote.length + 6}
                                       staggerMs={charStaggerMs}/>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Керування */}
                <div className="sr-controls">
                    <button type="button" className="sr-btn" onClick={() => paginate(-1)} disabled={index === 0}
                            aria-label="Попередній відгук">
                        <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"
                             strokeLinecap="round" strokeLinejoin="round">
                            <path d="M7.5 2.5 3.5 6l4 3.5"/>
                        </svg>
                    </button>
                    <button type="button" className="sr-btn" onClick={() => paginate(1)}
                            disabled={index === count - 1} aria-label="Наступний відгук">
                        <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"
                             strokeLinecap="round" strokeLinejoin="round">
                            <path d="m4.5 2.5 4 3.5-4 3.5"/>
                        </svg>
                    </button>
                    <span className="sr-counter" aria-hidden="true">{index + 1} / {count}</span>
                </div>
            </div>
        </div>
    );
}

export default ScrollReelTestimonials;
