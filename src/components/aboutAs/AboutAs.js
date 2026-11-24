import {useEffect} from "react";
import {useDispatch} from "react-redux";

import {auth} from "../../servises";
import VideoMp4 from "../../video/aboutAs.mp4";
import VideoWebm from "../../video/aboutAs.webm";
import {WORD_TOKEN} from "../../config/wordsConstants";

export function AboutAs() {

    const dispatch = useDispatch();

    useEffect(() => {
        if (localStorage.getItem(WORD_TOKEN)) {
            dispatch(auth()).then(res => {
                if (res === undefined) {
                    localStorage.removeItem(WORD_TOKEN);
                    document.location.reload();
                }
            })
        }
    }, [dispatch]);

    return (
        <section className={'sv-section'}>
            <div className={'sv-container'}>
                <header className={'sv-head'}>
                    <span className={'sv-eyebrow'}>Про салон</span>
                    <h2 className={'sv-title'}>Хто ми такі</h2>
                </header>
                <div className={'sv-intro ab-intro'}>
                    <div className={'ab-video'}>
                        <video controls muted loop preload={'metadata'} className={'ab-video__item'}>
                            <source src={VideoWebm} type={'video/webm'}/>
                            <source src={VideoMp4} type={'video/mp4'}/>
                        </video>
                    </div>
                    <div className={'sv-intro__text'}>
                        <p>Салон краси "Miraé" це салон з багаторічним досвідом. У нашому салоні ми
                            втілюємо найкращі тренди перукарського мистецтва і водночас приділяючи особливу увагу
                            якості та безпеці наших послуг, а також професійному зростанню наших фахівців. Головна
                            наша мета – створювати красу з огляду на індивідуальні потреби наших клієнтів.</p>
                        <p>Навіть самі маленькі не залишаться без уваги. Завжи раді усім. Наші двері відкриті, тож
                            чекаємо!</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
