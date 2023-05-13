import * as React from "react";
import {useEffect, useState} from "react";

import './CreateProduct.css';
import './CreateProduct@media.css';
import {deleteProduct, getCategories, getProducts} from "../../servises";
import {ModalCreateCategory, ModalCreateProduct} from '../modal';
import {WORD_ADD, WORD_DEL} from "../../config/wordsConstants";
import {PaginationProductCategory} from "../pagination";

export function CreateProduct() {

    const [categories, setCategories] = useState([]);
    const [delProduct, setDelProduct] = useState(WORD_DEL);

    const [modalActiveProduct, setModalActiveProduct] = useState(false);
    const [modalActiveCategory, setModalActiveCategory] = useState(false);
    const [page, setPage] = useState([]);
    const [products, setProducts] = useState([]);
    const [paginate, setPaginate] = useState([]);

    useEffect(() => {
        getProducts(page, 10).then(respons => {
            setProducts(respons.data.docs);
            setPaginate(respons.data);
        });
    }, [page, products]);

    function thisPage(page) {
        setPage(page);
    }

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
                        getCategories().then(respons => {
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
            <div className={`div-btn`}>
                <div className={`${delProduct}`}>
                    <div className={'close'} onClick={() => setDelProduct(WORD_DEL)}><i className="fa fa-times"
                                                                                        aria-hidden="true"/></div>
                    <div className={'center-table'}>
                        <div className={'product-table'}>
                            <div className={'name-table-product sel-table'}>
                                <div className={'cell-table header-table first-record-name'}>Інвентарник</div>
                                <div className={'cell-table name-type header-product-name'}>Назва</div>
                                <div className={'cell-table header-table'}>Ціна</div>
                                <div className={'cell-table header-table'}>Видалення</div>
                            </div>
                            {
                                products.map(product =>
                                    <div className={'name-table-product row-table '} key={product.id}>
                                        <div className={'cell-table-product'}>{product.inventoryNumber}</div>
                                        <div className={'cell-table-product'}>{product.product_name}</div>
                                        <div className={'cell-table-product'}>{product.price}</div>
                                        <div className={'cell-table-product cell-table-last'}>
                                            <button className={'btn-ok'} onClick={() => {
                                                deleteProduct(product.inventoryNumber);
                                                setDelProduct(WORD_DEL);
                                            }}>OK
                                            </button>
                                        </div>
                                    </div>)
                            }
                            <PaginationProductCategory
                                paginate={paginate} thisPage={thisPage}/>
                        </div>
                    </div>

                    {/*<div className={'close'} onClick={() => setDelProduct(WORD_DEL)}><i className="fa fa-times"*/}
                    {/*                                                                    aria-hidden="true"/></div>*/}
                    {/*<h2>Видалення</h2>*/}
                    {/*<Input value={number} setValue={setNumber} placeholder={'Інвентарний номер'}*/}
                    {/*       className={'input-del'}/>*/}
                    {/*<div className={'btn-position'}>*/}
                    {/*    <button className={'btn-add margin-add-null'} onClick={() => {*/}
                    {/*        deleteProduct(number);*/}
                    {/*        setDelProduct(WORD_DEL);*/}
                    {/*    }}>Видалити*/}
                    {/*    </button>*/}
                    {/*</div>*/}

                </div>
            </div>

            <ModalCreateProduct active={modalActiveProduct} setActive={setModalActiveProduct}
                                categories={categories}/>
            <ModalCreateCategory active={modalActiveCategory} setActive={setModalActiveCategory}/>

        </div>
    );
}
