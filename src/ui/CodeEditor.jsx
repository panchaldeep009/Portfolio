import React from 'react';
import PropTypes from 'prop-types';

import withStyles from 'react-jss';
import Sidebar from 'react-sidebar';
import { FaFileCode, FaFolder, FaFolderOpen } from 'react-icons/fa';
import { DiCode, DiGit, DiGitBranch } from 'react-icons/di';
import { MdClose, MdExpandMore, MdChevronRight } from 'react-icons/md';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Code from './CodeHighlighter';

import Styles from '../styles/ui/codeEditor';
import { fetchGit, fetchGitFiles } from '../data/resumeFiles';

const Resume = ({ classes, allFiles, changeTitle, thisApp }) => {
    const [sidebarStatus, openSideBar] = React.useState(false);
    const [fileSystem, setFileSystem] = React.useState('local');
    const mainSection = React.useRef();
    const [folders, setFolder] = React.useState(allFiles());
    const [openFiles, addFiles] = React.useState([]);
    const [currentFileIndex, openFile] = React.useState(0);
    const fetchContent = currentFile => {
        fetch(currentFile.url)
            .then(data => {
                return data.text();
            })
            .then(text => {
                addFiles([
                    ...openFiles,
                    {
                        ...currentFile,
                        content: (
                            <Code
                                code={text}
                                lang={currentFile.name.substring(
                                    currentFile.name.indexOf('.') + 1,
                                )}
                            />
                        ),
                    },
                ]);
            });
    };
    const handleSideBar = system => {
        if (system !== fileSystem) {
            setFileSystem(system);
            if (system === 'local') {
                setFolder(allFiles());
            } else {
                setFolder([]);
                fetchGit(repo => {
                    setFolder(repo);
                });
            }
        }

        if (mainSection.current !== undefined) {
            if (mainSection.current.offsetWidth < 600) {
                openSideBar(!sidebarStatus);
            }
        } else {
            openSideBar(!sidebarStatus);
        }
    };
    const handleOpenFiles = (dir, name) => {
        const requestFileIndex = openFiles.findIndex(file => {
            return file.name === name && file.dir === dir;
        });
        const dirFiles = folders.find(({ dirName }) => {
            return dirName === dir;
        }).files;
        if (requestFileIndex === -1) {
            const currentFile = dirFiles.find(file => {
                return file.name === name;
            });
            currentFile.dir = dir;
            addFiles([...openFiles, currentFile]);
            openFile(openFiles.length);
            openSideBar(false);
            fetchContent(currentFile);
        } else {
            openFile(requestFileIndex);
            openSideBar(false);
        }
    };
    const handleCloseFile = (dir, name) => {
        const newOpenFiles = openFiles
            .filter(file => {
                return !(file.name === name && file.dir === dir);
            })
            .slice(0);
        addFiles(newOpenFiles);
    };
    const dockedStatus = () => {
        let docked = sidebarStatus;
        if (openFiles.length !== 0) {
            if (mainSection.current !== undefined) {
                if (mainSection.current.offsetWidth > 600) {
                    docked = true;
                }
            }
        } else {
            docked = true;
        }
        return docked;
    };
    const handleTabScroll = () => {
        const tabList = mainSection.current.querySelector('[role="tablist"]');
        const tab = mainSection.current.querySelector('[aria-selected="true"]');
        const fileList = mainSection.current.querySelector(
            '[data-file-list="active"]',
        );
        const file = mainSection.current.querySelector(
            '[data-selected="true"] > p',
        );
        if (
            mainSection.current.contains(tabList) &&
            mainSection.current.contains(tab)
        ) {
            tabList.scrollTo({
                top: 0,
                left: tab.offsetLeft,
                behavior: 'smooth',
            });
        }
        if (
            mainSection.current.contains(fileList) &&
            mainSection.current.contains(file)
        ) {
            fileList.scrollTo({
                top: file.offsetTop - 25,
                left: file.offsetLeft - 50,
                behavior: 'smooth',
            });
        }
        if (openFiles.length) {
            if (openFiles[currentFileIndex] !== undefined) {
                changeTitle(
                    openFiles[currentFileIndex].name +
                        ' -> /' +
                        openFiles[currentFileIndex].dir +
                        ' | ' +
                        thisApp.name,
                );
            }
        } else {
            changeTitle(thisApp.name);
        }
    };
    React.useEffect(handleTabScroll, [currentFileIndex, openFiles]);
    React.useEffect(
        () => {
            if (openFiles.length > 0) {
                if (currentFileIndex >= openFiles.length) {
                    openFile(openFiles.length - 1);
                }
            }
        },
        [openFiles],
    );
    const toggleFolder = name => {
        const currentFolder = folders.find(folder => {
            return folder.dirName === name;
        });
        if (currentFolder.files_url !== undefined && !currentFolder.showFiles) {
            const callBack = newD => {
                setFolder(
                    [
                        ...folders.filter(folder => {
                            return folder.dirName !== name;
                        }),
                        ...newD.dirs,
                        {
                            ...currentFolder,
                            showFiles: true,
                            files: newD.files,
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
                    }),
                );
            };
            fetchGitFiles(
                currentFolder.files_url,
                currentFolder.dirName.split('/')[0],
                callBack,
            );
        } else {
            setFolder(
                [
                    ...folders.filter(folder => {
                        return folder.dirName !== name;
                    }),
                    {
                        ...currentFolder,
                        showFiles: !currentFolder.showFiles,
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
                }),
            );
        }
    };
    const dirIcon = (type, showFiles) => {
        const icons = {
            repo: (
                <DiGit className={classes.codeRed} style={{ width: '35px' }} />
            ),
            branch: <DiGitBranch className={classes.codeRed} />,
            dir: showFiles ? (
                <FaFolderOpen className={classes.codeYellow} />
            ) : (
                <FaFolder className={classes.codeYellow} />
            ),
        };
        return icons[type];
    };
    const sideBar = (
        <div className={classes.sidebar} data-file-list="active">
            <div className={classes.sidebarFiles}>
                {folders.map(({ dirName, files, showFiles, type }) => {
                    const dirPathArray = dirName.split('/');
                    let showFolder = true;
                    if (dirPathArray.length > 1) {
                        dirPathArray.pop();
                        let dirCheckName = '';
                        dirPathArray.forEach((currentDirName, index) => {
                            if (showFolder) {
                                dirCheckName =
                                    index > 0
                                        ? dirCheckName + '/' + currentDirName
                                        : currentDirName;
                                showFolder = folders.find(folder => {
                                    return folder.dirName === dirCheckName;
                                }).showFiles;
                            }
                        });
                    }
                    return (
                        showFolder && (
                            <React.Fragment key={dirName}>
                                <div
                                    className={classes.dirTitle}
                                    data-dir-active={
                                        openFiles.length > currentFileIndex &&
                                        openFiles[currentFileIndex].dir ===
                                            dirName
                                    }
                                    style={{
                                        paddingLeft:
                                            dirName.split('/').length * 20 +
                                            10 +
                                            'px',
                                    }}
                                    role="button"
                                    tabIndex={0}
                                    onKeyPress={() => {
                                        return toggleFolder(dirName);
                                    }}
                                    onClick={() => {
                                        return toggleFolder(dirName);
                                    }}
                                >
                                    {showFiles ? (
                                        <MdExpandMore />
                                    ) : (
                                        <MdChevronRight />
                                    )}
                                    {dirIcon(type, showFiles)}
                                    {
                                        dirName.split('/')[
                                            dirName.split('/').length - 1
                                        ]
                                    }
                                </div>
                                {showFiles &&
                                    files.map(({ name, icon }) => {
                                        return (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    return handleOpenFiles(
                                                        dirName,
                                                        name,
                                                    );
                                                }}
                                                key={
                                                    'file_' +
                                                    dirName +
                                                    '/' +
                                                    name
                                                }
                                                data-selected={
                                                    currentFileIndex ===
                                                    openFiles.findIndex(
                                                        file => {
                                                            return (
                                                                file.name ===
                                                                    name &&
                                                                file.dir ===
                                                                    dirName
                                                            );
                                                        },
                                                    )
                                                }
                                                style={{
                                                    paddingLeft:
                                                        dirName.split('/')
                                                            .length *
                                                            20 +
                                                        10 +
                                                        'px',
                                                }}
                                            >
                                                {icon}
                                                <p>{name}</p>
                                            </button>
                                        );
                                    })}
                            </React.Fragment>
                        )
                    );
                })}
            </div>
        </div>
    );
    return (
        <React.Fragment>
            <div className={classes.resumeMain} ref={mainSection}>
                <div className={classes.sidebarButtons}>
                    <button
                        type="button"
                        onClick={() => {
                            handleSideBar('local');
                        }}
                        data-active={fileSystem === 'local' && dockedStatus()}
                    >
                        <FaFileCode />
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            handleSideBar('git');
                        }}
                        data-active={fileSystem === 'git' && dockedStatus()}
                    >
                        <DiGit />
                    </button>
                </div>
                <div className={classes.sidebarSection}>
                    <Sidebar
                        sidebar={sideBar}
                        open={openFiles.length ? sidebarStatus : true}
                        docked={dockedStatus()}
                    >
                        <Tabs
                            selectedIndex={currentFileIndex}
                            onSelect={tabIndex => {
                                return openFile(tabIndex);
                            }}
                        >
                            <TabList>
                                {openFiles.map(({ dir, name, icon }) => {
                                    return (
                                        <Tab key={'tab_' + dir + '/' + name}>
                                            {icon}
                                            <p>
                                                {openFiles
                                                    .filter(file => {
                                                        return (
                                                            file.name === name
                                                        );
                                                    })
                                                    .slice(0).length > 1
                                                    ? dir + '/' + name
                                                    : name}
                                            </p>
                                            <MdClose
                                                role="button"
                                                onClick={() => {
                                                    handleCloseFile(dir, name);
                                                }}
                                            />
                                        </Tab>
                                    );
                                })}
                            </TabList>
                            {openFiles.map(({ dir, name, content }) => {
                                return (
                                    <TabPanel
                                        key={'tab_content_' + dir + '/' + name}
                                    >
                                        {content}
                                    </TabPanel>
                                );
                            })}
                        </Tabs>
                        {openFiles.length === 0 && (
                            <div className={classes.emptyState}>
                                <DiCode />
                            </div>
                        )}
                    </Sidebar>
                </div>
            </div>
        </React.Fragment>
    );
};

Resume.propTypes = {
    classes: PropTypes.objectOf(PropTypes.any),
    allFiles: PropTypes.func,
    changeTitle: PropTypes.func,
    thisApp: PropTypes.objectOf(PropTypes.any),
};

export default withStyles(Styles)(Resume);
