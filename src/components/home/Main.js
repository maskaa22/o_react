import Union from "../../images/Union4.png";
import Logo from "../../images/logo.png";
import './Home.css'

export function Main ()
{
    return(
        <div>
            <div className={'container '}>
                <img src={Logo} className={'logo-img title-for-logo'} alt={'Logo'}/>
            </div>
            <div className={'container title-position'}>
                <p className={'title'}>lena </p>
            </div>
            <div className={'container title-position-studio'}>
                <p className={'title title-max-size'}>Studio</p>
            </div>
            <img src={Union} alt={'Головна'}/>

            <div className={'container button-position'}>
                <a href={'#calendar'} className={'write'}>Записатися</a>
            </div>
        </div>
    );
}
