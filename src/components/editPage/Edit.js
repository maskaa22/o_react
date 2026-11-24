import Avatar from '@mui/material/Avatar';
import {FiCheck} from "react-icons/fi";
import * as React from "react";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";

// Старі стилі лишаються підключеними: їхні глобальні класи (.full-center, .input-center-full, .visible…)
// використовують і інші сторінки (кошик, вибір Нової пошти)
import './EditPage.css';
import './EditPage@media.css';
import './EditPageModern.css';
import {setFoto, getUserForToken, sentActiveEmail, editPage} from "../../servises";
import {AUTH_URL} from "../../config/URL";
import {NewPochta} from "../newPochta";
import {StyleForPassword, StyleIconOk} from '../../utils/function';
import {WORD_TOKEN, WORLD_ADMIN, WORLD_USER} from "../../config/wordsConstants";
import {RiSendPlaneFill} from "react-icons/ri";

const noop = () => {};

/*
 * Редагування профілю (кабінет клієнта й адміна). Стани, виклики API та ідентифікатори елементів
 * (pass-old, pass-new, icon, block_check — за ними працюють StyleForPassword і StyleIconOk)
 * ті самі, що й були; змінилась тільки розмітка (класи pf-*, стилі в EditPageModern.css).
 * Значення полів порожні, а поточні дані показані як підказки: порожнє поле означає "не змінювати".
 */
