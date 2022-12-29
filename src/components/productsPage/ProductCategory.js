import {MdNavigateNext} from "react-icons/md";
import {useDispatch} from "react-redux";
import {useState} from "react";

import './ProductsPage.css';
import './ProductPage@media.css';
import {APIServise} from "../servises";
import {closeToogleMenu, openFilterName} from "../utils/function";
import {setCategory} from "../reducers/actionCreators";
import {
    WORD_ACTIVE_MENU_CATEGORY,
    WORD_CATEGORY_MENU,
    WORD_NO_SCROLL,
    WORD_PRODUCT_MENU_BLOCK
} from "../../config/wordsConstants";

export default function ProductCategory({
                                            category,
                                            setProductFilter,
                                            setFilter,
                                            page,
                                            setCategory_id,
                                            setOffset,
                                            setCategoriName
                                        }) {

    let [productCategoryCheck, setProductCategoryCheck] = useState(false);

    const dispatch = useDispatch();

    return (
        <div className={'padding'}>
            <button className={`category`} id={category._id}
                    onClick={() => {
                        setProductCategoryCheck(productCategoryCheck = !productCategoryCheck);
                        closeToogleMenu(WORD_CATEGORY_MENU, WORD_PRODUCT_MENU_BLOCK, WORD_ACTIVE_MENU_CATEGORY, WORD_NO_SCROLL);
                        dispatch(APIServise.categoriesFilter(category._id, page, 2)).then(response => {
                            setOffset(0);
                            if (response.data.total === 0 || response.data.page > response.data.pages) {
                                console.log('Картинка нет товаров на єтой странице');
                            }
                            setCategory_id(category._id);
                            setProductFilter(response.data);
                            setFilter(response.data.docs);
                            dispatch(setCategory());
                            setCategoriName(category.category_name);
                            openFilterName();
                        });
                    }
                    }>
                {category.category_name} <MdNavigateNext className={'non-icon'}/>
            </button>
        </div>
    );
}
