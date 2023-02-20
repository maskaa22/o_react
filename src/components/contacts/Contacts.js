import {BsFillTelephoneFill} from "react-icons/bs";
import {FaLocationArrow} from "react-icons/fa";
import {MdAlternateEmail} from "react-icons/md";
import {useEffect, useState} from "react";

import './Contacts.css';
import './Contacts@media.css';
import {APIServise} from "../servises";
import {Input} from "../utils";
import Women from '../../images/big-foto/Group 9.png'
import {useDispatch} from "react-redux";
import {WORD_TOKEN} from "../../config/wordsConstants";

export function Contacts() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [text, setText] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        if(localStorage.getItem(WORD_TOKEN)) {
            dispatch(APIServise.auth()).then(res => {
                if(res===undefined) {
                    localStorage.removeItem(WORD_TOKEN)
                    document.location.reload();
                }
            })
        }
    }, []);

    return (
        <div>
            <img src={Women} alt={'Women'}/>
            <div className={'container'}>
                <h1 className={'contact-h1'}>Чекаємо на Вас</h1>
                <div className={'contact-info'}>
                    <div className={'contact-info-item'}>
                        <div className={'contact-icon-center'}>
                            <div className={'contact-icon-circle'}><BsFillTelephoneFill className={'contact-icon'}/>
                            </div>
                        </div>
                        <p className={'contact-info-p-first'}>Телефон</p>
                        <p className={'contact-info-p-second'}>0657487125</p>
                    </div>
                    <div className={'contact-info-item'}>
                        <div className={'contact-icon-center'}>
                            <div className={'contact-icon-circle icon-second'}><MdAlternateEmail
                                className={'contact-icon'}/></div>
                        </div>
                        <p className={'contact-info-p-first'}>Пошта</p>
                        <p className={'contact-info-p-second'}>sdsdf@dfbv.dtf</p>
                    </div>
                    <div className={'contact-info-item'}>
                        <div className={'contact-icon-center'}>
                            <div className={'contact-icon-circle'}><FaLocationArrow className={'contact-icon'}/></div>
                        </div>
                        <p className={'contact-info-p-first'}>Адреса</p>
                        <p className={'contact-info-p-second'}>м. Київ, вул. Іващенка, б. 327</p>
                    </div>
                </div>
            </div>
            <div>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d8553.068030343416!2d30.628751791574437!3d50.406775786310156!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2sua!4v1672059328158!5m2!1sru!2sua"
                    width="100%" height="300" style={{border: 0}} allowFullScreen="" loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"/>
            </div>
            <div className={'container'}>
                <h1 className={'contact-h1'}>Напишіть нам</h1>
                <div className={'contact-grid'}>
                    <Input value={name} setValue={setName} type={'text'} placeholder={"Введіть ім'я"}/>
                    <Input value={email} setValue={setEmail} type={'text'} placeholder={'Введіть email'}/>
                    <Input value={phone} setValue={setPhone} type={'text'} placeholder={'Введіть телефон'}/>
                </div>
                <textarea cols="35" rows="7" placeholder="Введіть текст"
                          onChange={(event) => setText(event.target.value)} className={'contact-area'}/>
                <div className={'contact-button-flex'}>
                    <button className={'form_btn contact-button'} onClick={() => {
                        APIServise.sentEmail(name, email, phone, text)
                    }}>Відправити
                    </button>
                </div>
            </div>
        </div>
    );
}
