import './Registration.css'
import Input from "../utils/input/Input";
export default function Registration ()
{
    return(
        <div className={'registration'}>
            <div className="registration_header">Регистрация</div>
            <Input type={'text'} placeholder={'Введите имя'}/>
            <Input type={'text'} placeholder={'Введите имя'}/>
            <Input type={'text'} placeholder={'Введите имя'}/>
            <Input type={'text'} placeholder={'Введите имя'}/>
            <button className={'registration_btn'}>Ввойти</button>
        </div>
    );
}
