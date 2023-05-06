import * as React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import './Modal.css';
import './Modal@media.css';
import {Input} from "../../utils";
import {useSelector} from "react-redux";

export function ModalCalendar({handleClose, date, eventCreateHandler, unix, newTime}) {

    const currentUser = useSelector(state => state.user.currentUser);

    const [time, setTime] = React.useState('');
    const [type, setType] = React.useState('');

    const handleChangeType = (event) => {
        setType(event.target.value);
    };
    const handleChangeTime = (event) => {
        setTime(event.target.value);
    };

    return (
        <div className={'flex'}>
            <div className={'create_event'}>
                <button className={'close_del'} onClick={handleClose}><i className="fa fa-times"
                                                                         aria-hidden="true"/></button>
                <h2 className={'h2'}>Записатися</h2>
                <div className={'flex_space_between'}>
                    <Input value={currentUser.name} readOnly className={'calendar-width'}/>
                    <div className={'input_date_width'}><Input value={date} readOnly className={'input-calendar-date'}/>
                    </div>
                </div>
                <div className={'flex_space_between'}>
                    <FormControl size="small" variant="standard" sx={{minWidth: 178}} className={'left-'}>
                        <InputLabel id="demo-simple-select-label">Вибрати тип</InputLabel>
                        <Select
                            className={'standard'}
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={type}
                            onChange={handleChangeType}
                        >
                            <MenuItem value={'чоловіча стрижка'}>чоловіча стрижка</MenuItem>
                            <MenuItem value={'жіноча стрижка'}>жіноча стрижка</MenuItem>
                            <MenuItem value={'покраска'}>покраска</MenuItem>
                            <MenuItem value={'зачіска'}>зачіска</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl sx={{minWidth: 70}} size="small" variant="standard">
                        <InputLabel id="demo-simple-select-label">Час</InputLabel>
                        <Select
                            className={'standard'}
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={time}
                            onChange={handleChangeTime}
                        >
                            {
                                newTime?.map(item => <MenuItem value={item.title} key={item.id}>{item.title}</MenuItem>)
                            }

                        </Select>
                    </FormControl>
                </div>
                <div className={'btn-position'}>
                    <button className={'btn-add'} onClick={() => {
                        eventCreateHandler(currentUser.name, unix, type, time, currentUser._id);
                    }}>Зберегти
                    </button>
                </div>
            </div>
        </div>
    );
}
