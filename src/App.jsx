import React from 'react';
import PropTypes from 'prop-types';
import { Swipe } from 'react-swipe-component';
import withStyles from 'react-jss';

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
        if (window.DeviceOrientationEvent) {
            window.addEventListener(
                'deviceorientation',
                event => {
                    setCursor({ x: event.gamma * 10, y: event.beta * 10 });
                },
                true,
            );
        } else if (window.DeviceMotionEvent) {
            window.addEventListener(
                'devicemotion',
                event => {
                    setCursor({
                        x: event.acceleration.x * 2,
                        y: event.acceleration.y * 2,
                    });
                },
                true,
            );
        } else {
            window.addEventListener(
                'MozOrientation',
                orientation => {
                    setCursor({ x: orientation.x * 50, y: orientation.y * 50 });
                },
                true,
            );
        }
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
                    {!router.location.pathname.includes('design') && (
                        <CodeSection cursor={cursor} router={router} />
                    )}
                    {!router.location.pathname.includes('code') && (
                        <DesignSection cursor={cursor} router={router} />
                    )}
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
