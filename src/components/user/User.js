import "./User.css";

export default function User ({item})
{
    return(
        <div className={'name-table row-table '}>
            {/*{item.name} = {item.email}*/}

            <div className={'cell-table'}>{item.name}</div>
            <div className={'cell-table'}>{item.email}</div>
            <div className={'cell-table'}>{item.phone}</div>
            <div className={'cell-table'}><button className={'btn-ok'}>OK</button></div>
        </div>
    );
}
