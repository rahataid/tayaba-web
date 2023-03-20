import { useProject } from '@services/contracts/useProject';
import { useWeb3React } from '@web3-react/core';
import { useSnackbar } from 'notistack';

const { Card, Button } = require('@mui/material');

const ContractDeploy = ({ contractName = 'RahatToken' }) => {
  const { deployContract } = useProject();
  const { account } = useWeb3React();
  const { enqueueSnackbar } = useSnackbar();

  const handleContractDeploy = async (args) => {
    const { contract } = await deployContract({ contractName, args });
    enqueueSnackbar('Deployed Contracts');
    console.log({ contract });
  };

  return (
    <>
      <Card>
        <Button onClick={handleContractDeploy}>Deploy Contract</Button>
      </Card>
    </>
  );
};

export default ContractDeploy;
