import Mens from '../../images/big-foto/Group 5.png';
import smallFoto from '../../images/servises/stylesHear/1.png';
import '../mensHaircut/MansHaircut.css';
import Slider from "../slider/Slider";
import {HiBadgeCheck} from "react-icons/hi";


export function HairStyles() {

    const slides = [
        {url: 'http://localhost:3000/static/media/Group%2022.02255d55a1c9b5ceed19.png'},
        {url: 'http://localhost:3000/static/media/Group%2024.03f48c98b0ea26936cfe.png'},
        {url: 'http://localhost:3000/static/media/Group%2023.27dc1bf0e2b1cb3c8bcb.png'}
    ];

    return (
        <div>
            <img src={Mens} alt={'Men'}/>
            <div className={'container'}>
                <div className={'servise-info'}>
                    <h1 className={'servise-info-h1'}>Професійна зачіска</h1>
                    <img src={smallFoto} alt={'Men'} className={'servise-info-img'}/>
                    <p className={'servise-info-p'}>Хочу виглядати бездоганно, тут і зараз, бажано швидко» – виклик
                        прийнято. Зачіска – найважливіша складова вашого образу. Якщо ви хочете виглядати надзвичайно і
                        привертати увагу оточуючих без красивої укладки не обійтись.</p>

                    <p className={'servise-info-p'}>Стилісти салона краси «Olena Studio» застосовують різні
                        методики, які дозволяють на волоссі різної довжини створити справжній витвір мистецтва. Вечірня,
                        весільна або просто охайне укладання волосся по довжині, призначене для невеликої урочистості,
                        займе в нашому салоні краси зовсім небагато часу. Для укладання волосся, стилісти салону «Olena
                        Studio»
                        використовують абсолютно професійну косметику від відомих брендів, ваше волосся буде
                        шовковистим, та неймовірно пахнути.</p>

                </div>
            </div>

            <Slider slides={slides}/>

            <div className={'container'}>
                <h1 className={'servise-info-h1'}>Види зачісок</h1>
                <div className={'servise-hears'}>
                    <div>
                        <div className={'hears-item'}>
                            <HiBadgeCheck className={'hears-item-icon'}/><p className={'hears-item-p'}>Локони</p>
                        </div>
                        <div className={'hears-item'}>
                            <HiBadgeCheck className={'hears-item-icon'}/><p className={'hears-item-p'}>Пучок</p>
                        </div>
                        <div className={'hears-item'}>
                            <HiBadgeCheck className={'hears-item-icon'}/><p className={'hears-item-p'}>Бабета</p>
                        </div>
                    </div>
                    <div>
                        <div className={'hears-item'}>
                            <HiBadgeCheck className={'hears-item-icon'}/><p className={'hears-item-p'}>Плетіння</p>
                        </div>
                        <div className={'hears-item'}>
                            <HiBadgeCheck className={'hears-item-icon'}/><p className={'hears-item-p'}>Романтичні</p>
                        </div>
                        <div className={'hears-item'}>
                            <HiBadgeCheck className={'hears-item-icon'}/><p className={'hears-item-p'}>Укладання</p>
                        </div>
                    </div>
                    <div>
                        <div className={'hears-item'}>
                            <HiBadgeCheck className={'hears-item-icon'}/><p className={'hears-item-p'}>Класична</p>
                        </div>
                        <div className={'hears-item'}>
                            <HiBadgeCheck className={'hears-item-icon'}/><p className={'hears-item-p'}>Афро</p>
                        </div>
                        <div className={'hears-item'}>
                            <HiBadgeCheck className={'hears-item-icon'}/><p className={'hears-item-p'}>Завивка</p>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
}
