import { AppService } from '@services/app';
import { useCallback, useEffect, useState } from 'react';
import { tblAbi } from '@utils/indexdb';

export const useAbi = (contract) => {
  const [abi, setAbi] = useState(null);

  const fetchContract = useCallback(async () => {
    let data = await tblAbi.get('rahatDonor');
    console.log(data);
    if (data?.abi) {
      setAbi(data.abi);
    } else {
      const response = await AppService.getContract(contract);
      console.log(response.data);
      await tblAbi.put({ name: contract, abi: response.data.abi });
      setAbi(response.data.abi);
    }
  }, [contract]);

  useEffect(() => {
    fetchContract();
  }, [fetchContract]);

  return [abi, contract];
};
