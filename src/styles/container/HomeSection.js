export default ({
    device,
    view,
    colors,
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
        nameTag: {
            justifyContent: 'space-between',
            alignItems: 'center',
            pointerEvents: 'none',
            ...(device.mobile && {
                justifyContent: 'space-evenly',
                flexDirection: 'column',
            }),
            ...coderFonts,
        },
        greeting: {
            width:
                'calc(50% - ' +
                (device.mobile ? 200 : Math.min(400, view.width / 2.5)) / 3.5 +
                'px)',
            display: 'flex',
            justifyContent: 'flex-end',
            whiteSpace: 'nowrap',
            color: coderColors.codeGreen,
            fontSize: 14,
            '& div': {
                transform: 'rotate(-90deg)',
            },
            ...(device.mobile && {
                justifyContent: 'center',
                '& div': {
                    transform: 'rotate(0deg)',
                },
            }),
            ...(device.tabletUp && {
                fontSize: 20,
            }),
        },
        name: {
            width:
                'calc(50% - ' +
                (device.mobile ? 200 : Math.min(400, view.width / 2.5)) / 3.5 +
                'px)',
            display: 'flex',
            justifyContent: 'flex-start',
            ...(device.mobile && {
                justifyContent: 'center',
                width: '100%',
            }),
            color: colors.bright,
            fontSize: 16,
            ...(device.tabletUp && {
                fontSize: 20,
            }),
            '& [data-name]': {
                '& span': {
                    color: coderColors.codeYellow,
                },
                '& [data-punch]': {
                    color: coderColors.codeBlue,
                },
            },
            '& span': {
                fontWeight: 900,
            },
            '& h3': {
                fontSize: 20,
                ...(device.tabletUp && {
                    fontSize: 30,
                }),
                marginBottom: 15,
                '& span': {
                    color: coderColors.codePink,
                },
            },
            '& [data-title]': {
                marginTop: 15,
                color: coderColors.codeLightGreen,
                '& span': {
                    color: coderColors.codeRed,
                },
            },
            '& [data-name-group]': {
                display: 'flex',
                flexDirection: 'column',
                width: 'max-content',
                '& strong': {
                    display: 'inline-flex',
                },
            },
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
