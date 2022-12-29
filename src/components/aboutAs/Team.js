import FirstMen from '../../images/teams/1.png';
import SecondMen from '../../images/teams/2.png';
import FirstWomen from '../../images/teams/3.png';
import SecondWomen from '../../images/teams/4.png';
import './AboutAsPage.css';
import './AboutAsPage@media.css';

export  function Team ()
{
    return(
        <div className={'margin-bottom-about'}>
            <h1 className={'team-h1'}>Наша команда</h1>
            <div className={'teams-gallery'}>
                <div className={'teams-items'}>
                    <img src={FirstMen} className={'team-img'} alt={'Men'}/>
                    <p>Андрій Шмигаль</p>
                </div>
                <div className={'teams-items'}>
                    <img src={SecondMen} className={'team-img'} alt={'Men'}/>
                    <p>Артем Венгер</p>
                </div>
                <div className={'teams-items'}>
                    <img src={FirstWomen} className={'team-img'} alt={'Women'}/>
                    <p>Світлана Мигдаль</p>
                </div>
                <div className={'teams-items'}>
                    <img src={SecondWomen} className={'team-img'} alt={'Women'}/>
                    <p>Сніжана Гурко</p>
                </div>
            </div>
        </div>
    );
}
