import './Home.css';
import './Home@media.css';
export function Benefits ()
{
    return(
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
                <p className={'p'}>Lorem ipsum dolor sit amet, eu soleat causae virtute vix. Ut dicant labores
                    pro. </p>
                <p className={'p'}>Lorem ipsum dolor sit amet, eu soleat causae virtute vix. Ut dicant labores
                    pro. </p>
                <p className={'p'}>Lorem ipsum dolor sit amet, eu soleat causae virtute vix. Ut dicant labores
                    pro. </p></div>
        </div>
    );
}
