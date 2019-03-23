import React from 'react';
import PropTypes from 'prop-types';

import withStyles from 'react-jss';
import Sidebar from 'react-sidebar';
import { FaFileCode } from 'react-icons/fa';
import { DiCode, DiGit } from 'react-icons/di';
import { MdClose } from 'react-icons/md';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Typist from 'react-typist';
import DragScrollProvider from 'drag-scroll-provider';
import 'react-typist/dist/Typist.css';

import iconOf from '../data/icons';
import { fetchGit, fetchFileContent } from '../data/resumeFiles';

import Styles from '../styles/ui/codeEditor';

const Code = React.lazy(() => {
    return import(/* Code: "Code" */ './CodeHighlighter');
});
const FileTree = React.lazy(() => {
    return import(/* Code: "FileTree" */ './FileTree');
});

const Resume = ({ classes, allFiles, changeTitle, thisApp }) => {
    const [sidebarStatus, openSideBar] = React.useState(false);
    const [fileSystem, setFileSystem] = React.useState('local');
    const mainSection = React.useRef();
    const mainSectionFooter = React.useRef();
    const [folders, setFolder] = React.useState(allFiles());
    const [openFiles, addFiles] = React.useState([]);
    const [currentFileIndex, openFile] = React.useState(0);

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
            if (mainSection.current.offsetWidth < 1024) {
                openSideBar(!sidebarStatus);
            }
        } else {
            openSideBar(!sidebarStatus);
        }
    };
    const handleOpenFiles = thisFile => {
        const requestFileIndex = openFiles.findIndex(file => {
            return file.dir === thisFile.dir;
        });

        const fileLang = thisFile.name.substring(
            thisFile.name.indexOf('.') + 1,
        );
        if (requestFileIndex === -1) {
            addFiles([...openFiles, thisFile]);
            openFile(openFiles.length);
            openSideBar(false);
            fetchFileContent(thisFile, content => {
                addFiles([
                    ...openFiles,
                    {
                        ...thisFile,
                        content: <Code code={content} lang={fileLang} />,
                    },
                ]);
            });
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
                if (mainSection.current.offsetWidth > 1024) {
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

    const sideBar = (
        <div className={classes.sidebar} data-file-list="active">
            <div className={classes.sidebarFiles}>
                <React.Suspense fallback={<div />}>
                    <FileTree
                        tree={folders}
                        activeFile={openFiles[currentFileIndex]}
                        handleOpenFiles={handleOpenFiles}
                        classes={classes}
                    />
                </React.Suspense>
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
                                {openFiles.map(({ dir, name }) => {
                                    return (
                                        <Tab key={'tab_' + dir + '/' + name}>
                                            {iconOf(name)}
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
                                        <React.Suspense fallback>
                                            {content}
                                        </React.Suspense>
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
            <div className={classes.footer} ref={mainSectionFooter}>
                <DragScrollProvider>
                    {({ onMouseDown, ref }) => {
                        return (
                            <div
                                data-footer
                                ref={ref}
                                onMouseDown={onMouseDown}
                                role="button"
                                tabIndex={0}
                            >
                                <Typist
                                    cursor={{
                                        show: true,
                                        blink: true,
                                        element: '█',
                                        hideWhenDone: true,
                                        hideWhenDoneDelay: 1000,
                                    }}
                                    onCharacterTyped={() => {
                                        if (
                                            mainSectionFooter.current.querySelector(
                                                'div',
                                            )
                                        ) {
                                            mainSectionFooter.current
                                                .querySelector('div')
                                                .scrollTo({
                                                    left: 50000,
                                                });
                                        }
                                    }}
                                >
                                    {
                                        'function dayRepeat() { while(!success) { eat(); code(); sleep(); dayRepeat();}}'
                                    }
                                </Typist>
                            </div>
                        );
                    }}
                </DragScrollProvider>
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
