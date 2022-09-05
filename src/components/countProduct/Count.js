import './Count.css'
import {FaAngleUp, FaAngleDown} from "react-icons/fa"

export function Count ({count, increase, id, decrease, changeValue})
{

    return(
        <div className={'count'}>
            <div className={'count_box'}>
                <input onChange={(e)=>{changeValue(id, +e.target.value)}} type={'number'} className={'count_input'} min={'1'} max={'100'} value={count}/>
            </div>
            <div className={'count_controls'}>
                <button type={'button'} className={'count_up'} onClick={()=>{increase(id)}}><FaAngleUp/></button>
                <button type={'button'} className={'count_down'} onClick={()=>{decrease(id)}}><FaAngleDown/></button>
            </div>
        </div>
    );
}
