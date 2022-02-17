import './ProductCart.css'
import {useDispatch, useSelector} from "react-redux";
import {setProduct, priceProduct} from "../reducers/actionCreators";

export default function ProductCart({product}) {

    const dispatch = useDispatch()
    //  const currentProduct = useSelector(state => state.product.currentProduct)
    // console.log(currentProduct);

    // function getUser(product) {
    //     try {
    //             console.log(product);
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }
    // const addedCount = (price) => {
    //     console.log(price);
    //     const summa = currentProduct.reduce((count, price) => count + price, 0)
    //     return summa
    // }


    return (
        <div className="column">
            <div className={'card'}>
                <div><img src={'https://irecommend.ru/sites/default/files/product-images/1360075/VdCSfnclhGUQPbxf38uNw.jpg'} alt={'шaмпунь'}/></div>
                <div className={'info_card'}><span>{product.product_name}</span></div>
                <div className={'info_card'}>{product.title}</div>
                <div className={'flex_buy'}>
                    <div className={'info_card'}>{product.price} грн.</div>
                    <div className={'buy'}><button onClick={() => {
                        dispatch(setProduct(product))
                        dispatch(priceProduct(product.price))
                    }}><i className="fa fa-cart-plus icon_basket" aria-hidden="true"/>
                    </button></div>
                </div>
            </div>
        </div>
    );
}
