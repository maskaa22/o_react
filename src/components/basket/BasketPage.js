import {useSelector} from "react-redux";

import './BasketPage.css'
import '../productsPage/ProductsPage.css'
import { BasketCart } from "../basketCart";

export default function BasketPage ()
{
    const currentProduct = useSelector(state => state.product.currentProduct);
    const price = useSelector(state => state.product.price);
    const arr=price.reduce((previos, current) => Number(previos)+Number(current), 0);

    console.log(arr);

    return(
        <div>
            <div className={'row'}>
                {
                    currentProduct.map((value, i) => <BasketCart product={value} key={i} pp={i}/>)
                }
            </div>

            <div className={'basket_check'}>
                <div className={'summa'}><i className="fa fa-shopping-basket " aria-hidden="true"/> {arr > 0 && `${arr} грн.`}</div>
                <div><button className={'check'}>Оформить заказ</button></div>
            </div>
        </div>

    );
}
