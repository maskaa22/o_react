import * as React from "react";
import {useState} from "react";
import {FiCheckCircle} from "react-icons/fi";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import {useSelector} from "react-redux";

import {editAdressData, editContactData} from "../../servises";
import {Input} from "../../utils";
import {NewPochta} from "../newPochta";
import {WORD_CART, WORD_CART_UK, WORD_CASH, WORD_HIDEN, WORD_MONEY, WORD_SUCCESS} from "../../config/wordsConstants";

export function InfoForBuy({setPay}) {

    const [name, setName] = useState('');
    const [numberNP, setNumberNP] = useState('');
    const [phone, setPhone] = useState('');
    const [sity, setSity] = useState('');
    const [stateAdress, setStateAdress] = useState(false);
    const [stateInput, setStateInput] = useState(false);
    const [stateName, setStateName] = useState(true);
    const [stateNameAdress, setStateNameAdress] = useState(true);
    // const [success, setSuccess] = useState(WORD_SUCCESS);

    const [surname, setSurname] = useState('');
    const [value, setValue] = React.useState('');
    const [visibleNumber, setVisibleNumber] = useState(WORD_HIDEN);
    const [visibleSity, setVisibleSity] = useState(WORD_HIDEN);

    const success = WORD_SUCCESS;

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
        <div>
            <div className={'basket_check'}>
                <div className={'flex__space__between'}>
                    <p className={'data_name'}>Контактні дані</p>
                    {
                        stateName ? <button className={'update'} onClick={() => {
                                setStateName(false);
                                setStateInput(true);
                            }}>Змінити
                            </button> :
                            <div className={'close-date'} onClick={() => {
                                setStateInput(false);
                                setStateName(true);
                            }}><i className="fa fa-times" aria-hidden="true"/>
                            </div>
                    }
                </div>
                {
                    stateName &&
                    <div className={'data_div'}>
                        <div> {currentUser.name} {currentUser.surname ? currentUser.surname : 'Введіть призвіще'}</div>
                        <div>{currentUser.phone ? currentUser.phone : 'Введіть номер'} </div>
                    </div>
                }
                {
                    stateInput &&
                    <div className={'data_input'}>
                        <Input value={name} setValue={setName} placeholder={currentUser.name}
                               className={'input-basket-update'}/>
                        <Input value={surname} setValue={setSurname} placeholder={currentUser.surname}
                               className={'input-basket-update'}/>
                        <Input value={phone} setValue={setPhone} placeholder={currentUser.phone}
                               className={'input-basket-update'}/>
                        <div className={'d_flex edit-date-margin'}>
                            <button className={'check save'} onClick={() => {
                                editContactData(currentUser.id, name, surname, phone);
                                setStateInput(false);
                                setStateName(true);
                            }}>Продовжити
                            </button>
                        </div>
                    </div>
                }
            </div>
            <div className={'basket_check'}>
                <div className={'flex__space__between'}>
                    <p className={'data_name'}>Доставка</p>
                    {
                        stateNameAdress ? <button className={'update'} onClick={() => {
                                setStateNameAdress(false);
                                setStateAdress(true);
                            }}>Змінити
                            </button> :
                            <div className={'close'} onClick={() => {
                                setStateNameAdress(true);
                                setStateAdress(false);
                            }}><i className="fa fa-times" aria-hidden="true"/>
                            </div>
                    }
                </div>
                {
                    stateNameAdress &&
                    <div className={'data_div'}>м. {currentUser.nameSity}, відділення №
                        - {currentUser.nameDepartment}</div>
                }
                {
                    stateAdress &&
                    <div>
                        <div className={'flex_space_between data_input'}>
                            <NewPochta setSity={setSity} setNumberNP={setNumberNP}
                                       setVisibleSity={setVisibleSity} setVisibleNumber={setVisibleNumber}
                            />
                            <div>
                                <div className={` ${visibleSity} label_input`}>
                                    <input className="input-focus" value={`м. ${sity}`} readOnly={true}/>
                                </div>
                                <div className={` ${visibleNumber} label_input_last`}>
                                    <input className="input-focus" value={`відділення № ${numberNP}`} readOnly={true}/>
                                </div>
                            </div>
                        </div>
                        <div className={'d_flex edit-date-margin-last'}>
                            <button className={'check save'} onClick={() => {
                                editAdressData(currentUser.id, sity, numberNP);
                                setStateNameAdress(true);
                                setStateAdress(false);
                                setVisibleSity(WORD_HIDEN);
                                setVisibleNumber(WORD_HIDEN);
                            }}>Продовжити
                            </button>
                        </div>
                    </div>
                }
            </div>
            <div className={'basket_check'}>
                <div className={'flex_space_between'}>
                    <p className={'data_name byu-title'}>Оплата</p>
                    <div className={`${success}`}>
                        Сплачено <FiCheckCircle className=" icon_basket byu_ok"/>
                    </div>
                </div>
                {
                    success === WORD_SUCCESS &&
                    <div className={'data_div'}>
                        <FormControl>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                name="radio-buttons-group"
                                value={value}
                                onChange={handleChange}
                            >
                                <FormControlLabel value={WORD_CASH} control={<Radio/>} label={WORD_MONEY}/>
                                <FormControlLabel value={WORD_CART} control={<Radio/>
                                } label={WORD_CART_UK}/>
                            </RadioGroup>
                        </FormControl>
                    </div>
                }
            </div>
        </div>
    );
}
