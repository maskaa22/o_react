import User from "../user/User";
import '../user/User.css'
import {IoIosSend} from "react-icons/io";

export function Users ({items})
{
    return(
        <div>
            <h2>Список пользователей</h2>

            <div className={'center-table'}>
                <div className={'user-table'}>
                    <div className={'name-table'}>
                        <div className={'cell-table header-table'}>Имя </div>
                        <div className={'cell-table header-table'}>Почта </div>
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
