import {Header} from "../header";
import {App} from "../app/App";
import {Footer} from "../footer";
import React from "react";

export function HTML ()
{
    return(
        <div className={'wr'}>
            <Header/>
            <App/>
            <Footer/>
        </div>
    );
}
