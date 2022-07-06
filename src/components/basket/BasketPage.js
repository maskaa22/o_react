import {useDispatch, useSelector} from "react-redux";

import './BasketPage.css'
import '../productsPage/ProductsPage.css'
import { BasketCart } from "../basketCart";
import {useState} from "react";
import {delPrice, delProduct} from "../reducers/actionCreators";

export function BasketPage ()
{
    const currentProduct = useSelector(state => state.product.currentProduct);
    const price = useSelector(state => state.product.price);
    const arr=price.reduce((previos, current) => Number(previos)+Number(current), 0);

    // function getUnique(arr) {
    //     var i = 0,
    //         current,
    //         length = arr.length,
    //         unique = [];
    //     for (; i < length; i++) {
    //         current = arr[i];
    //         if (!~unique.indexOf(current)) {
    //             unique.push(current);
    //         }
    //     }
    //     //console.log(unique)
    //     return unique
    //
    // }





//
//     // Формат arr известен следующим образом: вывод info1 и info2
//     var arr = ["2011-1-1","2011-1-1","2011-1-2","2011-1-3","2011-1-2","2011-1-1"];
// // var info1 = {"2011-1-1": 3, "2011-1-2": 2, "2011-1-3": 1}
// // var info2 = [{time: "2011-1-1", count: 3}, {time: "2011-1-2", count: 2},{time: "2011-1-3", count: 1}]
//
//     // дедупликация элементов массива
//     function uniqueArr(arr){
//         var x = new Set(arr);
//         return [...x];
//     }
//
//     // Получаем количество повторяющихся элементов и выводим info1
//     function getWordCnt(arr){
//         return arr.reduce(function(prev1,next1){
//             // console.log(prev._id);
//             // console.log(next._id);
//             let prev = prev1._id;
//             let next = next1._id;
//             prev[next] = (prev[next] + 1) || 1;
//             return prev;
//         },{});
//     }
//
//     // Получаем количество повторяющихся элементов и выводим info2
//     var getArrCountInfo = function (arr) {
//
//         var info2 = [];
//         uniqueArr(arr).forEach(function(item) {
//             var countInfo = {};
//             countInfo.time = item;
//             countInfo.count = getWordCnt(arr)[item];
//             info2.push(countInfo);
//         });
//         return info2;
//     }
//
//     console.log(getWordCnt(currentProduct));
//     //console.log(getArrCountInfo(currentProduct));


    return(
        <div>
            <div className={'row'}>
                {
                     //getUnique(currentProduct)

                    currentProduct.map((value, i) =>
                          //<li>{value._id}</li>

                            <BasketCart product={value} key={i} price={i}/>

                    )

                }
            </div>

            <div className={'basket_check'}>
                <div className={'summa'}><i className="fa fa-shopping-basket " aria-hidden="true"/> {arr > 0 && `${arr} грн.`}</div>
                <div><button className={'check'} onClick={()=> {
                    console.log(currentProduct);
                }}>Оформить заказ</button></div>
            </div>
        </div>

    );
}
