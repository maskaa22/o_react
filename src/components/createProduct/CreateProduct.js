import {useState} from "react";

import './CreateProduct.css';
import './CreateProduct@media.css';
import {APIServise} from "../servises";
import {Input} from "../utils";
import {ModalCreateCategory, ModalCreateProduct} from '../modal';
import {WORD_ADD, WORD_DEL} from "../../config/wordsConstants";

export function CreateProduct() {

    const [categories, setCategories] = useState([]);
    const [delProduct, setDelProduct] = useState(WORD_DEL);
    const [modalActiveProduct, setModalActiveProduct] = useState(false);
    const [modalActiveCategory, setModalActiveCategory] = useState(false);
    const [number, setNumber] = useState('');

    return (
        <div>
            <h2 className={'bd-product'}>Занесення в базу</h2>
            <div className={'div-btn first'}>
                <button className={'big-btn'} onClick={() => setModalActiveCategory(true)}>Додати категорію</button>
            </div>
            <div className={'div-btn'}>
                <button className={'big-btn'} onClick={
                    () => {
                        setModalActiveProduct(true);
                        APIServise.getCategories().then(respons => {
                            setCategories(respons.data);
                        });
                    }
                }>Додати продукт
                </button>
            </div>
            <div className={'div-btn'}>
                <button className={'big-btn'} onClick={
                    () => {
                        setDelProduct(WORD_ADD);
                    }}>Видалити продукт
                </button>
            </div>
            <div className={`div-btn `}>
                <div className={`${delProduct}`}>
                    <div className={'close'} onClick={() => setDelProduct(WORD_DEL)}><i className="fa fa-times"
                                                                                        aria-hidden="true"/></div>
                    <h2>Видалення</h2>
                    <Input value={number} setValue={setNumber} placeholder={'Інвентарний номер'}
                           className={'input-del'}/>
                    <div className={'btn-position'}>
                        <button className={'btn-add margin-add-null'} onClick={() => {
                            APIServise.deleteProduct(number);
                            setDelProduct(WORD_DEL);
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
