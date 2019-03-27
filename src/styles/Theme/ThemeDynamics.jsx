import React from 'react';

const ThemeDynamics = () => {
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
            window.removeEventListener('hashchange', e => {
                setLocation(e.newURL);
            });
        };
    }, []);

    return { view, device, location };
};
export default ThemeDynamics;
