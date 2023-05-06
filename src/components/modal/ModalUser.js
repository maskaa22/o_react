import * as React from "react";
import {Box, Modal} from "@mui/material";

import {DeleteUser} from "../deleteUser";
import {LoginingForm} from "../loginingForm";
import {ModalCalendar} from "./ModalCalendar";
import {ModalRegister} from "./ModalRegister";
import {ModalSendUser} from "./ModalSendUser";
import {WORLD_ADMIN} from "../../config/wordsConstants";

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
                              register,
                              setDelUser
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
                        del && <DeleteUser handleClose={handleClose} setDelUser={setDelUser}/>
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
