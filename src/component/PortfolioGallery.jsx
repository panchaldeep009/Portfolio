import React, { useEffect, useState } from 'react';
import Gallery from 'react-photo-gallery';

// import { Pagination } from 'swiper/dist/js/swiper.esm';

const PortfolioGallery = () => {
    const host = 'http://deeppanchal.com/';
    const [portFolio, setPortFolio] = useState([]);
    const photos = portFolio.map(data => {
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
    const portFolioItem = () => {
        //  console.log(obj);
    };
    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                overflow: 'auto',
                display: 'flex',
                ...(!portFolio.length && {
                    flexDirection: 'column',
                    placeContent: 'center',
                }),
            }}
        >
            {!portFolio.length ? (
                <div
                    style={{
                        textAlign: 'center',
                    }}
                >
                    Loading..
                </div>
            ) : (
                <Gallery photos={photos} onClick={portFolioItem} />
            )}
        </div>
    );
};

export default PortfolioGallery;
