import {FaArrowRight} from "react-icons/fa";
import {HiBadgeCheck} from "react-icons/hi";
import {Link} from "react-router-dom";
import React from "react";

import './ServicePage.css';
import Slider from "../slider/Slider";
import {THIS} from "../../config/headerConstants";
import {TiltedGridHero} from "../tiltedGrid";

/*
 * Сторінка послуги (чоловічі стрижки тощо) у новому дизайні.
 *
 * props:
 *  - title       — заголовок сторінки
 *  - lead        — короткий опис під заголовком
 *  - banner      — фонове фото героя (показується чорно-білим під коричневим затемненням)
 *  - photo, photoAlt — фото поруч із текстом
 *  - paragraphs  — масив абзаців
 *  - gallery     — масив {src, alt} для кривої 3D-стрічки (TiltedGridHero)
 *  - galleryAspect — співвідношення сторін плитки стрічки (за замовч. 16/9)
 *  - slides      — запасний варіант: масив {url} для старого слайдера (якщо gallery не задано)
 *  - listTitle, items — заголовок і перелік видів
 */
export function ServicePage({
    title, lead, banner, photo, photoAlt, paragraphs,
    gallery, galleryAspect, slides, listTitle, items
}) {

    // з цієї сторінки веде на головну й докручує до запису
    const goToBooking = () => {
        window.scrollTo({top: 0});
        setTimeout(() => {
            const booking = document.getElementById('booking');
            if (booking) booking.scrollIntoView({behavior: 'smooth'});
        }, 150);
    };

    return (
        <div className={'sv'}>
            <section className={'sv-hero'}>
                {banner && <img src={banner} alt={''} aria-hidden={'true'} className={'sv-hero__img'}/>}
                <div className={'sv-container'}>
                    <nav className={'sv-crumbs'} aria-label={'Навігація'}>
                        <Link to={THIS}>Головна</Link>
                        <span aria-hidden={'true'}>/</span>
                        <span>Послуги</span>
                    </nav>
                    <h1 className={'sv-hero__title'}>{title}</h1>
                    {lead && <p className={'sv-hero__lead'}>{lead}</p>}
                </div>
            </section>

            <section className={'sv-section'}>
                <div className={'sv-container'}>
                    <div className={'sv-intro'}>
                        <figure className={'sv-intro__photo'}>
                            <img src={photo} alt={photoAlt}/>
                        </figure>
                        <div className={'sv-intro__text'}>
                            {paragraphs.map((text, index) => <p key={index}>{text}</p>)}
                        </div>
                    </div>
                </div>
            </section>

            <section className={'sv-section sv-section--white'}>
                <div className={'sv-container'}>
                    <header className={'sv-head'}>
                        <span className={'sv-eyebrow'}>Галерея</span>
                        <h2 className={'sv-title'}>Наші роботи</h2>
                    </header>
                    {gallery ? (
                        <TiltedGridHero images={gallery} aspectRatio={galleryAspect} tileHeight={46} axis={50} speed={5}
                                        className={'sv-tilted'}/>
                    ) : (
                        <div className={'sv-gallery'}>
                            <Slider slides={slides}/>
                        </div>
                    )}
                </div>
            </section>

            <section className={'sv-section'}>
                <div className={'sv-container'}>
                    <header className={'sv-head'}>
                        <span className={'sv-eyebrow'}>Каталог</span>
                        <h2 className={'sv-title'}>{listTitle}</h2>
                    </header>
                    <ul className={'sv-list'}>
                        {items.map(item => (
                            <li key={item} className={'sv-list__item'}>
                                <span className={'sv-list__icon'}><HiBadgeCheck aria-hidden={'true'}/></span>
                                <span className={'sv-list__text'}>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <section className={'sv-section sv-section--tight'}>
                <div className={'sv-container'}>
                    <div className={'sv-cta'}>
                        <div>
                            <h2 className={'sv-cta__title'}>Готові до нового образу?</h2>
                            <p className={'sv-cta__text'}>Оберіть зручний день у календарі запису.</p>
                        </div>
                        <Link to={THIS} className={'sv-btn'} onClick={goToBooking}>
                            Записатися <FaArrowRight/>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
