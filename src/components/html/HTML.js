import React from "react";

import {App} from "../app/App";
import {Header} from "../header";
import {Footer} from "../footer";

export function HTML() {

    return (
        <div className={'wr'}>
            <Header/>
            <App/>
            <Footer/>
        </div>
    );
}
