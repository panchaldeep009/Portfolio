import React from 'react';
import PropTypes from 'prop-types';

import codeText from './raw/codeMain.txt';
import codeExpAndEdu from './raw/codeExpAndEdu.txt';

const Files = () => {
    const defaultLoading = <div>Loading..</div>;
    const LocalFiles = [
        {
            name: 'Resume',
            type: 'dir',
            url: null,
            children: [
                {
                    name: 'resume.js',
                    type: 'file',
                    content: defaultLoading,
                    url: codeText,
                },
                {
                    name: 'exp_and_edu.php',
                    type: 'file',
                    content: '',
                    url: codeExpAndEdu,
                },
            ],
        },
    ].sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });
    const findNode = (thisTree, parentId) => {
        thisTree.forEach((thisNode, i) => {
            const newNode = thisNode;
            newNode.id = i;
            if (parentId !== '') {
                newNode.dir = parentId + '/' + thisNode.name;
            } else {
                newNode.dir = thisNode.name;
            }
            if (newNode.type === 'dir') {
                newNode.isExpanded = true;
            }
            if (newNode.children && newNode.children.length > 0) {
                findNode(newNode.children, newNode.dir);
            }
            return newNode;
        });
    };
    findNode(LocalFiles, '');
    return LocalFiles;
};

Files.propTypes = {
    classes: PropTypes.objectOf(PropTypes.any),
    type: PropTypes.string,
};

export default Files;

const fetchGit = callBack => {
    fetch('https://api.github.com/users/panchaldeep009/repos?type=all')
        .then(data => {
            return data.json();
        })
        .then(data => {
            const repos = [];
            data.forEach(repo => {
                repos.push({
                    name: repo.name,
                    type: 'repo',
                    dir: repo.full_name,
                    children: [],
                    update: repo.updated_at,
                    url:
                        'https://api.github.com/repos/' +
                        repo.full_name +
                        '/branches',
                });
            });
            callBack(
                repos.sort((a, b) => {
                    const nameA = a.update.toUpperCase();
                    const nameB = b.update.toUpperCase();
                    if (nameA < nameB) {
                        return 1;
                    }
                    if (nameA > nameB) {
                        return -1;
                    }
                    return 0;
                }),
            );
        });
    callBack([]);
};
const fetchGitFiles = (url, parentDirName, callBack) => {
    const defaultLoading = <div>Loading..</div>;
    fetch(url)
        .then(data => {
            return data.json();
        })
        .then(data => {
            const files = [];
            const thisFiles = data.tree ? data.tree : data;
            thisFiles.forEach(repo => {
                files.push({
                    ...(repo.commit && {
                        name: repo.name,
                        dir: parentDirName + '/' + repo.name,
                        type: 'branch',
                        children: defaultLoading,
                        url:
                            'https://api.github.com/repos/' +
                            parentDirName +
                            '/git/trees/' +
                            repo.commit.sha,
                    }),
                    ...(repo.type === 'blob' && {
                        name: repo.path,
                        dir: parentDirName + '/' + repo.path,
                        type: 'file',
                        content: defaultLoading,
                        url:
                            'https://raw.githubusercontent.com/' +
                            parentDirName +
                            '/' +
                            repo.path,
                    }),
                    ...(repo.type === 'tree' && {
                        name: repo.path,
                        dir: parentDirName + '/' + repo.path,
                        type: 'dir',
                        children: defaultLoading,
                        url: repo.url,
                    }),
                });
            });
            callBack(
                files.sort((a, b) => {
                    const nameA = a.type + a.dir.toUpperCase();
                    const nameB = b.type + b.dir.toUpperCase();
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }
                    return 0;
                }),
            );
        });
    callBack([]);
};
const fetchFileContent = (currentFile, callback) => {
    const fileLang = currentFile.name.substring(
        currentFile.name.indexOf('.') + 1,
    );
    if (
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
        ].includes(fileLang)
    ) {
        fetch(currentFile.url)
            .then(data => {
                return data.text();
            })
            .then(text => {
                callback(text);
            });
    } else {
        callback(currentFile.url);
    }
};
const replaceNested = (array, action, callBack) => {
    const newArray = array.slice(0);
    const findNode = thisTree => {
        thisTree.forEach(thisNode => {
            action(thisNode);
            if (
                thisNode.isExpanded &&
                thisNode.children &&
                thisNode.children.length > 0
            ) {
                findNode(thisNode.children, thisNode.dir);
            }
        });
    };
    findNode(newArray);
    if (callBack) {
        callBack(newArray);
    }
};
export { fetchGit, fetchGitFiles, fetchFileContent, replaceNested };
