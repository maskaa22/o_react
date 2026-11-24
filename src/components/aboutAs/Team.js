import FirstMen from '../../images/teams/1.webp';
import FirstWomen from '../../images/teams/3.webp';
import SecondMen from '../../images/teams/2.webp';
import SecondWomen from '../../images/teams/4.webp';

const TEAM = [
    {photo: FirstMen, name: 'Андрій Шмигаль'},
    {photo: SecondMen, name: 'Артем Венгер'},
    {photo: FirstWomen, name: 'Світлана Мигдаль'},
    {photo: SecondWomen, name: 'Сніжана Гурко'}
];

export function Team() {
    return (
        <section className={'sv-section'}>
            <div className={'sv-container'}>
                <header className={'sv-head'}>
                    <span className={'sv-eyebrow'}>Майстри</span>
                    <h2 className={'sv-title'}>Наша команда</h2>
                </header>
                <ul className={'ab-team'}>
                    {TEAM.map(member => (
                        <li key={member.name} className={'ab-card'}>
                            <img src={member.photo} alt={member.name} className={'ab-card__photo'} loading={'lazy'}/>
                            <div className={'ab-card__caption'}>
                                <span className={'ab-card__line'} aria-hidden={'true'}/>
                                <p className={'ab-card__name'}>{member.name}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
