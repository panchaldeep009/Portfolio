import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'react-jss';

import Animation from '../ui/Animation';

import Styles, { sectionStyle } from '../styles/container/HomeSection';

import Background from '../assets/animation_data/codeBackground.json';
import Spark from '../assets/animation_data/codeOpenSparks.json';
import myAvatar from '../assets/svg/myAvatarShape.svg';
import codeIcon from '../assets/svg/codeIcon.svg';
import galleryIcon from '../assets/svg/galleryIcon.svg';

const Apps = React.lazy(() => {
    return import(/* Code: "Apps" */ '../component/apps');
});
const Layer = React.lazy(() => {
    return import(/* Code: "Layer" */ '../ui/Layer');
});
const ResumeContent = React.lazy(() => {
    return import(/* Code: "ResumeContent" */ '../component/ResumeContent');
});

const Coder = ({ options, classes, router, cursor }) => {
    const BackgroundAnimation = React.useRef();
    const SparkAnimation = React.useRef();

    const AllApps = {
        appBar: router.location.pathname.includes('/code'),
        apps: [
            {
                id: 'code_app_1',
                name: 'Resume',
                icon: codeIcon,
                open: () => {
                    router.history.push('/code/about');
                },
                openState: router.location.pathname.includes('/code/about'),
                close: () => {
                    router.history.push('/code');
                },
                content: ResumeContent,
            },
            {
                id: 'code_app_2',
                name: 'My Work',
                icon: galleryIcon,
                open: () => {
                    router.history.push('/code/work');
                },
                openState: router.location.pathname.includes('/code/work'),
                close: () => {
                    router.history.push('/code');
                },
                content: <div>Gallery App</div>,
            },
        ],
    };

    React.useEffect(
        () => {
            if (BackgroundAnimation.current !== undefined) {
                BackgroundAnimation.current.Animation.setSpeed(0.3);
            }
        },
        [BackgroundAnimation.current],
    );
    React.useEffect(
        () => {
            if (
                SparkAnimation.current !== undefined &&
                router.location.pathname.includes('code')
            ) {
                SparkAnimation.current.Animation.goToAndPlay(0);
            }
        },
        [SparkAnimation.current, router.location.pathname],
    );
    return (
        <Layer options={{ ...options, ...sectionStyle(cursor).codeSection }}>
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
            <Layer options={{ pointerEvents: 'none' }}>
                <Animation
                    options={{
                        animationData: Spark,
                        autoplay: false,
                        loop: false,
                    }}
                    ref={SparkAnimation}
                />
            </Layer>
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
            <React.Suspense fallback>
                <Apps allApps={AllApps} router={router} />
            </React.Suspense>
        </Layer>
    );
};

Coder.propTypes = {
    options: PropTypes.objectOf(PropTypes.any),
    classes: PropTypes.objectOf(PropTypes.any),
    router: PropTypes.objectOf(PropTypes.any),
    cursor: PropTypes.objectOf(PropTypes.any),
};

export default withStyles(Styles)(Coder);
