import {useNavigate} from "react-router-dom";

import {REGISTRATION} from "../../config/headerConstants";

export function ModalRegister({handleClose}) {

    const navigate = useNavigate();

    return (
        <div className={'flex'}>
            <div className={'delete_user'}>
                <button className={'close_del'} onClick={handleClose}><i className="fa fa-times"
                                                                         aria-hidden="true"/></button>
                <h2 className={'h2'}>Зареєструйтеся</h2>
                <div className={'btn-position'}>
                    <button className={'btn-add'} onClick={() => {
                        navigate(REGISTRATION)
                    }}>До реєстрації
                    </button>
                </div>
            </div>
        </div>
    );
}
