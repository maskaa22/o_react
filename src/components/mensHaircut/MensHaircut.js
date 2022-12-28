import Mens from '../../images/big-foto/Group 7.png';
import smallFoto from '../../images/servises/menHears/1.png'
import './MansHaircut.css';
import Slider from "../slider/Slider";
import {HiBadgeCheck} from "react-icons/hi";


export function MensHaircut() {

    const slides = [
        {url: 'http://localhost:3000/static/media/Group%2011.bc22c1f989e41f1fe01d.png'},
        {url: 'http://localhost:3000/static/media/Group%2012.07de2174a5e8b965abac.png'},
        {url: 'http://localhost:3000/static/media/Group%2013.c3a848329e935fc326f2.png'}
    ];

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

            <Slider slides={slides}/>

            <div className={'container'}>
                <h1 className={'servise-info-h1'}>Види стрижок</h1>
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
    );
}
