import { Contract, providers } from 'ethers';
import { useEffect, useState } from 'react';
import { useWallet } from '@hooks/useWallet';
import { useAbi } from './useAbi';
import { useAuthContext } from 'src/auth/useAuthContext';

export const useContract = (contractName, options = { isWebsocket: false }) => {
  let { chainWebSocket, contracts } = useAuthContext();
  const [abi] = useAbi(contractName);
  const wallet = useWallet();
  const [contract, setContract] = useState(null);

  useEffect(() => {
    if (contracts && abi?.length && contractName) {
      let con = null;
      if (options?.isWebsocket)
        con = new Contract(
          options?.contractAddress || contracts[contractName],
          abi,
          new providers.WebSocketProvider(chainWebSocket)
        );
      else con = new Contract(options?.contractAddress || contracts[contractName], abi, wallet);
      setContract(con);
    }
  }, [abi]);

  return contract;
};
