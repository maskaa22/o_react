import './HomeModern.css';
import One from '../../images/gallery/1.jpg';
import Two from '../../images/gallery/2.jpg';
import Three from '../../images/gallery/3.jpeg';
import Four from '../../images/gallery/4.jpg';
import Five from '../../images/gallery/5.jpg';
import Six from '../../images/gallery/6.jpg';

// Порядок і класи hm-g1..hm-g6 задають "bento"-розкладку в HomeModern.css
const WORKS = [
    {src: Two, cls: 'hm-g1'},
    {src: Three, cls: 'hm-g2'},
    {src: Five, cls: 'hm-g3'},
    {src: One, cls: 'hm-g4'},
    {src: Four, cls: 'hm-g5'},
    {src: Six, cls: 'hm-g6'}
];

export function Works2() {

    return (
        <div className={'hm-gallery'}>
            {WORKS.map((work, index) => (
                <figure key={work.cls} className={`hm-gallery__item hm-reveal ${work.cls}`}
                        style={{'--hm-delay': `${index * 90}ms`}}>
                    <img src={work.src} alt={`Робота студії ${index + 1}`} loading={'lazy'}/>
                </figure>
            ))}
        </div>
    );
}
