import './Home.css';
import './Home@media.css';
import Foto1 from "../../images/foto-1.jpg";
import Foto2 from "../../images/foto-7.jpg";
import Foto3 from "../../images/foto-5.png";
import Foto4 from "../../images/foto-4.jpg";

export function Comments() {

    return (
        <div className={'comments'}>
            <div className={'comment comment-one'}>
                <div className={'circle-flex comment-item'}>
                    <div className={'circle-flex'}>
                        <div className="photo">
                            <img src={Foto1} className={'personPhoto'} alt={'Головна'}/></div>
                    </div>
                    <div className={'comment-item-p'}>
                        <p className={'comment-p'}>Дякую за чудову стрижку та хорошу бесіду під час неї. Всім
                            задоволений.</p>
                        <p className={'p small'}>Вільям Август, 15.09.2022</p>
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
                        <p className={'comment-p'}>Мені сподобалось, як Ви уклали моє волосся. Укладка протрималася
                            досить довго. Дякую.</p>
                        <p className={'p small'}>Лариса Володимирівна, 17.09.2022</p>
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
                        <p className={'comment-p'}>Від моєї зачіски всі були в захваті. Обов'язково прийду ще.</p>
                        <p className={'p small'}>Аліна Шатенко, 03.12.2022</p>
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
                        <p className={'comment-p'}>Дякую! Мені дуже сподобалося, наступного разу прийду з сином.</p>
                        <p className={'p small'}>Алік Вінтер, 12.01.2023</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
