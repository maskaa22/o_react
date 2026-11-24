import * as React from "react";
import {FaBoxOpen, FaMapMarkerAlt, FaPhoneAlt, FaRegCalendarAlt, FaRegTrashAlt, FaRegUser} from "react-icons/fa";

import '../admin/AdminPagesModern.css';
import '../orders/UserOrdersModern.css';   // спільні з кабінетом клієнта стилі позначки статусу й списку товарів
import './OrderModern.css';
import {deleteOrder, archiveOrder, updateStatusOrder} from "../../servises";
import Cart from "../orders/Cart";
import {CustomSelect} from "../modal/CustomSelect";
import {confirmDialog} from "../../utils/function";
import {WORD_ACCEPTED, WORD_EXPECTED, WORD_PROCESSING, WORD_READY, WORD_SEND} from "../../config/wordsConstants";

// Колір позначки статусу — ті самі статуси, що й у кабінеті клієнта
const STATUS_TONE = {
    'очікується': 'wait',
    'прийнято': 'accepted',
    'обробка': 'processing',
    'відправлено': 'sent',
    'готово': 'done'
};

const STATUS_OPTIONS = [WORD_EXPECTED, WORD_ACCEPTED, WORD_PROCESSING, WORD_SEND, WORD_READY]
    .map(status => ({value: status, label: status}));

/*
 * Одна картка замовлення в адмінці у вигляді акордеона: у згорнутому стані видно лише шапку
 * ("Замовлення № …" і статус), по натисканню картка розкривається. Так усі картки в списку однакової висоти.
 * Власний стан вибору статусу в кожної картки: раніше він був спільним для всього списку.
 *
 * mode = 'active'  — сторінка "Замовлення": змінити статус або, коли готово, перенести в архів;
 * mode = 'archive' — сторінка "Архів": лише видалення.
 */
function OrderCard({order, number, mode, setNewStatus, setFlag, setDeleteOrder}) {

    const [status, setStatus] = React.useState('');
    const [open, setOpen] = React.useState(false);

    // Логіка як і була: коли замовлення вже "готово" або обрано статус "готово" — показуємо "В архів"
    const toArchive = status === WORD_READY || order.status === WORD_READY;

    const date = new Date(order.createdAt);
    const panelId = `order-panel-${order._id}`;

    return (
        <article className={`ao-card${open ? ' is-open' : ''}`}>
            <h3 className={'ao-card__head'}>
                <button type={'button'} className={'ao-card__toggle'} aria-expanded={open}
                        aria-controls={panelId} onClick={() => setOpen(isOpen => !isOpen)}>
                    <span className={'ao-card__title'}>Замовлення № {number}</span>
                    <span className={`uo-status uo-status--${STATUS_TONE[order.status] || 'default'}`}>
                        {order.status}
                    </span>
                    <span className={'ao-card__chev'} aria-hidden={'true'}/>
                </button>
            </h3>

            {open &&
                <div className={'ao-card__panel'} id={panelId}>
                    <ul className={'ao-meta'}>
                        <li><FaRegUser aria-hidden={'true'}/><span>{order.user_name} {order.surname}</span></li>
                        <li><FaPhoneAlt aria-hidden={'true'}/><span>{order.phone}</span></li>
                        <li><FaMapMarkerAlt aria-hidden={'true'}/>
                            <span>м. {order.nameSity}, відділ. №{order.nameDepartment}</span></li>
                    </ul>

                    <Cart cart={order.cart}/>

                    <div className={'ao-total'}>
                        <span>
                            <FaRegCalendarAlt aria-hidden={'true'}/>
                            {isNaN(date.getTime()) ? '' : date.toLocaleDateString('uk-UA')}
                        </span>
                        <strong>{order.summa} грн.</strong>
                    </div>

                    <div className={'ao-actions'}>
                        {mode === 'active' && order.status !== WORD_READY &&
                            <div className={'ao-actions__select'}>
                                <CustomSelect id={`status-${order._id}`} value={status} onChange={setStatus}
                                              options={STATUS_OPTIONS} placeholder={'Вибрати статус'}/>
                            </div>
                        }

                        {mode === 'active' && (toArchive ?
                            <button type={'button'} className={'adm-btn adm-btn--ghost'} onClick={() => {
                                archiveOrder(order._id).then(req => {
                                    if (req) {
                                        setFlag(true);
                                    }
                                });
                            }}>В архів</button> :
                            <button type={'button'} className={'adm-btn adm-btn--primary'} disabled={status === ''}
                                    onClick={() => {
                                        updateStatusOrder(order._id, status).then(req => {
                                            if (req) {
                                                setNewStatus(req.status);
                                            }
                                        });
                                    }}>Змінити</button>
                        )}

                        {mode === 'archive' &&
                            <button type={'button'} className={'adm-btn adm-btn--ghost adm-btn--danger'}
                                    onClick={() => {
                                        // видалення з архіву незворотне — питаємо підтвердження
                                        confirmDialog({
                                            title: 'Видалити замовлення?',
                                            text: `Замовлення № ${number} буде остаточно видалене з архіву.`
                                        }).then(ok => {
                                            if (!ok) return;

                                            deleteOrder(order._id).then(req => {
                                                if (req) {
                                                    setDeleteOrder(true);
                                                }
                                            });
                                        });
                                    }}>
                                <FaRegTrashAlt aria-hidden={'true'}/> Видалити
                            </button>
                        }
                    </div>
                </div>
            }
        </article>
    );
}

export function Order({orders, mode = 'active', setNewStatus, setFlag, setDeleteOrder}) {

    // поки замовлення вантажаться (orders ще undefined), нічого не показуємо
    if (!orders) return null;

    if (orders.length === 0) {
        return (
            <div className={'adm-card'}>
                <div className={'adm-empty'}>
                    <span className={'adm-empty__icon'}><FaBoxOpen aria-hidden={'true'}/></span>
                    <h3>{mode === 'archive' ? 'Архів порожній' : 'Замовлень немає'}</h3>
                    <p>{mode === 'archive' ?
                        'Сюди потрапляють виконані замовлення.' :
                        'Нових замовлень поки немає, або жодне не підходить під обраний фільтр.'}</p>
                </div>
            </div>
        );
    }

    // Нумерація за порядком створення (найстаріше = 1), а показуємо найновіші першими — як і було
    const numbered = orders.map((order, i) => ({order, number: i + 1})).reverse();

    return (
        <div className={'ao-list'}>
            {numbered.map(({order, number}) => (
                <OrderCard key={order._id} order={order} number={number} mode={mode}
                           setNewStatus={setNewStatus} setFlag={setFlag} setDeleteOrder={setDeleteOrder}/>
            ))}
        </div>
    );
}
