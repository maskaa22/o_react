import {Input} from "../utils";
import {FiCheck} from "react-icons/fi";
import {APIServise} from "../servises";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import './EditPage.css'

import {NewPochta} from "../newPochta";



export function Edit ()
{
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
    const [visibleSity, setVisibleSity] = useState('hiden');
    const [visibleNumber, setVisibleNumber] = useState('hiden');




    const s_letters = "qwertyuiopasdfghjklzxcvbnm";
    const b_letters = "QWERTYUIOPLKJHGFDSAZXCVBNM";
    const digits = "0123456789"; // Цифры

    const block_check = document.getElementById('block_check');

    const handleClick = event => {
        setNumber(event.target.value)

        let is_s = false;
        let is_b = false;
        let is_d = false;

        for (let i = 0; i < number.length; i++) {

            if (!is_s && s_letters.indexOf(number[i]) !== -1) {
                is_s = true
            }
            else if (!is_b && b_letters.indexOf(number[i]) !== -1) {
                is_b = true
            }
            else if (!is_d && digits.indexOf(number[i]) !== -1) {
                is_d = true
            }
        }
        let rating = 0;
        if (is_s) rating++;
        if (is_b) rating++;
        if (is_d) rating++;

        if (number.length < 1 ) {
            block_check.style.width = "0";
        }
        if (number.length < 6 && rating < 3) {
            block_check.style.width = "10%";
            block_check.style.backgroundColor = '#e7140d';
        }
        else if (number.length < 6 && rating >= 3) {
            block_check.style.width = "50%";
            block_check.style.backgroundColor = '#ffdb00';
        }
        else if (number.length >= 8 && rating < 3) {
            block_check.style.width = "50%";
            block_check.style.backgroundColor = '#ffdb00';
        }
        else if (number.length >= 8 && rating >= 3) {
            block_check.style.width = "93%";
            block_check.style.backgroundColor = '#61ac27';
        }
        else if (number.length >= 6 && rating === 1) {
            block_check.style.width = "10%";
            block_check.style.backgroundColor = '#e7140d';
        }
        else if (number.length >= 6 && rating > 1 && rating < 4) {
            block_check.style.width = "50%";
            block_check.style.backgroundColor = '#ffdb00';
        }
        else if (number.length >= 6 && rating === 4) {
            block_check.style.width = "93%";
            block_check.style.backgroundColor = '#61ac27';
        }
    }



    function srav(){

        const diag_nap_uchr = document.getElementById('pass-old');
        const diag_osn = document.getElementById('pass-new');
        const icon = document.getElementById('xx');
        setNumberToo(diag_osn.value);
        if (diag_nap_uchr.value !== diag_osn.value){
            icon.style.visibility = 'hidden';
        }
        if (diag_nap_uchr.value === diag_osn.value && diag_nap_uchr.value!==''){
            icon.style.visibility = 'visible';
        }
    }



    return(
        <div>
            <h2>Редактирование информации</h2>

            <div className={'full-center'}>
                <img className={'circle'}/>
            </div>
            <div className={'full-center'}>
                <label htmlFor="file-upload" className="custom-file-upload">
                    <i className="fa fa-cloud-upload"/> Загрузить фото
                </label>
                <input id="file-upload" type="file"/>
            </div>

            <div className={'around'}>
                <div>

                    <div className={'full-center'}>
                        <div className={'newInput'}>
                            <Input value={name} setValue={setName} placeholder={'Имя'} type={'text'}/>
                        </div>
                    </div>
                    <div className={'full-center'}>
                        <div className={'newInput'}>
                            <Input value={surname} setValue={setSurname} placeholder={'Фамилия'} type={'text'}/>
                        </div>
                    </div>
                    <div className={'full-center'}>
                        <div className={'newInput'}>
                            <Input value={email} setValue={setEmail} placeholder={'Почта'} type={'email'}/>
                        </div>
                    </div>
                    <div className={'full-center'}>
                        <div className={'newInput'}>
                            <Input value={phone} setValue={setPhone} placeholder={'Телефон'} type={'number'}/>
                        </div>
                    </div>

                    { role === 'user' &&
                    <NewPochta setSity={setSity} setNumberNP={setNumberNP}
                               setVisibleSity={setVisibleSity} setVisibleNumber={setVisibleNumber}/>
                    }
                </div>


                <div>
                    <div className={'full-center'}>
                        <div className={'newInput'}>
                            <Input value={oldPassword} setValue={setOldPassword} placeholder={'Старый пароль'} type={'password'}/>
                        </div>
                    </div>

                    <div className={'full-center'}>
                        <div className={'newInput'}>
                            <input type="password" id="pass-old" className="input-focus" placeholder="Новый пароль"
                                   name="password" value={number} onChange={handleClick} onInput={srav}/>
                        </div>
                    </div>

                    <div className={'full-center position_box'}>
                        <div className={'newInput'} id="block_check">
                        </div>
                    </div>

                    <div className={'full-center'}>
                        <div className={'newInput last'}>
                            <input type="password" id="pass-new" className="input-focus last" placeholder="Повторить новый пароль"
                                   name="password" onInput={srav}/>
                        </div>
                        <FiCheck className={`icon_ok notVisible`} id={'xx'}/>
                    </div>

                    <div className={'full-center'}>
                        <div className={`newInput ${visibleSity} inp`}>
                            <input className="input-focus" value={sity} readOnly={true}/>
                        </div></div>
                    <div className={'full-center'}>
                            <div className={`newInput ${visibleNumber} inp-last`}>
                            <input className="input-focus" value={numberNP} readOnly={true}/>
                        </div></div>

                </div>
            </div>

            <div className={'full-center'}>
                { role==='admin' &&
                    <button className={'btn-save'} onClick={() => {
                        // APIServise.editAdminPage(currentUser._id, name, surname, email, phone, oldPassword, number, numberToo)
                        APIServise.editPage(currentUser._id, name, surname, email, phone, oldPassword, number, numberToo)
                    }}>Изменить и сохранить</button>
                 }
                { role === 'user' &&
                    <button className={'btn-save'} onClick={() => {

                        APIServise.editPage(currentUser._id, name, surname, email, phone, oldPassword, number, numberToo,
                            sity, numberNP)
                    }}>Изменить и сохранить</button>
                }

            </div>

        </div>
    );
}
