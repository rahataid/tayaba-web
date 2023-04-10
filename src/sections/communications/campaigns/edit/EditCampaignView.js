import { RHFSelect, RHFTextField } from '@components/hook-form';
import FormProvider from '@components/hook-form/FormProvider';
import Iconify from '@components/iconify';
import { CAMPAIGN_TYPES, SPACING } from '@config';
import { useCommunications } from '@contexts/communications';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import {
  Alert,
  Button,
  Checkbox,
  Chip,
  Grid,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CommunicationService } from '@services/communications';
import { getLabelsByValues } from '@utils/arrays';
import { parseMultiLineInput } from '@utils/strings';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import RegisterAudiencesModal from './RegisterAudiencesModal';

const FormSchema = Yup.object().shape({
  name: Yup.string()
    .required('Campaign name is required')
    .min(4, 'Mininum 4 characters')
    .max(24, 'Maximum 15 characters'),
  startTime: Yup.date().nullable().required('Start date is required'),
  type: Yup.string().required('Campaign Type is required').oneOf(CAMPAIGN_TYPES),
  details: Yup.string().required('Enter the details for the campaign'),
  audienceIds: Yup.array().required('Select the audience for the campaign'),
  transportId: Yup.number().required('Select the transport for the campaign'),
});

const CreateCampaign = () => {
  const {
    transports,
    getTransports,
    audiences,
    getAudiences,
    getBeneficiaries,
    beneficiaries,
    getSingleCampaign,
    singleCampaign,
  } = useCommunications();
  const {
    push,
    query: { campaignId },
  } = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [isAddAudienceModalOpen, setIsAddAudienceModalOpen] = useState(false);

  const handleAudienceModal = () => {
    setIsAddAudienceModalOpen((o) => !o);
  };

  useEffect(() => {
    if (!campaignId) return;
    getSingleCampaign(campaignId);
  }, [campaignId]);

  useEffect(() => {
    getTransports();
  }, []);

  useEffect(() => {
    getAudiences();
  }, [getAudiences, isAddAudienceModalOpen]);

  useEffect(() => {
    getBeneficiaries();
  }, [getBeneficiaries]);

  useEffect(() => {
    const singleModified = {
      name: singleCampaign?.name,
      type: singleCampaign?.type,
      transportId: singleCampaign?.transportId,
      audienceIds: singleCampaign?.audiences?.map((aud) => aud.id),
      details: JSON.stringify(singleCampaign?.details, null, 2),

      startTime: dayjs(singleCampaign?.startTime),
    };

    console.log('singleModified', singleModified);
    reset(singleModified);
  }, [singleCampaign]);

  const methods = useForm({
    mode: 'onTouched',
    resolver: yupResolver(FormSchema),
    defaultValues: {
      name: '',
      startTime: '',
      type: '',
      details: '',
      audienceIds: [],
      transportId: null,
    },
  });
  const {
    handleSubmit,
    control,
    getValues,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = methods;

  const handleFormSubmit = async (data) => {
    try {
      const formatted = {
        ...data,
        startTime: data.startTime.toISOString(),
        details: parseMultiLineInput(data.details, 'OBJECT'),
      };

      const saved = await CommunicationService.updateCampaigns(campaignId, formatted);
      enqueueSnackbar('Campaign edited successfully', { variant: 'success' });
      push(`/communications/campaigns/${saved.data.id}`);
    } catch (error) {
      console.log('error', error?.response?.data?.errors);
      const responseErrors = error?.response?.data?.errors;
      if (responseErrors) {
        Object.keys(responseErrors).forEach((field) => {
          setError(field, {
            type: 'manual',
            message: responseErrors[field],
          });
        });
        enqueueSnackbar('There are errors in the form. Please fix them and try again.', { variant: 'error' });
      } else {
        console.log('error', error?.response?.data?.errors);
        enqueueSnackbar(error.message, { variant: 'error' });
        setError('afterSubmit', {
          message: error.response?.data?.errors || error.message,
        });
      }
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(handleFormSubmit)}>
      <RegisterAudiencesModal isOpen={isAddAudienceModalOpen} onClose={handleAudienceModal} list={beneficiaries} />

      <Stack m={2}>{!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}</Stack>

      <Grid container spacing={SPACING.GRID_SPACING}>
        <Grid item md={4} xs={12}>
          <RHFTextField id="name" name={'name'} label="Campaign Name" />
        </Grid>

        <Grid item md={4}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
              name="startTime"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Stack direction="column">
                  <DateTimePicker
                    helperText={error?.message}
                    {...field}
                    label="Start Time"
                    inputFormat="MM/DD/YYYY a"
                  />
                  <Typography color="error" variant={'caption'}>
                    {error?.message}
                  </Typography>
                </Stack>
              )}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item md={4}>
          <RHFSelect error={errors?.type} name="type" label="Select Campaign Type">
            {CAMPAIGN_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </RHFSelect>
        </Grid>

        <Grid item md={12}>
          <RHFTextField
            id="details"
            name="details"
            label="Details"
            multiline
            helperText={
              <Stack direction={'row'} justifyContent={'start'}>
                <Iconify icon="material-symbols:info-outline-rounded" /> Details should be the connection details of a
                communication, it should be in json format. It must contain details regarding services, may vary based
                on the service.
              </Stack>
            }
          />
        </Grid>

        <Grid item md={6}>
          <RHFSelect name="transportId" label="Select Transport">
            {transports.map((transport) => (
              <option key={transport.value} value={transport.value}>
                {transport.label}
              </option>
            ))}
          </RHFSelect>
        </Grid>

        <Grid item md={6}>
          <Controller
            name="audienceIds"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Stack direction={'column'}>
                <Select
                  {...field}
                  multiple
                  input={<OutlinedInput label="Select Audiences" />}
                  renderValue={(selected) =>
                    getLabelsByValues(audiences, selected).map((sel) => <Chip key={sel} label={sel} />)
                  }
                  sx={{
                    minWidth: 200,
                  }}
                >
                  {audiences.map((audience) => (
                    <MenuItem key={audience.value} value={audience.value}>
                      <Checkbox checked={getValues('audienceIds').indexOf(audience.value) > -1} />
                      <ListItemText primary={audience.label} />
                    </MenuItem>
                  ))}
                </Select>
                {error?.message &&
                  error?.message.map((err) => (
                    <Typography key={err} color="error" variant={'caption'}>
                      {err}
                    </Typography>
                  ))}
              </Stack>
            )}
          />
          <Button size="small" onClick={handleAudienceModal}>
            Register Audiences
          </Button>
        </Grid>
      </Grid>

      <Stack mt={2}>
        <LoadingButton loading={isSubmitting} type="submit" variant="contained">
          Edit Campaign
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
};

export default CreateCampaign;
