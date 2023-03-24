import * as Yup from 'yup';
import { useState, useEffect } from 'react';

// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { Stack, Button, Typography, Box } from '@mui/material';

// components
import FormProvider from '@components/hook-form';
import AddedInfo from './WalletAdd';
import DynamicForm from './DynamicForm';
import BasicInformation from './BasicInformationFields';

import { useRouter } from 'next/router';

import { useBeneficiaryContext } from '@contexts/beneficiaries';
import WalletAdd from './WalletAdd';
// ----------------------------------------------------------------------

const FormSchema = Yup.object().shape({
  name: Yup.string().required('Full name is required').min(4, 'Mininum 4 characters').max(24, 'Maximum 15 characters'),
  phone: Yup.string().required('Phone Number is required'),
  description: Yup.string().required('description is required'),
  gender: Yup.string().required('Please Select Gender'),
  villageId: Yup.number().required('please Select Village'),
  phoneOwnedBy: Yup.string().required('Phone Owner is Required'),
  phoneType: Yup.string().required('Please Select Phone TYpe'),
});

export default function Stepper() {
  const { addBeneficiary } = useBeneficiaryContext();

  const { push } = useRouter();
  const [defaultValues, setDefaultValues] = useState({
    0: {
      name: '',
      phone: '',
      villageId: '',
      gender: '',
      cnicNumber: '',
      dailyDistanceCovered: '',
      phoneOwnedBy: '',
      phoneType: '',
    },
  });
  const [step, setStep] = useState(0);
  const { getAllVillages, village } = useBeneficiaryContext();

  useEffect(() => {
    getAllVillages();
  }, [getAllVillages]);

  const methods = useForm({
    mode: 'onTouched',
    resolver: yupResolver(FormSchema),
    values: defaultValues[step],
  });

  const { handleSubmit } = methods;

  const stepObj = {
    0: {
      title: 'Basic Information',
      component: <BasicInformation methods={methods} village={village} />,
      handleNext(data) {
        setDefaultValues({ ...defaultValues, [step]: data });
        handleIncreaseStep();
      },
    },
    1: {
      title: 'Extra Fields',
      component: <WalletAdd setStep={setStep} />,
      handleNext() {
        handleIncreaseStep();
      },
    },

    2: {
      title: 'Benificary  Added Info',
      component: <AddedInfo beneficaryInfo={defaultValues[0]} setStep={setStep} />,
      handleNext(args) {},
    },
  };

  const handleIncreaseStep = () => {
    setStep((prev) => prev + 1);
  };

  const handleDecreaseStep = () => {
    setStep((prev) => prev - 1);
  };

  const isLast = step === Object.keys(stepObj).length - 1;

  const handleContractDeploy = async () => {
    let ben = await addBeneficiary(defaultValues);
    push('/beneficaries');
  };

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(stepObj[step].handleNext)}>
        <Typography paddingTop={2} paddingBottom={2}>
          {stepObj[step].title}
        </Typography>
        <Box>{stepObj[step].component}</Box>
        <Stack direction={'row'} paddingTop={2} spacing={2}>
          {step !== 0 && (
            <Button onClick={handleDecreaseStep} variant={'outlined'}>
              {' '}
              previous
            </Button>
          )}
          {!isLast ? (
            <Button type="submit" variant={'outlined'}>
              next
            </Button>
          ) : (
            <Button onClick={handleContractDeploy} variant="contained">
              {' '}
              Finish
            </Button>
          )}
        </Stack>
      </FormProvider>
    </>
  );
}
