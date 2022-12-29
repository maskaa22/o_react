import './Home.css';
import './Home@media.css';
import Logo from "../../images/logo-header.png";
import VideoMp4 from "../../video/home.mp4";
import VideoWebm from "../../video/home.webm";

export function Main() {

    return (
        <div className={'full-screen'}>
            <div className={'full-screen__body'}>
                <div className={'container '}>
                    <img src={Logo} className={'logo-img title-for-logo'} alt={'Logo'}/>
                </div>
                <div className={'container title-position'}>
                    <p className={'title'}>lena </p>
                </div>
                <div className={'container title-position-studio'}>
                    <p className={'title title-max-size'}>Studio</p>
                </div>
                <div className={'container button-position'}>
                    <a href={'#calendar'} className={'write'}>Записатися</a>
                </div>
            </div>
            <video autoPlay muted loop preload={'auto'} className={'full-screen__video'}>
                <source src={VideoWebm} type={'video/webm'}/>
                <source src={VideoMp4} type={'video/mp4'}/>
            </video>

        </div>
    );
}
