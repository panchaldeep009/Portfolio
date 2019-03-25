import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'react-jss';
import Resizable from 're-resizable';

import Styles from '../styles/ui/Window';

const Window = ({
    classes,
    animation,
    children,
    handleActions,
    title,
    icon,
    size,
}) => {
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
    const handleDrag = {
        start: e => {
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
        },
        drag: e => {
            setDrag({
                ...drag,
                dragPos: {
                    top: drag.elementPos.top - (drag.current.y - e.clientY),
                    left: drag.elementPos.left - (drag.current.x - e.clientX),
                },
            });
        },
    };
    return (
        <Resizable
            ref={thisWindow}
            className={classes.window}
            style={{
                transform: `translate(${state.x}px,${state.y}px) scale(${
                    animation.scale
                })`,
                transformOrigin: '0% 0%',
                marginTop: animation.top + '%',
                ...(drag.dragPos !== undefined && {
                    top: drag.dragPos.top,
                    left: drag.dragPos.left,
                }),
                ...(fullScreen && {
                    top: 0,
                    left: 5,
                }),
            }}
            size={{
                width: state.width,
                height: state.height,
                ...(fullScreen && {
                    width: '100%',
                    height: '100vh',
                }),
            }}
            onResize={(e, direction, ref, d) => {
                setState({
                    ...state,
                    ...(direction.includes('eft') && { x: -d.width }),
                    ...(direction.includes('op') && { y: -d.height }),
                    width: state.width + d.width,
                    height: state.height + d.height,
                });
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
                        onClick={() => {
                            setFullScreen(!fullScreen);
                        }}
                        type="button"
                        className={classes.expandButton}
                    />
                    <button
                        onClick={handleActions.close}
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
    animation: PropTypes.objectOf(PropTypes.any),
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
