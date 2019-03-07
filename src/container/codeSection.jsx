import React from 'react';
import PropTypes from 'prop-types';
import Prism from 'prismjs';

import '../styles/vscodeTheme.scss';
import Layer from '../ui/Layer';
import Animation from '../ui/Animation';

import Global from '../global/globalState';
import Style from '../styles/HomeSection';
import Background from '../assets/animation_data/codeBackground.json';
import myAvatar from '../assets/svg/myAvatarShape.svg';

const Coder = ({ options }) => {
    const BackgroundAnimation = React.useRef();
    const styleProp = React.useContext(Global);

    React.useEffect(() => {
        BackgroundAnimation.current.Animation.setSpeed(0.3);
        Prism.highlightAll();
    }, []);

    return (
        <Layer options={{ ...options, ...Style(styleProp).codeSection }}>
            <Layer options={{ zIndex: 0 }}>
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
                    width: '50%',
                }}
            >
                <h2 style={{ ...Style(styleProp).coderButton }}>-- Coder</h2>
            </Layer>
        </Layer>
    );
};

Coder.propTypes = {
    options: PropTypes.objectOf(PropTypes.any),
};

export default Coder;
