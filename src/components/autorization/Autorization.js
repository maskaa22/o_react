import './Autorization.css'
import Input from "../utils/input/Input";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {login} from "../servises/API";

export default function Autorization ()
{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch()

    return(
        <div className={'autorization'}>
            <div className="autorization_header">Авторизация</div>
            <Input value={email} setValue={setEmail} type={'text'} placeholder={'Введите email'}/>
            <Input value={password} setValue={setPassword} type={'password'} placeholder={'Введите пароль'}/>

            <button className={'registration_btn'} onClick={() => dispatch(login(email, password))}>Ввойти</button>
        </div>
    );
}
