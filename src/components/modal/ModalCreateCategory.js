import {useState} from "react";

import './Modal.css'
import {APIServise} from "../servises";
import {Input} from "../utils";

export function ModalCreateCategory ({active, setActive})
{
    const [nameCategory, setNameCategory] = useState('');

    return(
        <div className={active ? 'modal active': 'modal'} onClick={()=> setActive(false)}>
            <div className={active ? 'modal-content active': 'modal-content'} onClick={e=>e.stopPropagation()}>
                <div className={'close'} onClick={()=> setActive(false)}><i className="fa fa-times" aria-hidden="true"/></div>
                <h2>Категория</h2>
                <div className={'newInput'}>
                    <Input value={nameCategory} setValue={setNameCategory} placeholder={'Название категории'}/>
                </div>
                <div className={'btn-position'}>
                    <button className={'btn-add'} onClick={() => {APIServise.createCategory(nameCategory)}}>Создать</button>
                </div>
            </div>
        </div>
    );
}

