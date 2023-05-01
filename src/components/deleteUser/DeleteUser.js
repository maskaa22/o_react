import {useState} from "react";

import './DeleteUser.css';
import './DeleteUser@media.css';
import {deleteUser} from "../servises";
import {Input} from "../utils";

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
                        deleteUser(emailUser);
                        window.location.reload();
                    }}>Видалити
                    </button>
                </div>
            </div>
        </div>
    );
}
