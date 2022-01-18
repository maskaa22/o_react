import User from "../user/User";

export default function Users ({items})
{
    return(
        <div>
            <h2>Список пользователей</h2>

            <div className={'user-table'}>
                <div className={'name-table'}>
                    <div className={'cell-table'}>Имя </div>
                    <div className={'cell-table'}>Почта </div>
                    <div className={'cell-table'}>3434</div>
                    <div className={'cell-table'}>dfsdvs</div>
                </div>
                {
                    items.map(user => <User key={user._id} item={user}/>)
                }
            </div>
        </div>
    );
}
