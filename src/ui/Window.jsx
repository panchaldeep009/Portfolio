import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'react-jss';
import Resizable from 're-resizable';

import Styles from '../styles/ui/Window';

const Window = ({ classes, children, handleActions, title, icon, size }) => {
    const thisWindow = React.useRef();
    const [state, setState] = React.useState({
        width: size.width + 'px',
        height: size.height + 'vh',
        x: -5,
        y: 0,
    });
    const [fullScreen, setFullScreen] = React.useState(false);
    const [drag, setDrag] = React.useState({
        element: thisWindow,
        dragAble: false,
        current: { x: 0, y: 0 },
        target: null,
        elementPos: { top: 0, left: 0 },
        dragPos: undefined,
    });
    const [windowStyle, setWindowStyle] = React.useState({});
    React.useEffect(() => {
        setWindowStyle({ opacity: 1, transform: `translate(0,0) scale(1)` });
    }, []);
    const handleClose = () => {
        setWindowStyle({ opacity: 0, transform: `translate(0,0) scale(0)` });
        setTimeout(() => {
            handleActions.close();
        }, 400);
    };
    const fullScreenToggle = () => {
        setFullScreen(!fullScreen);
        if (!fullScreen) {
            setState({
                width: size.width + 'px',
                height: size.height + 'vh',
                x: -5,
                y: 0,
            });
            setDrag({
                ...drag,
                current: { x: 0, y: 0 },
                elementPos: { top: 0, left: 0 },
            });
        }
    };
    const handleDrag = {
        start: e => {
            if (!fullScreen) {
                setDrag({
                    ...drag,
                    dragAble: true,
                    target: e.target,
                    current: { x: e.clientX, y: e.clientY },
                    elementPos: {
                        top: drag.element.current.resizable.offsetTop,
                        left: drag.element.current.resizable.offsetLeft,
                    },
                });
            }
        },
        drag: e => {
            if (!fullScreen) {
                setDrag({
                    ...drag,
                    dragPos: {
                        top: drag.elementPos.top - (drag.current.y - e.clientY),
                        left:
                            drag.elementPos.left - (drag.current.x - e.clientX),
                    },
                });
            }
        },
    };
    const sizeRND = fullScreen
        ? { width: '100vw', height: '100vh' }
        : { width: state.width, height: state.height };
    return (
        <Resizable
            ref={thisWindow}
            className={classes.window}
            style={{
                transform: `translate(0,0) scale(0)`,
                transformOrigin: '50% 50%',
                marginTop: '0%',
                opacity: 0,
                ...(drag.dragPos !== undefined && {
                    top: drag.dragPos.top,
                    left: drag.dragPos.left,
                }),
                ...(fullScreen && {
                    top: 0,
                    left: 0,
                }),
                ...windowStyle,
            }}
            size={sizeRND}
            onResize={(e, direction, ref, d) => {
                if (!fullScreen) {
                    setState({
                        ...state,
                        ...(direction.includes('eft') && { x: -d.width }),
                        ...(direction.includes('op') && { y: -d.height }),
                        width: state.width + d.width,
                        height: state.height + d.height,
                    });
                }
            }}
        >
            <div
                draggable="true"
                onDragStart={handleDrag.start}
                onDrag={handleDrag.drag}
                onDragEnd={handleDrag.drag}
                className={classes.titleBar}
            >
                <img style={{ width: 30 }} alt="app_icon" src={icon} />
                <span>{title}</span>
                <div className={classes.buttons}>
                    <button
                        onClick={fullScreenToggle}
                        type="button"
                        className={classes.expandButton}
                    />
                    <button
                        onClick={handleClose}
                        type="button"
                        className={classes.closeButton}
                    />
                </div>
            </div>
            {children}
        </Resizable>
    );
};

Window.propTypes = {
    classes: PropTypes.objectOf(PropTypes.any),
    children: PropTypes.PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
    handleActions: PropTypes.objectOf(PropTypes.any),
    size: PropTypes.objectOf(PropTypes.any),
    title: PropTypes.string,
    icon: PropTypes.string,
};

export default withStyles(Styles)(Window);
