import React from 'react';
import PropTypes from 'prop-types';

const Layer = ({ children, options, className }) => {
    const Style = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        display: 'flex',
        ...options,
    };
    return (
        <section className={className} style={Style}>
            {children}
        </section>
    );
};

Layer.propTypes = {
    children: PropTypes.PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
    options: PropTypes.objectOf(PropTypes.any),
    className: PropTypes.string,
};

export default Layer;
