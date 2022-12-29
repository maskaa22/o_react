import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {BsArrowUpCircle} from "react-icons/bs";
import {MdClose, MdNavigateNext} from "react-icons/md"

import './ProductsPage.css';
import './ProductPage@media.css';
import {APIServise} from "../servises";
import {
    closeFilterName,
    closeToogleMenu,
    handleClick,
    HomeFunction,
    openToogleMenu,
    scrollTopTop,
    Up
} from "../utils/function";
import {delFilter} from "../reducers/actionCreators";
import {PaginationProductCategory} from "../pagination";
import {ProductCart} from "../productCart";
import ProductCategory from "./ProductCategory";
import {
    WORD_ACTIVE_MENU_CATEGORY,
    WORD_CATEGORY_MENU,
    WORD_NO_SCROLL,
    WORD_PRODUCT_MENU_BLOCK
} from "../../config/wordsConstants";

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
        APIServise.getCategories().then(respons => {
            setCategories(respons.data)
        });
    }, []);

    useEffect(() => {
        APIServise.getProducts(page, 10).then(respons => {
            setProducts(respons.data.docs);
            setPaginate(respons.data);
        });
    }, [page]);

    function thisPage(page) {
        setPage(page);
    }

    function thisPageFilter(page) {
        setPageFilter(page);
    }

    const container = document.querySelector('.product-menu');

    if (container) {
        container.addEventListener('click', handleClick, false);
    }

    HomeFunction();
    Up();

    return (
        <div>
            <div className={'upward'} onClick={scrollTopTop}><BsArrowUpCircle className="icon-up"/></div>
            <div className={'product-flex'}>
                <div className={'category-menu'} id={'category-menu'}
                     onClick={() => openToogleMenu(WORD_CATEGORY_MENU, WORD_PRODUCT_MENU_BLOCK, WORD_ACTIVE_MENU_CATEGORY, WORD_NO_SCROLL)}>
                    <span className={'category-menu-bar'}/>
                    <span className={'category-menu-bar'}/>
                    <span className={'category-menu-bar'}/>
                </div>
                <div className={'product-menu'} id={'product-menu-block'}>
                    <div className={'product-menu-container'}>
                        <div className={'menu-title'}>
                            <div className={'left-title'}>Категорії товарів</div>
                            <div className={'right-title'}
                                 onClick={() => closeToogleMenu(WORD_CATEGORY_MENU, WORD_PRODUCT_MENU_BLOCK, WORD_ACTIVE_MENU_CATEGORY, WORD_NO_SCROLL)}>
                                <MdClose/></div>
                        </div>
                        <hr className={'hr'}/>
                        <div className={'padding'}>
                            <button className={`category active-menu`} onClick={() => {
                                dispatch(delFilter());
                                closeFilterName();
                                closeToogleMenu(WORD_CATEGORY_MENU, WORD_PRODUCT_MENU_BLOCK, WORD_ACTIVE_MENU_CATEGORY, WORD_NO_SCROLL);
                            }}>Усі<MdNavigateNext className={'non-icon'}/></button>
                        </div>
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
                        <div className={'filter-name'}>
                            <div>{categoriName}</div>
                        </div>
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
