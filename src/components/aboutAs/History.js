const STATEMENTS = [
    'Стрижка, або просто миття, – це швидкий спосіб почуватися свіжо і енергійно.',
    'Професіонали можуть розповісти, як доглядати за волоссям і бровами, як міняти форму брів або колір волосся.',
    'Професійний догляд завжди буде кращим, швидшим і практичнішим.'
];

export function History() {

    return (
        <section className={'ab-history'}>
            <div className={'sv-container'}>
                <div className={'ab-history__grid'}>
                    {STATEMENTS.map((text, index) => (
                        <div key={index} className={'ab-history__card'}>
                            <span className={'ab-history__num'} aria-hidden={'true'}>0{index + 1}</span>
                            <p>{text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
