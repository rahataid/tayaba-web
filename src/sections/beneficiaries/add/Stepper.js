import * as Yup from 'yup';
import { useState, useEffect } from 'react';

// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Stack, Button, Typography, Box } from '@mui/material';

// components
import FormProvider from '@components/hook-form';
import AddedInfo from './AddedInfo';
import BasicInformation from './BasicInformationFields';

import { useRouter } from 'next/router';

import { useBeneficiaryContext } from '@contexts/beneficiaries';
import WalletAdd from './WalletAdd';
// ----------------------------------------------------------------------

const FormSchema = Yup.object().shape({
  name: Yup.string().required('Full name is required').min(4, 'Mininum 4 characters').max(24, 'Maximum 15 characters'),
  phone: Yup.string().required('Phone Number is required'),
  projectId: Yup.number().required(' prroject is required'),
  gender: Yup.string().required('Please Select Gender'),
  villageId: Yup.number().required('please Select Village'),
  phoneOwnedBy: Yup.string().required('Phone Owner is Required'),
  phoneType: Yup.string().required('Please Select Phone TYpe'),
});

export default function Stepper() {
  const { addBeneficiary, getAllProjects, projects, getAllVillages, village } = useBeneficiaryContext();

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

  useEffect(() => {
    getAllVillages();
    getAllProjects();
  }, [getAllVillages]);

  const methods = useForm({
    mode: 'onTouched',
    resolver: yupResolver(FormSchema),
    values: defaultValues[step],
  });

  const { handleSubmit, setValue } = methods;

  const stepObj = {
    0: {
      title: 'Basic Information',
      component: <BasicInformation methods={methods} village={village} projects={projects} />,
      handleNext(data) {
        setDefaultValues({ ...defaultValues, [step]: data });
        handleIncreaseStep();
      },
    },
    1: {
      title: 'Extra Fields',
      component: <WalletAdd setValue={setValue} />,
      handleNext(data) {
        let basicFields = defaultValues[0];
        let payload = {};
        for (const key in data) {
          if (!basicFields[key]) {
            payload = { ...payload, [key]: data[key] };
          }
        }
        setDefaultValues({ ...defaultValues, [step]: payload });
        handleIncreaseStep();
      },
    },

    2: {
      title: 'Benificary  Added Info',
      component: <AddedInfo beneficaryInfo={defaultValues[0]} />,
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
  console.log({ defaultValues });
  const handleFinish = async () => {
    let payload = {};
    for (const key in defaultValues) {
      payload = { ...payload, ...defaultValues[key] };
    }
    let ben = await addBeneficiary(payload);
    push('/beneficiaries');
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
            <Button onClick={handleFinish} variant="contained">
              {' '}
              Finish
            </Button>
          )}
        </Stack>
      </FormProvider>
    </>
  );
}
