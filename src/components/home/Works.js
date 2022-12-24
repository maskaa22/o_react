import Slide from "../../images/90.jpg";
import Pricheska from "../../images/Pricheska.jpg";
import './Home.css'

export function Works ()
{
    return(
        <div className={'slider-grid'}>
            <div className={'two-slide'}><img src={Slide} alt={'Головна'} className={'slide-image'}/>
                <div className={'p-slide'}>
                    <p className={'p'}>Lorem ipsum dolor sit amet, eu soleat causae virtute vix. Ut dicant
                        labores
                        pro. </p>
                    <div className={'slide-button-center'}>
                        <button className={'slider-button'}>Детальніше</button>
                    </div>
                </div>
            </div>
            <div className={'one-slide'}><img src={Pricheska} alt={'Головна'} className={'slide-image-center'}/>
                <div className={'slide-position-center'}>
                    <div className={'slide-button-center'}>
                        <button className={'slider-button slide-button-position'}>Детальніше</button>
                    </div>
                    <p className={'p p-slide-center'}>Lorem ipsum dolor sit amet, eu soleat causae virtute vix.
                        Ut dicant labores
                        pro. </p>
                </div>
            </div>

            <div className={'two-slide'}><img src={Slide} alt={'Головна'} className={'slide-image'}/>
                <div className={'p-slide'}>
                    <p className={'p'}>Lorem ipsum dolor sit amet, eu soleat causae virtute vix. Ut dicant
                        labores
                        pro. </p>
                    <div className={'slide-button-center'}>
                        <button className={'slider-button'}>Детальніше</button>
                    </div>
                </div>
            </div>

        </div>
    );
}
