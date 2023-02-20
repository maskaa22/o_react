import {HiBadgeCheck} from "react-icons/hi";

import './MansHaircut.css';
import './MansHaircut@media.css';
import Mens from '../../images/big-foto/Group 7.png';
import Slider from "../slider/Slider";
import {slidesMan} from "../../config/sliderConstants";
import smallFoto from '../../images/servises/menHears/1.png'
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {WORD_TOKEN} from "../../config/wordsConstants";
import {APIServise} from "../servises";

export function MensHaircut() {

    const dispatch = useDispatch();

    useEffect(() => {
        if(localStorage.getItem(WORD_TOKEN)) {
            dispatch(APIServise.auth()).then(res => {
                if(res===undefined) {
                    localStorage.removeItem(WORD_TOKEN)
                    document.location.reload();
                }
            })
        }
    }, []);

    return (
        <div>
            <img src={Mens} alt={'Men'}/>
            <div className={'container'}>
                <div className={'servise-info'}>
                    <h1 className={'servise-info-h1'}>Чоловіча стрижка</h1>
                    <img src={smallFoto} alt={'Men'} className={'servise-info-img'}/>
                    <p className={'servise-info-p'}>Чоловіки не менш за жінок хочуть виглядати привабливо та яскраво. І
                        не важливо де чоловік буде сьогодні : дома, на важливій зустрічі, або на святі – гарна стрижка,
                        це запорука успіху кожного чоловіка. «Olena Studio» працює з професійною косметикою,
                        використовує надійні інструменти для роботи з чоловічими стрижками.</p>
                    <p className={'servise-info-p'}>Ми враховуємо як побажання клієнта, так і структурні особливості
                        його особи, завжди знаходимо
                        найкраще стильове рішення. Тому для нас важливим є індивідуальний підхід, який робить кожну
                        чоловічу стрижку унікальною.</p>
                    <p className={'servise-info-p'}>Розслаблююча атмосфера та високий рівень послуг від майстрів,
                        дозволяють отримати максимум
                        задоволення від процесу чоловічої стрижки.</p>
                </div>
            </div>
            <Slider slides={slidesMan}/>
            <div className={'container'}>
                <h1 className={'servise-info-h1'}>Види стрижок</h1>
                <div className={'servise-flex'}>
                    <div className={'servise-hears'}>
                        <div>
                            <div className={'hears-item'}>
                                <HiBadgeCheck className={'hears-item-icon'}/><p className={'hears-item-p'}>Мілітарі</p>
                            </div>
                            <div className={'hears-item'}>
                                <HiBadgeCheck className={'hears-item-icon'}/><p className={'hears-item-p'}>Майданчик</p>
                            </div>
                            <div className={'hears-item'}>
                                <HiBadgeCheck className={'hears-item-icon'}/><p className={'hears-item-p'}>Напівбокс</p>
                            </div>
                        </div>
                        <div>
                            <div className={'hears-item'}>
                                <HiBadgeCheck className={'hears-item-icon'}/><p className={'hears-item-p'}>Теніс</p>
                            </div>
                            <div className={'hears-item'}>
                                <HiBadgeCheck className={'hears-item-icon'}/><p className={'hears-item-p'}>Бокс</p>
                            </div>
                            <div className={'hears-item'}>
                                <HiBadgeCheck className={'hears-item-icon'}/><p className={'hears-item-p'}>Цезар</p>
                            </div>
                        </div>
                        <div>
                            <div className={'hears-item'}>
                                <HiBadgeCheck className={'hears-item-icon'}/><p className={'hears-item-p'}>Прінстон</p>
                            </div>
                            <div className={'hears-item'}>
                                <HiBadgeCheck className={'hears-item-icon'}/><p className={'hears-item-p'}>Андеркат</p>
                            </div>
                            <div className={'hears-item'}>
                                <HiBadgeCheck className={'hears-item-icon'}/><p className={'hears-item-p'}>Канадка</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
