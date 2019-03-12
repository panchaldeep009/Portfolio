import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'react-jss';

import Styles from '../styles/ui/AppBar';

const AppBar = ({ items, options, classes }) => {
    return (
        <div style={options} className={classes.Bar}>
            {items.map(app => {
                const handleOpenApp = app.onclick;
                return (
                    <div
                        onClick={handleOpenApp}
                        onKeyPress={handleOpenApp}
                        role="button"
                        tabIndex={0}
                        className={classes.Apps}
                        key={app.id}
                    >
                        <img
                            className={classes.AppIcon}
                            src={app.icon}
                            alt="app_icon"
                        />
                        <span className={classes.AppName}>{app.name}</span>
                    </div>
                );
            })}
        </div>
    );
};

AppBar.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object),
    options: PropTypes.objectOf(PropTypes.any),
    classes: PropTypes.objectOf(PropTypes.any),
};

export default withStyles(Styles)(AppBar);
