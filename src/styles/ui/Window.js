export default ({
    view,
    coderFonts,
    designerFonts,
    location,
    colors,
    coderColors,
    noSelect,
}) => {
    return {
        window: {
            position: 'absolute',
            top: 25,
            width: 1024,
            left: view.width > 1024 ? (view.width - 1024) / 2 : 5,
            maxHeight: 'calc(100vh - 100px)',
            transformOrigin: '50% 50%',

            borderRadius: 5,
            overflow: 'hidden',
            ...(location.includes('code') && {
                ...coderFonts,
                border: '2px solid ' + coderColors.codeDark,
                backgroundColor: coderColors.codeLightTrans(0.9),
            }),
            ...(location.includes('design') && { ...designerFonts }),
        },
        titleBar: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            overflow: 'hidden',
            cursor: 'move',
            ...(location.includes('code') && {
                ...coderFonts,
                color: colors.bright,
                backgroundColor: coderColors.codeLight,
            }),
            '& span': {
                padding: 5,
                marginLeft: 10,
                maxWidth: '80%',
                overflow: 'hidden',
            },
            ...noSelect,
        },
        buttons: {
            padding: 5,
            display: 'flex',
            alignItems: 'center',
            '& button': {
                display: 'block',
                width: 17,
                height: 17,
                margin: 3,
                borderRadius: 15,
                outline: 0,
                cursor: 'pointer',
            },
        },
        expandButton: {
            backgroundColor: coderColors.codeYellow,
            border: '1px solid ' + coderColors.codeYellowBorder,
            '&:hover': {
                backgroundColor: coderColors.codeYellowBorder,
            },
            '&:focus': {
                backgroundColor: coderColors.codeYellowBorder,
            },
        },
        closeButton: {
            backgroundColor: coderColors.codeRed,
            border: '1px solid ' + coderColors.codeRedBorder,
            '&:hover': {
                backgroundColor: coderColors.codeRedBorder,
            },
            '&:focus': {
                backgroundColor: coderColors.codeRedBorder,
            },
        },
    };
};
