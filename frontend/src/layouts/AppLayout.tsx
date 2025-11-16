import './AppLayout.scss';
import { Outlet } from "react-router-dom";
import {AppBar} from '@mui/material';
import {ImageConfig} from "../constants";
import {useAppSelector} from "../store/hooks.ts";

const AppLayout = () => {
    const {services} = useAppSelector(state => state.service);
    return (
        <div className="app-layout-screen">
            <AppBar position="fixed">
                <div className="app-header">
                    <div className="branding">
                        <img src={ImageConfig.reactLogo} alt={'logo'}/>
                    </div>
                    <div className="branding-text">
                        Live Metrics Dashboard
                    </div>
                    <div className="app-header-info">{(services || []).length} Services</div>
                </div>
                </AppBar>
            <div className={'app-layout-content'}>
                <Outlet />
            </div>
        </div>
    )
}

export default AppLayout;
