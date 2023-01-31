import * as React from "react";
import {Box, Modal} from "@mui/material";

import {DeleteUser} from "../deleteUser";
import {LoginingForm} from "../loginingForm";
import {ModalSendUser} from "./ModalSendUser";
import {ModalCalendar} from "./ModalCalendar";
import {WORLD_ADMIN} from "../../config/wordsConstants";
import {ModalRegister} from "./ModalRegister";

export function ModalUser({
                              openWindow,
                              handleClose,
                              role,
                              send,
                              del,
                              userEmail,
                              calendar,
                              date,
                              eventCreateHandler,
                              unix,
                              time,
                              register
                          }) {

    return (
        <div>
            <Modal
                open={openWindow}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box>
                    {
                        role && <LoginingForm role={WORLD_ADMIN} handleClose={handleClose}/>
                    }
                    {
                        del && <DeleteUser handleClose={handleClose}/>
                    }
                    {
                        register && <ModalRegister handleClose={handleClose}/>
                    }
                    {
                        send && <ModalSendUser handleClose={handleClose} userEmail={userEmail}/>
                    }
                    {
                        calendar &&
                        <ModalCalendar handleClose={handleClose} date={date} eventCreateHandler={eventCreateHandler}
                                       unix={unix} newTime={time}/>
                    }
                </Box>
            </Modal>
        </div>
    );
}
