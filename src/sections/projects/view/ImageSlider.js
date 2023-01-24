import PropTypes from 'prop-types';
import { m } from 'framer-motion';
import { useState, useRef } from 'react';
// @mui
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Stack, Card, Typography, Link } from '@mui/material';
// components
import Image from '../../../components/image';
import { MotionContainer, varFade } from '../../../components/animate';
import Carousel, { CarouselDots, CarouselArrows } from '../../../components/carousel';
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
  // backgroundColor: alpha(theme.palette.grey[900], 0.64),
  borderRadius: Number(theme.shape.borderRadius) * 2,
}));

// ----------------------------------------------------------------------

ImageSlider.propTypes = {
  list: PropTypes.array,
};

export default function ImageSlider({ list, projectName, ...other }) {
  const theme = useTheme();

  const carouselRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(theme.direction === 'rtl' ? list.length - 1 : 0);

  const carouselSettings = {
    speed: 800,
    dots: false,
    arrows: false,
    autoplay: false,
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
    <Card {...other} style={{ borderRadius: Number(theme.shape.borderRadius) * 2 }}>
      <Carousel ref={carouselRef} {...carouselSettings}>
        {list.map((app, index) => (
          <CarouselItem key={app.id} item={app} isActive={index === currentIndex} projectName={projectName} />
        ))}
      </Carousel>

      {/* <CarouselArrows
        onNext={handleNext}
        onPrevious={handlePrev}
        sx={{ buttom: 8, right: 0, position: 'absolute', color: 'common.white' }}
      /> */}
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

function CarouselItem({ item, isActive, projectName }) {
  const { image, title, description } = item;
  const theme = useTheme();

  return (
    <MotionContainer action animate={isActive} sx={{ position: 'relative' }}>
      <Link href="/photo-gallery">
        <a>
          <StyledOverlay />
          <Image
            alt={title}
            src={image}
            sx={{
              height: { xs: 280, xl: 400 },
            }}
          />
          <Stack
            spacing={1}
            sx={{
              width: 1,
              bottom: 60,
              zIndex: 9,
              textAlign: 'center',
              position: 'relative',
              color: 'common.white',
            }}
          >
            <m.div variants={varFade().inRight}>
              <Typography
                variant="h4"
                component="div"
                sx={{
                  backgroundColor: alpha(theme.palette.grey[900], 0.64),
                  width: 1,
                  p: 2,
                  fontWeight: 600,
                  textAlign: 'left',
                  position: 'absolute',
                }}
              >
                {projectName}
              </Typography>
            </m.div>
          </Stack>
        </a>
      </Link>
    </MotionContainer>
  );
}
