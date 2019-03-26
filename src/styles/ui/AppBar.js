export default ({ device, colors, coderFonts, designerFonts, location }) => {
    return {
        Bar: {
            position: 'fixed',
            bottom: '0%',
            marginBottom: '15px',
            padding: '5px 10px',
            left: '50%',
            display: 'flex',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(235,235,235,0.3)',
            borderRadius: '20px',
            transition: 'all 0.5s',
            WebkitBoxShadow: `9px 14px 134px -23px rgba(97,97,97,1)`,
            MozBoxShadow: `9px 14px 134px -23px rgba(97,97,97,1)`,
            boxShadow: `9px 14px 134px -23px rgba(97,97,97,1)`,
            '&:hover': {
                backgroundColor: 'rgba(235,235,235,0.5)',
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
            ...(location.includes('code') && coderFonts),
            ...(location.includes('design') && designerFonts),
            '&:hover': {
                '& $AppName': { opacity: 1, width: 90 },
                '& $AppIcon': {
                    transform: 'translateY(-20px)',
                },
            },
            '&:focus': {
                '& $AppName': { opacity: 1, width: 90 },
                '& $AppIcon': {
                    transform: 'translateY(-20px)',
                },
            },
        },
        AppName: {
            width: 0,
            textAlign: 'center',
            backgroundColor: 'rgba(0,0,0,0.3)',
            padding: '5px 10px',
            transform: 'translateY(0px)',
            overflow: 'hidden',
            borderRadius: '20px',
            transition: 'all 0.5s',
            opacity: 0,
            whiteSpace: 'nowrap',
            marginTop: '-25px',
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
