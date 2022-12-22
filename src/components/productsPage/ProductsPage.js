import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import './ProductsPage.css';
import {APIServise} from "../servises";
import {PaginationProductCategory} from "../pagination";
import {ProductCart} from "../productCart";
import ProductCategory from "./ProductCategory";
import {
    closeToogleMenu,
    handleClick,
    HomeFunction,
    closeFilterName,
    openToogleMenu,
    scrollTopTop,
    Up
} from "../utils/function";
import {BsArrowUpCircle} from "react-icons/bs";
import {MdClose} from "react-icons/md";
import {delFilter} from "../reducers/actionCreators";

export function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [categoriName, setCategoriName] = useState([]);
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
        APIServise.getProducts(page, 10).then(respons => {
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
    // const buttons = document.querySelectorAll('.category');

// Add a click listener to the container
    if (container) {
        container.addEventListener('click', handleClick, false);
    }

    // function handleClick(e) {
    //     const {target} = e;
    //
    //     // If a button has been clicked
    //     if (target.classList.contains('category')) {
    //
    //         // Clear any active buttons
    //         buttons.forEach(button => button.classList.remove('active-menu'));
    //         target.classList.add('active-menu');
    //     }
    // }

    HomeFunction();
    Up();



    return (
        <div>
            <div className={'upward'} onClick={scrollTopTop}><BsArrowUpCircle className="icon-up"/></div>
            <div className={'product-flex'}>
                <div className={'category-menu'} id={'category-menu'} onClick={() => openToogleMenu('category-menu', 'product-menu-block', 'active-menu-category', 'no-scroll')}>
                    <span className={'category-menu-bar'}/>
                    <span className={'category-menu-bar'}/>
                    <span className={'category-menu-bar'}/>
                </div>
                <div className={'product-menu'} id={'product-menu-block'}>
                    <div className={'product-menu-container'} >
                        <div className={'menu-title'}>
                            <div className={'left-title'}>Категорії товарів</div>
                            <div className={'right-title'} onClick={() => closeToogleMenu('category-menu', 'product-menu-block', 'active-menu-category', 'no-scroll') }><MdClose /></div>
                        </div>
                        <hr className={'hr'}/>
                        <div className={'padding'}><button className={`category active-menu`} onClick={() =>
                        {
                            dispatch(delFilter());
                             closeFilterName();
                            closeToogleMenu('category-menu', 'product-menu-block', 'active-menu-category', 'no-scroll');
                        }}>Усі</button></div>
                        {
                            categories.map(category => <ProductCategory key={category._id}
                                                                        category={category}
                                                                        setProductFilter={setProductFilter}
                                                                        setFilter={setFilter}
                                                                        page={pageFilter}
                                                                        setCategory_id={setCategory_id}
                                                                        offset={offset}
                                                                        setOffset={setOffset}
                                                                        setCategoriName={setCategoriName}


                            />)
                        }
                    </div>
                </div>
                <div className={'row'}>
                    <div className={'row-container'}>
                        <div className={'filter-name'}><div>{categoriName}</div></div>
                        {!filterFlag &&
                        products.map(product => <ProductCart key={product._id} product={product}/>)
                        }
                        {filterFlag &&
                        filter.map(product => <ProductCart key={product._id} product={product}/>)
                        }
                    </div>
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
