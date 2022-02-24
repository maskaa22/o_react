import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import './ProductsPage.css';
import {APIServise} from "../servises";
import {ProductCart} from "../productCart";
import ProductCategory from "./ProductCategory";
import {Pagination} from "../pagination";

export function ProductsPage ()
{
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [paginate, setPaginate] = useState([]);
    const [page, setPage] = useState([]);
    const [productFilter, setProductFilter] = useState([]);
    const [filter, setFilter] = useState([]);
    const [category_id, setCategory_id] = useState([]);


    const filterFlag = useSelector(state => state.product.filterFlag);



     const dispatch = useDispatch();

    useEffect(() => {
        dispatch(APIServise.auth());
        APIServise.getProducts(1, 3).then(respons => {
            setProducts(respons.data.docs);
            setPaginate(respons.data)
        });
        APIServise.getCategories().then(respons => {
            // console.log(respons.data);
            setCategories(respons.data)
        });
    }, [])

    useEffect(() => {
        APIServise.getProducts(page, 5).then(respons => {
            setProducts(respons.data.docs);
            setPaginate(respons.data)
            // console.log(respons.data);
        });

    }, [page])

    function thisPage(page) {
         setPage(page);
    }
      // console.log(category_id);

    return(
        <div>
            <div className={'product-flex'}>
                <div className={'product-menu'}>
                    {
                        categories.map(category => <ProductCategory key={category._id}
                                                                    category={category}
                                                                    setProductFilter={setProductFilter}
                                                                    setFilter={setFilter}
                                                                    page={page}
                                                                    setCategory_id={setCategory_id}
                        />)
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
            </div>
            <div className={'product-flex'}>
                <div className={'product-menu'}/>
                <div className={'row'}>
                    {!filterFlag &&
                    <Pagination paginate={paginate} thisPage={thisPage} category_id={category_id} setFilter={setFilter}/>
                    }
                    {filterFlag &&
                    <Pagination paginate={productFilter} thisPage={thisPage} category_id={category_id} setFilter={setFilter}/>
                    }
                </div>
            </div>
        </div>
    );
}
