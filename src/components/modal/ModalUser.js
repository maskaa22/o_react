import * as React from "react";
import {Box, Modal} from "@mui/material";

import {LoginingForm} from "../loginingForm";
import {DeleteUser} from "../deleteUser";
import {ModalSendUser} from "./ModalSendUser";

export function ModalUser ({openWindow, handleClose, role, send, del, userEmail})
{
    return(
        <div>
            <Modal
                open={openWindow}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box >
                    {
                        role && <LoginingForm role={'admin'} handleClose={handleClose}/>
                    }
                    {
                        del && <DeleteUser handleClose={handleClose}/>
                    }
                    {
                        send && <ModalSendUser handleClose={handleClose} userEmail={userEmail}/>
                    }
                </Box>
            </Modal>
        </div>
    );
}
