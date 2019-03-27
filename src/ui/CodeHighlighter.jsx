import React from 'react';
import PropTypes from 'prop-types';

import { Prism as Code } from 'react-syntax-highlighter';
import Markdown from 'markdown-to-jsx';

import theme from '../styles/ui/CodeHighLightTheme';

const CodeHighlighter = ({ lang, code }) => {
    let output = <div>loading</div>;
    if (lang === 'md') {
        output = (
            <Markdown
                options={{
                    overrides: {
                        pre: {
                            component: Code,
                            props: {
                                language: 'jsx',
                                style: theme,
                            },
                        },
                    },
                }}
            >
                {code}
            </Markdown>
        );
    } else if (
        [
            'md',
            'js',
            'jsx',
            'vue',
            'json',
            'php',
            'html',
            'hbs',
            'css',
            'sass',
            'scss',
            'xml',
            'py',
            'js',
            'map',
            'txt',
            'sql',
        ].includes(lang)
    ) {
        output = (
            <Code showLineNumbers language={lang} style={theme}>
                {code}
            </Code>
        );
    } else if (['jpg', 'svg', 'png', 'gif'].includes(lang)) {
        output = <img src={code} alt="preview_image" />;
    } else {
        output = <div>No available to preview.</div>;
    }
    return output;
};
CodeHighlighter.propTypes = {
    lang: PropTypes.string,
    code: PropTypes.string,
};

export default CodeHighlighter;
