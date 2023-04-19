import WalletExplorerButton from '@components/button/WalletExplorerButton';
import { Card, CardContent, Chip, Grid, Typography } from '@mui/material';
import moment from 'moment';

const TransactionItems = ({ transaction }) => (
  <Card>
    <CardContent>
      <Grid container spacing={2}>
        <Grid item xs={4} md={4}>
          <Typography variant="caption1" gutterBottom component="div">
            Transaction Hash :
          </Typography>
        </Grid>
        <Grid item xs={8} md={8}>
          <WalletExplorerButton address={transaction?.txHash} truncateLength={16} />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={4} md={4}>
          <Typography variant="caption1" gutterBottom component="div">
            Status :
          </Typography>
        </Grid>
        <Grid item xs={8} md={8}>
          <Chip
            size="small"
            label={transaction?.txStatus}
            color={transaction?.txStatus === 'success' ? 'success' : 'error'}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={4} md={4}>
          <Typography variant="caption1" gutterBottom component="div">
            Timestamp :
          </Typography>
        </Grid>
        <Grid item xs={8} md={8}>
          <Typography variant="caption1" gutterBottom component="div">
            {moment.unix(transaction?.timestamp).format('DD MMM YYYY, hh:mm:ss A')}
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={4} md={4}>
          <Typography variant="caption1" gutterBottom component="div">
            Transaction Mode :
          </Typography>
        </Grid>
        <Grid item xs={8} md={8}>
          <Typography variant="caption1" gutterBottom component="div">
            {transaction?.isOffline ? 'Offline' : 'Online'}
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={4} md={4}>
          <Typography variant="caption1" gutterBottom component="div">
            From :
          </Typography>
        </Grid>
        <Grid item xs={8} md={8}>
          <WalletExplorerButton address={transaction?.from} truncateLength={16} />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={4} md={4}>
          <Typography variant="caption1" gutterBottom component="div">
            To :
          </Typography>
        </Grid>
        <Grid item xs={8} md={8}>
          <WalletExplorerButton address={transaction?.to} truncateLength={16} />
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

export default TransactionItems;
