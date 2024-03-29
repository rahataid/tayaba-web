import { AppService } from '@services/app';
import { useCallback, useEffect, useState } from 'react';
import { tblAbi } from '@utils/indexdb';

export const useAbi = (contract) => {
  const [abi, setAbi] = useState(null);

  const fetchContract = useCallback(async () => {
    let data = await tblAbi.get(contract);
    if (data?.abi) {
      setAbi(data.abi);
    } else {
      const response = await AppService.getContract(contract);
      await tblAbi.put({ name: contract, abi: response.data.data.abi });
      setAbi(response.data.abi);
    }
  }, [contract]);

  useEffect(() => {
    fetchContract();
  }, [fetchContract]);

  return [abi, contract];
};
