import {useNavigate} from "react-router-dom";
import {useState} from "react";

import './Registration.css';
import {APIServise} from "../servises";
import {Input} from "../utils";
import {WORD_REGISTRATING, WORD_REGISTRATION} from "../../config/wordsConstants";
import {LOGIN} from "../../config/headerConstants";

export function Registration({role, handleClose}) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    return (
        <div className={'flex'}>
        <div className={'registration'}>
            {
                role && <button className={'close_del left'} onClick={handleClose}><i className="fa fa-times"
                                                          aria-hidden="true"/></button>
            }
            <div className="registration_header">Реєстрація</div>
            <Input value={name} setValue={setName} type={'text'} placeholder={"Введіть ім'я"}/>
            <Input value={email} setValue={setEmail} type={'text'} placeholder={'Введіть email'}/>
            <Input value={password} setValue={setPassword} type={'password'} placeholder={'Введіть пароль'}/>

            <button className={'registration_btn'} onClick={() => {
                APIServise.registration(name, email, password, role).then(rez => {
                    if (rez) navigate(LOGIN)
                })
            }}>{role ? WORD_REGISTRATION : WORD_REGISTRATING}

            </button>
        </div></div>
    );
}
