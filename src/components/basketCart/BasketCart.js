import {delPraice, delProduct} from "../reducers/actionCreators";
import {useDispatch, useSelector} from "react-redux";

import '../productCart/ProductCart.css'

export function BasketCart ({product, pp})
{

    const currentProduct = useSelector(state => state.product.currentProduct)
    //console.log(currentProduct);

    // const mapStateToProps = ( currentProduct ,  id ) => {
    //     console.log(currentProduct);
    //     //const o = currentProduct.reduce((count, book) => count + (book._id === id ? 1 : 0), 0)
    //     const o = currentProduct.map(v=> {
    //         const q = v.price.reduce((c, b) => c+b)
    //         console.log(q);
    //     })
    //     //console.log(o);
    //     return o
    // };


    const dispatch = useDispatch()
    return(
        // <div>
        //     <div><img src={''} alt={'шaмпунь'}/></div>
        //     <div>{product.product_name}</div>
        //     <div>{product.title}</div>
        //     <div>{product.price}</div>
        //     <button  onClick={() => {
        //         dispatch(delProduct(product._id))
        //         dispatch(delPraice(pp))
        //     }} >Удалить</button>
        //
        // </div>

        <div className="column">
            <div className={'card'}>
                <div><img src={'https://irecommend.ru/sites/default/files/product-images/1360075/VdCSfnclhGUQPbxf38uNw.jpg'} alt={'шaмпунь'}/></div>
                <div className={'info_card'}><span>{product.product_name}</span></div>
                <div className={'info_card'}>{product.title}</div>
                <div className={'flex_buy'}>
                    <div className={'info_card'}>{product.price} грн.</div>
                    <div className={'buy'}><button onClick={() => {
                        dispatch(delProduct(product._id))
                        dispatch(delPraice(pp))
                    }}><i className="fa fa-trash-o icon_basket" aria-hidden="true"/>
                    </button></div>
                </div>
            </div>
        </div>
    );
}
