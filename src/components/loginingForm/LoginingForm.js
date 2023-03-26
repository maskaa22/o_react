import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";

import './LoginingForm.css';
import './LoginingForm@media.css';
import {APIServise} from "../servises";
import {Input} from "../utils";
import {LOGIN, LOGIN_RESET_PASSWORD, THIS} from "../../config/headerConstants";
import {StyleForPassword} from "../utils/function";
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

    const location = useLocation();
    const isLogin = location.pathname === LOGIN;

    useEffect(() => {
        if (!role) {
            setBorder(WORD_BORDER);
        }
    }, []);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const block_check = document.getElementById('block_check_login');

    function stylePassword() {
        StyleForPassword(password, block_check);
    }

    return (
        <div>
            <div className={`flex`}>
                <div className={`form ${border}`}>
                    {
                        role && <button className={'close_del left'} onClick={handleClose}><i className="fa fa-times"
                                                                                              aria-hidden="true"/>
                        </button>
                    }
                    <div className="form_header">{isLogin ? WORD_AUTORIZATING : WORD_REGISTR}</div>
                    {!isLogin &&
                    <Input value={name} setValue={setName} type={'text'} placeholder={"Введіть ім'я"}
                           className={'input-margin'}/>
                    }
                    <Input value={email} setValue={setEmail} type={'text'} placeholder={'Введіть email'}
                           className={'input-margin'}/>
                    <Input value={password} setValue={setPassword} type={'password'} placeholder={'Введіть пароль'}
                           className={'input-margin'} id="pass-old" onInput={stylePassword}/>
                    <div className={'input-center-full'} id="block_check_login">
                    </div>
                    {
                        !isLogin && <Input value={passwordToo} setValue={setPasswordToo} type={'password'}
                                           placeholder={'Повторіть пароль'}
                                           className={'input-margin'} id="pass-new" onInput={stylePassword}/>
                    }
                    <button className={'form_btn'} onClick={() => {
                        {
                            isLogin ? dispatch(APIServise.login(email, password)).then(rez => {
                                if (rez) {
                                    navigate(THIS);
                                }
                            }) : APIServise.registration(name, email, password, role, passwordToo, '').then(rez => {
                                if (!role) {
                                    if (rez) navigate(LOGIN);
                                } else window.location.reload();
                            })
                        }
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
