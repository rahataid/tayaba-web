'use strict';

/** external libraries */
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const LoadingOverlay = ({ skeleton, open = true, onClose, children }) => {
  if (open && skeleton) {
    return skeleton;
  }

  return (
    <div style={{ position: 'relative' }}>
      <Backdrop
        sx={{
          color: '#FFFFFF',
          opacity: ' 0.6 !important',
          borderRadius: 1,
          zIndex: (theme) => theme.zIndex.drawer + 500,
          position: 'absolute',
        }}
        open={open}
        onClick={onClose ? () => onClose() : () => {}}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {children}
    </div>
  );
};

export default LoadingOverlay;
