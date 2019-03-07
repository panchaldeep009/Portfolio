import React from 'react';
import Prism from 'prismjs';

import '../styles/vscodeTheme.scss';
import codeString from './codes/codeMain';

const codeMain = () => {
    React.useEffect(() => {
        Prism.highlightAll();
    }, []);

    return (
        <pre>
            <code className="language-javascript">{codeString}</code>
        </pre>
    );
};
export default codeMain;
