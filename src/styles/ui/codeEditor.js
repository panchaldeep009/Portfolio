export default ({ coderFonts, coderColors }) => {
    return {
        resumeMain: {
            position: 'relative',
            width: '100%',
            height: 'calc(100% - 35px)',
            display: 'flex',
            color: 'white',
            ...coderFonts,
            '& button': {
                outline: 0,
                cursor: 'pointer',
                ...coderFonts,
                '&:hover': {
                    backgroundColor: 'rgba(50,50,50,0.7)',
                    color: '#fff',
                },
                '&:focus': {
                    backgroundColor: 'rgba(50,50,50,0.7)',
                    color: '#fff',
                },
            },
        },
        sidebarButtons: {
            position: 'relative',
            width: '60px',
            backgroundColor: 'rgba(50,50,50,0.75)',
            '& button': {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '60px',
                height: '60px',
                color: '#ccc',
                fontSize: '28px',
                backgroundColor: 'transparent',
                border: 0,
            },
            '& [data-active="true"]': {
                backgroundColor: 'rgba(50,50,50,0.7)',
                color: '#fff',
            },
        },
        sidebarSection: {
            position: 'relative',
            width: '100%',
            height: '100%',
            flexGrow: 1,
            '& [role="tablist"]': {
                display: 'flex',
                width: '100%',
                overflowX: 'auto',
                overflowY: 'hidden',
                backgroundColor: 'rgba(50, 50, 50, 0.15)',
                '& [role="tab"]': {
                    display: 'flex',
                    backgroundColor: 'rgba(50, 50, 50, 0.25)',
                    color: '#eee',
                    padding: '15px',
                    cursor: 'pointer',
                    outline: 0,
                    '& svg': {
                        width: '30px',
                        marginRight: '10px',
                        outline: 0,
                    },
                    '&:hover': {
                        backgroundColor: 'rgba(50, 50, 50, 0.55)',
                    },
                    '&:focus': {
                        backgroundColor: 'rgba(50, 50, 50, 0.55)',
                    },
                },
                '& [aria-selected="true"]': {
                    backgroundColor: 'rgba(50, 50, 50, 0.55)',
                },
            },
        },
        dirTitle: {
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            minWidth: 'max-content',
            padding: '10px',
            left: 0,
            backgroundColor: 'rgba(60,60,60)',
            color: '#bbb',
            fontSize: 15,
            zIndex: 5,
            outline: 0,
            '& svg': {
                height: 25,
                marginRight: 10,
            },
            '&:hover': {
                backgroundColor: 'rgba(50,50,50,0.5)',
                color: '#fff',
            },
            '&:focus': {
                backgroundColor: 'rgba(50,50,50,0.5)',
                color: '#fff',
            },
        },
        sidebar: {
            maxWidth: 320,
            height: '100%',
            overflowX: 'auto',
            overflowY: 'auto',
            backgroundColor: 'rgba(50,50,50,0.4)',
            '&::-webkit-scrollbar': {
                width: '5px !important',
                height: '8px !important',
            },
            '&::-webkit-scrollbar-track': {
                background: 'rgba(#ffffff, 0.1) !important',
            },
            '&::-webkit-scrollbar-thumb': {
                background: 'rgba(#ffffff, 0.15) !important',
                '&:hover': {
                    background: 'rgba(#ffffff, 0.25) !important',
                    cursor: 'move !important',
                },
            },
        },
        sidebarFiles: {
            height: 'max-content',
            width: 'max-content',
            overflow: 'hidden',
            '& button': {
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                minWidth: 'max-content',
                border: 0,
                padding: '5px 10px',
                backgroundColor: 'transparent',
                color: '#ccc',
                fontSize: 28,
                '& p': {
                    marginLeft: 10,
                    fontSize: 14,
                },
                '& svg': {
                    width: 'auto',
                    minWidth: 10,
                    maxWidth: 20,
                    minHeight: 10,
                    maxHeight: 20,
                },
            },
            '& [data-selected="true"]': {
                backgroundColor: 'rgba(50,50,50,0.7)',
                color: '#fff',
            },
            '& [data-dir-active="true"]': {
                backgroundColor: 'rgba(50,50,50,0.5)',
                color: '#fff',
            },
            '& [class="super-treeview-node-content"]': {
                position: 'relative',
                '& [class*="super-treeview-triangle-btn"]': {
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    top: 0,
                    left: 0,
                },
            },
        },
        emptyState: {
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            '& svg': {
                width: '50%',
                height: '50%',
                color: '#fff',
                opacity: '0.2',
            },
        },
        codeBlue: {
            color: coderColors.codeBlue,
        },
        codeYellow: {
            color: coderColors.codeYellow,
        },
        codeRed: {
            color: coderColors.codeRed,
        },
    };
};
