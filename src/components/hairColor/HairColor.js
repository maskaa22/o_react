import {HiBadgeCheck} from "react-icons/hi";
import {useDispatch} from "react-redux";
import {useEffect} from "react";

import '../mensHaircut/MansHaircut.css';
import '../mensHaircut/MansHaircut@media.css';
import {auth} from "../../servises";
import Mens from '../../images/big-foto/Group 6.png';
import Slider from "../slider/Slider";
import {slideColor} from "../../config/sliderConstants";
import smallFoto from '../../images/servises/colorsHears/1.png';
import {WORD_TOKEN} from "../../config/wordsConstants";

export function HairColor() {

    const dispatch = useDispatch();

    useEffect(() => {
        if (localStorage.getItem(WORD_TOKEN)) {
            dispatch(auth()).then(res => {
                if (res === undefined) {
                    localStorage.removeItem(WORD_TOKEN);
                    document.location.reload();
                }
            });
        }
    }, [dispatch]);

    return (
        <div>
            <img src={Mens} alt={'Men'} className={'submenu-img'}/>
            <div className={'container'}>
                <div className={'servise-info'}>
                    <h1 className={'servise-info-h1'}>Професійне фарбування</h1>
                    <img src={smallFoto} alt={'Men'} className={'servise-info-img'}/>
                    <p className={'servise-info-p'}>Чи то темний колір, блонд або знебарвлення, якщо волосся виглядає
                        здоровим і доглянутим, це в тренді, незалежно від кольору. Фарбування для того, щоб підкреслити
                        красу вашого волосся, а не зіпсувати!</p>
                    <p className={'servise-info-p'}>Стилісти салону краси «Olena Studio» стежать за новими тенденціями,
                        особливо
                        за тим, як зберегти здоров’я вашого волосся завдяки професійній косметиці або препаратам, які
                        використовують під час фарбування.Постійно проходять підвищення кваліфікації та запропонують
                        самі актуальні техніки. Салон краси «Olena Studio» працює виключно з професійними фарбами для
                        волосся, вони щадно впливають на волосся і не шкодять їх
                        структурі, даруючи блиск і яскраві відтінки.</p>
                </div>
            </div>
            <Slider slides={slideColor}/>
            <div className={'container'}>
                <h1 className={'servise-info-h1'}>Методики фарбування</h1>
                <div className={'servise-flex'}>
                    <div className={'servise-hears'}>
                        <div>
                            <div className={'hears-item'}>
                                <HiBadgeCheck className={'hears-item-icon'}/><p
                                className={'hears-item-p'}>Мелірування</p>
                            </div>
                            <div className={'hears-item'}>
                                <HiBadgeCheck className={'hears-item-icon'}/><p className={'hears-item-p'}>Балаяж</p>
                            </div>
                            <div className={'hears-item'}>
                                <HiBadgeCheck className={'hears-item-icon'}/><p className={'hears-item-p'}>Мажимеш</p>
                            </div>
                        </div>
                        <div>
                            <div className={'hears-item'}>
                                <HiBadgeCheck className={'hears-item-icon'}/><p className={'hears-item-p'}>Омбре</p>
                            </div>
                            <div className={'hears-item'}>
                                <HiBadgeCheck className={'hears-item-icon'}/><p
                                className={'hears-item-p'}>Брондування</p>
                            </div>
                            <div className={'hears-item'}>
                                <HiBadgeCheck className={'hears-item-icon'}/><p className={'hears-item-p'}>Ейртач</p>
                            </div>
                        </div>
                        <div>
                            <div className={'hears-item'}>
                                <HiBadgeCheck className={'hears-item-icon'}/><p className={'hears-item-p'}>Шатуш</p>
                            </div>
                            <div className={'hears-item'}>
                                <HiBadgeCheck className={'hears-item-icon'}/><p className={'hears-item-p'}>Тонування</p>
                            </div>
                            <div className={'hears-item'}>
                                <HiBadgeCheck className={'hears-item-icon'}/><p
                                className={'hears-item-p'}>Колорування</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
