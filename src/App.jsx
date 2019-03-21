import React from 'react';
import PropTypes from 'prop-types';
import { Swipe } from 'react-swipe-component';
import withStyles from 'react-jss';
import { Transition } from 'react-spring/renderprops';
import Styles from './styles/App';

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

    return (
        <React.Suspense fallback={<div>Loading</div>}>
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
    );
};

App.propTypes = {
    classes: PropTypes.objectOf(PropTypes.any),
    router: PropTypes.objectOf(PropTypes.any),
};

export default withStyles(Styles)(App);
