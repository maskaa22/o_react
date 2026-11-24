import * as React from 'react';
import {useState} from 'react';
import {FaRegUser} from "react-icons/fa";

import '../user/User.css'
import '../admin/AdminPagesModern.css';
import {ModalUser} from "../modal";
import User from "../user/User";

export function Users({items, setDelUser}) {

    const [openCreateWindow, setOpenCreateWindow] = React.useState(false);
    const [openDeleteUser, setOpenDeleteUser] = React.useState(false);
    const [openSendUser, setOpenSendUser] = React.useState(false);
    const [userEmail, setUserEmail] = useState('');

    const handleCloseCreate = () => setOpenCreateWindow(false);
    const handleCloseDelete = () => setOpenDeleteUser(false);
    const handleCloseSend = () => setOpenSendUser(false);

    return (
        <section className={'adm'}>
            <ModalUser openWindow={openCreateWindow} handleClose={handleCloseCreate} role={'admin'}/>
            <ModalUser openWindow={openDeleteUser} handleClose={handleCloseDelete} del={'del'} setDelUser={setDelUser}/>
            <ModalUser openWindow={openSendUser} handleClose={handleCloseSend} send={'send'} userEmail={userEmail}/>

            <header className={'adm-head'}>
                <div className={'adm-head__title'}>
                    <h2 className={'adm-title'}>Список користувачів</h2>
                    {items.length !== 0 && <span className={'adm-count'}>{items.length}</span>}
                </div>
                <div className={'adm-actions'}>
                    <button type={'button'} className={'adm-btn adm-btn--primary'}
                            onClick={() => setOpenCreateWindow(true)}>Додати адміністратора
                    </button>
                    <button type={'button'} className={'adm-btn adm-btn--ghost adm-btn--danger'}
                            onClick={() => setOpenDeleteUser(true)}>Видалити клієнта
                    </button>
                </div>
            </header>

            <div className={'adm-card'}>
                {items.length !== 0 ?
                    <div className={'adm-scroll'}>
                        <table className={'adm-table'}>
                            <thead>
                            <tr>
                                <th scope={'col'}>Ім'я</th>
                                <th scope={'col'}>Пошта</th>
                                <th scope={'col'}>Телефон</th>
                                <th scope={'col'}>Місто</th>
                                <th scope={'col'}>№ відділення</th>
                                <th scope={'col'}><span className={'sr-only'}>Лист</span></th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                items.map(user => <User key={user._id} item={user} setOpenSendUser={setOpenSendUser}
                                                        userEmail={setUserEmail}/>)
                            }
                            </tbody>
                        </table>
                    </div> :
                    <div className={'adm-empty'}>
                        <span className={'adm-empty__icon'}><FaRegUser aria-hidden={'true'}/></span>
                        <h3>Користувачів поки немає</h3>
                        <p>Тут з'являться клієнти, щойно хтось зареєструється на сайті.</p>
                    </div>
                }
            </div>
        </section>
    );
}
