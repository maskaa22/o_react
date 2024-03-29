import * as React from 'react';
import {useEffect, useState} from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import './Modal.css';
import {Input} from "../../utils";
import {setProducts} from "../../servises";

export function ModalCreateProduct({active, setActive, categories}) {

    const [categoryProduct, setCategoryProduct] = useState('');
    const [countProduct, setCountProduct] = useState(1);
    const [file, setFile] = useState(null);

    const [inventoryNumber, setInventoryNumber] = useState('');
    const [nameProduct, setNameProduct] = useState('');
    const [ml, setMl] = useState('');
    const [priceProduct, setPriceProduct] = useState('');
    const [titleProduct, setTitleProduct] = useState('');

    useEffect(() => {
        setCountProduct(1);
    }, []);

    const handleChange = (event) => {
        setCategoryProduct(event.target.value);
    };

    const selectFile = e => {
        setFile(e.target.files[0]);
    };

    function addProduct(event){
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
         setProducts(formData);
    }

    return (
        <div className={active ? 'modal active' : 'modal'} onClick={() => setActive(false)}>
            <div className={active ? 'modal-content active' : 'modal-content'} onClick={e => e.stopPropagation()}>
                <div>
                    <div className={'close'} onClick={() => setActive(false)}><i className="fa fa-times"
                                                                                 aria-hidden="true"/></div>
                    <h2>Новий товар</h2>
                    <form id={'create-product'} >
                        <div className={'select-product'}>
                            <FormControl variant="standard" fullWidth>
                                <InputLabel id="demo-simple-select-standard-label" className={'select_label'}>Виберіть
                                    категорію</InputLabel>
                                <Select
                                    className={'standard'}
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    value={categoryProduct}
                                    onChange={handleChange}
                                    label="Виберіть категорію"
                                    name="category_id"
                                >
                                    {
                                        categories.map(category => <MenuItem key={category._id}
                                                                             value={category._id}>{category.category_name}</MenuItem>)
                                    }
                                </Select>
                            </FormControl>
                        </div>
                        <Input value={nameProduct} setValue={setNameProduct}
                               placeholder={'Назва товара'} name={'product_name'}
                               className={'input-create-product-margin input-create-product'}/>

                        <Input value={titleProduct} setValue={setTitleProduct}
                               placeholder={'Короткий опис товара'} name={'title'}
                               className={'input-create-product-margin input-create-product'}/>

                        <Input value={ml} setValue={setMl}
                               placeholder={'Дозування (мл)'} name={'dosage'}
                               className={'input-create-product-margin input-create-product'} type={'number'}/>
                        <Input value={priceProduct} setValue={setPriceProduct}
                               placeholder={'Ціна товара'} name={'price'}
                               className={'input-create-product-margin input-create-product'} type={'number'}/>


                        <Input value={inventoryNumber} setValue={setInventoryNumber}
                               placeholder={'Інвентарний номер'} name={'inventoryNumber'}
                               className={'input-create-product-margin input-create-product'} type={'number'}/>

                        <div className={'position'}>
                            <label htmlFor="file-upload" className="custom-file-upload">
                                <i className="fa fa-cloud-upload"/> Загрузити фото товара
                            </label>
                            <input id="file-upload" type="file" onChange={selectFile} name={'img'}/>

                        </div>
                        <div className={'btn-position'}>
                            <button className={'btn-add'} onClick={addProduct}>
                                <p>Додати товар</p>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
