import './Modal.css'
import {Input} from "../utils";
import {APIServise} from "../servises";
import {useEffect, useState} from "react";
export function ModalCreateProduct ({active, setActive, categories})
{

    const [nameProduct, setNameProduct] = useState('');
    const [titleProduct, setTitleProduct] = useState('');
    const [categoryProduct, setCategoryProduct] = useState('');
    const [priceProduct, setPriceProduct] = useState('');


    useEffect(() => {
        setCategoryProduct('6207f02096c37103ae61321b')
    }, [])

    function getValue() {
        const select = document.getElementById("select_");
        const value = select.value;
        setCategoryProduct(value)
    }

    return(
        <div className={active ? 'modal active': 'modal'} onClick={()=> setActive(false)}>
            <div className={active ? 'modal-content active': 'modal-content'} onClick={e=>e.stopPropagation()}>
                {/*{children}*/}
                <div>
                    <div className={'close'} onClick={()=> setActive(false)}><i className="fa fa-times" aria-hidden="true"/></div>
                    <h2>Новый товар</h2>
                    <div className={'newInput'}><Input value={nameProduct} setValue={setNameProduct} placeholder={'Название товара'}/></div>
                    <div className={'newInput'}><Input value={titleProduct} setValue={setTitleProduct} placeholder={'Краткое описание товара'}/></div>
                    <div className={'position'}>

                        <select id="select_" onClick={getValue} >
                            {
                                categories.map(category => <option  value={category._id} key={category._id}>{category.category_name}</option>)
                            }
                        </select>
                    </div>
                    <div className={'newInput'}><Input value={priceProduct} setValue={setPriceProduct} placeholder={'Цена товара'}/></div>

                    <div className={'position'}>
                        <label htmlFor="file-upload" className="custom-file-upload">
                            <i className="fa fa-cloud-upload"/> Загрузить фото товара
                        </label>
                        <input id="file-upload" type="file"/>
                    </div>

                    <div className={'btn-position'}>
                        <button className={'btn-add'}
                                onClick={()=> {APIServise.setProducts(nameProduct, titleProduct, priceProduct, categoryProduct)}}>
                            <p>Добавить товар</p>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
