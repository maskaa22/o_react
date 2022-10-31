import * as React from "react";

import "./User.css";

export default function User ({item, setOpenSendUser, userEmail})
{

    return(
        <div className={'name-table row-table '}>
            {/*{item.name} = {item.email}*/}

            <div className={'cell-table'}>{item.name}</div>
            <div className={'cell-table'}>{item.email}</div>
            <div className={'cell-table'}>{item.phone}</div>
            <div className={'cell-table'}>{item.nameSity}</div>
            <div className={'cell-table'}>{item.nameDepartment}</div>
            <div className={'cell-table'}><button className={'btn-ok'} onClick={() =>
            {
                setOpenSendUser(true);
                userEmail(item.email)
            }
            }>OK</button></div>
        </div>
    );
}
