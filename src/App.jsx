import React from 'react';
import { Swipe } from 'react-swipe-component';
import CodeSection from './container/codeSection';
import DesignSection from './container/designSection';
import styles from './styles/App';

const App = () => {
    const swipeURL = [
        '#/code/portfolio',
        '#/code',
        '#/',
        '#/design',
        '#/design/portfolio',
    ];

    const onSwipe = num => {
        const newURL = swipeURL[swipeURL.indexOf(window.location.hash) + num];
        window.location.hash =
            newURL !== undefined ? newURL : window.location.hash;
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
            style={styles().Home}
        >
            <DesignSection />
            <CodeSection />
        </Swipe>
    );
};

export default App;
