import React from 'react';
import PropTypes from 'prop-types';

import { Prism as Code } from 'react-syntax-highlighter';
import theme from '../styles/ui/CodeHighLightTheme';

const CodeHighlighter = ({ lang, code }) => {
    return (
        <Code showLineNumbers language={lang} style={theme}>
            {code}
        </Code>
    );
};
CodeHighlighter.propTypes = {
    lang: PropTypes.string,
    code: PropTypes.string,
};

export default CodeHighlighter;
