import React from 'react';
import PropTypes from 'prop-types';
import { Transition, config } from 'react-spring/renderprops';
import withStyles from 'react-jss';

import Styles from '../styles/container/HomeSection';

const AppBar = React.lazy(() => {
    return import(/* Code: "AppBar" */ '../ui/AppBar');
});
const Window = React.lazy(() => {
    return import(/* Code: "Window" */ '../ui/Window');
});

const Apps = ({ allApps, router }) => {
    const { appBar } = allApps;
    const [apps, setApps] = React.useState(
        allApps.apps
            .map(app => {
                return { ...app, title: app.name };
            })
            .slice(0),
    );
    const changeTitle = (appId, title) => {
        setApps(
            apps.map(app => {
                return { ...app, title: app.id === appId ? title : app.title };
            }),
        );
    };
    React.useEffect(
        () => {
            setApps(
                allApps.apps
                    .map(app => {
                        return { ...app, title: app.name };
                    })
                    .slice(0),
            );
        },
        [router],
    );
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
                                            title={app.title}
                                            icon={app.icon}
                                            animation={style}
                                            handleActions={{
                                                close: app.close,
                                            }}
                                        >
                                            <React.Suspense fallback>
                                                <app.content
                                                    changeTitle={title => {
                                                        changeTitle(
                                                            app.id,
                                                            title,
                                                        );
                                                    }}
                                                    thisApp={app}
                                                    changeApps={setApps}
                                                />
                                            </React.Suspense>
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
    router: PropTypes.objectOf(PropTypes.any),
};

export default withStyles(Styles)(Apps);
