import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

import './Autorization.css'
import {APIServise} from "../servises";
import {Input} from "../utils";
import {THIS} from "../../config/headerConstants";

export function Autorization() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const navigate = useNavigate();

    return (
        <div className={'flex'}>
            <div className={'autorization'}>
                <div className="autorization_header">Авторизация</div>
                <Input value={email} setValue={setEmail} type={'text'} placeholder={'Введите email'}/>
                <Input value={password} setValue={setPassword} type={'password'} placeholder={'Введите пароль'}/>
                <button className={'registration_btn'} onClick={() => {
                    dispatch(APIServise.login(email, password)).then(rez => {
                        if (rez) navigate(THIS)
                    });
                }}>Ввойти
                </button>
            </div>
        </div>
    );
}
