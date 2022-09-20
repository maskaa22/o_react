import {Input} from "../utils";
import * as React from "react";
import {useState} from "react";
import {useSelector} from "react-redux";
import {NewPochta} from "../newPochta";
import {FiCheckCircle} from "react-icons/fi";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import StripeCheckout from "react-stripe-checkout";
import {PRIVATE_KEY_STRIPE} from "../../config/constants";
import {UserService} from "../servises/URL_Service";
import {APIServise} from "../servises";
import {store} from "../reducers";
import {setUser} from "../reducers/actionCreators";

export function InfoForBuy ({money, setPay})
{

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [phone, setPhone] = useState('');
    const [stateName, setStateName] = useState(true);
    const [stateInput, setStateInput] = useState(false);
    const [stateNameAdress, setStateNameAdress] = useState(true);
    const [stateAdress, setStateAdress] = useState(false);
    const [sity, setSity] = useState('');
    const [numberNP, setNumberNP] = useState('');
    const [visibleSity, setVisibleSity] = useState('hiden');
    const [visibleNumber, setVisibleNumber] = useState('hiden');
    const [value, setValue] = React.useState('');
    const [success, setSuccess] = useState('not_success');


    const currentUser = useSelector(state => state.user.currentUser);

    const makePayment = token => {

        const price = money;
        const body = {
            token,
            price,
            email:currentUser.email
        }
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
        //return
        fetch('http://localhost:5000/payment', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
        }).then(response => {
            //console.log('RESPONCE', response);
            const {status} = response;
            console.log('STATUS', status);

            if(status===200) {
                setSuccess('success_byu');
                setPay('Сплачено')
            }
        }).catch(err => console.log(err))
    }

    const handleChange = (event) => {

        setValue(event.target.value);
        if(event.target.value==='cash') {
            setPay('Готівка')
        }

    };




    return(
        <div>
            <div className={'basket_check'}>
                <div className={'flex_space_between'}>
                    <p className={'data_name'}>Контактні дані</p>
                    <button className={'update'} onClick={() => {
                        setStateName(false);
                        setStateInput(true)
                    }}>Змінити</button>
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
                        <div className={'d_flex'}>
                            <button className={'check save'} onClick={() => {
                                APIServise.editContactData(currentUser.id, name, surname, phone)
                                setStateInput(false)
                                setStateName(true);
                            }
                            }>Продовжити</button>
                        </div>
                    </div>
                }
            </div>

            <div className={'basket_check'}>
                <div className={'flex_space_between'}>
                    <p className={'data_name'}>Доставка</p>
                    <button className={'update'} onClick={() => {
                        setStateNameAdress(false);
                        setStateAdress(true)
                    }}>Змінити</button>
                </div>
                {
                    stateNameAdress &&
                    <div className={'data_div'}>м. {currentUser.nameSity}, відділення № - {currentUser.nameDepartment}</div>
                }
                {
                    stateAdress &&
                    <div>
                        <div className={'flex_space_between data_input'}>
                            <NewPochta setSity={setSity} setNumberNP={setNumberNP}
                                       setVisibleSity={setVisibleSity} setVisibleNumber={setVisibleNumber}
                            />
                            <div >
                                <div className={` ${visibleSity} label_input`}>
                                    <input className="input-focus" value={sity} readOnly={true}/>
                                </div>
                                <div className={` ${visibleNumber} label_input_last`}>
                                    <input className="input-focus" value={numberNP} readOnly={true}/>
                                </div>
                            </div>
                        </div>
                        <div className={'d_flex'}>
                            <button className={'check save'} onClick={() => {
                                //TODO функция редактирования данних
                                APIServise.editAdressData(currentUser.id, sity, numberNP)
                                setStateNameAdress(true);
                                setStateAdress(false);
                                setVisibleSity('hiden');
                                setVisibleNumber('hiden');
                            }
                            }>Продовжити</button>
                        </div>
                    </div>
                }
            </div>

            <div className={'basket_check'}>
                <div className={'flex_space_between'}>
                    <p className={'data_name'}>Оплата</p>
                    <div className={`${success}`}>
                        Сплачено <FiCheckCircle className=" icon_basket byu_ok"/>
                    </div>
                </div>
                {
                    success==='not_success' &&
                    <div className={'data_div'}>
                        <FormControl>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                name="radio-buttons-group"
                                value={value}
                                onChange={handleChange}
                            >
                                <FormControlLabel value="cash" control={<Radio />} label="Готівка" />
                                <FormControlLabel value="cart" control={
                                    <StripeCheckout
                                        token={makePayment}
                                        stripeKey={PRIVATE_KEY_STRIPE}
                                        name={'Введіть дані'}
                                        amount={money*100}
                                        currency="UAH"
                                        email={currentUser.email}
                                    >
                                        <Radio>{money}</Radio>
                                    </StripeCheckout>
                                } label="Карта" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                }
            </div>

        </div>
    );
}