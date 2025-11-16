import {Navigate, Route, Routes} from 'react-router-dom';
import AppLayout from "../layouts/AppLayout.tsx";
import {DASHBOARD, DEFAULT_ROUTE} from "../constants/RoutesConfig.tsx";
import DashboardScreen from "../screens/dashboard/DashboardScreen.tsx";

const Navigator = () => {
    return (
        <>
            <Routes>
                <Route element={<AppLayout/>}>
                    <Route
                        index
                        element={
                            <Navigate to={DEFAULT_ROUTE}/>
                        }
                    />
                    <Route
                        path={DASHBOARD}
                        element={<DashboardScreen/>}
                    />
                </Route>
            </Routes>
        </>
    )

}
export default Navigator;

