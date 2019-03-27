export default ({ location, colors, coderFonts, designerFonts }) => {
    return {
        wrapper: {
            height: '90%',
            width: '100%',
            overflow: 'auto',
            ...(location.includes('/code') && {
                color: colors.bright,
                ...coderFonts,
            }),
            ...(location.includes('/design') && {
                color: colors.dark,
                ...designerFonts,
            }),
        },
        form: {
            position: 'relative',
            width: '90%',
            height: 'max-content',
            margin: '0 auto',
            ...(location.includes('/code') && {
                color: colors.bright,
                ...coderFonts,
            }),
            ...(location.includes('/design') && {
                color: colors.dark,
                ...designerFonts,
            }),
            '& p': {
                marginTop: '20px',
                marginBottom: '20px',
            },
            '& input': {
                ...(location.includes('/code') && {
                    color: colors.bright,
                    ...coderFonts,
                }),
                ...(location.includes('/design') && {
                    color: colors.dark,
                    ...designerFonts,
                }),
            },
            '& label': {
                ...(location.includes('/code') && {
                    color: colors.bright,
                    ...coderFonts,
                }),
                ...(location.includes('/design') && {
                    color: colors.dark,
                    ...designerFonts,
                }),
            },
            '& button': {
                ...(location.includes('/code') && {
                    ...coderFonts,
                }),
                ...(location.includes('/design') && {
                    ...designerFonts,
                }),
            },
        },
        footer: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
    };
};
