import React from 'react';
import {
    DiPhp,
    DiNpm,
    DiJavascript1,
    DiSass,
    DiCss3,
    DiHtml5,
    DiReact,
    DiLaravel,
    DiComposer,
    DiDatabase,
    DiGithubBadge,
    DiGulp,
    DiNodejsSmall,
    DiPhotoshop,
    DiIllustrator,
    DiPython,
} from 'react-icons/di';
import {
    FaGlobe,
    FaArchive,
    FaFilePdf,
    FaFileImage,
    FaFileCode,
    FaFile,
    FaFileAlt,
    FaInfoCircle,
} from 'react-icons/fa';

export default name => {
    const icons = [
        {
            name: 'gulp',
            icon: <DiGulp style={{ color: 'crimson' }} />,
        },
        {
            name: '.blade.php',
            icon: <DiLaravel style={{ color: 'orange' }} />,
        },
        {
            name: '.jsx',
            icon: <DiReact style={{ color: 'cyan' }} />,
        },
        {
            name: 'index.js',
            icon: <DiNodejsSmall style={{ color: 'greenyellow' }} />,
        },
        {
            name: 'package.json',
            icon: <DiNpm style={{ color: 'red' }} />,
        },
        {
            name: 'composer.json',
            icon: <DiComposer style={{ color: 'papayawhip' }} />,
        },
        {
            name: '.map',
            icon: <FaGlobe style={{ color: 'lavender' }} />,
        },
        {
            name: '.js',
            icon: <DiJavascript1 style={{ color: 'yellow' }} />,
        },
        {
            name: '.php',
            icon: <DiPhp style={{ color: 'skyblue' }} />,
        },
        {
            name: '.sql',
            icon: <DiDatabase style={{ color: 'yellow' }} />,
        },
        {
            name: '.git',
            icon: <DiGithubBadge style={{ color: 'red' }} />,
        },
        {
            name: '.css',
            icon: <DiCss3 style={{ color: 'lightskyblue' }} />,
        },
        {
            name: '.less',
            icon: <DiCss3 style={{ color: 'powderblue' }} />,
        },
        {
            name: '.psd',
            icon: <DiPhotoshop style={{ color: 'deepskyblue' }} />,
        },
        {
            name: '.ai',
            icon: <DiIllustrator style={{ color: 'darkorange' }} />,
        },
        {
            name: '.scss',
            icon: <DiSass style={{ color: 'hotpink' }} />,
        },
        {
            name: '.sass',
            icon: <DiSass style={{ color: 'hotpink' }} />,
        },
        {
            name: '.html',
            icon: <DiHtml5 style={{ color: 'orange' }} />,
        },
        {
            name: '.blade',
            icon: <DiHtml5 style={{ color: 'orange' }} />,
        },
        {
            name: '.zip',
            icon: <FaArchive style={{ color: 'purple' }} />,
        },
        {
            name: '.pdf',
            icon: <FaFilePdf style={{ color: 'red' }} />,
        },
        {
            name: '.jpg',
            icon: <FaFileImage style={{ color: 'gold' }} />,
        },
        {
            name: '.png',
            icon: <FaFileImage style={{ color: 'gold' }} />,
        },
        {
            name: '.py',
            icon: <DiPython style={{ color: 'lightcyan' }} />,
        },
        {
            name: '.gif',
            icon: <FaFileImage style={{ color: 'gold' }} />,
        },
        {
            name: '.svg',
            icon: <FaFileCode style={{ color: 'salmon' }} />,
        },
        {
            name: '.svg',
            icon: <FaFileCode style={{ color: 'salmon' }} />,
        },
        {
            name: 'readme.md',
            icon: <FaInfoCircle style={{ color: 'turquoise' }} />,
        },
        {
            name: '.txt',
            icon: <FaFileAlt style={{ color: 'skyblue' }} />,
        },
        {
            name: '.',
            icon: <FaFile style={{ color: 'white' }} />,
        },
    ];
    const thisIcon = icons.find(icon => {
        return name.toLowerCase().includes(icon.name.toLowerCase());
    });
    let returnIcon;
    if (thisIcon !== undefined) {
        returnIcon = thisIcon.icon;
    } else {
        returnIcon = <FaFile style={{ color: 'white' }} />;
    }
    return returnIcon;
};
