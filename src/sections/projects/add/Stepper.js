import { useState } from 'react';
import * as Yup from 'yup';

// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import formFields from './data/formFields.json';

import { Alert, AlertTitle, Box, Button, Stack, Typography } from '@mui/material';

// components
import FormProvider from '@components/hook-form';
import { CONTRACTS } from '@config';
import { useProjectContext } from '@contexts/projects';
import { useErrorHandler } from '@hooks/useErrorHandler';
import useWalletConnection from '@hooks/useWalletConnection';
import { LoadingButton } from '@mui/lab';
import Web3Utils from '@utils/web3Utils';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useAppAuthContext } from 'src/auth/JwtContext';
import AddedInfo from './AddedInfo';
import BasicInformation from './BasicInformaitonFields';
import DynamicForm from './DynamicForm';
// ----------------------------------------------------------------------

const FormSchema = Yup.object().shape({
  name: Yup.string().required('Full name is required').min(4, 'Mininum 4 characters').max(24, 'Maximum 15 characters'),
  startDate: Yup.date().nullable().required('Start date is required'),
  endDate: Yup.date()
    .required('End date is required')
    .nullable()
    .min(Yup.ref('startDate'), 'End date must be later than start date'),
  projectManager: Yup.string().required('Project Manager is required'),
  location: Yup.string().required('Project Types is required'),
  projectType: Yup.string().required('Project Types is required'),
});

export default function Stepper() {
  const { enqueueSnackbar } = useSnackbar();
  const { push } = useRouter();
  const { abi, byteCode, contractName, addProject, getFormFields, getContracts } = useProjectContext();
  const { contracts } = useAppAuthContext();
  const { library, estimateGas, walletBalance } = useWalletConnection();
  const { showError } = useErrorHandler();

  const [defaultValues, setDefaultValues] = useState({
    0: { name: '', location: '', projectManager: '', description: '', startDate: '', endDate: '', projectType: '' },
  });
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [costEstimation, setCostEstimation] = useState({
    estimatedCost: null,
    hasEnoughBalance: null,
    costInEthers: null,
  });

  const methods = useForm({
    mode: 'onTouched',
    resolver: yupResolver(FormSchema),
    values: defaultValues[step],
  });

  const { handleSubmit,
    setError,
    formState: {
      errors, isSubmitting, isValid
    } } = methods;

  useEffect(() => {
    if (!defaultValues[0]?.projectType) return;
    // getFormFields(defaultValues[0]?.projectType);
    getContracts(defaultValues[0]?.projectType);
  }, [getFormFields, defaultValues[0]?.projectType]);

  const stepObj = {
    0: {
      title: 'General Project Information',
      component: <BasicInformation methods={methods} />,
      async handleNext(data) {
        setDefaultValues({ ...defaultValues, [step]: data });
        if (!isValid) {
          setError('afterSubmit', {
            message: 'There are some validation errors. Please fix that before proceeding.'
          })
        }
        try {
          const { estimatedCost, hasEnoughBalance, costInEthers } = await estimateGas(byteCode);

          setCostEstimation({
            estimatedCost,
            hasEnoughBalance,
            costInEthers,
          });

          if (costEstimation?.hasEnoughBalance) {
            handleIncreaseStep();
          }

        } catch (error) {
          console.log('error', error);
          showError('Error estimating gas fee');
        }
      },
    },
    1: {
      title: 'Specific Project Information',
      component: <DynamicForm items={formFields} projectType={defaultValues[0].projectType} setStep={setStep} />,
      handleNext(data) {
        handleIncreaseStep();
        let basicFields = defaultValues[0];
        let payload = {};
        for (const key in data) {
          if (!basicFields[key]) {
            payload = { ...payload, [key]: data[key] };
          }
        }
        setDefaultValues({ ...defaultValues, [step]: { extras: payload } });
      },
    },

    2: {
      title: 'Review and Deploy',
      component: <AddedInfo projectType={defaultValues[0].projectType} projectInfo={defaultValues} setStep={setStep} />,
      handleNext: null,
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
    // if (!account) return;

    try {
      if (!contractName) return;
      setLoading(true);
      let args = [
        defaultValues[0].name,
        contracts[CONTRACTS.RAHATTOKEN],
        contracts[CONTRACTS.CLAIM],
        '0xcdD96aB6bA2819B53ee9c5273b60d98383F2171b',
        contracts[CONTRACTS.COMMUNITY],
      ];

      const { contract } = await Web3Utils.deployContract(library, { byteCode, abi, args });
      enqueueSnackbar('Deployed Contracts');

      let payload = { contractAddress: contract.address };
      for (const key in defaultValues) {
        payload = { ...payload, ...defaultValues[key] };
      }
      await addProject(payload);
      push(`/projects/${contract.address}`);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };
  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(stepObj[step].handleNext)}>
        <Typography variant={'subtitle1'} mt={2} mb={2}>
          {stepObj[step].title}
        </Typography>

        <Stack m={2}>{!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}</Stack>

        <Box>{stepObj[step].component}</Box>
        <Stack direction={'row'} paddingTop={2} spacing={2}>
          {step !== 0 && (
            <Button onClick={handleDecreaseStep} variant={'outlined'}>
              {' '}
              Previous
            </Button>
          )}
          {!isLast ? (
            <Button disabled={costEstimation?.hasEnoughBalance === false} type="submit" variant={'outlined'}>
              Next
            </Button>
          ) : (
            <LoadingButton loading={loading} onClick={handleContractDeploy} variant="contained">
              {' '}
              Finish And Deploy
            </LoadingButton>
          )}
        </Stack>
        {costEstimation?.hasEnoughBalance === false && (
          <Stack mt={2}>
            <Alert severity="warning">
              <AlertTitle>Not enough balance </AlertTitle>
              <Typography>
                You need at least {costEstimation?.costInEthers} ethers to deploy this contract. You have{' '}
                {walletBalance} ethers in your wallet.
              </Typography>
            </Alert>
          </Stack>
        )}
      </FormProvider>
    </>
  );
}
