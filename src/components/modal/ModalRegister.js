import {FaArrowRight, FaUserPlus} from "react-icons/fa";
import {MdClose} from "react-icons/md";
import {useNavigate} from "react-router-dom";

import './ModalModern.css';
import {LOGIN, REGISTRATION} from "../../config/headerConstants";

/*
 * Вікно для гостя, який натиснув на день у календарі: щоб записатися, потрібен акаунт.
 * Затемнення, закриття по кліку на фон і по Esc дає MUI Modal (див. ModalUser), тут лише картка.
 */
export function ModalRegister({handleClose}) {

    const navigate = useNavigate();

    return (
        <div className={'mr'}>
            <div className={'mr-card'} role={'dialog'} aria-label={'Потрібна реєстрація'}>
                <button type={'button'} className={'mr-close'} onClick={handleClose} aria-label={'Закрити'}>
                    <MdClose/>
                </button>
                <span className={'mr-icon'}><FaUserPlus aria-hidden={'true'}/></span>
                <h2 className={'mr-title'}>Зареєструйтеся</h2>
                <p className={'mr-text'}>Щоб записатися онлайн, потрібен акаунт. Це займе хвилину.</p>
                <button type={'button'} className={'mr-btn mr-btn--primary'} autoFocus
                        onClick={() => {
                            navigate(REGISTRATION)
                        }}>
                    До реєстрації <FaArrowRight aria-hidden={'true'}/>
                </button>
                <button type={'button'} className={'mr-btn mr-btn--ghost'} onClick={() => {
                    navigate(LOGIN)
                }}>
                    Вже є акаунт? Увійти
                </button>
            </div>
        </div>
    );
}
