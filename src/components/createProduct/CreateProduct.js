import ModalCreateProduct from '../modal/ModalCreateProduct'
import ModalCreateCategory from "../modal/ModalCreateCategory";
import {useState} from "react";
import './CreateProduct.css'
import {APIServise} from "../servises";

export function CreateProduct ()
{

     const [modalActiveProduct, setModalActiveProduct] = useState(false);
     const [modalActiveCategory, setModalActiveCategory] = useState(false);
     const [categories, setCategories] = useState([]);

    return(
        <div>
            <div className={'div-btn first'}>
                <button  className={'big-btn'} onClick={()=>setModalActiveCategory(true)}>Добавить категорию</button>
            </div>
            <div className={'div-btn'}>
                <button className={'big-btn'} onClick={
                    ()=>{
                        setModalActiveProduct(true)
                        APIServise.getCategories().then(respons => { setCategories(respons.data) })
                    }
                }>Добавить продукт</button>
            </div>
            <div className={'div-btn'}>
                <button className={'big-btn'} >Удалить продукт</button>
            </div>

            <ModalCreateProduct active={modalActiveProduct} setActive={setModalActiveProduct} categories={categories}/>

            <ModalCreateCategory active={modalActiveCategory} setActive={setModalActiveCategory}/>

        </div>
    );
}
