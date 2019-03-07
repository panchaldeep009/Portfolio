import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { GlobalProvider } from './global/globalState';

import 'reset-css';

ReactDOM.render(
    <GlobalProvider>
        <App />
    </GlobalProvider>,
    document.getElementById('app'),
);
