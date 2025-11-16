import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import React from "react";

interface ActionType {
    name: string,
    icon: React.ReactElement,
    onClick: ()=> void
}

interface BasicSpeedDialProps {
    actions: ActionType[]
}

const BasicSpeedDial = ({actions}: BasicSpeedDialProps) => {
    return (
        <SpeedDial direction={'up'}
            ariaLabel="SpeedDial basic example"
            sx={{ position: 'fixed', bottom: 14, right: 14 }}
            icon={<SpeedDialIcon />}
        >
            {actions.map((action) => (
                <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    onClick={action.onClick}
                    slotProps={{
                        tooltip: {
                            title: action.name,
                        },
                    }}
                />
            ))}
        </SpeedDial>
    );
}

export default BasicSpeedDial;
