import './Home.css';
import './Home@media.css';
import One from '../../images/gallery/1.jpg';
import Four from '../../images/gallery/4.jpg';
import Five from '../../images/gallery/5.jpg';
import Six from '../../images/gallery/6.jpg';
import Three from '../../images/gallery/3.jpeg';
import Two from '../../images/gallery/2.jpg';

export function Works2() {

    return (
        <div className={'works-gallery'}>
            <div className={'works-gallery-items box1'}>
                <img src={One} alt={'One'} className={'margin-img-gallery'}/>
                <img src={Two} alt={'Two'} className={'margin-img-gallery'}/>
            </div>
            <div className={'works-gallery-items gallery-items-center'}>
                <img src={Three} alt={'Three'} className={'gallery-items-small margin-img-gallery'}/>
            </div>
            <div className={'works-gallery-items gallery-items-center box3'}>
                <img src={Four} alt={'Four'} className={'gallery-items-small margin-img-gallery'}/>
            </div>
            <div className={'works-gallery-items box4'}>
                <img src={Five} alt={'Five'} className={'margin-img-gallery'}/>
                <img src={Six} alt={'Six'} className={'margin-img-gallery'}/>
            </div>
        </div>
    );
}
