import * as React from "react";
import {FiCheckCircle} from "react-icons/fi";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import {useSelector} from "react-redux";
import {useState} from "react";

import {APIServise} from "../servises";
import {Input} from "../utils";
import {NewPochta} from "../newPochta";
import {WORD_CART, WORD_CART_UK, WORD_CASH, WORD_HIDEN, WORD_MONEY, WORD_SUCCESS} from "../../config/wordsConstants";


export function InfoForBuy({money, setPay, product, cart}) {


    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [phone, setPhone] = useState('');
    const [stateName, setStateName] = useState(true);
    const [stateInput, setStateInput] = useState(false);
    const [stateNameAdress, setStateNameAdress] = useState(true);
    const [stateAdress, setStateAdress] = useState(false);
    const [sity, setSity] = useState('');
    const [numberNP, setNumberNP] = useState('');
    const [visibleSity, setVisibleSity] = useState(WORD_HIDEN);
    const [visibleNumber, setVisibleNumber] = useState(WORD_HIDEN);
    const [value, setValue] = React.useState('');
    const [success, setSuccess] = useState(WORD_SUCCESS);


    const currentUser = useSelector(state => state.user.currentUser);


    const handleChange = (event) => {

        setValue(event.target.value);
        if (event.target.value === WORD_CASH) {
            setPay(WORD_MONEY)
        } else if (event.target.value === WORD_CART) {
            setPay(WORD_CART_UK)
        }

    };


    return (
        <div>
            <div className={'basket_check'}>
                <div className={'flex__space__between'}>
                    <p className={'data_name'}>Контактні дані</p>
                    <button className={'update'} onClick={() => {
                        setStateName(false);
                        setStateInput(true)
                    }}>Змінити
                    </button>
                </div>
                {
                    stateName &&
                    <div className={'data_div'}>
                        <div> {currentUser.name} {currentUser.surname}</div>
                        <div>{currentUser.phone} </div>
                    </div>
                }
                {
                    stateInput &&
                    <div className={'data_input'}>
                        <Input value={name} setValue={setName} placeholder={currentUser.name}/>
                        <Input value={surname} setValue={setSurname} placeholder={currentUser.surname}/>
                        <Input value={phone} setValue={setPhone} placeholder={currentUser.phone}/>
                        <div className={'d_flex edit-date-margin'}>
                            <button className={'check save'} onClick={() => {
                                APIServise.editContactData(currentUser.id, name, surname, phone)
                                setStateInput(false)
                                setStateName(true);
                            }
                            }>Продовжити
                            </button>
                        </div>
                    </div>
                }
            </div>

            <div className={'basket_check'}>
                <div className={'flex__space__between'}>
                    <p className={'data_name'}>Доставка</p>
                    <button className={'update'} onClick={() => {
                        setStateNameAdress(false);
                        setStateAdress(true)
                    }}>Змінити
                    </button>
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
                                //TODO функция редактирования данних
                                APIServise.editAdressData(currentUser.id, sity, numberNP)
                                setStateNameAdress(true);
                                setStateAdress(false);
                                setVisibleSity(WORD_HIDEN);
                                setVisibleNumber(WORD_HIDEN);
                            }
                            }>Продовжити
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

                                    //message ? <Message message={message} /> : <ProductDisplay />


                                    // <StripeCheckout
                                    //     token={makePayment}
                                    //     stripeKey={PRIVATE_KEY_STRIPE}
                                    //     name={'Введіть дані'}
                                    //     amount={money*100}
                                    //     currency="UAH"
                                    //     email={currentUser.email}
                                    // >
                                    //     <Radio>{money}</Radio>
                                    // </StripeCheckout>

                                } label={WORD_CART_UK}/>
                            </RadioGroup>
                        </FormControl>
                    </div>
                }
            </div>

        </div>
    );
}
