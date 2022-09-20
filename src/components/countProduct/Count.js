import './Count.css'
import {FaAngleUp, FaAngleDown} from "react-icons/fa"
import {useState} from "react";
import {store} from "../reducers";
import {setNewProduct, setUser} from "../reducers/actionCreators";

export function Count ({
                           increase, id, decrease, changeValue,
                           setPrice,
                           price,
                           setLastCount,
                            product
                           //setNewCount
})
{

    let [count, setCount] = useState(1);

    return(
        <div className={'count'}>
            <div className={'count_box'}>
                <input type={'number'} className={'count_input'} min={'1'} max={'100'} value={count}
                       onChange={(e)=>{
                           setCount(e.target.value)
                           setLastCount(e.target.value)
                           setPrice(e.target.value*price)
                           //setNewCount(e.target.value)
                           // store.dispatch(setNewProduct(product, count, e.target.value*price));
                       }
                       } />
                {/*<input type={'number'} className={'count_input'} min={'1'} max={'100'} value={count}*/}
                {/*       onChange={(e)=>{*/}
                {/*            setCount(e.target.value)*/}
                {/*           setLastCount(e.target.value)*/}
                {/*           setPrice(e.target.value*price)*/}
                {/*           //setNewCount(e.target.value)*/}
                {/*          // store.dispatch(setNewProduct(product, count, e.target.value*price));*/}
                {/*       }*/}
                {/*} />*/}
            </div>
            <div className={'count_controls'}>
                <button type={'button'} className={'count_up'} onClick={()=>{
                    setCount(++count)
                    setLastCount(count)
                    //setNewCount(count)
                    setPrice(count*price)

                }}><FaAngleUp/></button>
                <button type={'button'} className={'count_down'} onClick={()=>{
                    if(count>1){
                        setCount(--count)
                        setLastCount(count)
                        //setNewCount(count)
                        setPrice(count*price)
                    } else if(count===1) {
                        setCount(count)
                        setLastCount(count)
                        //setNewCount(count)
                        setPrice(count*price)
                    }
                }}><FaAngleDown/></button>
                <button type={'button'} className={'count_up'} onClick={()=>{increase(id)}}><FaAngleUp/></button>
                {/*<button type={'button'} className={'count_down'} onClick={()=>{decrease(id)}}><FaAngleDown/></button>*/}
            </div>
        </div>
    );
}
