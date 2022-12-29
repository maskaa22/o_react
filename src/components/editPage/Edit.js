import {FiCheck} from "react-icons/fi";
import {useSelector} from "react-redux";
import {useState} from "react";

import './EditPage.css';
import './EditPage@media.css';
import {APIServise} from "../servises";
import {Input} from "../utils";
import {NewPochta} from "../newPochta";
import {StyleForPassword, StyleIconOk} from '../utils/function'
import {WORLD_ADMIN, WORLD_USER} from "../../config/wordsConstants";

export function Edit() {
    const currentUser = useSelector(state => state.user.currentUser);
    const role = useSelector(state => state.user.role);

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [number, setNumber] = useState('');
    const [numberToo, setNumberToo] = useState('');
    const [sity, setSity] = useState('');
    const [numberNP, setNumberNP] = useState('');
    const [visibleSity, setVisibleSity] = useState('none');
    const [visibleNumber, setVisibleNumber] = useState('none');

    const block_check = document.getElementById('block_check');

    const handleClick = event => {
        setNumber(event.target.value)
    };

    function stylePassword() {
        const diag_nap_uchr = document.getElementById('pass-old');
        const diag_osn = document.getElementById('pass-new');
        const icon = document.getElementById('icon');

        setNumberToo(diag_osn.value);

        StyleForPassword(number, block_check)
        StyleIconOk(diag_nap_uchr, diag_osn, icon);
    }

    return (
        <div>
            <div className={'full-center'}>
                <div className={'border-box'}>
                    <h2 className={'edit-h2'}>Редагування інформації</h2>
                    <div className={'full-center'}>
                        <img className={'circle'} alt={'circle'}/>
                    </div>
                    <div className={'full-center download-foto-margin'}>
                        <label htmlFor="file-upload" className="custom-file-upload">
                            <i className="fa fa-cloud-upload"/> Загрузити фото
                        </label>
                        <input id="file-upload" type="file"/>
                    </div>
                    <div className={'around'}>
                        <div>
                            <div className={'full-center margin-input'}>
                                <div className={'input-center-full'}>
                                    <Input value={name} setValue={setName} placeholder={"Ім'я"} type={'text'}/>
                                </div>
                            </div>
                            <div className={'full-center margin-input'}>
                                <div className={'input-center-full'}>
                                    <Input value={surname} setValue={setSurname} placeholder={'Прізвище'}
                                           type={'text'}/>
                                </div>
                            </div>
                            <div className={'full-center margin-input'}>
                                <div className={'input-center-full'}>
                                    <Input value={email} setValue={setEmail} placeholder={'Пошта'} type={'email'}/>
                                </div>
                            </div>
                            <div className={'full-center margin-input-last'}>
                                <div className={'input-center-full'}>
                                    <Input value={phone} setValue={setPhone} placeholder={'Телефон'} type={'number'}/>
                                </div>
                            </div>
                            {role === WORLD_USER &&
                            <NewPochta setSity={setSity} setNumberNP={setNumberNP}
                                       setVisibleSity={setVisibleSity} setVisibleNumber={setVisibleNumber}/>
                            }
                        </div>
                        <div>
                            <div className={'full-center margin-input'}>
                                <div className={'input-center-full'}>
                                    <Input value={oldPassword} setValue={setOldPassword} placeholder={'Старий пароль'}
                                           type={'password'}/>
                                </div>
                            </div>
                            <div className={'full-center margin-input'}>
                                <div className={'input-center-full'}>
                                    <input type="password" id="pass-old" className="input-focus"
                                           placeholder="Новий пароль"
                                           name="password" value={number} onChange={handleClick}
                                           onInput={stylePassword}/>
                                </div>
                            </div>
                            <div className={'full-center position_box margin-input'}>
                                <div className={'input-center-full'} id="block_check">
                                </div>
                            </div>
                            <div className={'full-center margin-input'}>
                                <div className={'input-center-full last'}>
                                    <input type="password" id="pass-new" className="input-focus last"
                                           placeholder="Повторити новий пароль"
                                           name="password" onInput={stylePassword}/>
                                </div>
                                <FiCheck className={`icon_ok notVisible`} id={'icon'}/>
                            </div>
                            <div className={`full-center margin-input ${visibleSity}`}>
                                <div className={`input-center-full ${visibleSity} inp`}>
                                    <input className="input-focus" value={sity} readOnly={true}/>
                                </div>
                            </div>
                            <div className={`full-center margin-input ${visibleNumber}`}>
                                <div className={`input-center-full ${visibleNumber} inp-last`}>
                                    <input className="input-focus" value={`Відділення № ${numberNP}`} readOnly={true}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={'full-center margin-input'}>
                        {role === WORLD_ADMIN &&
                        <button className={'btn-save'} onClick={() => {
                            APIServise.editPage(currentUser._id, name, surname, email, phone, oldPassword, number, numberToo);
                        }}>Змінити та зберегти</button>
                        }
                        {role === WORLD_USER &&
                        <button className={'btn-save'} onClick={() => {
                            APIServise.editPage(currentUser._id, name, surname, email, phone, oldPassword, number, numberToo,
                                sity, numberNP);
                        }}>Змінити та зберегти</button>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
