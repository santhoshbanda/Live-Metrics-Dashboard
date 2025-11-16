import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import type {TransitionProps} from '@mui/material/transitions';
import type {Service} from "../utils/types.ts";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<unknown>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface AnalyticsModalProps {
    isOpen: boolean,
    service?: Service | null
    handleClose: () => void
}
const AnalyticsModal = ({handleClose, service, isOpen}: AnalyticsModalProps) => {
    return <>
        <Dialog
            fullScreen
            open={isOpen}
            onClose={handleClose}
            slots={{
                transition: Transition,
            }}
        >
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <Typography sx={{ flex: 1 }} variant="h6" component="div">
                        {service?.serviceName}
                    </Typography>
                    <Button color="inherit" onClick={handleClose}>
                        Close
                    </Button>
                </Toolbar>
            </AppBar>
            {service && <div className={'analytics-holder'}>

            </div>}

        </Dialog>
    </>
}
export default AnalyticsModal;
