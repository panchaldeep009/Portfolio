export default ({ device, colors, coderFonts }) => {
    return {
        Bar: {
            position: 'fixed',
            bottom: '0%',
            marginBottom: '15px',
            padding: '5px 10px',
            left: '50%',
            display: 'flex',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(255,255,255,0.3)',
            borderRadius: '20px',
            transition: 'all 0.5s',
            '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.5)',
            },
        },
        Apps: {
            outline: 0,
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyItems: 'center',
            padding: '10px',
            color: colors.bright,
            cursor: 'pointer',
            ...coderFonts,
            '&:hover': {
                '& $AppName': { opacity: 1 },
                '& $AppIcon': {
                    transform: 'translateY(-20px)',
                },
            },
            '&:focus': {
                '& $AppName': { opacity: 1 },
                '& $AppIcon': {
                    transform: 'translateY(-20px)',
                },
            },
        },
        AppName: {
            backgroundColor: 'rgba(0,0,0,0.3)',
            padding: '5px 10px',
            transform: 'translateY(0px)',
            borderRadius: '20px',
            transition: 'all 0.5s',
            opacity: 0,
            whiteSpace: 'nowrap',
            marginTop: '-25px',
            ...(device.mobile && {
                opacity: 1,
                marginTop: '0px',
            }),
        },
        AppIcon: {
            width: 75,
            height: 75,
            padding: 5,
            transition: 'all 0.5s',
            transform: 'translateY(0px)',
            ...(device.mobile && {
                width: 60,
                height: 60,
            }),
        },
    };
};
