import {useState} from "react";

import './LoginingForm.css';
import {Input} from "../../utils";
import {sendEmailForResetPassword} from "../../servises";

export function WritingEmailForm() {

    const [email, setEmail] = useState('');

    return (
        <div className={'flex'}>
            <div className={'form border'}>
                <div className="form_header">Введіть email</div>
                <Input value={email} setValue={setEmail} type={'email'} placeholder={"Введіть..."}
                       className={'input-margin'}/>
                <button className={'form_btn'} onClick={() => sendEmailForResetPassword(email)}>ОК</button>
            </div>
        </div>
    );
}
