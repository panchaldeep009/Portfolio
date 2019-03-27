import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import indigo from '@material-ui/core/colors/indigo';
import yellow from '@material-ui/core/colors/yellow';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';

const Dark = createMuiTheme({
    palette: {
        primary: yellow,
        secondary: indigo,
        error: red,
        contrastThreshold: 3,
        tonalOffset: 0.2,
        type: 'dark',
    },
    typography: {
        useNextVariants: true,
    },
    status: {
        default: {
            white: 'rgb(255,255,255)',
            black: 'rgb(0,0,0)',
        },
        success: {
            light: green[300],
            main: green[600],
            dark: green[700],
            contrastText: 'rgb(255,255,255)',
        },
    },
});
const Light = createMuiTheme({
    palette: {
        primary: indigo,
        secondary: yellow,
        error: red,
        contrastThreshold: 3,
        tonalOffset: 0.2,
        type: 'light',
    },
    typography: {
        useNextVariants: true,
    },
    status: {
        default: {
            white: 'rgb(255,255,255)',
            black: 'rgb(0,0,0)',
        },
        success: {
            light: green[300],
            main: green[600],
            dark: green[700],
            contrastText: 'rgb(255,255,255)',
        },
    },
});
export { Dark, Light };
