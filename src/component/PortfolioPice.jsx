import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import {
    MdClear,
    MdKeyboardArrowLeft,
    MdKeyboardArrowRight,
} from 'react-icons/md';

const Portfolio = ({ data, setPortFolio }) => {
    const [mediaChild, setMediaChild] = React.useState(0);
    const media = data.photo.media[mediaChild];
    return (
        <div
            style={{
                position: 'fixed',
                backgroundColor: 'rgba(0,0,0,.8)',
                width: '100%',
                height: '100%',
                overflow: 'auto',
                color: 'white',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 15,
                }}
            >
                <h2 style={{ fontSize: 28 }}>{data.photo.item_name}</h2>
                <IconButton
                    color="primary"
                    aria-label="close"
                    onClick={() => {
                        setPortFolio(false);
                    }}
                >
                    <MdClear />
                </IconButton>
            </div>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: 15,
                }}
            >
                <div>
                    {mediaChild !== 0 && (
                        <Fab
                            style={{ margin: 10 }}
                            size="medium"
                            color="secondary"
                            aria-label="previous"
                            onClick={() => {
                                setMediaChild(mediaChild - 1);
                            }}
                        >
                            <MdKeyboardArrowLeft />
                        </Fab>
                    )}
                </div>
                <div
                    key={media.media_src}
                    style={{
                        width: '100%',
                        height: '50vh',
                        position: 'relative',
                    }}
                >
                    {media.media_type === 'image' && (
                        <img
                            src={'http://deeppanchal.com/' + media.media_src}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                            }}
                            alt={media.media_caption}
                        />
                    )}
                    {media.media_type === 'video' && (
                        <iframe
                            title={data.photo.item_name}
                            style={{
                                width: '100%',
                                height: '100%',
                            }}
                            src={media.media_src}
                        />
                    )}
                </div>
                <div>
                    {data.photo.media.length !== mediaChild + 1 && (
                        <Fab
                            style={{ margin: 10 }}
                            size="medium"
                            color="secondary"
                            aria-label="Next"
                            onClick={() => {
                                setMediaChild(mediaChild + 1);
                            }}
                        >
                            <MdKeyboardArrowRight />
                        </Fab>
                    )}
                </div>
            </div>
            <div>
                <p>{data.photo.item_about}</p>
            </div>
        </div>
    );
};

Portfolio.propTypes = {
    data: PropTypes.objectOf(PropTypes.any),
    setPortFolio: PropTypes.func,
};

export default Portfolio;
