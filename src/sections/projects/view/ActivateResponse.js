import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import { Button, Chip, Grid, Stack } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useRahatTrigger } from '@services/contracts/useRahatTrigger';
import { useAuthContext } from 'src/auth/useAuthContext';
import ActivateResponseModal from './ActivateReponseModal';
import { useRouter } from 'next/router';
import { useProjectContext } from '@contexts/projects';
import { AppService } from '@services/app';

export default function ActivateResponse() {
  // #region State and Hooks
  const { roles } = useAuthContext();
  const { setRahatResponseStatus, isRahatResponseLive } = useProjectContext();
  const { listTriggerConfirmations, isLive, contract, activateResponse, deactivateResponse } = useRahatTrigger();

  const {
    query: { projectId },
  } = useRouter();

  const [triggerAdmins, setTriggerAdmins] = useState([]);
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

      const adminNames = await AppService.getAdmins();

      let admins = await listTriggerConfirmations(projectId);
      const adminMod = admins.map((admin) => {
        const adminOrg = adminNames.data.find((adminName) => adminName.address === admin.address);

        return {
          ...admin,
          org: adminOrg?.name,
        };
      });
      setTriggerAdmins(adminMod);
    }, [contract, listTriggerConfirmations, projectId]),

    fetchIsLiveStatus: useCallback(async () => {
      setLoading(true);
      if (!contract) return;

      const isLiveStatus = await isLive();
      setRahatResponseStatus(isLiveStatus);
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
    //   setRahatResponseStatus(false);
    // };
  }, [FetchFunctions.fetchIsLiveStatus]);

  useEffect(() => {
    if (!projectId) return;
    FetchFunctions.fetchAdminList();
    // return () => {
    //   setTriggerAdmins([]);
    // };
  }, [projectId, contract]);

  // #endregion

  return (
    <>
      <ActivateResponseModal
        modalOpen={responseModalOpen}
        handleModalClose={ModalFunctions.handleModalClose}
        list={triggerAdmins}
        onOkClick={isRahatResponseLive ? ActivateFunctions.deactivateResponse : ActivateFunctions.activateResponse}
        loading={activatingResponse}
        actionButtonLabel={isRahatResponseLive ? 'Deactivate Response' : 'Activate Response'}
        title={`Multi-Signature Response Trigger`}
      />
      <Button
        disabled={loading}
        color={isRahatResponseLive ? 'error' : 'success'}
        onClick={ModalFunctions.handleModalOpen}
        variant="outlined"
      >
        {!loading ? (!isRahatResponseLive ? 'Activate Response' : 'Deactivate Response') : 'Loading...'}
      </Button>
    </>
  );
}
