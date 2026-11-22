import {useSelector} from "react-redux";

import './Orders.css';
import './Orders@media.css';
import './UserOrdersModern.css';
import {AUTH_URL} from "../../config/URL";
import {WORLD_ADMIN, WORLD_USER} from "../../config/wordsConstants";

/*
 * Перелік товарів одного замовлення (клієнтський кабінет): мініатюра, назва, кількість.
 * Для адміна показується інвентарний номер, як і раніше.
 */
export default function Cart({cart}) {

    const role = useSelector(state => state.user.role);

    return (
        <ul className={'uo-items'}>
            {
                cart.map(c =>
                    <li key={c._id} className={'uo-item'}>
                        {c.img &&
                            <span className={'uo-item__img'}>
                                <img src={AUTH_URL + '/' + c.img} alt={''} loading={'lazy'}/>
                            </span>
                        }
                        <span className={'uo-item__name'}>
                            {role === WORLD_ADMIN && `Інв. № - ${c.inventoryNumber}`}
                            {role === WORLD_USER && c.product_name}
                        </span>
                        <span className={'uo-item__qty'}>{c.count} шт.</span>
                    </li>
                )
            }
        </ul>
    );
}
