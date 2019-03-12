import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom';

import App from './App.jsx';
import ThemeProvider from './styles/Theme';

import 'reset-css';

ReactDOM.render(
    <ThemeProvider>
        <Router>
            <Route
                render={router => {
                    return <App router={router} />;
                }}
            />
        </Router>
    </ThemeProvider>,
    document.getElementById('app'),
);
