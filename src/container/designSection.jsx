import React from 'react';
import PropTypes from 'prop-types';

import Layer from '../ui/Layer';
import Animation from '../ui/Animation';

import Global from '../global/globalState';
import Style from '../styles/HomeSection';

import Background from '../assets/animation_data/designBackground.json';
import myAvatar from '../assets/svg/myAvatar.svg';
import designerText from '../assets/svg/designerStroke.svg';

const Designer = ({ options }) => {
    const BackgroundAnimation = React.useRef();
    const styleProp = React.useContext(Global);

    React.useEffect(() => {
        BackgroundAnimation.current.Animation.setSpeed(0.3);
    }, []);

    return (
        <Layer options={{ ...options, ...Style(styleProp).designSection }}>
            <Layer>
                <Animation
                    options={{ animationData: Background }}
                    ref={BackgroundAnimation}
                />
            </Layer>
            <Layer
                options={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <img
                    style={{ ...Style(styleProp).avatarImg }}
                    src={myAvatar}
                    alt="my_avatar"
                />
            </Layer>
            <Layer
                options={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    left: '50%',
                    width: '50%',
                }}
            >
                <img
                    style={{ ...Style(styleProp).designerImg }}
                    src={designerText}
                    alt="designer_text"
                />
            </Layer>
        </Layer>
    );
};

Designer.propTypes = {
    options: PropTypes.objectOf(PropTypes.any),
};

export default Designer;
