import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {WORD_TOKEN} from "../../../../config/wordsConstants";
import {APIServise} from "../../../servises";

export function IsAuthFunction ()
{
    const dispatch = useDispatch();

    const isAuth = useSelector(state => state.user.isAuth);

    useEffect(() => {
        console.log(222);
        if(!isAuth) {
            localStorage.removeItem(WORD_TOKEN);
        } else
        if(localStorage.getItem(WORD_TOKEN)) {
            dispatch(APIServise.auth());
        }
    }, []);
}
