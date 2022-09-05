import { useState } from "react";

import './CreateProduct.css';
import { APIServise } from "../servises";
import {ModalCreateProduct, ModalCreateCategory, ModalDeleteProduct} from '../modal';
import {Input} from "../utils";
import {deleteProduct} from "../servises/API";

export function CreateProduct ()
{

     const [modalActiveProduct, setModalActiveProduct] = useState(false);
     const [modalActiveCategory, setModalActiveCategory] = useState(false);
     const [delProduct, setDelProduct] = useState('del');
     const [number, setNumber] = useState('');
     const [categories, setCategories] = useState([]);

    return(
        <div>
            <div className={'div-btn first'}>
                <button  className={'big-btn'} onClick={()=>setModalActiveCategory(true)}>Добавить категорию</button>
            </div>
            <div className={'div-btn'}>
                <button className={'big-btn'} onClick={
                    ()=>{
                        setModalActiveProduct(true);
                        APIServise.getCategories().then(respons => { setCategories(respons.data) });
                    }
                }>Добавить продукт</button>
            </div>
            <div className={'div-btn'}>
                <button className={'big-btn'} onClick={
                    ()=> {
                    setDelProduct('add')
                    }}>Удалить продукт</button>
            </div>
            <div className={`div-btn `}>
            <div className={`${delProduct}`}>
                <div className={'close'} onClick={()=> setDelProduct('del')}><i className="fa fa-times" aria-hidden="true"/></div>
                <h2>Удаление</h2>
                <div className={'newInput'}>
                    <Input value={number} setValue={setNumber} placeholder={'Инвентарный номер'}/>
                </div>
                <div className={'btn-position'}>
                    <button className={'btn-add'} onClick={() => {
                        APIServise.deleteProduct(number);
                        setDelProduct('del')
                    }}>Удалить</button>
                </div>
            </div>
            </div>

            <ModalCreateProduct active={modalActiveProduct} setActive={setModalActiveProduct} categories={categories}/>

            <ModalCreateCategory active={modalActiveCategory} setActive={setModalActiveCategory}/>


        </div>
    );
}
