import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import './ProductsPage.css';
import {APIServise} from "../servises";
import {PaginationProductCategory} from "../pagination";
import {ProductCart} from "../productCart";
import ProductCategory from "./ProductCategory";

export function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [paginate, setPaginate] = useState([]);
    const [page, setPage] = useState([]);
    const [pageFilter, setPageFilter] = useState([]);
    const [productFilter, setProductFilter] = useState([]);
    const [filter, setFilter] = useState([]);
    const [category_id, setCategory_id] = useState([]);
    const [offset, setOffset] = useState(0);


    const filterFlag = useSelector(state => state.product.filterFlag);


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(APIServise.auth());


        // APIServise.getProducts(page, 5).then(respons => {
        //     setProducts(respons.data.docs);
        //     setPaginate(respons.data)
        // });
        APIServise.getCategories().then(respons => {
            // console.log(respons.data);
            setCategories(respons.data)
        });
    }, [])

    useEffect(() => {
        APIServise.getProducts(page, 8).then(respons => {
            setProducts(respons.data.docs);
            setPaginate(respons.data)
            // console.log(respons.data);
        });

    }, [page])

    function thisPage(page) {
        setPage(page);
    }

    function thisPageFilter(page) {
        setPageFilter(page);
    }


// Get the container and the buttons
    const container = document.querySelector('.product-menu');
    const buttons = document.querySelectorAll('.category');

// Add a click listener to the container
    if (container) {
        container.addEventListener('click', handleClick, false);
    }

    function handleClick(e) {
        const {target} = e;

        // If a button has been clicked
        if (target.classList.contains('category')) {

            // Clear any active buttons
            buttons.forEach(button => button.classList.remove('active-menu'));
            target.classList.add('active-menu');
        }
    }

    return (
        <div>
            <div className={'product-flex'}>
                <div className={'product-menu'}>
                    {
                        categories.map(category => <ProductCategory key={category._id}
                                                                    category={category}
                                                                    setProductFilter={setProductFilter}
                                                                    setFilter={setFilter}
                                                                    page={pageFilter}
                                                                    setCategory_id={setCategory_id}
                                                                    offset={offset}
                                                                    setOffset={setOffset}


                        />)
                    }
                </div>
                <div className={'row'}>
                    {!filterFlag &&
                    products.map(product => <ProductCart key={product._id} product={product}/>)
                    }
                    {filterFlag &&
                    filter.map(product => <ProductCart key={product._id} product={product}/>)
                    }
                </div>
            </div>
            <div className={'product-flex'}>
                <div className={'product-menu'}/>
                <div className={'row'}>
                    {!filterFlag &&
                    <PaginationProductCategory
                        paginate={paginate} thisPage={thisPage}
                        category_id={category_id} setFilter={setFilter}/>
                    }
                    {filterFlag &&
                    <PaginationProductCategory
                        paginate={productFilter} thisPage={thisPageFilter}
                        category_id={category_id} setFilter={setFilter}/>
                    }
                </div>
            </div>
        </div>
    );
}
