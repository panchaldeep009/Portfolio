export default ({ mobile }) => {
    const colors = {
        primary: '#292d3e',
        secondary: '#ffffff',
        accent: '#FFEE00',
        bright: '#ffffff',
        dark: '#000000',
    };
    return {
        colors,
        coderColors: {
            codeBackground: colors.primary,
            codeGreen: '#00c617',
            codePink: '#d200ff',
            codeBlue: '#00b7ff',
            codeYellow: '#fcff01',
            codeRed: '#ff0143',
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
    };
};
