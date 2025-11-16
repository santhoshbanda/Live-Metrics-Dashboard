import {store} from "./index";
import {Provider} from "react-redux";
import * as React from "react";

const Providers = ({children}: { children: React.ReactNode }) => {
    return <Provider store={store}>
        {children}
    </Provider>
}

export default Providers
