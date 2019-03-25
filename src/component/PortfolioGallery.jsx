import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Gallery from 'react-photo-gallery';
import withStyles from 'react-jss';

import Styles from '../styles/ui/gallery';
import Portfolio from './PortfolioPice';

const PortfolioGallery = ({ classes }) => {
    const host = 'http://deeppanchal.com/';
    const [portFolio, setPortFolio] = useState([]);
    const [portFolioSingle, setPortFolioSingle] = useState(false);
    const photos = portFolio
        .map(data => {
            const { media } = data;
            return {
                src:
                    media[0].media_type === 'video'
                        ? media[0].media_thumb
                        : host + media[0].media_src,
                height:
                    (100 * media[0].media_details.height) /
                    media[0].media_details.width,
                width: 100,
                ...data,
            };
        })
        .filter(data => {
            const category = window.location.hash.includes('design')
                ? 'design'
                : 'code';
            return data.item_main_category === category;
        });
    useEffect(() => {
        fetch(host + 'php/data.php')
            .then(data => {
                return data.json();
            })
            .then(data => {
                setPortFolio([...portFolio, ...data]);
            });
    }, []);
    const portFolioItem = (e, data) => {
        setPortFolioSingle(data);
    };

    const scrollVisible = event => {
        event.target.querySelectorAll('img').forEach(imgElement => {
            const rect = imgElement.getBoundingClientRect();
            const isVisible =
                rect.bottom >= 0 && rect.top <= event.target.offsetHeight;
            if (!isVisible) {
                imgElement.setAttribute('data-invisible', true);
            } else {
                imgElement.removeAttribute('data-invisible');
            }
        });
    };
    return (
        <div
            className={classes.gallery}
            style={{
                ...(!portFolio.length && {
                    flexDirection: 'column',
                    placeContent: 'center',
                    textAlign: 'center',
                }),
                ...(portFolioSingle && {
                    overflow: 'hidden',
                }),
            }}
            onScroll={scrollVisible}
            onLoad={scrollVisible}
        >
            {!portFolio.length ? (
                <div>Loading..</div>
            ) : (
                <React.Fragment>
                    <div
                        style={{
                            ...(portFolioSingle && {
                                filter: 'blur(20px)',
                            }),
                        }}
                    >
                        <Gallery photos={photos} onClick={portFolioItem} />
                    </div>
                    {portFolioSingle && (
                        <Portfolio
                            data={portFolioSingle}
                            setPortFolio={setPortFolioSingle}
                        />
                    )}
                </React.Fragment>
            )}
        </div>
    );
};

PortfolioGallery.propTypes = {
    classes: PropTypes.objectOf(PropTypes.any),
};

export default withStyles(Styles)(PortfolioGallery);
