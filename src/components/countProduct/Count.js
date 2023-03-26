import {FaAngleDown, FaAngleUp} from "react-icons/fa";

import './Count.css';
import './Count@media.css';

export function Count({count, increase, id, decrease, changeValue}) {

    return (
        <div className={'count text-center'}>
            <div className={'count_box'}>
                <input onChange={(e) => {
                    changeValue(id, +e.target.value);
                }} type={'number'} className={'count_input'} min={'1'} max={'100'} value={count}/>
            </div>
            <div className={'count_controls'}>
                <button type={'button'} className={'count_up border_radius color_purple'} onClick={() => {
                    increase(id);
                }}><FaAngleUp/></button>
                <button type={'button'} className={'count_down border_radius color_purple'} onClick={() => {
                    decrease(id);
                }}><FaAngleDown/></button>
            </div>
        </div>
    );
}
