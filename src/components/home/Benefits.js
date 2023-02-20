import './Home.css';
import './Home@media.css';

export function Benefits() {

    return (
        <div className={'circle-full'}>
            <div className={'circle-flex'}>
                <div className={'circle-home circle-flex-item'}>
                    <div className={'circle-text'}>1</div>
                </div>
                <hr className={'circle-hr'}/>
                <div className={'circle-home circle-flex-item'}>
                    <div className={'circle-text'}>2</div>
                </div>
                <hr className={'circle-hr'}/>
                <div className={'circle-home circle-flex-item'}>
                    <div className={'circle-text'}>3</div>
                </div>
            </div>
            <div className={'circle-grid'}>
                <p className={'p'}>Відчуття стилю, бачення Вашого нового образу не залишить байдужим ні тендітну леді,
                    ні поважного джентельмена. </p>
                <p className={'p'}>Швидкість в поєднанні з навиками - велика сила. </p>
                <p className={'p'}>Студія краси дозволяє не тільки внести зовнішні позитивні корективи, але і вирівняти
                    емоційний фон. </p></div>
        </div>
    );
}
