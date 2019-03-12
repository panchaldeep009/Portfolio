import React from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-spring/renderprops';
import withStyles from 'react-jss';

import Layer from '../ui/Layer';
import Animation from '../ui/Animation';
import AppBar from '../ui/AppBar';

import Styles from '../styles/container/HomeSection';

import Background from '../assets/animation_data/codeBackground.json';
import myAvatar from '../assets/svg/myAvatarShape.svg';
import codeIcon from '../assets/svg/codeIcon.svg';
import galleryIcon from '../assets/svg/galleryIcon.svg';

const Coder = ({ options, classes, router }) => {
    const BackgroundAnimation = React.useRef();

    React.useEffect(
        () => {
            if (BackgroundAnimation.current !== undefined) {
                BackgroundAnimation.current.Animation.setSpeed(0.3);
            }
        },
        [BackgroundAnimation.current],
    );

    return (
        <Layer
            className={classes.codeSection}
            options={{
                ...options,
            }}
        >
            <Layer options={{ pointerEvents: 'none' }}>
                <Animation
                    options={{
                        animationData: Background,
                    }}
                    ref={BackgroundAnimation}
                />
            </Layer>
            <Layer
                options={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    pointerEvents: 'none',
                }}
            >
                <img
                    className={classes.avatarImg}
                    src={myAvatar}
                    alt="my_avatar"
                />
            </Layer>
            <Layer>{/* Windows */}</Layer>
            <Layer className={classes.coderButton}>
                <div
                    onClick={() => {
                        router.history.push('/code');
                    }}
                    onKeyPress={() => {
                        router.history.push('/code');
                    }}
                    role="button"
                    tabIndex={0}
                >
                    <h2>&lt;!-- Coder</h2>
                </div>
            </Layer>
            <Transition
                items={router.location.pathname.includes('/code')}
                from={{ bottom: '-100%' }}
                enter={{ bottom: '0%' }}
                leave={{ bottom: '-100%' }}
            >
                {show => {
                    return (
                        show &&
                        (style => {
                            return (
                                <AppBar
                                    options={style}
                                    items={[
                                        {
                                            id: 'code_app_1',
                                            name: 'Resume',
                                            icon: codeIcon,
                                            onclick: () => {
                                                router.history.push(
                                                    '/code/about',
                                                );
                                            },
                                            keyPress: '82',
                                        },
                                        {
                                            id: 'code_app_2',
                                            name: 'My Work',
                                            icon: galleryIcon,
                                            onclick: () => {
                                                router.history.push(
                                                    '/code/work',
                                                );
                                            },
                                        },
                                    ]}
                                />
                            );
                        })
                    );
                }}
            </Transition>
        </Layer>
    );
};

Coder.propTypes = {
    options: PropTypes.objectOf(PropTypes.any),
    classes: PropTypes.objectOf(PropTypes.any),
    router: PropTypes.objectOf(PropTypes.any),
};

export default withStyles(Styles)(Coder);
