import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import { Button, Chip, Grid, Stack } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useRahatTrigger } from '@services/contracts/useRahatTrigger';
import { useAuthContext } from 'src/auth/useAuthContext';
import ActivateResponseModal from './ActivateReponseModal';

const projectId = '637df143840a6865e08ebf20';

export default function ActivateResponse() {
  // #region State and Hooks
  const { roles } = useAuthContext();
  const { listTriggerConfirmations, isLive, contract, activateResponse, deactivateResponse } = useRahatTrigger();
  const [triggerAdmins, setTriggerAdmins] = useState([]);
  const [isResponseLive, setIsResponseLive] = useState(false);
  const [responseModalOpen, setResponseModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activatingResponse, setActivatingResponse] = useState(false);
  // #endregion

  // #region Functions
  const ModalFunctions = {
    handleModalOpen: () => setResponseModalOpen(true),
    handleModalClose: () => setResponseModalOpen(false),
  };

  const FetchFunctions = {
    fetchAdminList: useCallback(async () => {
      if (!contract) return;

      let admins = await listTriggerConfirmations(projectId);
      setTriggerAdmins(admins);
    }, [contract, listTriggerConfirmations]),

    fetchIsLiveStatus: useCallback(async () => {
      setLoading(true);
      if (!contract) return;

      const isLiveStatus = await isLive();
      setIsResponseLive(isLiveStatus);
      setLoading(false);
    }, [contract]),
  };

  const ActivateFunctions = {
    activateResponse: async () => {
      setActivatingResponse(true);
      await activateResponse(projectId);
      await FetchFunctions.fetchIsLiveStatus();
      setActivatingResponse(false);
      ModalFunctions.handleModalClose();
    },

    deactivateResponse: async () => {
      setActivatingResponse(true);
      await deactivateResponse(projectId);
      await FetchFunctions.fetchIsLiveStatus();
      setActivatingResponse(false);
      ModalFunctions.handleModalClose();
    },
  };

  // #endregion

  // #region UseEffects

  useEffect(() => {
    FetchFunctions.fetchIsLiveStatus();
    // return () => {
    //   setIsResponseLive(false);
    // };
  }, [FetchFunctions.fetchIsLiveStatus]);

  useEffect(() => {
    FetchFunctions.fetchAdminList();
    // return () => {
    //   setTriggerAdmins([]);
    // };
  }, [contract]);

  // #endregion

  return (
    <>
      <ActivateResponseModal
        modalOpen={responseModalOpen}
        handleModalClose={ModalFunctions.handleModalClose}
        list={triggerAdmins}
        onOkClick={isResponseLive ? ActivateFunctions.deactivateResponse : ActivateFunctions.activateResponse}
        loading={activatingResponse}
        title={`${isResponseLive ? 'Deactivate' : 'Activate'} Multi-Sig Trigger Response`}
      />
      <Card>
        <CardHeader
          action={<Chip label={!loading ? (isResponseLive ? 'Activated ' : 'Deactivated') : 'Loading...'} />}
          title="Multi-Sig Trigger Response"
          subheader="Activate/Deactivate Multi-Sig Trigger Response"
        />

        <CardActions>
          <Stack
            sx={{
              mt: 0,
              p: 2,
              width: '100%',
            }}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={12}
          >
            <Grid container direction="column" justifyContent="center" alignItems="start">
              <Button sx={{ mb: 1 }} disabled={loading} onClick={ModalFunctions.handleModalOpen} variant="outlined">
                {!loading ? (!isResponseLive ? 'Activate Response' : 'Deactivate Response') : 'Loading...'}
              </Button>
            </Grid>
          </Stack>
        </CardActions>
      </Card>
    </>
  );
}
