import {BsArrowUp} from "react-icons/bs";
import React, {useEffect} from "react";

// Home.css / Home@media.css лишаються підключеними: з них беруть спільні класи
// (.container, .upward, .icon-up тощо) інші сторінки. Сама головна верстається в HomeModern.css.
import './Home.css';
import './Home@media.css';
import './HomeModern.css';
import {Benefits} from "./Benefits";
import {Breands} from "./Breands";
import {Calendar} from "../calendar";
import {Comments} from "./Comments";
import {scrollTopTop, Up} from "../../utils/function";
import {Main} from "./Main";
import {Works2} from "./Works2";

function SectionHead({eyebrow, title}) {
    return (
        <header className={'hm-head hm-reveal'}>
            <span className={'hm-eyebrow'}>{eyebrow}</span>
            <h2 className={'hm-title'}>{title}</h2>
        </header>
    );
}

export function HomePage() {

    // Плавна поява блоків при скролі
    useEffect(() => {
        const items = document.querySelectorAll('.hm-reveal');

        if (!('IntersectionObserver' in window)) {
            items.forEach(item => item.classList.add('is-visible'));
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {threshold: 0.12, rootMargin: '0px 0px -40px 0px'});

        items.forEach(item => observer.observe(item));

        return () => observer.disconnect();
    }, []);

    Up();

    return (
        <div className={'hm'}>
            <button type={'button'} className={'upward'} onClick={scrollTopTop} aria-label={'Нагору'}>
                <BsArrowUp className="icon-up"/>
            </button>

            <Main/>

            <section id={'benefits'} className={'hm-section'}>
                <div className={'hm-container'}>
                    <SectionHead eyebrow={'Чому ми'} title={'Переваги'}/>
                    <Benefits/>
                </div>
            </section>

            <section id={'works'} className={'hm-section hm-works'}>
                <div className={'hm-container'}>
                    <SectionHead eyebrow={'Галерея'} title={'Наші роботи'}/>
                    <Works2/>
                </div>
            </section>

            <section className={'hm-section'}>
                <div className={'hm-container'}>
                    <SectionHead eyebrow={'Клієнти про нас'} title={'Відгуки'}/>
                    <Comments/>
                </div>
            </section>

            <Breands/>

            <section id={'booking'} className={'hm-section hm-booking'}>
                <div className={'hm-container'}>
                    <SectionHead eyebrow={'Онлайн-запис'} title={'Записатися'}/>
                </div>
                <div className={'hm-booking__calendar hm-reveal'}>
                    <Calendar/>
                </div>
            </section>
        </div>
    );
}
