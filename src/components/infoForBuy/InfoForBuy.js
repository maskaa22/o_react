import * as React from "react";
import {useState} from "react";
import {FaCreditCard, FaMoneyBillWave} from "react-icons/fa";
import {MdClose} from "react-icons/md";
import {useSelector} from "react-redux";

import {editAdressData, editContactData} from "../../servises";
import {NewPochta} from "../newPochta";
import {WORD_CART, WORD_CART_UK, WORD_CASH, WORD_HIDEN, WORD_MONEY} from "../../config/wordsConstants";

/*
 * Три кроки оформлення: контактні дані, доставка (Нова пошта), оплата.
 * Стани й виклики (editContactData, editAdressData, setPay) ті самі, що й були;
 * змінилась тільки розмітка (класи bk-*, стилі в BasketPageModern.css).
 */
export function InfoForBuy({setPay}) {

    const [name, setName] = useState('');
    const [numberNP, setNumberNP] = useState('');
    const [phone, setPhone] = useState('');
    const [sity, setSity] = useState('');
    const [stateAdress, setStateAdress] = useState(false);
    const [stateInput, setStateInput] = useState(false);
    const [stateName, setStateName] = useState(true);
    const [stateNameAdress, setStateNameAdress] = useState(true);

    const [surname, setSurname] = useState('');
    const [value, setValue] = React.useState('');
    const [visibleNumber, setVisibleNumber] = useState(WORD_HIDEN);
    const [visibleSity, setVisibleSity] = useState(WORD_HIDEN);

    const currentUser = useSelector(state => state.user.currentUser);

    const handleChange = (event) => {
        setValue(event.target.value);
        if (event.target.value === WORD_CASH) {
            setPay(WORD_MONEY);
        } else if (event.target.value === WORD_CART) {
            setPay(WORD_CART_UK);
        }
    };

    return (
        <>
            {/* ---------- 1. Контактні дані ---------- */}
            <section className={'bk-card'}>
                <header className={'bk-card__head'}>
                    <h2 className={'bk-card__title'}><span className={'bk-step'}>1</span>Контактні дані</h2>
                    {stateName ?
                        <button type={'button'} className={'bk-edit'} onClick={() => {
                            setStateName(false);
                            setStateInput(true);
                        }}>Змінити</button> :
                        <button type={'button'} className={'bk-edit bk-edit--icon'} aria-label={'Закрити'}
                                onClick={() => {
                                    setStateInput(false);
                                    setStateName(true);
                                }}><MdClose/></button>
                    }
                </header>

                {stateName &&
                    <div className={'bk-info'}>
                        <div>{currentUser.name} {currentUser.surname ? currentUser.surname : 'Введіть призвіще'}</div>
                        <div>{currentUser.phone ? currentUser.phone : 'Введіть номер'}</div>
                    </div>
                }

                {stateInput &&
                    <div className={'bk-form'}>
                        <input className={'bk-input'} value={name} onChange={e => setName(e.target.value)}
                               placeholder={currentUser.name} aria-label={"Ім'я"}/>
                        <input className={'bk-input'} value={surname} onChange={e => setSurname(e.target.value)}
                               placeholder={currentUser.surname ? currentUser.surname : 'Введіть призвіще'}
                               aria-label={'Прізвище'}/>
                        <input className={'bk-input'} value={phone} onChange={e => setPhone(e.target.value)}
                               placeholder={currentUser.phone ? currentUser.phone : 'Введіть номер'}
                               aria-label={'Телефон'}/>
                        <button type={'button'} className={'bk-save'} onClick={() => {
                            editContactData(currentUser.id, name, surname, phone);
                            setStateInput(false);
                            setStateName(true);
                        }}>Продовжити</button>
                    </div>
                }
            </section>

            {/* ---------- 2. Доставка ---------- */}
            <section className={'bk-card'}>
                <header className={'bk-card__head'}>
                    <h2 className={'bk-card__title'}><span className={'bk-step'}>2</span>Доставка</h2>
                    {stateNameAdress ?
                        <button type={'button'} className={'bk-edit'} onClick={() => {
                            setStateNameAdress(false);
                            setStateAdress(true);
                        }}>Змінити</button> :
                        <button type={'button'} className={'bk-edit bk-edit--icon'} aria-label={'Закрити'}
                                onClick={() => {
                                    setStateNameAdress(true);
                                    setStateAdress(false);
                                }}><MdClose/></button>
                    }
                </header>

                {stateNameAdress &&
                    <div className={'bk-info'}>
                        м. {currentUser.nameSity}, відділення № - {currentUser.nameDepartment}
                    </div>
                }

                {stateAdress &&
                    <div className={'bk-form bk-form--delivery'}>
                        <NewPochta setSity={setSity} setNumberNP={setNumberNP}
                                   setVisibleSity={setVisibleSity} setVisibleNumber={setVisibleNumber}/>
                        {(visibleSity !== WORD_HIDEN || visibleNumber !== WORD_HIDEN) &&
                            <div className={'bk-chosen'}>
                                {visibleSity !== WORD_HIDEN && <span>м. {sity}</span>}
                                {visibleNumber !== WORD_HIDEN && <span>відділення № {numberNP}</span>}
                            </div>
                        }
                        <button type={'button'} className={'bk-save'} onClick={() => {
                            editAdressData(currentUser.id, sity, numberNP);
                            setStateNameAdress(true);
                            setStateAdress(false);
                            setVisibleSity(WORD_HIDEN);
                            setVisibleNumber(WORD_HIDEN);
                        }}>Продовжити</button>
                    </div>
                }
            </section>

            {/* ---------- 3. Оплата ---------- */}
            <section className={'bk-card'}>
                <header className={'bk-card__head'}>
                    <h2 className={'bk-card__title'}><span className={'bk-step'}>3</span>Оплата</h2>
                </header>
                <div className={'bk-pay'} role={'radiogroup'} aria-label={'Спосіб оплати'}>
                    {/* title потрібен, коли на планшеті підпис ховається і лишається тільки іконка */}
                    <label className={`bk-pay__opt${value === WORD_CASH ? ' is-active' : ''}`} title={WORD_MONEY}>
                        <input type={'radio'} name={'pay'} value={WORD_CASH} checked={value === WORD_CASH}
                               onChange={handleChange}/>
                        <FaMoneyBillWave aria-hidden={'true'}/>
                        <span className={'bk-pay__label'}>{WORD_MONEY}</span>
                    </label>
                    <label className={`bk-pay__opt${value === WORD_CART ? ' is-active' : ''}`} title={WORD_CART_UK}>
                        <input type={'radio'} name={'pay'} value={WORD_CART} checked={value === WORD_CART}
                               onChange={handleChange}/>
                        <FaCreditCard aria-hidden={'true'}/>
                        <span className={'bk-pay__label'}>{WORD_CART_UK}</span>
                    </label>
                </div>
            </section>
        </>
    );
}
