import {Link, NavLink, useLocation, useNavigate} from "react-router-dom";
import {MdCheckCircle, MdClose, MdRadioButtonUnchecked} from "react-icons/md";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";

// Старі стилі лишаються підключеними: з них беруть сторінки скидання пароля та активації
import './LoginingForm.css';
import './LoginingForm@media.css';
import './LoginingFormModern.css';
import {registration, login} from "../../servises";
import {LOGIN, LOGIN_RESET_PASSWORD, REGISTRATION, THIS} from "../../config/headerConstants";
import {StyleForPassword} from "../../utils/function";
import {b_letters, digits, s_letters} from "../../config/functionConstants";
import ManPhoto from "../../images/gallery/2.webp";
import WomanPhoto from "../../images/gallery/6.webp";
import {
    WORD_AUTORIZ,
    WORD_AUTORIZATING,
    WORD_REGISTR,
    WORD_REGISTRATION
} from "../../config/wordsConstants";

/*
 * Сторінки /login і /registration. Той самий компонент показується й у модальному вікні адмінки
 * (тоді передані role та handleClose): без бокової панелі, з кнопкою закриття.
 */
export function LoginingForm({role, handleClose}) {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordToo, setPasswordToo] = useState('');
    const [emailDirty, setEmailDirty] = useState(false);
    const [nameDirty, setNameDirty] = useState(false);
    const [passwordDirty, setPasswordDirty] = useState(false);
    const [passwordTooDirty, setPasswordTooDirty] = useState(false);
    const [emailError, setEmailError] = useState('Емейл не може бути пустим');
    const [nameError, setNameError] = useState("Ім'я не може бути пусте");
    const [passwordError, setPasswordError] = useState('Пароль не може бути пустим');
    const [passwordTooError, setPasswordTooError] = useState('Пароль не може бути пустим');
    const [formValid, setFormValid] = useState(true);
    // яке з полів пароля зараз у фокусі ('pass' | 'passToo' | ''): від цього залежить показ спливашки з вимогами
    const [passFocus, setPassFocus] = useState('');

    const location = useLocation();
    const isLogin = location.pathname === LOGIN;
    const isModal = !!role;

    useEffect(() => {
        if(!isLogin) {
            if (nameError !== '' || emailError !== '' || passwordError !== '' || passwordTooError !== '') {
                setFormValid(true);
            } else {
                setFormValid(false);
            }
        } else {
                if (emailError !== '' || passwordError !== '') {
                    setFormValid(true);
                } else {
                    setFormValid(false);
                }
        }

    }, [emailError, nameError, passwordError, passwordTooError, isLogin]);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Смужку надійності шукаємо в момент введення, а не при малюванні форми: інакше при першому
    // введенні (напр. якщо почати з пароля або браузер сам його підставив) вона ще не знайдена,
    // StyleForPassword падає з помилкою, а в режимі розробки це показує червоне вікно помилки.
    // Береться значення з самого поля, щоб смужка не відставала на один символ.
    function stylePassword(e) {
        StyleForPassword(e.target.value, document.getElementById('block_check_login'));
    }

    const nameHandler = (e) => {
        setName(e.target.value);

        if (!e.target.value) {
            setNameError("Ім'я не може бути пусте");
        }
        if (e.target.value.length < 3 || e.target.value.length > 10) {
            setNameError("Ім'я повинно бути від 3 до 10 символів");
        } else {
            setNameError('');
        }

    }

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

    const passwordHandler = (e) => {
        setPassword(e.target.value);
        if ((e.target.value.length < 4) && !isLogin) {
            setPasswordError('Пароль повинен бути від 4 символів');
        } else {
            setPasswordError('');
        }
        if (!e.target.value) {
            setPasswordError('Пароль не може бути пустим');
        }
    }

    const passwordTooHandler = (e) => {
        setPasswordToo(e.target.value);
        if (e.target.value.length < 4) {
            setPasswordTooError('Пароль повинен бути від 4 символів');
        } else {
            setPasswordTooError('');
        }
        if (!e.target.value) {
            setPasswordTooError('Пароль не може бути пустим');
        }
    }

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'email':
                setEmailDirty(true);
                break;
            case 'name':
                setNameDirty(true);
                break;
            case 'password':
                setPasswordDirty(true);
                break;
            case 'passwordToo':
                setPasswordTooDirty(true);
                break;
            default: console.log('Помилка');
        }
    };

    // Та сама дія, що була в onClick кнопки; тепер її викликає ще й Enter у формі
    const submit = () => {
        isLogin ? dispatch(login(email, password))
            .then(rez => {
                if (rez) {
                    navigate(THIS);
                }
            })
            : registration(name, email, password, role, passwordToo, '').then(rez => {
                if (!role) {
                    if (rez) navigate(LOGIN);
                }
                else window.location.reload();
            })
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (!formValid) submit();
    };

    // Підказка з вимогами до пароля (лише при реєстрації). Обов'язкова вимога одна — мінімум 4 символи
    // (так перевіряють і форма, і сервер); решта — критерії смужки надійності. Букви — латинські,
    // бо саме їх рахує StyleForPassword.
    const hasChar = (set) => [...password].some(ch => set.includes(ch));
    const passwordRules = [
        {text: 'Мінімум 4 символи', required: true, ok: password.length >= 4},
        {text: 'Від 8 символів', ok: password.length >= 8},
        {text: 'Малі латинські літери (a–z)', ok: hasChar(s_letters)},
        {text: 'Великі латинські літери (A–Z)', ok: hasChar(b_letters)},
        {text: 'Цифри (0–9)', ok: hasChar(digits)},
        {text: 'Паролі збігаються', ok: password !== '' && password === passwordToo}
    ];

    // Спливашка з'являється, щойно в паролі є хоч один символ і фокус у одному з полів пароля.
    // Блок завжди змонтований і лише перемикає клас: коли фокус переходить з одного поля на інше,
    // blur і focus відбуваються в одному кадрі, тож без перемонтування спливашка не блимає.
    const hintsOpen = !isLogin && passFocus !== '' && password.length > 0;

    const Title = isModal ? 'div' : 'h1';

    const form = (
        <form className={'lf-card'} onSubmit={onSubmit} noValidate>
            {isModal &&
                <button type={'button'} className={'lf-close'} onClick={handleClose} aria-label={'Закрити'}>
                    <MdClose/>
                </button>
            }
            <Title className={'lf-title'}>{isLogin ? WORD_AUTORIZATING : WORD_REGISTR}</Title>

            {!isLogin &&
                <div className={'lf-field'}>
                    <label htmlFor={'lf-name'}>Ім'я</label>
                    <input id={'lf-name'} value={name} onChange={e => nameHandler(e)} type={'text'}
                           placeholder={"Введіть ім'я"} name={'name'} maxLength="10" minLength="3"
                           onBlur={e => blurHandler(e)} autoComplete={'name'}
                           aria-invalid={nameDirty && !!nameError}/>
                    {(nameDirty && nameError) && <span className={'lf-error'}>{nameError}</span>}
                </div>
            }

            <div className={'lf-field'}>
                <label htmlFor={'lf-email'}>Email</label>
                <input id={'lf-email'} value={email} onChange={e => emailHandler(e)} type={'email'}
                       placeholder={'Введіть email'} name={'email'} onBlur={e => blurHandler(e)}
                       autoComplete={'email'} aria-invalid={emailDirty && !!emailError}/>
                {(emailDirty && emailError) && <span className={'lf-error'}>{emailError}</span>}
            </div>

            <div className={'lf-field lf-field--pass'}>
                <label htmlFor={'pass-old'}>Пароль</label>
                {isLogin ?
                    <input value={password} onChange={e => passwordHandler(e)} type={'password'}
                           placeholder={'Введіть пароль'} id="pass-old" onInput={stylePassword}
                           name={'password'} onBlur={e => blurHandler(e)} autoComplete={'current-password'}
                           aria-invalid={passwordDirty && !!passwordError}/>
                    :
                    <input value={password} onChange={e => passwordHandler(e)} type={'password'}
                           placeholder={'Введіть пароль'} id="pass-old"
                           onFocus={() => setPassFocus('pass')}
                           onBlur={e => {
                               blurHandler(e);
                               setPassFocus('');
                           }}
                           onInput={stylePassword} name={'password'} minLength="4"
                           autoComplete={'new-password'} aria-invalid={passwordDirty && !!passwordError}
                           aria-describedby={'lf-pass-hints'}/>
                }
                {/* смужка надійності пароля: ширину й колір виставляє StyleForPassword через #block_check_login */}
                <div className={'lf-strength'}>
                    <div id="block_check_login"/>
                </div>
                {!isLogin &&
                    <div className={`lf-hints${hintsOpen ? ' is-open' : ''}`} id={'lf-pass-hints'} role={'status'}>
                        <div className={'lf-hints__title'}>Вимоги до пароля</div>
                        <ul aria-live={'polite'}>
                            {passwordRules.map(rule => (
                                <li key={rule.text} className={rule.ok ? 'is-ok' : ''}>
                                    {rule.ok ? <MdCheckCircle aria-hidden={'true'}/> :
                                        <MdRadioButtonUnchecked aria-hidden={'true'}/>}
                                    <span>{rule.text}</span>
                                    {rule.required && <em>обов'язково</em>}
                                </li>
                            ))}
                        </ul>
                    </div>
                }
                {(passwordDirty && passwordError) && <span className={'lf-error'}>{passwordError}</span>}
            </div>

            {!isLogin &&
                <div className={'lf-field'}>
                    <label htmlFor={'pass-new'}>Повторіть пароль</label>
                    <input value={passwordToo} onChange={e => passwordTooHandler(e)} type={'password'}
                           placeholder={'Повторіть пароль'} name={'passwordToo'}
                           onFocus={() => setPassFocus('passToo')}
                           onBlur={e => {
                               blurHandler(e);
                               setPassFocus('');
                           }}
                           id="pass-new" minLength="4" autoComplete={'new-password'}
                           aria-invalid={passwordTooDirty && !!passwordTooError}/>
                    {(passwordTooDirty && passwordTooError) &&
                        <span className={'lf-error'}>{passwordTooError}</span>}
                </div>
            }

            <button type={'submit'} disabled={formValid} className={'lf-submit'}>
                {isLogin ? WORD_AUTORIZ : WORD_REGISTRATION}
            </button>

            {isLogin &&
                <NavLink to={LOGIN_RESET_PASSWORD} className={'lf-forgot'}>Забули пароль?</NavLink>
            }

            {!isModal &&
                <p className={'lf-switch'}>
                    {isLogin ? 'Немає акаунта? ' : 'Вже є акаунт? '}
                    <Link to={isLogin ? REGISTRATION : LOGIN}>{isLogin ? 'Зареєструватися' : 'Увійти'}</Link>
                </p>
            }
        </form>
    );

    // У модальному вікні — лише картка
    if (isModal) {
        return <div className={'lf-modal'}>{form}</div>;
    }

    return (
        <div className={'lf-page'}>
            <aside className={'lf-brand'}>
                <img src={isLogin ? ManPhoto : WomanPhoto} alt={''} aria-hidden={'true'} className={'lf-brand__img'}/>
                <div className={'lf-brand__text'}>
                    <h2>{isLogin ? 'З поверненням' : 'Ласкаво просимо'}</h2>
                    <p>
                        {isLogin ?
                            'Увійдіть, щоб записуватись на стрижки онлайн та стежити за своїми замовленнями.' :
                            'Створіть акаунт — і записуйтесь у студію онлайн кількома кліками.'}
                    </p>
                </div>
            </aside>
            <main className={'lf-panel'}>
                {form}
            </main>
        </div>
    );
}
