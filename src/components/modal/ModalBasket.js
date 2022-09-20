import {useState} from "react";

import './Modal.css'
import {APIServise} from "../servises";
import {Input} from "../utils";
import {useSelector} from "react-redux";
import {BasketPage} from "../basket";

export function ModalBasket ()
{
    const active = useSelector(state => state.user.activeModalBasket);
    return(
        <div className={active ? 'modal active': 'modal'} onClick={()=> console.log('111')
            //setActive(false)
        }>
            <div className={active ? 'modal-content active': 'modal-content'} onClick={e=>e.stopPropagation()}>
                <div className={'close'} onClick={()=> console.log('111')
                    //setActive(false)
                }><i className="fa fa-times" aria-hidden="true"/></div>

                <BasketPage/>

            </div>
        </div>
    );
}

