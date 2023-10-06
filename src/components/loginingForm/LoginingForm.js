import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";

import './LoginingForm.css';
import './LoginingForm@media.css';
import {registration, login} from "../../servises";
import {LOGIN, LOGIN_RESET_PASSWORD, THIS} from "../../config/headerConstants";
import {StyleForPassword} from "../../utils/function";
import {
    WORD_AUTORIZ,
    WORD_AUTORIZATING,
    WORD_BORDER,
    WORD_REGISTR,
    WORD_REGISTRATION
} from "../../config/wordsConstants";

export function LoginingForm({role, handleClose}) {

    const [border, setBorder] = useState('');
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

    const location = useLocation();
    console.log(location);
    const isLogin = location.pathname === LOGIN;

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

    useEffect(() => {
        if (!role) {
            setBorder(WORD_BORDER);
        }
    }, [role]);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const block_check = document.getElementById('block_check_login');

    function stylePassword() {
        StyleForPassword(password, block_check);
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

    return (
        <div>
            <div className={`flex`}>
                <div className={`form ${border}`}>
                    {
                        role && <button className={'close_del left'} onClick={handleClose}><i className="fa fa-times"
                        aria-hidden="true"/></button>
                    }
                    <div className="form_header">{isLogin ? WORD_AUTORIZATING : WORD_REGISTR}</div>

                    {!isLogin &&
                    <input value={name} onChange={e => nameHandler(e)} type={'text'} placeholder={"Введіть ім'я"}
                           className={'input-margin input-focus'} name={'name'} maxLength="10" minLength="3"
                           onBlur={e => blurHandler(e)}/>
                    }
                    {(!isLogin && nameDirty && nameError) && <div className={'error-input'}>{nameError}</div>}
                    <input value={email} onChange={e => emailHandler(e)} type={'email'} placeholder={'Введіть email'}
                           className={'input-margin input-focus'} name={'email'}
                            onBlur={e => blurHandler(e)}/>
                    {(emailDirty && emailError) && <div className={'error-input'}>{emailError}</div>}
                    {
                        isLogin ?
                            <input value={password} onChange={e => passwordHandler(e)} type={'password'}
                                   placeholder={'Введіть пароль'}
                                   className={'input-margin input-focus'} id="pass-old"
                                   onInput={stylePassword} name={'password'}/>
                             :
                        <input value={password} onChange={e => passwordHandler(e)} type={'password'}
                        placeholder={'Введіть пароль'}
                        className={'input-margin input-focus'} id="pass-old" onBlur={e => blurHandler(e)}
                        onInput={stylePassword} name={'password'} minLength="4"/>
                    }
                    <div className={'input-center-full'} id="block_check_login">
                    </div>
                    {(passwordDirty && passwordError) && <div className={'error-input'}>{passwordError}</div>}
                    {
                        !isLogin && <input value={passwordToo} onChange={e => passwordTooHandler(e)} type={'password'}
                                           placeholder={'Повторіть пароль'} name={'passwordToo'}
                                           onBlur={e => blurHandler(e)}
                                           className={'input-margin input-focus'} id="pass-new" onInput={stylePassword}
                                           minLength="4"/>
                    }
                    {(!isLogin && passwordTooDirty && passwordTooError) &&
                    <div className={'error-input'}>{passwordTooError}</div>}

                    <button disabled={formValid} className={'form_btn'} onClick={() => {
                            isLogin ? dispatch(login(email, password)).then(rez => {
                                if (rez) {
                                    //navigate(THIS);
                                }
                            }) : registration(name, email, password, role, passwordToo, '').then(rez => {
                                if (!role) {
                                    if (rez) navigate(LOGIN);
                                } 
                                //else window.location.reload();
                            })
                    }}>{isLogin ? WORD_AUTORIZ : WORD_REGISTRATION}
                    </button>
                    {
                        isLogin &&
                        <NavLink to={LOGIN_RESET_PASSWORD} className={'login-reset-password'}>Забули пароль?</NavLink>
                    }
                </div>
            </div>
        </div>
    );
}
