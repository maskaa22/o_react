import {BsFillTelephoneFill} from "react-icons/bs";
import {FaLocationArrow} from "react-icons/fa";
import {MdAlternateEmail} from "react-icons/md";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";

import './Contacts.css';
import './Contacts@media.css';
import {auth, sentEmail} from "../../servises";
import {Input} from "../../utils";
import Women from '../../images/big-foto/Group 9.png';
import {WORD_TOKEN} from "../../config/wordsConstants";

export function Contacts() {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [text, setText] = useState('');
    const [emailError, setEmailError] = useState('Емейл не може бути пустим');
    const [emailDirty, setEmailDirty] = useState(false);
    const [phoneError, setPhoneError] = useState('Номер телефону не може бути пустим');
    const [phoneDirty, setPhoneDirty] = useState(false);
    const [formValid, setFormValid] = useState(true);

    const dispatch = useDispatch();

    useEffect(() => {
        // if (localStorage.getItem(WORD_TOKEN)) {
        //     dispatch(auth()).then(res => {
        //         if (res === undefined) {
        //             localStorage.removeItem(WORD_TOKEN);
        //             document.location.reload();
        //         }
        //     })
        // }
        if (phoneError !== '' || emailError !== '') {
            setFormValid(true);
        } else {
            setFormValid(false);
        }
    }, [dispatch, phoneError, emailError]);

    const emailHandler = (e) => {
        setEmail(e.target.value);
        const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,7})*$/;
        if (!e.target.value) {
            setEmailError('Емейл не може бути пустим');
        }
        if (!emailRegex.test(String(e.target.value).toLowerCase())) {
            setEmailError('Некоректний емейл. Зразок example@site.com');
        } else {
            setEmailError('');
        }
    };

    const phoneHandler = (e) => {
        setPhone(e.target.value);
        if (e.target.value.length !== 10) {
            setPhoneError('Телефон має бути 10 символів.');
        } else {
            setPhoneError('');
        }
        if (!e.target.value) {
            setPhoneError('Номер телефону не може бути пустим');
        }
    }

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'email':
                setEmailDirty(true);
                break;
            case 'phone':
                setPhoneDirty(true);
                break;
            default: console.log('Помилка');
        }
    }

    return (
        <div>
            <img src={Women} alt={'Women'} className={'submenu-img'}/>
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
                <iframe title={'map'}
                    src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d8553.068030343416!2d30.628751791574437!3d50.406775786310156!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2sua!4v1672059328158!5m2!1sru!2sua"
                    width="100%" height="400" style={{border: 0}} allowFullScreen="" loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"/>
            </div>
            <div className={'container'}>
                <h1 className={'contact-h1'}>Напишіть нам</h1>
                <div className={'contact-grid'}>
                    <Input value={name} setValue={setName} type={'text'} placeholder={"Введіть ім'я"}
                           className={'input-contact-send'}/>
                    <input value={email} onChange={e => emailHandler(e)} type={'email'} placeholder={'Введіть email'}
                           className={'input-focus input-contact-send'} name={'email'}
                           onBlur={e => blurHandler(e)} />

                    <input value={phone} onChange={e => phoneHandler(e)} type={'number'} placeholder={'Введіть телефон'}
                           className={'input-focus input-contact-send'} name={'phone'}
                           onBlur={e => blurHandler(e)} maxLength={10}/>
                    {/*<Input value={phone} setValue={setPhone} type={'number'} placeholder={'Введіть телефон'}*/}
                    {/*       className={'input-contact-send'} maxLength={10} />*/}
                </div>
                {(emailDirty && emailError) && <div className={'error-input-center'}>{emailError}</div>}
                {(phoneDirty && phoneError) && <div className={'error-input-center'}>{phoneError}</div>}

                <textarea cols="35" rows="7" placeholder="Введіть текст"
                          onChange={(event) => setText(event.target.value)} className={'contact-area'}/>
                <div className={'contact-button-flex'}>
                    <button disabled={formValid} className={'form_btn contact-button'} onClick={() => {
                        sentEmail(name, email, phone, text);
                    }}>Відправити
                    </button>
                </div>
            </div>
        </div>
    );
}
