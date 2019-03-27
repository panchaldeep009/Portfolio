import React from 'react';
import PropTypes from 'prop-types';
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
    // const [allA, setAllA] = React.useState(allApps);
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
    const windowSize = {
        width: 1024,
        height: 90,
    };
    return (
        <React.Fragment>
            {appBar && <AppBar items={apps} />}
            {apps.map(app => {
                return (
                    <div key={app.id}>
                        {app.openState && (
                            <Window
                                title={app.title}
                                icon={app.icon}
                                handleActions={{
                                    close: app.close,
                                }}
                                size={app.size ? app.size : windowSize}
                            >
                                <React.Suspense fallback>
                                    <app.content
                                        changeTitle={title => {
                                            changeTitle(app.id, title);
                                        }}
                                        thisApp={app}
                                        allApp={apps}
                                        changeApps={setApps}
                                        router={router}
                                    />
                                </React.Suspense>
                            </Window>
                        )}
                    </div>
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
