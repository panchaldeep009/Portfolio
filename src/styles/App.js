export default ({ colors, coderFonts }) => {
    return {
        Home: {
            position: 'fixed',
            width: '100%',
            height: '100vh',
            overflow: 'none',
        },
        Loading: {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.primary,
            color: colors.bright,
            ...coderFonts,
            '& div': {
                height: '110%',
            },
        },
    };
};
