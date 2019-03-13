export default ({
    device,
    view,
    cursor,
    location,
    coderFonts,
    secondHading,
    coderColors,
    noSelect,
}) => {
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
        designerImgSection: {
            justifyContent: 'center',
            alignItems: 'center',
            left: '50%',
            width: '50%',
            transition: 'all 0.5s',
            ...(location.includes('design') && { left: '100%' }),
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
