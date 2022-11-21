import {useEffect} from "react";
import {useDispatch} from "react-redux";

import './Home.css'
import {APIServise} from "../servises";
import {Calendar} from "../calendar";

export function HomePage() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(APIServise.auth());
    }, [])

    return (
        <div className={'wrap'}>
            <Calendar/>
        </div>
    );
}
