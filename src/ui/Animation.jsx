import React from 'react';
import Lottie from 'lottie-web';
import PropTypes from 'prop-types';

const Animation = class extends React.Component {
    constructor(props) {
        super(props);
        this.Holder = React.createRef();
        this.Animation = null;
        this.options = props.options;
    }

    componentDidMount() {
        this.Animation = Lottie.loadAnimation({
            ...this.options,
            container: this.Holder.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice',
            },
        });
    }

    render() {
        return <div style={{ width: '100%' }} ref={this.Holder} />;
    }
};

Animation.propTypes = {
    options: PropTypes.objectOf(PropTypes.object),
};
export default Animation;