export function Edit({userForEdit}) {

    const currentUser = useSelector(state => state.user.currentUser);
    const role = useSelector(state => state.user.role);

    const [email, setEmail] = useState('');
    const [imgById, setImgById] = useState('');
    const [number, setNumber] = useState('');
    const [name, setName] = useState('');
    const [numberNP, setNumberNP] = useState('');
    const [numberToo, setNumberToo] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [sity, setSity] = useState('');
    const [surname, setSurname] = useState('');

    useEffect(() => {
        if (localStorage.getItem(WORD_TOKEN)) {
            getUserForToken().then(user => {
                // на випадок, якщо запит не вдався і user порожній
                if (user && user.user_id) {
                    setImgById(user.user_id.foto);
                }
            });
        }
    }, []);

    const handleClick = event => {
        setNumber(event.target.value);
    };

    // Береться значення прямо з полів (а не зі стану, який відстає на один символ), а смужку
    // надійності шукаємо в момент введення — при першому малюванні її ще немає в DOM
    function stylePassword() {
        const newPassword = document.getElementById('pass-old');
        const repeatPassword = document.getElementById('pass-new');
        const icon = document.getElementById('icon');

        setNumberToo(repeatPassword.value);

        StyleForPassword(newPassword.value, document.getElementById('block_check'));
        StyleIconOk(newPassword, repeatPassword, icon);
    }

    const addFoto = (e) => {
        const formData = new FormData();
        formData.append('_id', currentUser._id);
        formData.append('foto', e.target.files[0]);
        setFoto(formData)
            .then(user => setImgById(user.foto));
    };

    const save = () => {
        if (role === WORLD_ADMIN) {
            editPage(currentUser._id, name, surname, email, phone, oldPassword, number, numberToo);
        }
        if (role === WORLD_USER) {
            editPage(currentUser._id, name, surname, email, phone, oldPassword, number, numberToo,
                sity, numberNP);
        }
    };

    const initial = currentUser.name ? currentUser.name.charAt(0).toUpperCase() : '?';

    return (
        <div className={'pf'}>
            {/* ---------- Фото й підтвердження пошти ---------- */}
            <section className={'pf-card pf-card--photo'}>
                <Avatar alt={'user foto'} sx={{width: 112, height: 112}}
                        src={imgById ? AUTH_URL + '/' + imgById : undefined}
                        className={'pf-avatar'}>
                    {initial}
                </Avatar>
                <div className={'pf-photo__body'}>
                    <h2 className={'pf-title'}>Редагування інформації</h2>
                    <p className={'pf-lead'}>
                        Залиште поле порожнім, якщо його не треба змінювати: поточні дані показані в підказках.
                    </p>
                    <form onSubmit={e => e.preventDefault()}>
                        <label htmlFor={'file-upload'} className={'pf-upload'}>
                            <i className={'fa fa-cloud-upload'} aria-hidden={'true'}/> Завантажити фото
                        </label>
                        <input id={'file-upload'} type={'file'} name={'files'} className={'pf-file'}
                               onChange={addFoto}/>
                    </form>
                </div>
                {currentUser.is_active === false &&
                    <button type={'button'} className={'pf-warn'} onClick={() => {
                        sentActiveEmail(currentUser._id, currentUser.name, currentUser.email);
                    }}>
                        <RiSendPlaneFill aria-hidden={'true'}/>
                        <span>Пошту не підтверджено<small>Надіслати лист із підтвердженням</small></span>
                    </button>
                }
            </section>

            {/* ---------- Особисті дані ---------- */}
            <section className={'pf-card'}>
                <h2 className={'pf-card__title'}>Особисті дані</h2>
                <div className={'pf-fields'}>
                    <div className={'pf-field'}>
                        <label htmlFor={'pf-name'}>Ім'я</label>
                        <input id={'pf-name'} className={'pf-input'} type={'text'} value={name}
                               onChange={e => setName(e.target.value)} placeholder={currentUser.name}/>
                    </div>
                    <div className={'pf-field'}>
                        <label htmlFor={'pf-surname'}>Прізвище</label>
                        <input id={'pf-surname'} className={'pf-input'} type={'text'} value={surname}
                               onChange={e => setSurname(e.target.value)}
                               placeholder={currentUser.surname ? currentUser.surname : 'Введіть прізвище'}/>
                    </div>
                    <div className={'pf-field'}>
                        <label htmlFor={'pf-email'}>Email</label>
                        <input id={'pf-email'} className={'pf-input'} type={'email'} value={email}
                               onChange={e => setEmail(e.target.value)} placeholder={currentUser.email}/>
                    </div>
                    <div className={'pf-field'}>
                        <label htmlFor={'pf-phone'}>Телефон</label>
                        <input id={'pf-phone'} className={'pf-input'} type={'number'} value={phone}
                               onChange={e => setPhone(e.target.value)}
                               placeholder={currentUser.phone ? currentUser.phone : 'Введіть телефон'}/>
                    </div>
                </div>
            </section>

            {/* ---------- Пароль ---------- */}
            <section className={'pf-card'}>
                <h2 className={'pf-card__title'}>Зміна пароля</h2>
                <div className={'pf-fields pf-fields--stack'}>
                    <div className={'pf-field'}>
                        <label htmlFor={'pf-old-password'}>Старий пароль</label>
                        <input id={'pf-old-password'} className={'pf-input'} type={'password'} value={oldPassword}
                               onChange={e => setOldPassword(e.target.value)} placeholder={'Старий пароль'}
                               autoComplete={'current-password'}/>
                    </div>
                    <div className={'pf-field'}>
                        <label htmlFor={'pass-old'}>Новий пароль</label>
                        <input type={'password'} id={'pass-old'} className={'pf-input'}
                               placeholder={'Новий пароль'} name={'password'} value={number}
                               onChange={handleClick} onInput={stylePassword} autoComplete={'new-password'}/>
                        {/* смужка надійності: ширину й колір виставляє StyleForPassword через #block_check */}
                        <div className={'pf-strength'}>
                            <div id={'block_check'}/>
                        </div>
                    </div>
                    <div className={'pf-field'}>
                        <label htmlFor={'pass-new'}>Повторіть новий пароль</label>
                        <div className={'pf-repeat'}>
                            <input type={'password'} id={'pass-new'} className={'pf-input'}
                                   placeholder={'Повторити новий пароль'} name={'password'}
                                   onInput={stylePassword} autoComplete={'new-password'}/>
                            {/* галочка, коли паролі збігаються: видимість перемикає StyleIconOk */}
                            <FiCheck className={'pf-ok'} id={'icon'} style={{visibility: 'hidden'}}
                                     aria-label={'Паролі збігаються'}/>
                        </div>
                    </div>
                </div>
            </section>

            {/* ---------- Доставка (лише клієнт) ---------- */}
            {role === WORLD_USER &&
                <section className={'pf-card pf-card--wide'}>
                    <h2 className={'pf-card__title'}>Доставка Новою поштою</h2>
                    <div className={'pf-delivery'}>
                        <p className={'pf-address'}>
                            <span className={'pf-address__label'}>Поточна адреса</span>
                            <span className={'pf-address__value'}>
                                {currentUser.nameSity ?
                                    `м. ${currentUser.nameSity}, відділення № ${currentUser.nameDepartment}` :
                                    'не вказана'}
                            </span>
                        </p>

                        {/* Спочатку лише вибір міста; поле відділення з'являється, коли місто обране
                            (це робить сам NewPochta). setVisible* тут не потрібні, але NewPochta їх викликає. */}
                        <div className={'pf-delivery__select'}>
                            <NewPochta setSity={setSity} setNumberNP={setNumberNP}
                                       setVisibleSity={noop} setVisibleNumber={noop}/>
                        </div>

                        {sity &&
                            <p className={'pf-address pf-address--new'}>
                                <span className={'pf-address__label'}>Нова адреса</span>
                                <span className={'pf-address__value'}>
                                    м. {sity}{numberNP ? `, відділення № ${numberNP}` : ' — оберіть відділення'}
                                </span>
                            </p>
                        }
                    </div>
                </section>
            }

            <div className={'pf-actions'}>
                <button type={'button'} className={'pf-save'} onClick={save}>Змінити та зберегти</button>
            </div>
        </div>
    );
}
