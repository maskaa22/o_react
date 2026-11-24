import * as React from 'react';
import {useEffect, useState} from 'react';
import {MdClose} from "react-icons/md";

import './Modal.css';
import './ModalModern.css';
import {CustomSelect} from "./CustomSelect";
import {setProducts} from "../../servises";

/*
 * Вікно створення товару. Поля й дані, що йдуть на сервер (FormData), ті самі, що й були.
 * Замість MUI-вибору категорії — власний випадаючий список (CustomSelect); після успішного додавання вікно закривається,
 * а форма очищується (раніше лишалась заповненою).
 */
export function ModalCreateProduct({active, setActive, categories}) {

    const [categoryProduct, setCategoryProduct] = useState('');
    const [countProduct, setCountProduct] = useState(1);
    const [file, setFile] = useState(null);

    const [inventoryNumber, setInventoryNumber] = useState('');
    const [nameProduct, setNameProduct] = useState('');
    const [ml, setMl] = useState('');
    const [priceProduct, setPriceProduct] = useState('');
    const [titleProduct, setTitleProduct] = useState('');
    // зміна key перемонтовує форму: так очищується й поле вибору файлу, яким React не керує
    const [formKey, setFormKey] = useState(0);

    useEffect(() => {
        setCountProduct(1);
    }, []);

    // Esc закриває вікно, поки воно відкрите
    useEffect(() => {
        if (!active) return undefined;

        const onKeyDown = (e) => {
            if (e.key === 'Escape') setActive(false);
        };

        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [active, setActive]);

    const selectFile = e => {
        setFile(e.target.files[0]);
    };

    function addProduct(event) {
        event.preventDefault();
        const formData = new FormData();
        formData.append('product_name', nameProduct);
        formData.append('title', titleProduct);
        formData.append('price', priceProduct);
        formData.append('category_id', categoryProduct);
        formData.append('totalPrice', priceProduct);
        formData.append('count', `${countProduct}`);
        formData.append('inventoryNumber', inventoryNumber);
        formData.append('dosage', ml);
        formData.append('img', file);

        setProducts(formData).then(res => {
            // при помилці setProducts повертає undefined — тоді лишаємо вікно й дані як є
            if (res !== undefined) {
                setCategoryProduct('');
                setFile(null);
                setInventoryNumber('');
                setNameProduct('');
                setMl('');
                setPriceProduct('');
                setTitleProduct('');
                setFormKey(key => key + 1);
                setActive(false);
            }
        });
    }

    return (
        <div className={`mm${active ? ' is-open' : ''}`} onClick={() => setActive(false)} aria-hidden={!active}>
            <div className={'mm-dialog mm-dialog--wide'} role={'dialog'} aria-modal={'true'}
                 aria-label={'Новий товар'} onClick={e => e.stopPropagation()}>
                <button type={'button'} className={'mm-close'} onClick={() => setActive(false)}
                        aria-label={'Закрити'}>
                    <MdClose/>
                </button>
                <h2 className={'mm-title'}>Новий товар</h2>

                <form id={'create-product'} className={'mm-form'} onSubmit={addProduct} key={formKey}>
                    <div className={'mm-field mm-field--full'}>
                        <label htmlFor={'mm-category'}>Категорія</label>
                        <CustomSelect id={'mm-category'} value={categoryProduct}
                                      onChange={setCategoryProduct} placeholder={'Виберіть категорію'}
                                      emptyText={'Категорій ще немає — спершу додайте категорію'}
                                      options={categories.map(category => ({
                                          value: category._id,
                                          label: category.category_name
                                      }))}/>
                    </div>

                    <div className={'mm-field mm-field--full'}>
                        <label htmlFor={'mm-name'}>Назва товару</label>
                        <input id={'mm-name'} className={'mm-input'} value={nameProduct} name={'product_name'}
                               onChange={e => setNameProduct(e.target.value)} placeholder={'Назва товару'}/>
                    </div>

                    <div className={'mm-field mm-field--full'}>
                        <label htmlFor={'mm-title'}>Короткий опис</label>
                        <input id={'mm-title'} className={'mm-input'} value={titleProduct} name={'title'}
                               onChange={e => setTitleProduct(e.target.value)} placeholder={'Короткий опис товару'}/>
                    </div>

                    <div className={'mm-field'}>
                        <label htmlFor={'mm-ml'}>Дозування (мл)</label>
                        <input id={'mm-ml'} className={'mm-input'} type={'number'} value={ml} name={'dosage'}
                               onChange={e => setMl(e.target.value)} placeholder={'Дозування (мл)'}/>
                    </div>

                    <div className={'mm-field'}>
                        <label htmlFor={'mm-price'}>Ціна, грн</label>
                        <input id={'mm-price'} className={'mm-input'} type={'number'} value={priceProduct}
                               name={'price'} onChange={e => setPriceProduct(e.target.value)}
                               placeholder={'Ціна товару'}/>
                    </div>

                    <div className={'mm-field'}>
                        <label htmlFor={'mm-inventory'}>Інвентарний номер</label>
                        <input id={'mm-inventory'} className={'mm-input'} type={'number'} value={inventoryNumber}
                               name={'inventoryNumber'} onChange={e => setInventoryNumber(e.target.value)}
                               placeholder={'Інвентарний номер'}/>
                    </div>

                    <div className={'mm-field'}>
                        <label htmlFor={'file-upload'}>Фото товару</label>
                        <label htmlFor={'file-upload'} className={'mm-upload'}>
                            <i className={'fa fa-cloud-upload'} aria-hidden={'true'}/>
                            <span>{file ? file.name : 'Завантажити фото'}</span>
                        </label>
                        <input id={'file-upload'} className={'mm-file'} type={'file'} onChange={selectFile}
                               name={'img'}/>
                    </div>

                    <button type={'submit'} className={'mm-submit'}>Додати товар</button>
                </form>
            </div>
        </div>
    );
}
