import {useDispatch} from "react-redux";
import {useState} from "react";

import './ProductsPage.css';
import {APIServise} from "../servises";
import {setCategory} from "../reducers/actionCreators";

export default function ProductCategory({
                                            category,
                                            setProductFilter,
                                            setFilter,
                                            page,
                                            setCategory_id,
                                            offset,
                                            setOffset
                                        }) {

    let [productCategoryCheck, setProductCategoryCheck] = useState(false);


    const dispatch = useDispatch();


    return (
        <div className={'padding'}>
            {/*<div className={`category ${productCategoryCheck && 'active'}`}*/}
            <button className={`category`} id={category._id}
                    onClick={() => {
                        setProductCategoryCheck(productCategoryCheck = !productCategoryCheck);


                        dispatch(APIServise.categoriesFilter(category._id, page, 2)).then(response => {
                            setOffset(0);
                            // console.log(response.data);
                            // console.log(category._id);
                            //TODO если respons.data.total = 0, то показать картинку нет товаров
                            // TODO усли respons.data.total > respons.data.pages, то показать 1 страницу.......
                            if (response.data.total === 0 || response.data.page > response.data.pages) {
                                console.log('Картинка нет товаров на єтой странице');
                            }
                            // if (response.data.page>response.data.pages){
                            //     console.log('Вернитесь к предыдущей странице');
                            //
                            // }
                            setCategory_id(category._id)
                            setProductFilter(response.data);
                            setFilter(response.data.docs);
                            dispatch(setCategory())
                        });
                    }
                    }>
                {category.category_name}
            </button>
        </div>
    );
}
