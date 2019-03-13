export default ({
    device,
    view,
    location,
    coderFonts,
    secondHading,
    coderColors,
    noSelect,
}) => {
    return {
        coderButton: {
            '& div': {
                outline: 0,
                width: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                transition: 'all 0.5s',
                '&:hover': {
                    '& h2': {
                        color: coderColors.codeLightGreen,
                    },
                },
                '&:focus': {
                    '& h2': {
                        color: coderColors.codeLightGreen,
                    },
                },
                ...(location.includes('code') && { marginLeft: '-100%' }),
                '& h2': {
                    ...coderFonts,
                    ...secondHading,
                    ...noSelect,
                    color: coderColors.codeGreen,
                    transform: `rotate(${device.tabletDown ? -90 : 0}deg)`,
                },
            },
        },
        designerImg: {
            '& div': {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                left: '50%',
                width: '50%',
                height: '100vh',
                transition: 'all 0.5s',
                outline: 0,
                ...(location.includes('design') && { left: '100%' }),
                '& img': {
                    width: device.mobile ? 150 : Math.min(250, view.width / 3),
                    transform: `rotate(${device.tabletDown ? 90 : 0}deg)`,
                },
            },
        },
        avatarImg: {
            width: device.mobile ? 200 : Math.min(400, view.width / 2.5),
        },
    };
};

const sectionStyle = cursor => {
    const clipX = Math.round(
        cursor.x < window.innerWidth / 2
            ? 70 - (cursor.y * 20) / window.innerHeight
            : 30 + (cursor.y * 20) / window.innerHeight,
    );
    const clipY = Math.round(
        cursor.x < window.innerWidth / 2
            ? 50 + (cursor.y * 20) / window.innerHeight
            : 50 - (cursor.y * 20) / window.innerHeight,
    );
    return {
        codeSection: {
            clipPath: `polygon(0 0, ${clipX}% 0, ${clipY}% 100%, 0% 100%, 0 0)`,
            shapeInside: `polygon(0 0, ${clipX}% 0, ${clipY}% 100%, 0% 100%, 0 0)`,
            WebkitClipPath: `polygon(0 0, ${clipX}% 0, ${clipY}% 100%, 0% 100%, 0 0)`,
            transition: 'all 0.2s',
            ...(window.location.hash.includes('code') && {
                clipPath: `polygon(0 0, 100% 0, 100% 100%, 0% 100%, 0 0)`,
                shapeInside: `polygon(0 0, 100% 0, 100% 100%, 0% 100%, 0 0)`,
                WebkitClipPath: `polygon(0 0, 100% 0, 100% 100%, 0% 100%, 0 0)`,
            }),
            ...(window.location.hash.includes('design') && {
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
            ...(window.location.hash.includes('design') && {
                clipPath: `polygon(100% 0, 0% 0, 0% 100%, 100% 100%, 100% 0)`,
                shapeInside: `polygon(100% 0, 0% 0, 0% 100%, 100% 100%, 100% 0)`,
                WebkitClipPath: `polygon(100% 0, 0% 0, 0% 100%, 100% 100%, 100% 0)`,
            }),
            ...(window.location.hash.includes('code') && {
                clipPath: `polygon(0 0, 0% 0, 0% 100%, 0% 100%, 0 0)`,
                shapeInside: `polygon(0 0, 0% 0, 0% 100%, 0% 100%, 0 0)`,
                WebkitClipPath: `polygon(0 0, 0% 0, 0% 100%, 0% 100%, 0 0)`,
            }),
        },
    };
};

export { sectionStyle };
