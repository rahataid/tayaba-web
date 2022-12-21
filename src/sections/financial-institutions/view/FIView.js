import React, { useEffect } from 'react';
import InfoCard from './InfoCard';
import { useRouter } from 'next/router';
import { useFinancialInstitutionsContext } from '@contexts/financial-institutions';

const FIView = () => {
  const {
    query: { fiId },
  } = useRouter();
  const { getFIById, singleFI } = useFinancialInstitutionsContext();

  useEffect(() => {
    getFIById(fiId);
  }, [fiId, getFIById]);
  console.log('singleFI', singleFI);

  return (
    <>
      <InfoCard info={singleFI} />
    </>
  );
};

export default FIView;
