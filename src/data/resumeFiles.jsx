import React from 'react';
import PropTypes from 'prop-types';

import { DiJavascript1, DiPhp, DiNpm } from 'react-icons/di';

const Files = ({ classes }) => {
    const FilesArray = [
        {
            dirName: 'Resume',
            showFiles: true,
            type: 'dir',
            files: [
                {
                    name: 'resume.js',
                    icon: <DiJavascript1 className={classes.codeYellow} />,
                    content: <div>My Resume</div>,
                },
                {
                    name: 'eductions.php',
                    icon: <DiPhp className={classes.codeBlue} />,
                    content: <div>My Experience</div>,
                },
                {
                    name: 'experience.json',
                    icon: <DiNpm className={classes.codeRed} />,
                    content: <div>Package</div>,
                },
            ],
        },
        {
            dirName: 'Resume/git',
            showFiles: true,
            type: 'branch',
            files: [
                {
                    name: 'eductions.php',
                    icon: <DiPhp className={classes.codeBlue} />,
                    content: <div>My Experience</div>,
                },
            ],
        },
        {
            dirName: 'Resume/git/pack',
            showFiles: true,
            type: 'repo',
            files: [
                {
                    name: 'experience.json',
                    icon: <DiNpm className={classes.codeRed} />,
                    content: <div>Package</div>,
                },
            ],
        },
    ].sort((a, b) => {
        const nameA = a.dirName.toUpperCase();
        const nameB = b.dirName.toUpperCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });

    return FilesArray;
};

Files.propTypes = {
    classes: PropTypes.objectOf(PropTypes.any),
};

export default Files;
