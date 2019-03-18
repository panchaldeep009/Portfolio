import React from 'react';
import allFiles from '../data/resumeFiles';
import CodeEditor from '../ui/CodeEditor';

const Resume = props => {
    return <CodeEditor allFiles={allFiles} {...props} />;
};

export default Resume;
