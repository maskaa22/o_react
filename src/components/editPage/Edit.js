import Avatar from '@mui/material/Avatar';
import {FiCheck} from "react-icons/fi";
import * as React from "react";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";

import './EditPage.css';
import './EditPage@media.css';
import {APIServise} from "../servises";
import {AUTH_URL} from "../../config/URL";
import {Input} from "../utils";
import {NewPochta} from "../newPochta";
import {StyleForPassword, StyleIconOk} from '../utils/function';
import {WORD_TOKEN, WORLD_ADMIN, WORLD_USER} from "../../config/wordsConstants";
import {RiSendPlaneFill} from "react-icons/ri";


export function Edit() {

    const currentUser = useSelector(state => state.user.currentUser);
    const role = useSelector(state => state.user.role);

    const [email, setEmail] = useState('');
    const [imgById, setImgById] = useState('');
    const [number, setNumber] = useState('');
    const [name, setName] = useState('');
    const [numberNP, setNumberNP] = useState('');
    const [numberToo, setNumberToo] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [sity, setSity] = useState('');
    const [surname, setSurname] = useState('');
    // const [visibleNumber, setVisibleNumber] = useState('none');
    // const [visibleSity, setVisibleSity] = useState('none');


    useEffect(() => {
        if (localStorage.getItem(WORD_TOKEN)) {
            APIServise.getUserForToken().then(user => setImgById(user.user_id.foto));
        }
    }, []);

    const block_check = document.getElementById('block_check');

    const handleClick = event => {
        setNumber(event.target.value);
    };

    function stylePassword() {
        const diag_nap_uchr = document.getElementById('pass-old');
        const diag_osn = document.getElementById('pass-new');
        const icon = document.getElementById('icon');

        setNumberToo(diag_osn.value);

        StyleForPassword(number, block_check);
        StyleIconOk(diag_nap_uchr, diag_osn, icon);
    }

    const activeEmail = 'active-email';
    const nonActiveEmail = 'none';

    const addFoto = (e) => {
        const formData = new FormData();
        formData.append('_id', currentUser._id);
        formData.append('foto', e.target.files[0]);
        APIServise.setFoto(formData)
            .then(user => setImgById(user.foto));
    };

    return (
        <div>
            <div className={'full-center'}>
                <div className={'border-box'}>
                    <h2 className={'edit-h2'}>Редагування інформації</h2>
                    <div className={'full-center circle'}>
                        {
                            imgById &&
                            <Avatar alt="user foto" sx={{width: 200, height: 200}} src={AUTH_URL + '/' + imgById}/>
                        }
                    </div>
                    <div className={'full-center download-foto-margin'}>
                        <form>
                            <label htmlFor="file-upload" className="custom-file-upload">
                                <i className="fa fa-cloud-upload"/> Загрузити фото
                            </label>
                            <input id="file-upload" type="file" name={'files'} className="checkbox" onChange={addFoto}/>
                        </form>
                    </div>
                    <div>
                        <div className={'full-center margin-input'}>
                            <div onClick={() => {
                                APIServise.sentActiveEmail(currentUser._id, currentUser.name, currentUser.email);
                            }}
                                 className={currentUser.is_active === false ? `input-center-full ${activeEmail}` : `input-center-full ${nonActiveEmail}`}>
                                Підтвердіть пошту<RiSendPlaneFill className={'i-active-email'}/>
                            </div>
                        </div>
                    </div>
                    <div className={'around'}>
                        <div>
                            <div className={'full-center margin-input'}>
                                <div className={'input-center-full'}>
                                    <Input value={name} setValue={setName} placeholder={currentUser.name}
                                           type={'text'} className={'input-edit-info'}/>
                                </div>
                            </div>
                            <div className={'full-center margin-input'}>
                                <div className={'input-center-full'}>
                                    <Input value={surname} setValue={setSurname}
                                           placeholder={currentUser.surname ? currentUser.surname : 'Введіть прізвище'}
                                           type={'text'} className={'input-edit-info'}/>
                                </div>
                            </div>
                            <div className={'full-center margin-input'}>
                                <div className={'input-center-full'}>
                                    <Input value={email} setValue={setEmail} placeholder={currentUser.email}
                                           type={'email'} className={'input-edit-info'}/>
                                </div>
                            </div>
                            <div className={'full-center margin-input-last'}>
                                <div className={'input-center-full'}>
                                    <Input value={phone} setValue={setPhone}
                                           placeholder={currentUser.phone ? currentUser.phone : 'Введіть телефон'}
                                           type={'number'} className={'input-edit-info'}/>
                                </div>
                            </div>
                            {role === WORLD_USER &&
                            <NewPochta setSity={setSity} setNumberNP={setNumberNP}/>
                            }
                        </div>
                        <div>
                            <div className={'full-center margin-input'}>
                                <div className={'input-center-full'}>
                                    <Input value={oldPassword} setValue={setOldPassword} placeholder={'Старий пароль'}
                                           type={'password'} className={'input-edit-info'}/>
                                </div>
                            </div>
                            <div className={'full-center margin-input'}>
                                <div className={'input-center-full'}>
                                    <input type="password" id="pass-old" className="input-focus input-edit-info"
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
                                    <input type="password" id="pass-new" className="input-focus last input-edit-info"
                                           placeholder="Повторити новий пароль"
                                           name="password" onInput={stylePassword}/>
                                </div>
                                <FiCheck className={`icon_ok notVisible`} id={'icon'}/>
                            </div>
                            {role === WORLD_USER &&
                            <div>
                                <div className={`full-center margin-input `}>
                                    <div className={`input-center-full  inp`}>
                                        <input className="input-focus input-edit-info" value={sity} readOnly={true}
                                               placeholder={currentUser.nameSity ? currentUser.nameSity : '<= Оберіть місто'}/>
                                    </div>
                                </div>
                                <div className={`full-center margin-input `}>
                                    <div className={`input-center-full  inp-last`}>
                                        {
                                            sity &&
                                            <input className="input-focus input-edit-info"
                                                   value={`Відділення № ${numberNP}`}
                                                   placeholder={currentUser.nameDepartment ? `Відділення № ${currentUser.nameDepartment}` : 'Оберіть відділення'}
                                                   readOnly={true}/>
                                        }
                                    </div>
                                </div>
                            </div>
                            }
                        </div>
                    </div>
                    <div className={'full-center margin-input'}>
                        {role === WORLD_ADMIN &&
                        <button className={'btn-save'} type='submit' onClick={() => {
                            APIServise.editPage(currentUser._id, name, surname, email, phone, oldPassword, number, numberToo);
                        }}>Змінити та зберегти</button>
                        }
                        {role === WORLD_USER &&
                        <button className={'btn-save'} type='submit' onClick={() => {
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
