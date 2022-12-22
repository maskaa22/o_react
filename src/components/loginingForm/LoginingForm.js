import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

import './LoginingForm.css'
import {APIServise} from "../servises";
import {Input} from "../utils";
import {useDispatch} from "react-redux";

export function LoginingForm ({role, handleClose, login})
{
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [border, setBorder] = useState('');

    useEffect(() => {
        if(!role) {
            setBorder('border');
        }
    }, []);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const registration = 'Зареєструвати'
    const registring = 'Реєстрація';
    const logining = 'Авторизація'
    const log = 'Авторизуватися'


    return(
        <div>
            <div className={`flex`}>
                <div className={`form ${border}`}>
                    {
                        role && <button className={'close_del left'} onClick={handleClose}><i className="fa fa-times"
                                                                                              aria-hidden="true"/></button>
                    }
                    <div className="form_header">{login ? logining : registring}</div>
                    { !login &&
                    <Input value={name} setValue={setName} type={'text'} placeholder={"Введіть ім'я"} className={'input-margin'}/>}
                    <Input value={email} setValue={setEmail} type={'text'} placeholder={'Введіть email'} className={'input-margin'}/>
                    <Input value={password} setValue={setPassword} type={'password'} placeholder={'Введіть пароль'} className={'input-margin'}/>

                    <button className={'form_btn'} onClick={() => {
                        {
                            login ? dispatch(APIServise.login(email, password)).then(rez => {
                                if (rez) navigate("/")
                            }) : APIServise.registration(name, email, password, role).then(rez => {
                                if(!role){
                                    if (rez) navigate("/login")
                                } else window.location.reload();
                            })
                        }
                    }}>{login ? log : registration}

                    </button>
                </div></div>
        </div>
    );
}
