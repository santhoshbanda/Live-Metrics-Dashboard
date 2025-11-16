import React from 'react'
import App from './App.tsx'
import './index.scss'
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import Providers from "./store/provider.tsx";
import {ColorConfig} from "./constants";


// setting css variables from ColorConfig
Object.keys(ColorConfig).forEach((key:string, index) => {
    const value:string = Object.values(ColorConfig)[index];
    document.body.style.setProperty('--' + key, value);
})
// End Setting css variables from ColorConfig


const rootEl = document.getElementById('root') as HTMLElement;
const root = createRoot(rootEl);
root.render(
    <React.StrictMode>
        <Providers>
            <BrowserRouter basename={import.meta.env.PUBLIC_URL || ''}>
                <App/>
            </BrowserRouter>
        </Providers>
    </React.StrictMode>,
)
