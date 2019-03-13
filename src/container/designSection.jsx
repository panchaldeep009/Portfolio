import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'react-jss';

import Apps from '../component/apps';

import Layer from '../ui/Layer';
import Animation from '../ui/Animation';

import Styles, { sectionStyle } from '../styles/container/HomeSection';

import Background from '../assets/animation_data/designBackground.json';
import myAvatar from '../assets/svg/myAvatar.svg';
import designerText from '../assets/svg/designerStroke.svg';
import galleryIcon from '../assets/svg/galleryIcon.svg';

const Designer = ({ options, classes, router, cursor }) => {
    const BackgroundAnimation = React.useRef();

    const AllApps = {
        appBar: router.location.pathname.includes('/design'),
        apps: [
            {
                id: 'code_app_2',
                name: 'My Work',
                icon: galleryIcon,
                open: () => {
                    router.history.push('/design/work');
                },
                openState: router.location.pathname.includes('/design/work'),
                close: () => {
                    router.history.push('/design');
                },
                content: <div>Gallery App</div>,
            },
        ],
    };

    React.useEffect(() => {
        BackgroundAnimation.current.Animation.setSpeed(0.3);
    }, []);

    return (
        <Layer options={{ ...options, ...sectionStyle(cursor).designSection }}>
            <Layer options={{ pointerEvents: 'none' }}>
                <Animation
                    options={{ animationData: Background }}
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
            <Apps allApps={AllApps} />
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
