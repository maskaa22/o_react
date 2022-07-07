import {useDispatch, useSelector} from "react-redux";

import './BasketPage.css'
import '../productsPage/ProductsPage.css'
import { BasketCart } from "../basketCart";
import {useEffect, useState} from "react";
import {delPrice, delProduct} from "../reducers/actionCreators";

export function BasketPage ()
{
    const currentProduct = useSelector(state => state.product.currentProduct);
    const price = useSelector(state => state.product.price);
    // const arr=price.reduce((previos, current) => Number(previos)+Number(current), 0);

    const [count, setCount] = useState();

    useEffect(() => {

        setCount(1)
    }, []);


    let summa = 0;
    let totalPrice =0;

    function allSumma(count) {
        //console.log(count);
        totalPrice = summa*count;
        return totalPrice;
    }
    currentProduct.forEach(el =>
    {
        summa += Number.parseFloat(el.price)
    })


    function showCheck() {
        return(
            <div>
                <div className={'row'}>
                    {
                        currentProduct.map((value, i) => <BasketCart product={value} key={i} price={i} countProduct={setCount}/>)
                    }
                </div>

                <div className={'basket_check'}>
                    <div className={'summa'}>
                        <i className="fa fa-shopping-basket summaProduct" aria-hidden="true"/>
                        {/*{*/}
                        {/*    currentProduct.forEach(el => summa += Number.parseFloat(el.price))*/}
                        {/*}*/}

                        {/*{arr > 0 && `${arr} грн.`}*/}
                        {/*{new Intl.NumberFormat().format(allSumma(count))} грн.*/}

                        {allSumma(count)} грн.
                    </div>
                    <div><button className={'check'} onClick={()=> {
                        console.log(currentProduct);
                    }}>Оформить заказ</button></div>
                </div>
            </div>
        )
    }

    function showNothing() {
        return (
            <h1>Товаров нет</h1>
        )
    }

    return(
        <div>
            {
                currentProduct.length>0?
                    showCheck():showNothing()
            }
        </div>

    );
}
