import Mens from '../../images/big-foto/Group 8.png';
import smallFoto from '../../images/servises/womenHears/1.png'
import '../mensHaircut/MansHaircut.css';
import '../mensHaircut/MansHaircut@media.css';
import Slider from "../slider/Slider";
import {HiBadgeCheck} from "react-icons/hi";
import {slideWoman} from "../../config/sliderConstants";


export function WomensHaircut() {

    return (
        <div>
            <img src={Mens} alt={'Men'}/>
            <div className={'container'}>
                <div className={'servise-info'}>
                    <h1 className={'servise-info-h1'}>Жіноча стрижка</h1>
                    <img src={smallFoto} alt={'Men'} className={'servise-info-img'}/>
                    <p className={'servise-info-p'}>Стрижка — це ні тільки творчий, а й складний технологічний процес.
                        Кожна жінка хоче бути унікальною, завдяки правильній консультації та правильно підібраній формі
                        можна змінити весь образ в цілому. Команда «Olena Studio» вже довела свою досвідченість та
                        талановитість
                        – наші майстри користуються популярністю серед киян.</p>

                    <p className={'servise-info-p'}>«Olena Studio» салон краси, в якому ви можете зробити
                        абсолютного
                        любої форми жіночу стрижку, та за різними технологіями. Ми враховуємо побажання наших
                        відвідувачів, але також особливості кожного клієнта, вміємо розкривати вашу унікальність і
                        приховувати недоліки. Ми стежимо за сучасними тенденціями та пропонуємо актуальні та цікаві
                        креативні стрижки.</p>

                </div>
            </div>

            <Slider slides={slideWoman}/>

            <div className={'container'}>
                <h1 className={'servise-info-h1'}>Види стрижок</h1>
                <div className={'servise-flex'}>
                    <div className={'servise-hears'}>
                        <div>
                            <div className={'hears-item'}>
                                <HiBadgeCheck className={'hears-item-icon'}/><p className={'hears-item-p'}>Каре</p>
                            </div>
                            <div className={'hears-item'}>
                                <HiBadgeCheck className={'hears-item-icon'}/><p className={'hears-item-p'}>Каскад</p>
                            </div>
                            <div className={'hears-item'}>
                                <HiBadgeCheck className={'hears-item-icon'}/><p className={'hears-item-p'}>Лісенка</p>
                            </div>
                        </div>
                        <div>
                            <div className={'hears-item'}>
                                <HiBadgeCheck className={'hears-item-icon'}/><p className={'hears-item-p'}>Рапсодія</p>
                            </div>
                            <div className={'hears-item'}>
                                <HiBadgeCheck className={'hears-item-icon'}/><p className={'hears-item-p'}>Сесон</p>
                            </div>
                            <div className={'hears-item'}>
                                <HiBadgeCheck className={'hears-item-icon'}/><p className={'hears-item-p'}>Шег</p>
                            </div>
                        </div>
                        <div>
                            <div className={'hears-item'}>
                                <HiBadgeCheck className={'hears-item-icon'}/><p className={'hears-item-p'}>Аврора</p>
                            </div>
                            <div className={'hears-item'}>
                                <HiBadgeCheck className={'hears-item-icon'}/><p className={'hears-item-p'}>Шапочка</p>
                            </div>
                            <div className={'hears-item'}>
                                <HiBadgeCheck className={'hears-item-icon'}/><p className={'hears-item-p'}>Асиметрія</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
