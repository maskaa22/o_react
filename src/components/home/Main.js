import {FaArrowRight} from "react-icons/fa";
import {BsChevronDown} from "react-icons/bs";

import './HomeModern.css';
import VideoMp4 from "../../video/home.mp4";
import VideoWebm from "../../video/home.webm";

export function Main() {

    return (
        <section className={'hm-hero'}>
            <video autoPlay muted loop playsInline preload={'auto'} className={'hm-hero__video'} aria-hidden={'true'}>
                <source src={VideoWebm} type={'video/webm'}/>
                <source src={VideoMp4} type={'video/mp4'}/>
            </video>
            <div className={'hm-container'}>
                <div className={'hm-hero__inner'}>
                    <span className={'hm-hero__badge'}>Студія краси</span>
                    <h1 className={'hm-hero__title'}>
                        Ваш новий образ <em>починається тут</em>
                    </h1>
                    <p className={'hm-hero__lead'}>
                        Стрижки, зачіски та фарбування — з увагою до кожної деталі та
                        відчуттям стилю для леді і джентльмена.
                    </p>
                    <div className={'hm-hero__actions'}>
                        <a href={'#booking'} className={'hm-btn hm-btn--primary'}>
                            Записатися <FaArrowRight/>
                        </a>
                        <a href={'#works'} className={'hm-btn hm-btn--ghost'}>Наші роботи</a>
                    </div>
                </div>
            </div>
            <a href={'#benefits'} className={'hm-hero__scroll'} aria-label={'Прокрутити вниз'}>
                <span>Гортайте</span>
                <BsChevronDown/>
            </a>
        </section>
    );
}
