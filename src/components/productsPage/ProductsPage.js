import {useEffect, useState} from "react";
import {APIServise} from "../servises";
import ProductCart from "../productCart/ProductCart";
import {useDispatch, useSelector} from "react-redux";
import './ProductsPage.css'
import {setProduct} from '../reducers/productReducer'
import ProductCategory from "./ProductCategory";

export default function ProductsPage ()
{
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    const filter = useSelector(state => state.product.filter)
    const filterFlag = useSelector(state => state.product.filterFlag)

    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(APIServise.auth())
        APIServise.getProducts().then(respons => { setProducts(respons.data) })
        APIServise.getCategories().then(respons => { setCategories(respons.data) })
    }, [])


    return(
        <div className={'product-flex'}>
            <div className={'product-menu'}>
                {
                    categories.map(category => <ProductCategory key={category._id} category={category}/>)
                }
            </div>
            <div className={'row'}>
                { !filterFlag &&
                    products.map(product => <ProductCart key={product._id} product={product}/>)
                }
                { filterFlag &&
                filter.map(product => <ProductCart key={product._id} product={product}/>)
                }
            </div>

            {/*<ProductCart product={products}/>*/}
        </div>
    );
}
