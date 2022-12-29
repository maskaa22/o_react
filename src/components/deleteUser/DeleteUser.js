import './DeleteUser.css'
import {APIServise} from "../servises";
import {Input} from "../utils";
import {useState} from "react";

export function DeleteUser({handleClose}) {

    const [emailUser, setEmailUser] = useState('');

    return (
        <div className={'flex'}>
            <div className={'delete_user'}>
                <button className={'close_del'} onClick={handleClose}><i className="fa fa-times"
                                                                         aria-hidden="true"/></button>
                <h2 className={'h2'}>Видалення</h2>
                <div className={'newInput input-width'}>
                    <Input value={emailUser} setValue={setEmailUser} placeholder={'Емеіл користувача'}
                           className={'input-del-user'}/>
                </div>
                <div className={'btn-position'}>
                    <button className={'btn-add'} onClick={() => {
                        APIServise.deleteUser(emailUser)
                        window.location.reload();
                    }}>Видалити
                    </button>
                </div>
            </div>
        </div>
    );
}
