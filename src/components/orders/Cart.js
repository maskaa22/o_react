import {useSelector} from "react-redux";

import './Orders.css';
import './Orders@media.css';
import {WORLD_ADMIN, WORLD_USER} from "../../config/wordsConstants";

export default function Cart({cart}) {
    const role = useSelector(state => state.user.role);

    return (
        <div>
            {
                cart.map(c =>
                    <div key={c._id} className={'justify-content-around'}>
                        <div>
                            {role === WORLD_ADMIN && <li>Инв. № - {c.inventoryNumber}</li>}
                            {role === WORLD_USER && <li>{c.product_name}</li>}
                        </div>

                        <div>
                            <div>{c.count} шт.</div>
                        </div>


                    </div>
                )
            }
        </div>
    );
}
