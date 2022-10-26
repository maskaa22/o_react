import {useState} from "react";

import './CreateProduct.css';
import {APIServise} from "../servises";
import {ModalCreateProduct, ModalCreateCategory} from '../modal';
import {Input} from "../utils";

export function CreateProduct() {

    const [modalActiveProduct, setModalActiveProduct] = useState(false);
    const [modalActiveCategory, setModalActiveCategory] = useState(false);
    const [delProduct, setDelProduct] = useState('del');
    const [number, setNumber] = useState('');
    const [categories, setCategories] = useState([]);

    return (
        <div>
            <div className={'div-btn first'}>
                <button className={'big-btn'} onClick={() => setModalActiveCategory(true)}>Додати категорію</button>
            </div>
            <div className={'div-btn'}>
                <button className={'big-btn'} onClick={
                    () => {
                        setModalActiveProduct(true);
                        APIServise.getCategories().then(respons => {
                            setCategories(respons.data)
                        });
                    }
                }>Додати продукт
                </button>
            </div>
            <div className={'div-btn'}>
                <button className={'big-btn'} onClick={
                    () => {
                        setDelProduct('add')
                    }}>Видалити продукт
                </button>
            </div>
            <div className={`div-btn `}>
                <div className={`${delProduct}`}>
                    <div className={'close'} onClick={() => setDelProduct('del')}><i className="fa fa-times"
                                                                                     aria-hidden="true"/></div>
                    <h2>Видалення</h2>
                    <div className={'newInput'}>
                        <Input value={number} setValue={setNumber} placeholder={'Інвентарний номер'}/>
                    </div>
                    <div className={'btn-position'}>
                        <button className={'btn-add'} onClick={() => {
                            APIServise.deleteProduct(number);
                            setDelProduct('del')
                        }}>Видалити
                        </button>
                    </div>
                </div>
            </div>

            <ModalCreateProduct active={modalActiveProduct} setActive={setModalActiveProduct} categories={categories}/>

            <ModalCreateCategory active={modalActiveCategory} setActive={setModalActiveCategory}/>


        </div>
    );
}
