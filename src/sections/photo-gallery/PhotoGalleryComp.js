import { getFlickrImages } from '@services/flickr';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import PhotoGallery from './ImageGallery';

const PhotoGalleryComp = (props) => {
  const [images, setImages] = useState([]);

  const fetchImages = async () => {
    const params = {
      // per_page: 100,
    };
    const res = await getFlickrImages(params);
    let list = res.photo;
    list = list.sort((a, b) => parseInt(b.id) - parseInt(b.id));
    setImages(list);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return <PhotoGallery data={images} />;
};

PhotoGalleryComp.propTypes = {};

export default PhotoGalleryComp;
