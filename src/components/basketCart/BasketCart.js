import * as React from "react";
import {delProduct} from "../../reducers/actionCreators";
import {FaMinus, FaPlus, FaRegTrashAlt} from "react-icons/fa";
import {useDispatch} from "react-redux";

// Старі стилі лишаються підключеними: їхні глобальні класи (.count_*, .color_purple тощо) використовують інші сторінки
import '../countProduct/Count.css';
import {AUTH_URL} from "../../config/URL";
import priceFormatter from "../../utils/priceFormatter/priceFormatter";

/*
 * Один рядок кошика. Обробники (increase / decrease / changeValue / deleteProduct) ті самі,
 * що й були, тільки замість компонента Count тут власний лічильник у новому стилі.
 */
export function BasketCart({product, deleteProduct, increase, decrease, changeValue}) {

    const dispatch = useDispatch();

    return (
        <article className={'bk-item'}>
            <div className={'bk-item__img'}>
                <img src={AUTH_URL + '/' + product.img} alt={product.product_name}/>
            </div>

            <div className={'bk-item__info'}>
                <h3 className={'bk-item__name'}>{product.product_name}</h3>
                <p className={'bk-item__desc'}>{product.title}</p>
            </div>

            <div className={'bk-qty'}>
                <button type={'button'} className={'bk-qty__btn'} aria-label={'Менше'}
                        onClick={() => decrease(product._id)}>
                    <FaMinus aria-hidden={'true'}/>
                </button>
                <input className={'bk-qty__input'} type={'number'} min={'1'} max={'100'} value={product.count}
                       aria-label={'Кількість'}
                       onChange={(e) => changeValue(product._id, +e.target.value)}/>
                <button type={'button'} className={'bk-qty__btn'} aria-label={'Більше'}
                        onClick={() => increase(product._id)}>
                    <FaPlus aria-hidden={'true'}/>
                </button>
            </div>

            <div className={'bk-item__price'}>{priceFormatter.format(product.totalPrice)} грн.</div>

            <button type={'button'} className={'bk-item__del'} aria-label={'Видалити з кошика'}
                    onClick={() => {
                        dispatch(delProduct(product._id));
                        deleteProduct(product._id);
                    }}>
                <FaRegTrashAlt aria-hidden={'true'}/>
            </button>
        </article>
    );
}
