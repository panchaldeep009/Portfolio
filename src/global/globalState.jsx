import React from 'react';
import PropTypes from 'prop-types';

const GlobalContext = React.createContext();

const GlobalProvider = ({ children }) => {
    const [view, setView] = React.useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const [device, setDevice] = React.useState({
        mobile: window.innerWidth <= 425,
        mobileDown: window.innerWidth <= 425,
        mobileUp: window.innerWidth > 425,
        tablet: window.innerWidth <= 768 && window.innerWidth > 425,
        tabletDown: window.innerWidth <= 768,
        tabletUp: window.innerWidth > 768,
        laptop: window.innerWidth >= 1024,
    });
    const [cursor, setCursor] = React.useState({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
    });
    const [location, setLocation] = React.useState(window.location.hash);

    React.useEffect(() => {
        window.addEventListener('resize', () => {
            const newView = {
                width: window.innerWidth,
                height: window.innerHeight,
            };
            const newDevice = {
                mobile: window.innerWidth <= 425,
                mobileDown: window.innerWidth <= 425,
                mobileUp: window.innerWidth > 425,
                tablet: window.innerWidth <= 768 && window.innerWidth > 425,
                tabletDown: window.innerWidth <= 768,
                tabletUp: window.innerWidth > 768,
                laptop: window.innerWidth >= 1024,
            };
            if (view !== newView) {
                setView(newView);
            }
            if (device !== newDevice) {
                setDevice(newDevice);
            }
        });
        window.addEventListener('mousemove', e => {
            setCursor({ x: e.clientX, y: e.clientY });
        });
        window.addEventListener('hashchange', e => {
            setLocation(e.newURL);
        });
        return () => {
            window.removeEventListener('resize', () => {
                const newView = {
                    width: window.innerWidth,
                    height: window.innerHeight,
                };
                const newDevice = {
                    mobile: window.innerWidth <= 425,
                    mobileDown: window.innerWidth <= 425,
                    mobileUp: window.innerWidth > 425,
                    tablet: window.innerWidth <= 768 && window.innerWidth > 425,
                    tabletDown: window.innerWidth <= 768,
                    tabletUp: window.innerWidth > 768,
                    laptop: window.innerWidth >= 1024,
                };
                if (view !== newView) {
                    setView(newView);
                }
                if (device !== newDevice) {
                    setDevice(newDevice);
                }
            });
            window.removeEventListener('mousemove', e => {
                setCursor({ x: e.clientX, y: e.clientY });
            });
            window.removeEventListener('hashchange', e => {
                setLocation(e.newURL);
            });
        };
    }, []);

    return (
        <GlobalContext.Provider value={{ view, device, cursor, location }}>
            {children}
        </GlobalContext.Provider>
    );
};

GlobalProvider.propTypes = {
    children: PropTypes.PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
};
export { GlobalProvider };
export default GlobalContext;
