import * as React from "react";
import {IoIosSend} from "react-icons/io";

import "./User.css";
import './User@media.css';

/*
 * Рядок таблиці клієнтів. Дані та дія (відкрити вікно відправки листа для цього email) ті самі,
 * що й були; змінилась тільки розмітка (data-label потрібен, щоб на телефоні рядок став карткою).
 */
export default function User({item, setOpenSendUser, userEmail}) {

    return (
        <tr>
            <td data-label={"Ім'я"} className={'adm-cell--strong'}>{item.name}</td>
            <td data-label={'Пошта'}>{item.email}</td>
            <td data-label={'Телефон'} className={'adm-cell--muted'}>{item.phone || '—'}</td>
            <td data-label={'Місто'} className={'adm-cell--muted'}>{item.nameSity || '—'}</td>
            <td data-label={'№ відділення'} className={'adm-cell--num adm-cell--muted'}>{item.nameDepartment || '—'}</td>
            <td className={'adm-cell--action'}>
                <button type={'button'} className={'adm-icon-btn'} title={'Надіслати лист'}
                        aria-label={`Надіслати лист: ${item.email}`}
                        onClick={() => {
                            setOpenSendUser(true);
                            userEmail(item.email);
                        }}>
                    <IoIosSend aria-hidden={'true'}/>
                </button>
            </td>
        </tr>
    );
}
