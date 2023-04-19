import SummaryCard from '@components/SummaryCard';
import { useProjectContext } from '@contexts/projects';
import useDialog from '@hooks/useDialog';
import useLoading from '@hooks/useLoading';
import { Button, Grid } from '@mui/material';
import { useRahatDonor } from '@services/contracts/useRahatDonor';
import { useAuthContext } from 'src/auth/useAuthContext';
import AmountForm from '../token-tracker/AmountForm';

export default function InfoCard({ chainData }) {
  const { isDialogShow, showDialog, hideDialog } = useDialog();
  const { sendTokenToProject } = useRahatDonor();
  const { beneficiaryCount, singleProject } = useProjectContext();
  const { roles } = useAuthContext();

  const sx = { borderRadius: 2 };

  const { showLoading, hideLoading } = useLoading();

  const handleAddBudgetModel = () => {
    showDialog();
  };

  const TokenActions = {
    async sendTokenToProject(amount) {
      if (!roles.isDonor) return;
      showLoading('cashTransfer');
      await sendTokenToProject(amount);
      hideLoading('cashTransfer');
    },
  };

  return (
    <>
      <AmountForm
        title="Add Relief Items in Project"
        description={<>Please enter the Relief items you wish to add to project</>}
        approveCashTransfer={TokenActions.sendTokenToProject}
        handleClose={hideDialog}
        open={isDialogShow}
      />
      <Grid container alignItems="flex-start" justifyContent="center" paddingTop={3}>
        <Grid item xs={12} md={4} style={{ padding: '8px' }}>
          <SummaryCard
            color="warning"
            icon="material-symbols:person-4"
            title="Beneficiaries"
            total={beneficiaryCount}
            subtitle={'households'}
            sx={sx}
          />
        </Grid>

        <Grid item xs={12} md={4} style={{ padding: '8px' }}>
          <SummaryCard
            color="success"
            icon="material-symbols:token"
            title="Relief Items"
            total={
              chainData.projectBalance <= 0 ? (
                roles.isDonor && !chainData?.isLocked ? (
                  <Button disabled={!chainData?.isApproved} onClick={handleAddBudgetModel}>
                    Add Relief Items
                  </Button>
                ) : (
                  chainData.projectBalance || 0
                )
              ) : (
                chainData.projectBalance
              )
            }
            subtitle="H2O Wheels"
            sx={sx}
          />
        </Grid>
        <Grid item xs={12} md={4} style={{ padding: '8px' }}>
          <SummaryCard
            color="error"
            icon="ph:currency-circle-dollar-light"
            title="Distributed"
            total={singleProject?.disbursed || 0}
            subtitle={'H2O Wheels'}
            sx={sx}
          />
        </Grid>
      </Grid>
    </>
  );
}
