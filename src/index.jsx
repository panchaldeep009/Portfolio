import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom';

import App from './App.jsx';
import Theme from './styles/Theme';

import 'reset-css';
import './styles/scss/App.scss';

ReactDOM.render(
    <Theme>
        <Router>
            <Route
                render={router => {
                    return <App router={router} />;
                }}
            />
        </Router>
    </Theme>,
    document.getElementById('app'),
);
