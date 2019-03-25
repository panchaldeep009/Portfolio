import React from 'react';
import PropTypes from 'prop-types';
import { Swipe } from 'react-swipe-component';
import withStyles from 'react-jss';
import { Transition } from 'react-spring/renderprops';

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

import Styles from './styles/App';
import Layer from './ui/Layer';
import Animation from './ui/Animation';
import LoadingAnimation from './assets/animation_data/loadingScreen.json';
import { Dark, Light } from './styles/Theme/MuiTheme';

const CodeSection = React.lazy(() => {
    return import(/* webpackChunkName: "CodeSection" */ './container/codeSection');
});
const DesignSection = React.lazy(() => {
    return import(/* webpackChunkName: "DesignSection" */ './container/designSection');
});

const App = ({ classes, router }) => {
    const swipeURL = ['/code', '/', '/design'];
    const onSwipe = num => {
        if (swipeURL.includes(router.location.pathname)) {
            const newURL =
                swipeURL[swipeURL.indexOf(router.location.pathname) + num];
            if (newURL !== undefined) {
                router.history.push(newURL);
            }
        }
    };

    const [cursor, setCursor] = React.useState({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
    });

    React.useEffect(() => {
        window.addEventListener('mousemove', e => {
            setCursor({ x: e.clientX, y: e.clientY });
        });
        return () => {
            window.removeEventListener('mousemove', e => {
                setCursor({ x: e.clientX, y: e.clientY });
            });
        };
    }, []);
    const Loading = (
        <Layer className={classes.Loading}>
            <Animation
                options={{
                    animationData: LoadingAnimation,
                    autoplay: true,
                    loop: false,
                }}
            />
        </Layer>
    );
    return (
        <MuiThemeProvider
            theme={router.location.pathname.includes('code') ? Dark : Light}
        >
            <React.Suspense fallback={Loading}>
                <Swipe
                    detectTouch
                    onSwipedLeft={() => {
                        onSwipe(1);
                    }}
                    onSwipedRight={() => {
                        onSwipe(-1);
                    }}
                    className={classes.Home}
                >
                    <Transition
                        items={!router.location.pathname.includes('design')}
                        from={{ opacity: 0 }}
                        enter={{ opacity: 1 }}
                        leave={{ opacity: 0 }}
                    >
                        {show => {
                            return (
                                show &&
                                (style => {
                                    return (
                                        <CodeSection
                                            cursor={cursor}
                                            router={router}
                                            options={style}
                                        />
                                    );
                                })
                            );
                        }}
                    </Transition>
                    <Transition
                        items={!router.location.pathname.includes('code')}
                        from={{ opacity: 0 }}
                        enter={{ opacity: 1 }}
                        leave={{ opacity: 0 }}
                    >
                        {show => {
                            return (
                                show &&
                                (style => {
                                    return (
                                        <DesignSection
                                            cursor={cursor}
                                            router={router}
                                            options={style}
                                        />
                                    );
                                })
                            );
                        }}
                    </Transition>
                </Swipe>
            </React.Suspense>
        </MuiThemeProvider>
    );
};

App.propTypes = {
    classes: PropTypes.objectOf(PropTypes.any),
    router: PropTypes.objectOf(PropTypes.any),
};

export default withStyles(Styles)(App);
