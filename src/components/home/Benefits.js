import {FaCut, FaRegClock, FaRegSmileBeam} from "react-icons/fa";

import './HomeModern.css';

const BENEFITS = [
    {
        icon: <FaCut/>,
        title: 'Відчуття стилю',
        text: 'Бачення Вашого нового образу не залишить байдужим ні тендітну леді, ні поважного джентельмена.'
    },
    {
        icon: <FaRegClock/>,
        title: 'Швидкість і навики',
        text: 'Швидкість в поєднанні з навиками — велика сила.'
    },
    {
        icon: <FaRegSmileBeam/>,
        title: 'Емоційний баланс',
        text: 'Студія краси дозволяє не тільки внести зовнішні позитивні корективи, але і вирівняти емоційний фон.'
    }
];

export function Benefits() {

    return (
        <div className={'hm-benefits__grid'}>
            {BENEFITS.map((item, index) => (
                <article key={item.title} className={'hm-benefit hm-reveal'} style={{'--hm-delay': `${index * 120}ms`}}>
                    <span className={'hm-benefit__num'} aria-hidden={'true'}>0{index + 1}</span>
                    <div className={'hm-benefit__icon'}>{item.icon}</div>
                    <h3 className={'hm-benefit__title'}>{item.title}</h3>
                    <p className={'hm-benefit__text'}>{item.text}</p>
                </article>
            ))}
        </div>
    );
}
