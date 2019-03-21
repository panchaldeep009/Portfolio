import React from 'react';

import { FaFolder, FaFolderOpen } from 'react-icons/fa';
import { DiGit, DiGitBranch } from 'react-icons/di';
import { MdExpandMore, MdChevronRight } from 'react-icons/md';

import { fetchGitFiles, replaceNested } from '../data/resumeFiles';
import iconOf from '../data/icons';

const dirIcon = (type, name, showFiles) => {
    const icons = {
        repo: <DiGit style={{ width: '35px', color: 'red' }} />,
        branch: (
            <DiGitBranch
                style={{ color: name === 'master' ? 'yellow' : 'GoldenRod' }}
            />
        ),
        dir: showFiles ? (
            <FaFolderOpen style={{ color: 'yellow' }} />
        ) : (
            <FaFolder style={{ color: 'yellow' }} />
        ),
    };
    return icons[type];
};
const FolderList = (tree, activeFile, handleOpenFiles, classes) => {
    const [treeData, setTree] = React.useState(tree);
    React.useEffect(
        () => {
            setTree(tree);
        },
        [tree],
    );
    const viewFiles = (state, thisTree) => {
        replaceNested(
            treeData,
            thisNode => {
                const newNode = thisNode;
                if (
                    thisNode.id === thisTree.id &&
                    thisNode.dir === thisTree.dir
                ) {
                    newNode.isExpanded = state;
                }
                return newNode;
            },
            setTree,
        );
    };

    const toggleFiles = thisTree => {
        if (thisTree.url !== null && !thisTree.isExpanded) {
            viewFiles(true, thisTree);
            fetchGitFiles(thisTree.url, thisTree.dir, res => {
                const replaceNode = thisNode => {
                    const newNode = thisNode;
                    if (
                        thisNode.id === thisTree.id &&
                        thisNode.dir === thisTree.dir &&
                        thisNode.isExpanded
                    ) {
                        newNode.children = res;
                        newNode.children.forEach(file => {
                            if (file.name.toLowerCase().includes('.md')) {
                                handleOpenFiles(file);
                            }
                        });
                    }
                    return newNode;
                };
                replaceNested(treeData, replaceNode, setTree);
            });
        } else {
            viewFiles(!thisTree.isExpanded, thisTree);
        }
    };
    const childs = [];
    replaceNested(treeData, node => {
        if (
            node.type === 'dir' ||
            node.type === 'repo' ||
            node.type === 'branch'
        ) {
            childs.push(
                <div
                    key={node.dir}
                    className={classes.dirTitle}
                    data-dir-active={
                        activeFile && activeFile.dir.includes(node.name)
                    }
                    style={{
                        paddingLeft:
                            (node.dir.split('/').length - 1) * 20 + 10 + 'px',
                    }}
                    role="button"
                    tabIndex={0}
                    onKeyPress={() => {
                        toggleFiles(node);
                    }}
                    onClick={() => {
                        toggleFiles(node);
                    }}
                >
                    {node.isExpanded ? <MdExpandMore /> : <MdChevronRight />}
                    {dirIcon(node.type, node.name, node.isExpanded)}
                    {node.name}
                </div>,
            );
        } else {
            childs.push(
                <button
                    type="button"
                    onClick={() => {
                        return handleOpenFiles(node);
                    }}
                    key={'file_' + node.dir + '/' + node.name}
                    data-selected={activeFile && node.dir === activeFile.dir}
                    style={{
                        paddingLeft:
                            node.dir.split('/').length * 20 + 10 + 'px',
                    }}
                >
                    {iconOf(node.name)}
                    <p>{node.name}</p>
                </button>,
            );
        }
    });
    return <React.Fragment>{childs}</React.Fragment>;
};
export default FolderList;
