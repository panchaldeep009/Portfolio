import React from 'react';
import PropTypes from 'prop-types';
import { Swipe } from 'react-swipe-component';
import withStyles from 'react-jss';
import { Transition } from 'react-spring/renderprops';

import CodeSection from './container/codeSection';
// import DesignSection from './container/designSection';
import Styles from './styles/App';

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
    React.useEffect(() => {
        if (window.location.hash === '') {
            window.location.hash = '#/';
        }
    }, []);

    return (
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
                                <CodeSection router={router} options={style} />
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
                            return <div style={style}>design</div>;
                        })
                    );
                }}
            </Transition>
        </Swipe>
    );
};

App.propTypes = {
    classes: PropTypes.objectOf(PropTypes.any),
    router: PropTypes.objectOf(PropTypes.any),
};

export default withStyles(Styles)(App);
