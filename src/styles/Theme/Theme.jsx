export default ({ mobile }) => {
    const colors = {
        colors: {
            primary: '#292d3e',
            secondary: '#ffffff',
            accent: '#FFEE00',
            bright: '#ffffff',
            dark: '#000000',
        },
    };
    return {
        ...colors,
        coderColors: {
            codeBackground: colors.primary,
            codeLight: '#393b46',
            codeLightTrans: (t = 1) => {
                return `rgba(55,70,90, ${t})`;
            },
            codeDark: '#23252b',
            codeGreen: '#00c617',
            codePink: '#d200ff',
            codeBlue: '#00b7ff',
            codeYellow: '#fcff01',
            codeYellowBorder: '#ffcc01',
            codeRed: '#ff0143',
            codeRedBorder: '#d60b44',
            codeLightGreen: '#01ff9c',
        },
        designerColors: {
            designerBackground: colors.secondary,
        },
        coderFonts: { fontFamily: "'Roboto Mono', monospace" },
        designerFonts: { fontFamily: "'Raleway', sans-serif" },
        secondHading: {
            fontSize: mobile ? '20px' : '30px',
        },
        noEvent: {
            pointerEvents: 'none',
        },
        noSelect: {
            WebkitTouchCallout: 'none',
            WebkitUserSelect: 'none',
            KhtmlUserSelect: 'none',
            MozUserSelect: 'none',
            MsUserSelect: 'none',
            userSelect: 'none',
        },
    };
};
