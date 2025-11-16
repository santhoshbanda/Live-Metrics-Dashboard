
import { createTheme } from '@mui/material/styles';
import {ColorConfig} from "../constants";

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: ColorConfig.primary,
        },
        secondary: {
            main: ColorConfig.secondary,
        },
        text: {
            primary: ColorConfig.textDark,
        },
        background: {
            default: ColorConfig.backgroundColor,
        },
        info: {
            main: ColorConfig.info,
            contrastText: '#FFF'
        },
        error: {
            main: ColorConfig.error,
            contrastText: '#FFF'
        },
        success: {
            main: ColorConfig.success,
            contrastText: ColorConfig.successContrastText
        },
        warning: {
            main: ColorConfig.warn,
            contrastText: '#FFF'
        },

    },
    typography: {
        fontFamily: 'lexend',
        allVariants: {
            fontFamily: 'lexend',
        }
    },
    components: {

    },
});

export default theme;
