import PropTypes from 'prop-types';
import { m } from 'framer-motion';
import { useState, useRef } from 'react';
// @mui
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Stack, Card, Typography, Link } from '@mui/material';
// components
import Image from '@components/image';
import { MotionContainer, varFade } from '@components/animate';
import Carousel, { CarouselDots, CarouselArrows } from '@components/carousel';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// ----------------------------------------------------------------------

const StyledOverlay = styled('div')(({ theme }) => ({
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 8,
  position: 'absolute',
  backgroundColor: alpha(theme.palette.grey[900], 0.3),
}));

// ----------------------------------------------------------------------

PhotoGallery.propTypes = {
  list: PropTypes.array,
};

export default function PhotoGallery({ list, ...other }) {
  const theme = useTheme();
  list = list.sort((a, b) => parseInt(b.id) - parseInt(b.id));
  const carouselRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(theme.direction === 'rtl' ? list.length - 1 : 0);

  const carouselSettings = {
    speed: 3000,
    dots: false,
    arrows: false,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    beforeChange: (current, next) => setCurrentIndex(next),
    ...CarouselDots({
      sx: {
        top: 20,
        left: 20,
        position: 'absolute',
      },
    }),
  };

  const handlePrev = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  return (
    <Card {...other}>
      <Carousel ref={carouselRef} {...carouselSettings}>
        {list.map((app, index) => (
          <CarouselItem key={app.id} item={app} isActive={index === currentIndex} />
        ))}
      </Carousel>
    </Card>
  );
}

// ----------------------------------------------------------------------

CarouselItem.propTypes = {
  isActive: PropTypes.bool,
  item: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
  }),
};

function CarouselItem({ item, isActive }) {
  const { image, title, description } = item;

  return (
    <MotionContainer action animate={isActive} sx={{ position: 'relative' }}>
      <Link href="/photo-gallery">
        <a>
          <Stack
            spacing={1}
            sx={{
              p: 3,
              width: 1,
              bottom: 0,
              zIndex: 9,
              textAlign: 'left',
              position: 'absolute',
              color: 'common.white',
            }}
          >
            <m.div variants={varFade().inRight}>
              <Typography variant="body2" noWrap>
                {title}
              </Typography>
            </m.div>
          </Stack>

          <StyledOverlay />

          <Image
            alt={title}
            src={image}
            sx={{
              height: { xs: 280, xl: 335 },
            }}
          />
        </a>
      </Link>
    </MotionContainer>
  );
}
