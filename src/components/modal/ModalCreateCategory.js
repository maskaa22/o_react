import {useState} from "react";

import './Modal.css';
import {APIServise} from "../servises";
import {Input} from "../utils";

export function ModalCreateCategory({active, setActive}) {

    const [nameCategory, setNameCategory] = useState('');

    return (
        <div className={active ? 'modal active' : 'modal'} onClick={() => setActive(false)}>
            <div className={active ? 'modal-content active' : 'modal-content'} onClick={e => e.stopPropagation()}>
                <div className={'close'} onClick={() => setActive(false)}><i className="fa fa-times"
                                                                             aria-hidden="true"/></div>
                <h2>Категорія</h2>
                <Input value={nameCategory} setValue={setNameCategory} placeholder={'Назва категорії'}
                       className={'input-del-user'}/>
                <div className={'btn-position'}>
                    <button className={'btn-add'} onClick={() => {
                        APIServise.createCategory(nameCategory);
                    }}>Створити
                    </button>
                </div>
            </div>
        </div>
    );
}
