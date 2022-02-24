import {useDispatch} from "react-redux";

import './ProductsPage.css';
import { APIServise } from "../servises";
import {useEffect, useState} from "react";

export default function ProductCategory ({category, setProductFilter, setFilter, page, setCategory_id})
{

    const dispatch = useDispatch();

    return(
        <div className={'padding'}>
            <div className={'category'}
            onClick={() => {
                dispatch(APIServise.categoriesFilter(category._id, page, 2)).then(response =>
                {
                    console.log(response.data);
                    setCategory_id(category._id)
                    setProductFilter(response.data);
                    setFilter(response.data.docs)
                })
            }
            }>
                {category.category_name}
            </div>
        </div>
    );
}
