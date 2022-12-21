import { Stack } from '@mui/material';
import { LiveTransactionTable } from '@sections/transactionTable';

const TransactionView = (props) => {
  return (
    <div>
      <Stack>
        <LiveTransactionTable />
      </Stack>
    </div>
  );
};

TransactionView.propTypes = {};

export default TransactionView;
