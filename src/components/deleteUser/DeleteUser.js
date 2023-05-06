import {useState} from "react";

import './DeleteUser.css';
import './DeleteUser@media.css';
import {deleteUser} from "../../servises";
import {Input} from "../../utils";
import {SwalFunction} from "../../utils/function";
import {WORD_DEL_USER, WORD_SWAL_OK, WORD_SWAL_SUCCESS} from "../../config/wordsConstants";

export function DeleteUser({handleClose, setDelUser}) {

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
                        deleteUser(emailUser).then(req => {
                            if (req === undefined) {
                                setDelUser(true);
                                handleClose();
                                SwalFunction(WORD_DEL_USER, '', WORD_SWAL_SUCCESS, WORD_SWAL_OK, false, 1500);
                            }
                        });
                    }}>Видалити
                    </button>
                </div>
            </div>
        </div>
    );
}
