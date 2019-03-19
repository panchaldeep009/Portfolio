import React from 'react';
import PropTypes from 'prop-types';
import { DiJavascript1, DiPhp, DiNpm } from 'react-icons/di';

import codeText from './raw/codeMain.txt';
import codeExpAndEdu from './raw/codeExpAndEdu.txt';
import exps from './raw/exp.txt';

const Files = () => {
    const defaultLoading = <div>Loading..</div>;
    const LocalFiles = [
        {
            dirName: 'Resume',
            showFiles: true,
            type: 'dir',
            files: [
                {
                    name: 'resume.js',
                    icon: <DiJavascript1 style={{ color: 'yellow' }} />,
                    content: defaultLoading,
                    url: codeText,
                },
                {
                    name: 'exp_and_edu.php',
                    icon: <DiPhp style={{ color: 'skyblue' }} />,
                    content: defaultLoading,
                    url: codeExpAndEdu,
                },
                {
                    name: 'experience.json',
                    icon: <DiNpm style={{ color: 'red' }} />,
                    content: defaultLoading,
                    url: exps,
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
    return LocalFiles;
};

Files.propTypes = {
    classes: PropTypes.objectOf(PropTypes.any),
    type: PropTypes.string,
};

export default Files;

const fetchGit = callBack => {
    fetch('https://api.github.com/users/panchaldeep009/repos')
        .then(data => {
            data.json();
        })
        .then(data => {
            const repos = [];
            data.forEach(repo => {
                repos.push({
                    dirName: repo.name,
                    showFiles: false,
                    type: 'repo',
                    files: [],
                    files_url:
                        'https://api.github.com/repos/' +
                        repo.full_name +
                        '/contents',
                });
            });
            callBack(repos);
        });
    callBack([]);
};
const fetchGitFiles = (url, parentDirName, callBack) => {
    const defaultLoading = <div>Loading..</div>;
    fetch(url)
        .then(data => {
            data.json();
        })
        .then(data => {
            const dirs = [];
            const files = [];
            data.forEach(repo => {
                if (repo.type === 'file') {
                    files.push({
                        name: repo.name,
                        icon: <DiJavascript1 style={{ color: 'yellow' }} />,
                        content: defaultLoading,
                        url: repo.download_url,
                    });
                } else if (repo.type === 'dir') {
                    dirs.push({
                        dirName: parentDirName + '/' + repo.name,
                        showFiles: false,
                        type: 'dir',
                        files: [],
                        files_url:
                            'https://api.github.com/repos/panchaldeep009/' +
                            parentDirName +
                            '/contents/' +
                            repo.path,
                    });
                }
            });
            callBack({ files, dirs });
        });
    callBack({ files: [], dirs: [] });
};

export { fetchGit, fetchGitFiles };
