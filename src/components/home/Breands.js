import One from '../../images/brends/1.png'
import Two from '../../images/brends/2.png'
import Three from '../../images/brends/3.png'
import Four from '../../images/brends/4.png'
import Five from '../../images/brends/5.png'

export function Breands ()
{
    return(
        <div className={'img-hear img-breands'}>
            {/*<div className={'container-breands'}>*/}
            {/*    <h1 className={'header-about'}>Наші бренди</h1>*/}
            <div className={'container'}>
                <div className={'container-brands-item'}>
                    <img src={One} alt={'One'} className={'brands-items'}/>
                    <img src={Two} alt={'Two'} className={'brands-items'}/>
                    <img src={Three} alt={'Three'} className={'brands-items'}/>
                    <img src={Four} alt={'Four'} className={'brands-items'}/>
                    <img src={Five} alt={'Five'} className={'brands-items brands-items-chanel'}/>
                </div></div>
            {/*</div>*/}
        </div>
    );
}
