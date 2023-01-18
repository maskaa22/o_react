import {FiCheck} from "react-icons/fi";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";

import './EditPage.css';
import './EditPage@media.css';
import {APIServise} from "../servises";
import {Input} from "../utils";
import {NewPochta} from "../newPochta";
import {StyleForPassword, StyleIconOk} from '../utils/function'
import {WORLD_ADMIN, WORLD_USER} from "../../config/wordsConstants";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

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
    // const [file, setFile] = useState(null);

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

    const activeEmail = 'active-email';
    const nonActiveEmail = 'none';

    // const uploadFile = event => {
    //     console.log('upload start');
    //     console.log(event.target);
    //     let target = event.target || event.srcElement || event.currentTarget;
    //     let file = target.files[0];
    //     let xhr = new XMLHttpRequest();
    //     xhr.open('POST', 'http://localhost:5000/uploads/'+file.name, true);
    //     xhr.setRequestHeader('Content-Type', 'application/octet-stream');
    //     xhr.onreadystatechange = function () {
    //         event = null;
    //         if(xhr.readyState === 4) {
    //             if(xhr.status === 200) {
    //                 callBackFunction(this.responseText);
    //             } else {
    //                 console.log('error');
    //             }
    //         }
    //     };
    //     xhr.send(file);
    //     event.target.value = '';
    // }
    //
    // function callBackFunction(data) {
    //     console.log(data);
    //     // document.querySelector('.icon-image-user').src = 'images/'+data;
    // }

    // const addFoto = () => {
    //     const formData = new FormData();
    //     formData.append('img2', 'file');
    //     formData.append('img', file);
    //     const request = new XMLHttpRequest();
    //     request.open("POST", "http://localhost:5000/upload");
    //     request.send(formData);
    //     // saveFoto(formData).then(res => console.log(res))
    // }
    //
    // const handleOnChange = e => {
    //     console.log(e.target.files[0]);
    //     setFile(e.target.files[0]);
    //     addFoto();
    // };



    // document.addEventListener("DOMContentLoaded", function (){
    //     document.getElementById("form").addEventListener("change", submitForm)
    //     // document.getElementById("form").addEventListener("change", function () {
    //     //     submitForm()
    //     // })
    //     // document.getElementById("form").addEventListener("change", submitForm)
    //     // document.querySelectorAll("form.form").forEach(function (newBreakPointWindow) {
    //     //     newBreakPointWindow.addEventListener("change", submitForm)
    //     // })
    //     // form.addEventListener("change", submitForm);
    //
    // });
    //
    // function submitForm(e) {
    //      e.preventDefault();
    //
    //    //console.log(e.target.files[0]);
    //     // const files = document.getElementById("file-upload");
    //      const formData = new FormData();
    //     // console.log(files.files);
    //     //
    //     // // for(let i =0; i < files.files.length; i++) {
    //      formData.append("files", e.target.files[0]);
    //
    //     // if(currentUser._id) {
    //     //     formData.append("user", (currentUser._id));
    //     // }
    //     // // }
    //     fetch("http://localhost:5000/upload_files", {
    //         method: 'POST',
    //         body: formData,
    //     })
    //         // .then((res) => console.log(res))
    //         .catch((err) => ("Error occured", err));
    //
    //     document.getElementById("form").removeEventListener("change", submitForm)
    // }

    async function q (e) {
        console.log(e.target.files);
        const formData = new FormData();
        formData.append("files", e.target.files[0]);
        formData.append("name", currentUser._id);

        await fetch("http://localhost:5000/upload_files", {
                method: 'POST',
                body: formData,
            })
                 .then((res) => console.log(res))
                .catch((err) => ("Error occured", err));
        //APIServise.getFoto(currentUser._id).then(res => console.log(res))
    }

    // document.addEventListener("DOMContentLoaded", function (){
    //     console.log(currentUser.foto);
    //
    // })
    // console.log(currentUser.foto);
//     const [file, setFile] = useState('');
// setFile(currentUser.foto);
// // console.log(file);
//
//     const slideStylesWidthBackground = {
//         backgroundImage: `url(${file})`,
//     };

    // useEffect(() => {
    //     APIServise.getFoto(currentUser._id).then(res => console.log(res))
    // },)

// console.log(currentUser.img.data.data);
//     const str = (currentUser.img.data.data).toString('base64');
//     console.log(str);
//     const img = new Buffer.from(currentUser.img.data.data).toString('base64');
//     console.log(img);
    // const base64String = btoa(String.fromCharCode(...new Uint8Array(str)));
    // console.log(base64String);
    function stringAvatar(name) {
        return {
            children: `${name.split(' ')[0][0]}`,
        };
    }

    return (
        <div>
            <div className={'full-center'}>
                <div className={'border-box'}>
                    <h2 className={'edit-h2'}>Редагування інформації</h2>
                    <div className={'full-center'}>
                        <Stack direction="row" spacing={2}>
                            <Avatar {...stringAvatar(currentUser.name)} sx={{ bgcolor: '#78c9b8' }}/>
                        </Stack>
                        {/*<img className={'circle icon-image-user'} alt={'circle'}*/}
                        {/*     src={currentUser.foto}/>*/}

                    </div>
                    <div className={'full-center download-foto-margin'}>
                        <form id='form' >
                            <label htmlFor="file-upload" className="custom-file-upload">
                                <i className="fa fa-cloud-upload"/> Загрузити фото
                            </label>
                            <input id="file-upload" type="file" name={'files'} className="checkbox" onChange={q}/>
                        </form>
                    </div>
                    <div>
                        <div className={'full-center margin-input'}>
                            <div
                                className={currentUser.is_active === false ? `input-center-full ${activeEmail}` : `input-center-full ${nonActiveEmail}`}>
                                Підтвердіть пошту
                            </div>
                        </div>
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
