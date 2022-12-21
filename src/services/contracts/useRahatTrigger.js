import { CONTRACTS } from '@config';
import { useContract } from '@hooks/contracts';
import { useErrorHandler } from '@hooks/useErrorHandler';
import Web3Utils from '@utils/web3Utils';

export const useRahatTrigger = () => {
  const contract = useContract(CONTRACTS.TRIGGER);
  const { handleContractError } = useErrorHandler();

  return {
    contract,
    isLive: () => contract?.isLive().catch(handleContractError),

    activateResponse: (projectId) => contract?.activateResponse(projectId).catch(handleContractError),

    deactivateResponse: (projectId) => contract?.deactivateResponse(projectId).catch(handleContractError),

    listTriggerConfirmations(projectId) {
      projectId = Web3Utils.keccak256(projectId);
      return contract
        ?.listAdmins()
        .then(async (admins) => {
          let adminConfirmations = [];
          for (let admin of admins) {
            adminConfirmations.push({
              name: 'Admin: ...' + admin.slice(-4),
              address: admin,
              isConfirmed: await contract?.adminConfirmations(projectId, admin),
            });
          }
          return adminConfirmations;
        })
        .catch(handleContractError);
    },
  };
};
