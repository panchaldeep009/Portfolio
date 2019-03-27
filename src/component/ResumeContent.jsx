import React from 'react';
import allFiles from '../data/resumeFiles';

const CodeEditor = React.lazy(() => {
    return import(/* Code: "CodeEditor" */ '../ui/CodeEditor');
});

const Resume = props => {
    return <CodeEditor allFiles={allFiles} {...props} />;
};

export default Resume;
