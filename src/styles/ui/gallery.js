export default ({ colors, coderFonts, location, designerFonts }) => {
    return {
        gallery: {
            width: '100%',
            height: '100%',
            overflow: 'auto',
            display: 'flex',
            ...(location.includes('/code') && {
                color: colors.bright,
                ...coderFonts,
            }),
            ...(location.includes('/design') && {
                color: colors.dark,
                ...designerFonts,
            }),
            '& img': {
                transition: 'all 0.5s',
                transform: 'scale(1)',
            },
            '& [data-invisible]': {
                transform: 'scale(0)',
            },
        },
    };
};
