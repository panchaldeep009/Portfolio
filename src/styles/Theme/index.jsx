import React from 'react';
import PropTypes from 'prop-types';

import { ThemeProvider } from 'react-jss';
import ThemeStyles from './Theme';
import ThemeDynamics from './ThemeDynamics';

const Theme = ({ children }) => {
    return (
        <ThemeProvider
            theme={{
                ...ThemeDynamics(),
                ...ThemeStyles(ThemeDynamics().device),
            }}
        >
            {children}
        </ThemeProvider>
    );
};

Theme.propTypes = {
    children: PropTypes.PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
};
export default Theme;
