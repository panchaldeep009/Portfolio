import React from 'react';
import PropTypes from 'prop-types';
import { Transition, config } from 'react-spring/renderprops';
import withStyles from 'react-jss';

import AppBar from '../ui/AppBar';
import Window from '../ui/Window';

import Styles from '../styles/container/HomeSection';

const Apps = ({ allApps }) => {
    const { apps, appBar } = allApps;
    return (
        <React.Fragment>
            <Transition
                items={appBar}
                from={{ bottom: '-100%' }}
                enter={{ bottom: '0%' }}
                leave={{ bottom: '-100%' }}
            >
                {show => {
                    return (
                        show &&
                        (style => {
                            return <AppBar options={style} items={apps} />;
                        })
                    );
                }}
            </Transition>
            {apps.map(app => {
                return (
                    <Transition
                        items={app.openState}
                        config={config.wobbly}
                        key={app.id}
                        from={{ top: 110, scale: 0 }}
                        enter={{ top: 0, scale: 1 }}
                        leave={{ top: 110, scale: 0 }}
                    >
                        {show => {
                            return (
                                show &&
                                (style => {
                                    return (
                                        <Window
                                            title={app.name}
                                            icon={app.icon}
                                            animation={style}
                                            handleActions={{
                                                close: app.close,
                                            }}
                                        >
                                            {app.content}
                                        </Window>
                                    );
                                })
                            );
                        }}
                    </Transition>
                );
            })}
        </React.Fragment>
    );
};

Apps.propTypes = {
    allApps: PropTypes.objectOf(PropTypes.any),
};

export default withStyles(Styles)(Apps);
