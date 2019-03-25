import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'react-jss';

import Apps from '../component/apps';

import Layer from '../ui/Layer';
import Animation from '../ui/Animation';

import Styles, { sectionStyle } from '../styles/container/HomeSection';

import Background from '../assets/animation_data/designBackground.json';
import Spark from '../assets/animation_data/designSpark.json';
import NameAnimation from '../assets/animation_data/name.json';
import GraphicTitle from '../assets/animation_data/graphicTitle.json';
import MotionTitle from '../assets/animation_data/motionTitle.json';

import myAvatar from '../assets/svg/myAvatar.svg';
import Logo from '../assets/svg/logoDark.svg';
import designerText from '../assets/svg/designerStroke.svg';
import galleryIcon from '../assets/svg/galleryIcon.svg';
import contactIcon from '../assets/svg/contact.svg';

const PortfolioGallery = React.lazy(() => {
    return import(/* Code: "ResumeContent" */ '../component/PortfolioGallery');
});

const ContactForm = React.lazy(() => {
    return import(/* Code: "ResumeContent" */ '../component/ContactForm');
});

const Designer = ({ options, classes, router, cursor }) => {
    const BackgroundAnimation = React.useRef();
    React.useEffect(() => {
        BackgroundAnimation.current.Animation.setSpeed(0.3);
    }, []);
    const SparkAnimation = React.useRef();
    React.useEffect(
        () => {
            if (
                SparkAnimation.current !== undefined &&
                router.location.pathname.includes('design')
            ) {
                SparkAnimation.current.Animation.goToAndPlay(0);
            }
        },
        [SparkAnimation.current, router.location.pathname],
    );
    const nameAnimation = React.useRef();
    React.useEffect(
        () => {
            if (
                nameAnimation.current !== undefined &&
                router.location.pathname.includes('design')
            ) {
                nameAnimation.current.Animation.goToAndPlay(0);
            }
        },
        [nameAnimation.current],
    );

    const AllApps = {
        appBar: router.location.pathname.includes('/design'),
        apps: [
            {
                id: 'design_app_1',
                name: 'My Work',
                icon: galleryIcon,
                open: () => {
                    router.history.push('/design/work');
                },
                openState: router.location.pathname.includes('/design/work'),
                close: () => {
                    router.history.push('/design');
                },
                content: PortfolioGallery,
            },
            {
                id: 'code_app_3',
                name: 'Contact me',
                icon: contactIcon,
                open: () => {
                    router.history.push('/design/contact');
                },
                openState: router.location.pathname.includes('/design/contact'),
                close: () => {
                    router.history.push('/design');
                },
                content: ContactForm,
                size: {
                    width: 500,
                    height: 70,
                },
            },
        ],
    };

    return (
        <Layer options={{ ...options, ...sectionStyle(cursor).designSection }}>
            <Layer options={{ pointerEvents: 'none' }}>
                <Animation
                    options={{ animationData: Background }}
                    ref={BackgroundAnimation}
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
            <Layer
                options={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    pointerEvents: 'none',
                }}
            >
                <img
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: 60,
                        top: 50,
                        left: 0,
                    }}
                    src={Logo}
                    alt="logo"
                />
                <img
                    className={classes.avatarImg}
                    src={myAvatar}
                    alt="my_avatar"
                />
            </Layer>
            {router.location.pathname.includes('design') && (
                <Layer className={classes.nameTag}>
                    <div className={classes.greeting}>
                        <Animation
                            options={{
                                animationData: NameAnimation,
                                autoplay: false,
                                loop: false,
                            }}
                            ref={nameAnimation}
                        />
                    </div>
                    <div className={classes.name}>
                        <div data-name-group>
                            <Animation
                                options={{
                                    animationData: GraphicTitle,
                                    autoplay: true,
                                    loop: true,
                                }}
                            />
                            <hr />
                            <Animation
                                options={{
                                    animationData: MotionTitle,
                                    autoplay: true,
                                    loop: true,
                                }}
                            />
                            <div>Designer</div>
                        </div>
                    </div>
                </Layer>
            )}
            <Layer className={classes.designerImg}>
                <div
                    onClick={() => {
                        router.history.push('/design');
                    }}
                    onKeyPress={() => {
                        router.history.push('/design');
                    }}
                    role="button"
                    tabIndex={0}
                >
                    <img src={designerText} alt="designer_text" />
                </div>
            </Layer>
            <React.Suspense fallback>
                <Apps allApps={AllApps} router={router} />
            </React.Suspense>
        </Layer>
    );
};

Designer.propTypes = {
    options: PropTypes.objectOf(PropTypes.any),
    classes: PropTypes.objectOf(PropTypes.any),
    router: PropTypes.objectOf(PropTypes.any),
    cursor: PropTypes.objectOf(PropTypes.any),
};

export default withStyles(Styles)(Designer);
