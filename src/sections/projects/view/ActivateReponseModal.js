import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import { Grid, IconButton, Skeleton, Stack } from '@mui/material';
import truncateEthAddress from '@utils/truncateEthAddress';
import Iconify from '@components/iconify';
import WalletExplorerButton from '@components/button/WalletExplorerButton';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton sx={{ float: 'right' }} onClick={onClose}>
          <Iconify icon={'ic:round-close'} />{' '}
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
  onOkClick: PropTypes.func.isRequired,
};

export default function ActivateResponseModal({
  modalOpen,
  handleModalClose,
  list = [],
  loading,
  onOkClick,
  title,
  actionButtonLabel,
}) {
  return (
    <div>
      <BootstrapDialog fullWidth onClose={handleModalClose} aria-labelledby="customized-dialog-title" open={modalOpen}>
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleModalClose}>
          {title}
        </BootstrapDialogTitle>
        <DialogContent dividers fullWidth>
          {list.length > 0 ? (
            <Stack sx={{ p: 1 }}>
              {list?.map((item, index) => (
                <Stack
                  key={`${item.name}-${index}`}
                  direction="row"
                  justifyContent="space-evenly"
                  alignItems="center"
                  spacing={12}
                  sx={{ color: 'text.secondary', mb: 0.5, p: 0.5 }}
                >
                  <Grid container direction="column">
                    <Typography variant="body1">{item.name}</Typography>
                  </Grid>
                  <Grid container direction="column">
                    <WalletExplorerButton address={item?.address} />
                  </Grid>
                  <Grid container direction="column">
                    <Typography variant="body1">{truncateEthAddress(item.org)}</Typography>
                  </Grid>
                  <Grid container direction="column">
                    <Typography variant="body1">{item.isConfirmed ? 'Triggered' : 'Not Triggered'}</Typography>
                  </Grid>
                </Stack>
              ))}
            </Stack>
          ) : (
            <>
              <Skeleton />
              <Skeleton animation="wave" />
              <Skeleton animation={false} />
            </>
          )}

          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Note: Response is activated when at least two admins have triggered.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            variant={'outlined'}
            startIcon={<Iconify icon={'ic:round-close'} />}
            onClick={handleModalClose}
          >
            Cancel
          </Button>
          <Button
            loading={loading}
            disabled={loading || list.length === 0}
            autoFocus
            variant={'contained'}
            startIcon={<Iconify icon={'mdi:tick'} />}
            onClick={onOkClick}
          >
            {actionButtonLabel}
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}

ActivateResponseModal.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  handleModalClose: PropTypes.func.isRequired,
  list: PropTypes.array.isRequired,
};
