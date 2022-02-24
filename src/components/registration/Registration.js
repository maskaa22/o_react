import { useNavigate } from "react-router-dom";
import {useState} from "react";

import './Registration.css';
import {APIServise} from "../servises";
import {Input} from "../utils";

export function Registration ()
{
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    return(
        <div className={'registration'}>
            <div className="registration_header">Регистрация</div>
            <Input value={name} setValue={setName} type={'text'} placeholder={'Введите имя'}/>
            <Input value={email} setValue={setEmail} type={'text'} placeholder={'Введите email'}/>
            <Input value={password} setValue={setPassword} type={'password'} placeholder={'Введите пароль'}/>

            <button className={'registration_btn'} onClick={()=>
            {
                APIServise.registration(name, email, password);
                // const autorization = localStorage.getItem('registration');
                // console.log(autorization);
                // if(autorization!=null)
                    navigate("/login");
            }}>Зарегестрироваться</button>
        </div>
    );
}
