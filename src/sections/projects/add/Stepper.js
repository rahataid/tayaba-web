import * as Yup from 'yup';
import { useRef, useEffect, useState } from 'react';
import { useProjectContext } from '@contexts/projects';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import formFields from './data/formFields.json';

import { Stack, Button, Typography, Box } from '@mui/material';

// components
import FormProvider from '@components/hook-form';
import AddedInfo from './AddedInfo';
import DynamicForm from './DynamicForm';
import BasicInformation from './BasicInformaitonFields';
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
  projectsTypes: Yup.string().required('Project Types is required'),
});

export default function Stepper() {
  const [defaultValues, setDefaultValues] = useState({
    0: { name: '', location: '', projectManager: '', description: '', startDate: '', endDate: '', projectsTypes: '' },
  });
  const [step, setStep] = useState(0);
  const methods = useForm({
    mode: 'onTouched',
    resolver: yupResolver(FormSchema),
    values: defaultValues[step],
  });

  const { handleSubmit, isSubmitting } = methods;

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
      title: 'Project Added Info',
      component: <AddedInfo projectInfo={defaultValues[0]} setStep={setStep} />,
      handleNext(data) {
        handleIncreaseStep();
      },
    },
    2: {
      title: 'Extra Fields',
      component: <DynamicForm items={formFields} setStep={setStep} />,
      handleNext() {
        handleIncreaseStep();
      },
    },
  };

  const handleIncreaseStep = () => {
    setStep((prev) => prev + 1);
  };
  console.log(defaultValues);

  const handleDecreaseStep = () => {
    setStep((prev) => prev - 1);
  };

  const isLast = step === Object.keys(stepObj).length - 1;

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
            <Button type="submit" variant="contained">
              {' '}
              Finish
            </Button>
          )}
        </Stack>
      </FormProvider>
    </>
  );
}
