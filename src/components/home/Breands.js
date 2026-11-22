import './HomeModern.css';
import One from '../../images/brends/1.png';
import Two from '../../images/brends/2.png';
import Three from '../../images/brends/3.png';
import Four from '../../images/brends/4.png';
import Five from '../../images/brends/5.png';

const BRANDS = [
    {src: One, alt: 'Бренд 1'},
    {src: Two, alt: 'MAC'},
    {src: Three, alt: 'L\'Oréal'},
    {src: Four, alt: 'Kylie'},
    {src: Five, alt: 'Chanel'}
];

export function Breands() {

    return (
        <section className={'hm-brands'}>
            <div className={'hm-container hm-reveal'}>
                <p className={'hm-brands__label'}>Бренди</p>
                <div className={'hm-brands__row'}>
                    {/* Логотипи — одноколірні PNG; фарбуємо їх у колір акценту через CSS-маску за альфа-каналом,
                        тому при зміні палітри міняти самі файли не треба. */}
                    {BRANDS.map(brand => (
                        <span key={brand.alt} role={'img'} aria-label={brand.alt} className={'hm-brands__logo'}
                              style={{WebkitMaskImage: `url(${brand.src})`, maskImage: `url(${brand.src})`}}/>
                    ))}
                </div>
            </div>
        </section>
    );
}
