import './Registration.css'
import {Input} from "../utils";
import {useState} from "react";
import {APIServise} from "../servises";
export default function Registration ()
{
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return(
        <div className={'registration'}>
            <div className="registration_header">Регистрация</div>
            <Input value={name} setValue={setName} type={'text'} placeholder={'Введите имя'}/>
            <Input value={email} setValue={setEmail} type={'text'} placeholder={'Введите email'}/>
            <Input value={password} setValue={setPassword} type={'password'} placeholder={'Введите пароль'}/>

            <button className={'registration_btn'} onClick={()=>APIServise.registration(name, email, password)}>Зарегестрироваться</button>
        </div>
    );
}
