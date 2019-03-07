import styles from './Root';

export default ({ device, view, cursor, location }) => {
    const style = styles(device);
    const clipX =
        cursor.x < view.width / 2
            ? 70 - (cursor.y * 20) / view.height
            : 30 + (cursor.y * 20) / view.height;
    const clipY =
        cursor.x < view.width / 2
            ? 50 + (cursor.y * 20) / view.height
            : 50 - (cursor.y * 20) / view.height;
    return {
        coderButton: {
            ...style.coderFonts,
            ...style.secondHading,
            color: style.coderColors.codeGreen,
            transform: `rotate(${device.tabletDown ? -90 : 0}deg)`,
        },
        designerImg: {
            width: device.mobile ? 150 : Math.min(250, view.width / 3),
            transform: `rotate(${device.tabletDown ? 90 : 0}deg)`,
        },
        avatarImg: {
            width: device.mobile ? 200 : Math.min(400, view.width / 2.5),
        },
        codeSection: {
            clipPath: `polygon(0 0, ${clipX}% 0, ${clipY}% 100%, 0% 100%, 0 0)`,
            shapeInside: `polygon(0 0, ${clipX}% 0, ${clipY}% 100%, 0% 100%, 0 0)`,
            WebkitClipPath: `polygon(0 0, ${clipX}% 0, ${clipY}% 100%, 0% 100%, 0 0)`,
            transition: 'all 0.2s',
            ...(!location.includes('code/') && style.noEvent),
            ...(location.includes('code') && {
                clipPath: `polygon(0 0, 100% 0, 100% 100%, 0% 100%, 0 0)`,
                shapeInside: `polygon(0 0, 100% 0, 100% 100%, 0% 100%, 0 0)`,
                WebkitClipPath: `polygon(0 0, 100% 0, 100% 100%, 0% 100%, 0 0)`,
            }),
            ...(location.includes('design') && {
                clipPath: `polygon(0 0, 0% 0, 0% 100%, 0% 100%, 0 0)`,
                shapeInside: `polygon(0 0, 0% 0, 0% 100%, 0% 100%, 0 0)`,
                WebkitClipPath: `polygon(0 0, 0% 0, 0% 100%, 0% 100%, 0 0)`,
            }),
        },
        designSection: {
            clipPath: `polygon(100% 0, ${clipX}% 0, ${clipY}% 100%, 100% 100%, 100% 0)`,
            shapeInside: `polygon(100% 0, ${clipX}% 0, ${clipY}% 100%, 100% 100%, 100% 0)`,
            WebkitClipPath: `polygon(100% 0, ${clipX}% 0, ${clipY}% 100%, 100% 100%, 100% 0)`,
            transition: 'all 0.2s',
            ...(!location.includes('design/') && style.noEvent),
            ...(location.includes('design') && {
                clipPath: `polygon(100% 0, 0% 0, 0% 100%, 100% 100%, 100% 0)`,
                shapeInside: `polygon(100% 0, 0% 0, 0% 100%, 100% 100%, 100% 0)`,
                WebkitClipPath: `polygon(100% 0, 0% 0, 0% 100%, 100% 100%, 100% 0)`,
            }),
            ...(location.includes('code') && {
                clipPath: `polygon(0 0, 0% 0, 0% 100%, 0% 100%, 0 0)`,
                shapeInside: `polygon(0 0, 0% 0, 0% 100%, 0% 100%, 0 0)`,
                WebkitClipPath: `polygon(0 0, 0% 0, 0% 100%, 0% 100%, 0 0)`,
            }),
        },
    };
};
