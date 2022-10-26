import {IoIosSend} from "react-icons/io";

import '../user/User.css'
import User from "../user/User";

export function Users({items}) {
    return (
        <div>
            <h2>Список користувачів</h2>

            <div className={'center-table'}>
                <div className={'user-table'}>
                    <div className={'name-table'}>
                        <div className={'cell-table header-table'}>Ім'я</div>
                        <div className={'cell-table header-table'}>Пошта</div>
                        <div className={'cell-table header-table'}>Телефон</div>
                        <div className={'cell-table header-table'}>
                            <IoIosSend className=" icon_basket"/>
                        </div>
                    </div>
                    {
                        items.map(user => <User key={user._id} item={user}/>)
                    }
                </div>
            </div>
        </div>
    );
}
