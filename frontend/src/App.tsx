import './App.scss'
import ThemeRegistry from "./theme/ThemeRegistry";
import Navigator from "./navigation/navigator";
import {ToastContainer} from "react-toastify";

const App = () => {
    return (
        <ThemeRegistry>
            <ToastContainer />
            <Navigator/>
        </ThemeRegistry>
    )
}

export default App
