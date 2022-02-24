import {useEffect} from "react";
import {useDispatch} from "react-redux";

import {APIServise} from "../servises";

export function HomePage ()
{
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(APIServise.auth());
    }, [])

    return(
        <div>
            HomePage
        </div>
    );
}
