import './ProductsPage.css'
import { APIServise } from "../servises";
import {useState} from "react";
import ProductCart from "../productCart/ProductCart";
import {useDispatch} from "react-redux";

export default function ProductCategory ({category})
{
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch()


    return(
        <div className={'padding'}>
            <div className={'category'}
            onClick={() => dispatch(APIServise.categoriesFilter(category._id))}>
                {category.category_name}
            </div>

        </div>
    );
}
