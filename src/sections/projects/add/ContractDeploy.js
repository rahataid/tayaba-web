import { useProject } from '@services/contracts/useProject';
import { useWeb3React } from '@web3-react/core';

const { Card, Button } = require('@mui/material');

const ContractDeploy = ({ contractName = 'RahatToken' }) => {
  const { deployContract } = useProject();
  const { account } = useWeb3React();
  console.log({ account });

  const handleContractDeploy = async (args = ['hello']) => {
    const { contract } = await deployContract({ contractName, args });
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
