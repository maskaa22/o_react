import {useState} from "react";

import './Modal.css';
import './Modal@media.css';
import {APIServise} from "../servises";
import {Input} from "../utils";
import {SwalFunction} from "../utils/function";
import {WORD_SWAL_LATER_SEND, WORD_SWAL_OK, WORD_SWAL_SUCCESS} from "../../config/wordsConstants";

export function ModalSendUser({handleClose, userEmail}) {

    const [text, setText] = useState('');
    const [topic, setTopic] = useState('');

    return (
        <div className={'flex'}>
            <div className={'delete_user'}>
                <button className={'close_del'} onClick={handleClose}><i className="fa fa-times"
                                                                         aria-hidden="true"/></button>
                <h2 className={'h2'}>Написати</h2>
                <div className={'flex_start'}>
                    <div className={'margin_right_small'}>Отримувач:</div>
                    <span>{userEmail}</span></div>
                <div className={'auto margin_all_send'}>
                    <Input value={topic} setValue={setTopic} placeholder={'Введіть тему'}
                           className={'input-send-email'}/></div>
                <div className={'auto flex'}>
                    <textarea cols="35" rows="7" placeholder={'Ввести текст'}
                              onChange={(event) => setText(event.target.value)}/>
                </div>
                <div className={'btn-position'}>
                    <button className={'btn-add'} onClick={() => {
                        APIServise.sentUser(text, userEmail, topic).then(() => {
                            handleClose();
                            SwalFunction(WORD_SWAL_LATER_SEND, '', WORD_SWAL_SUCCESS, WORD_SWAL_OK, false, 3500);
                        });
                    }}>Відправити
                    </button>
                </div>
            </div>
        </div>
    );
}
