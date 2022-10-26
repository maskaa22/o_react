import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import {useEffect, useState} from "react";

import './Modal.css'
import {APIServise} from "../servises";
import {Input} from "../utils";

export function ModalCreateProduct({active, setActive, categories}) {

    const [nameProduct, setNameProduct] = useState('');
    const [titleProduct, setTitleProduct] = useState('');
    const [categoryProduct, setCategoryProduct] = useState('');
    const [priceProduct, setPriceProduct] = useState('');
    const [countProduct, setCountProduct] = useState(1);
    const [inventoryNumber, setInventoryNumber] = useState('');


    useEffect(() => {
        //setCategoryProduct('6207f02096c37103ae61321b');
        setCountProduct(1);
    }, [])

    function getValue() {
        const select = document.getElementById("select_");
        const value = select.value;
        setCategoryProduct(value)
    }

    //const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setCategoryProduct(event.target.value);
        //console.log(event.target.value);
    };


    return (
        <div className={active ? 'modal active' : 'modal'} onClick={() => setActive(false)}>
            <div className={active ? 'modal-content active' : 'modal-content'} onClick={e => e.stopPropagation()}>
                {/*{children}*/}
                <div>
                    <div className={'close'} onClick={() => setActive(false)}><i className="fa fa-times"
                                                                                 aria-hidden="true"/></div>
                    <h2>Новий товар</h2>
                    <div className={'newInput'}><Input value={nameProduct} setValue={setNameProduct}
                                                       placeholder={'Назва товара'}/></div>
                    <div className={'newInput position_relative'}><Input value={titleProduct} setValue={setTitleProduct}
                                                                         placeholder={'Короткий опис товара'}/></div>

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
                            >
                                {
                                    categories.map(category => <MenuItem key={category._id}
                                                                         value={category._id}>{category.category_name}</MenuItem>)
                                }
                            </Select>
                        </FormControl>
                    </div>

                    <div className={'newInput'}><Input value={priceProduct} setValue={setPriceProduct}
                                                       placeholder={'Ціна товара'}/></div>

                    <div className={'newInput position_relative'}><Input value={inventoryNumber}
                                                                         setValue={setInventoryNumber}
                                                                         placeholder={'Інвентарний номер'}/></div>


                    <div className={'position'}>
                        <label htmlFor="file-upload" className="custom-file-upload">
                            <i className="fa fa-cloud-upload"/> Загрузити фото товара
                        </label>
                        <input id="file-upload" type="file"/>
                    </div>

                    <div className={'btn-position'}>
                        <button className={'btn-add'}
                                onClick={() => {
                                    APIServise.setProducts(nameProduct, titleProduct, priceProduct, categoryProduct,
                                        priceProduct, countProduct, inventoryNumber)
                                }}>
                            <p>Додати товар</p>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
