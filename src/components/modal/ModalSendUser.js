import './Modal.css'
import {APIServise} from "../servises";
import {useState} from "react";
import {SwalFunction} from "../utils/function";
import {Input} from "../utils";

export function ModalSendUser ({handleClose, userEmail})
{
    const [text, setText] = useState('');
    const [topic, setTopic] = useState('');

    return(
        <div className={'flex'}>
            <div className={'delete_user'}>
                <button className={'close_del'} onClick={handleClose}><i className="fa fa-times"
                                                                         aria-hidden="true"/></button>
                <h2 className={'h2'}>Написати</h2>
                <div className={'flex_start'}><div className={'margin_right_small'}>Отримувач:</div> <span>{userEmail}</span></div>
                <div className={'auto margin_right'}><Input value={topic} setValue={setTopic} placeholder={'Введіть тему'}/></div>
                <div className={'auto flex'}>
                    <textarea cols="35" rows="7" placeholder={'Ввести текст'} onChange={(event) => setText(event.target.value)}/>
                </div>
                <div className={'btn-position'}>
                    <button className={'btn-add'} onClick={() => {
                        APIServise.sentUser(text, userEmail, topic).then(()=> {
                            handleClose();
                            SwalFunction('Лист відправлено', '', 'success', 'Ok', false, 3500)

                        })

                    }}>Відправити
                    </button>
                </div>
            </div>
        </div>
    );
}
