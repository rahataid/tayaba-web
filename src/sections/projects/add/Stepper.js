import { useState } from 'react';
import * as Yup from 'yup';

// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import formFields from './data/formFields.json';

import { Box, Button, Stack, Typography } from '@mui/material';

// components
import FormProvider from '@components/hook-form';
import { CONTRACTS } from '@config';
import { useProjectContext } from '@contexts/projects';
import useWalletConnection from '@hooks/useWalletConnection';
import { LoadingButton } from '@mui/lab';
import { useProject } from '@services/contracts/useProject';
import Web3Utils from '@utils/web3Utils';
import { useWeb3React } from '@web3-react/core';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
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
  const { deployContract } = useProject();
  const { enqueueSnackbar } = useSnackbar();
  const { push } = useRouter();
  const { account } = useWeb3React();
  const { abi, byteCode, contractName, addProject } = useProjectContext();
  const { contracts } = useAppAuthContext();
  const { web3Provider } = useWalletConnection();

  const [defaultValues, setDefaultValues] = useState({
    0: { name: '', location: '', projectManager: '', description: '', startDate: '', endDate: '', projectType: '' },
  });
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const methods = useForm({
    mode: 'onTouched',
    resolver: yupResolver(FormSchema),
    values: defaultValues[step],
  });

  const { handleSubmit } = methods;

  const stepObj = {
    0: {
      title: 'Basic Information',
      component: <BasicInformation methods={methods} />,
      handleNext(data) {
        setDefaultValues({ ...defaultValues, [step]: data });
        handleIncreaseStep();
      },
    },
    1: {
      title: 'Extra Fields',
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
      title: 'Project Added Info',
      component: <AddedInfo projectType={defaultValues[0].projectType} projectInfo={defaultValues} setStep={setStep} />,
      handleNext(args) {
        // handleContractDeploy(args);
      },
    },
  };

  const handleIncreaseStep = () => {
    setStep((prev) => prev + 1);
  };

  const handleDecreaseStep = () => {
    setStep((prev) => prev - 1);
  };
  console.log(web3Provider);

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

      const { contract } = await Web3Utils.deployContract(web3Provider, { byteCode, abi, args });
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
        <Typography paddingTop={2} paddingBottom={2}>
          {stepObj[step].title}
        </Typography>
        <Box>{stepObj[step].component}</Box>
        <Stack direction={'row'} paddingTop={2} spacing={2}>
          {step !== 0 && (
            <Button onClick={handleDecreaseStep} variant={'outlined'}>
              {' '}
              Previous
            </Button>
          )}
          {!isLast ? (
            <Button type="submit" variant={'outlined'}>
              Next
            </Button>
          ) : (
            <LoadingButton loading={loading} onClick={handleContractDeploy} variant="contained">
              {' '}
              Finish And Deploy
            </LoadingButton>
          )}
        </Stack>
      </FormProvider>
    </>
  );
}
