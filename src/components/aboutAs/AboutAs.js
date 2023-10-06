import {useEffect} from "react";
import {useDispatch} from "react-redux";

import './AboutAsPage.css';
import './AboutAsPage@media.css';
import {auth} from "../../servises";
import VideoMp4 from "../../video/aboutAs.mp4";
import VideoWebm from "../../video/aboutAs.webm";
import {WORD_TOKEN} from "../../config/wordsConstants";

export function AboutAs() {

    const dispatch = useDispatch();

    // useEffect(() => {
    //     if (localStorage.getItem(WORD_TOKEN)) {
    //         dispatch(auth()).then(res => {
    //             if (res === undefined) {
    //                 localStorage.removeItem(WORD_TOKEN);
    //                 document.location.reload();
    //             }
    //         })
    //     }
    // }, [dispatch]);

    return (
        <div className={'margin-bottom-about'}>
            <h1 className={'about-h1'}>Хто ми такі</h1>
            <div className={'flex-about'}>
                <div className={'about-video-flex'}>
                    <video controls muted loop preload={'auto'} className={'about-video-item'}>
                        <source src={VideoWebm} type={'video/webm'}/>
                        <source src={VideoMp4} type={'video/mp4'}/>
                    </video>
                </div>
                <div className={'about-p-full'}>
                    <p className={'about-p-first'}>Салон краси "Olena Studio" це салон з багаторічним досвідом. У нашому
                        салоні ми
                        втілюємо найкращі тренди перукарського мистецтва і водночас
                        приділяючи особливу увагу якості та безпеці наших послуг, а також професійному зростанню наших
                        фахівців. Головна наша мета –
                        створювати красу з огляду на індивідуальні потреби наших клієнтів.</p>
                    <p className={'about-p-last'}>Навіть самі маленькі не залишаться без уваги. Завжи раді усім. Наші
                        двері відкриті, тож чекаємо!</p>
                </div>
            </div>
        </div>
    );
}
