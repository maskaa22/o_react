import Foto1 from "../../images/foto-1.jpg";
import Foto2 from "../../images/foto-7.jpg";
import Foto3 from "../../images/foto-5.png";
import Foto4 from "../../images/foto-4.jpg";
import './Home.css'

export function Comments ()
{
    return(
        <div className={'comments'}>
            <div className={'comment comment-one'}>
                <div className={'circle-flex comment-item'}>
                    <div className={'circle-flex'}>
                        <div className="photo">
                            <img src={Foto1} className={'personPhoto'} alt={'Головна'}/></div>
                    </div>
                    <div className={'comment-item-p'}>
                        <p className={'comment-p'}>Lorem ipsum dolor sit amet, eu soleat causae virtute vix. Ut
                            dicant labores pro. </p>
                        <p className={'p small'}>Lorem ipsum dolor sit amet, eu soleat causae virtute vix. Ut dicant
                            labores pro. </p>
                    </div>
                </div>
            </div>
            <div className={'comment comment-two'}>
                <div className={'circle-flex comment-item'}>
                    <div className={'circle-flex'}>
                        <div className="photo">
                            <img src={Foto2} className={'personPhoto'} alt={'Головна'}/></div>
                    </div>
                    <div className={'comment-item-p'}>
                        <p className={'comment-p'}>Lorem ipsum dolor sit amet, eu soleat causae virtute vix. Ut
                            dicant labores pro. </p>
                        <p className={'p small'}>Lorem ipsum dolor sit amet, eu soleat causae virtute vix. Ut dicant
                            labores pro. </p>
                    </div>
                </div>
            </div>
            <div className={'comment comment-three'}>
                <div className={'circle-flex comment-item'}>
                    <div className={'circle-flex'}>
                        <div className="photo">
                            <img src={Foto3} className={'personPhoto'} alt={'Головна'}/></div>
                    </div>
                    <div className={'comment-item-p'}>
                        <p className={'comment-p'}>Lorem ipsum dolor sit amet, eu soleat causae virtute vix. Ut
                            dicant labores pro. </p>
                        <p className={'p small'}>Lorem ipsum dolor sit amet, eu soleat causae virtute vix. Ut dicant
                            labores pro. </p>
                    </div>
                </div>
            </div>
            <div className={'comment'}>
                <div className={'circle-flex comment-item'}>
                    <div className={'circle-flex'}>
                        <div className="photo">
                            <img src={Foto4} className={'personPhoto'} alt={'Головна'}/></div>
                    </div>
                    <div className={'comment-item-p'}>
                        <p className={'comment-p'}>Lorem ipsum dolor sit amet, eu soleat causae virtute vix. Ut
                            dicant labores pro. </p>
                        <p className={'p small'}>Lorem ipsum dolor sit amet, eu soleat causae virtute vix. Ut dicant
                            labores pro. </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
