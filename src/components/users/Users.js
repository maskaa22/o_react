import * as React from 'react';
import {IoIosSend} from "react-icons/io";

import '../user/User.css'
import {ModalUser} from "../modal";
import User from "../user/User";
import {useState} from "react";

export function Users({items}) {


    const [openCreateWindow, setOpenCreateWindow] = React.useState(false);
    const [openDeleteUser, setOpenDeleteUser] = React.useState(false);
    const [openSendUser, setOpenSendUser] = React.useState(false);
    const [userEmail, setUserEmail] = useState('');

    const handleCloseCreate = () => setOpenCreateWindow(false);
    const handleCloseDelete = () => setOpenDeleteUser(false);
    const handleCloseSend = () => setOpenSendUser(false);

    return (
        <div>
            <h2>Список користувачів</h2>

            <ModalUser openWindow={openCreateWindow} handleClose={handleCloseCreate} role={'admin'}/>
            <ModalUser openWindow={openDeleteUser} handleClose={handleCloseDelete} del={'del'}/>
            <ModalUser openWindow={openSendUser} handleClose={handleCloseSend} send={'send'} userEmail={userEmail}/>

            <div className={'flex-fot-content'}>
                <div className={'centric'}>
                    <div className={'flex_space_between'}>
                    <button onClick={() => setOpenCreateWindow(true)} className={'btn_analyz'}>Додати адміністратора</button>
                    <button className={'btn_analyz'} onClick={() => setOpenDeleteUser(true)}>Видалити клієнта</button>
                    </div>
                </div>
            </div>

            <div className={'center-table'}>
                <div className={'user-table'}>
                    <div className={'name-table'}>
                        <div className={'cell-table header-table'}>Ім'я</div>
                        <div className={'cell-table header-table'}>Пошта</div>
                        <div className={'cell-table header-table'}>Телефон</div>
                        <div className={'cell-table header-table'}>Відділення</div>
                        <div className={'cell-table header-table padding_header_last'}>№</div>
                        <div className={'cell-table header-table padding_header_last'}>
                            <IoIosSend className=" icon_basket"/>
                        </div>
                    </div>
                    {
                        items.map(user => <User key={user._id} item={user} setOpenSendUser={setOpenSendUser} userEmail={setUserEmail}/>)
                    }
                </div>

            </div>
        </div>
    );
}
