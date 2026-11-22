import {BsFillTelephoneFill} from "react-icons/bs";
import {FaArrowRight, FaLocationArrow} from "react-icons/fa";
import {Link} from "react-router-dom";
import {MdAlternateEmail} from "react-icons/md";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";

import '../servicePage/ServicePage.css';   // спільні класи sv-*: герой, секції, заголовки, кнопка
import './Contacts.css';
import {auth, sentEmail} from "../../servises";
import Banner from '../../images/big-foto/Group 9.png';
import {THIS} from "../../config/headerConstants";
import {WORD_TOKEN} from "../../config/wordsConstants";

const PHONE = '0657487125';
const EMAIL = 'sdsdf@dfbv.dtf';
const ADDRESS = 'м. Київ, вул. Іващенка, б. 327';
const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Київ, вул. Іващенка, 327')}`;

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
        if (localStorage.getItem(WORD_TOKEN)) {
            dispatch(auth()).then(res => {
                if (res === undefined) {
                    localStorage.removeItem(WORD_TOKEN);
                    document.location.reload();
                }
            })
        }
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
        <div className={'sv ct'}>
            <section className={'sv-hero'}>
                <img src={Banner} alt={''} aria-hidden={'true'} className={'sv-hero__img'}/>
                <div className={'sv-container'}>
                    <nav className={'sv-crumbs'} aria-label={'Навігація'}>
                        <Link to={THIS}>Головна</Link>
                        <span aria-hidden={'true'}>/</span>
                        <span>Контакти</span>
                    </nav>
                    <h1 className={'sv-hero__title'}>Контакти</h1>
                    <p className={'sv-hero__lead'}>Чекаємо на Вас.</p>
                </div>
            </section>

            <section className={'sv-section ct-info-section'}>
                <div className={'sv-container'}>
                    <ul className={'ct-info'}>
                        <li>
                            <a href={`tel:${PHONE}`} className={'ct-info__card'}>
                                <span className={'ct-info__icon'}><BsFillTelephoneFill aria-hidden={'true'}/></span>
                                <span className={'ct-info__body'}>
                                    <span className={'ct-info__label'}>Телефон</span>
                                    <span className={'ct-info__value'}>{PHONE}</span>
                                    <span className={'ct-info__hint'}>Зателефонувати <FaArrowRight aria-hidden={'true'}/></span>
                                </span>
                            </a>
                        </li>
                        <li>
                            <a href={`mailto:${EMAIL}`} className={'ct-info__card'}>
                                <span className={'ct-info__icon'}><MdAlternateEmail aria-hidden={'true'}/></span>
                                <span className={'ct-info__body'}>
                                    <span className={'ct-info__label'}>Пошта</span>
                                    <span className={'ct-info__value'}>{EMAIL}</span>
                                    <span className={'ct-info__hint'}>Написати листа <FaArrowRight aria-hidden={'true'}/></span>
                                </span>
                            </a>
                        </li>
                        <li>
                            <a href={MAP_LINK} target={'_blank'} rel={'noopener noreferrer'} className={'ct-info__card'}>
                                <span className={'ct-info__icon'}><FaLocationArrow aria-hidden={'true'}/></span>
                                <span className={'ct-info__body'}>
                                    <span className={'ct-info__label'}>Адреса</span>
                                    <span className={'ct-info__value'}>{ADDRESS}</span>
                                    <span className={'ct-info__hint'}>Прокласти маршрут <FaArrowRight aria-hidden={'true'}/></span>
                                </span>
                            </a>
                        </li>
                    </ul>
                </div>
            </section>

            <section className={'sv-section sv-section--white'}>
                <div className={'sv-container'}>
                    <header className={'sv-head'}>
                        <span className={'sv-eyebrow'}>Зворотний зв'язок</span>
                        <h2 className={'sv-title'}>Напишіть нам</h2>
                    </header>

                    <div className={'ct-grid'}>
                        <div className={'ct-form'}>
                            <div className={'ct-field'}>
                                <label htmlFor={'ct-name'}>Ім'я</label>
                                <input id={'ct-name'} value={name} onChange={e => setName(e.target.value)}
                                       type={'text'} placeholder={"Введіть ім'я"} autoComplete={'name'}/>
                            </div>

                            <div className={'ct-row'}>
                                <div className={'ct-field'}>
                                    <label htmlFor={'ct-email'}>Email</label>
                                    <input id={'ct-email'} value={email} onChange={e => emailHandler(e)}
                                           type={'email'} placeholder={'Введіть email'} name={'email'}
                                           onBlur={e => blurHandler(e)} autoComplete={'email'}
                                           aria-invalid={emailDirty && !!emailError}/>
                                    {(emailDirty && emailError) && <span className={'ct-error'}>{emailError}</span>}
                                </div>
                                <div className={'ct-field'}>
                                    <label htmlFor={'ct-phone'}>Телефон</label>
                                    <input id={'ct-phone'} value={phone} onChange={e => phoneHandler(e)}
                                           type={'number'} placeholder={'Введіть телефон'} name={'phone'}
                                           onBlur={e => blurHandler(e)} maxLength={10} autoComplete={'tel'}
                                           aria-invalid={phoneDirty && !!phoneError}/>
                                    {(phoneDirty && phoneError) && <span className={'ct-error'}>{phoneError}</span>}
                                </div>
                            </div>

                            <div className={'ct-field'}>
                                <label htmlFor={'ct-text'}>Повідомлення</label>
                                <textarea id={'ct-text'} rows="6" placeholder="Введіть текст"
                                          onChange={(event) => setText(event.target.value)}/>
                            </div>

                            <button type={'button'} disabled={formValid} className={'sv-btn ct-submit'}
                                    onClick={() => {
                                        sentEmail(name, email, phone, text);
                                    }}>
                                Відправити <FaArrowRight/>
                            </button>
                        </div>

                        <div className={'ct-map'}>
                            <iframe title={'map'}
                                    src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d8553.068030343416!2d30.628751791574437!3d50.406775786310156!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2sua!4v1672059328158!5m2!1sru!2sua"
                                    allowFullScreen="" loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"/>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
