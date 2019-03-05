import React from 'react';
import PropTypes from 'prop-types';

const Layer = ({ children, zIndex }) => {
    const Style = {
        width: '100%',
        height: '100vh',
        display: 'flex',
        zIndex: zIndex != null ? zIndex : 0,
    };
    return <section style={Style}>{children}</section>;
};

Layer.propTypes = {
    children: PropTypes.PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
    zIndex: PropTypes.string,
};

export default Layer;
