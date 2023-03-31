import { RHFSelect, RHFTextField } from '@components/hook-form';
import FormProvider from '@components/hook-form/FormProvider';
import { CAMPAIGN_TYPES, SPACING } from '@config';
import { useCommunications } from '@contexts/communications';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import {
  Button,
  Checkbox,
  Chip,
  Grid,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CommunicationService } from '@services/communications';
import { getLabelsByValues } from '@utils/arrays';
import { parseMultiLineInput } from '@utils/strings';
import { useRouter } from 'next/router';
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
  const { transports, getTransports, audiences, getAudiences, getBeneficiaries, beneficiaries } = useCommunications();
  const { push } = useRouter();

  const [isAddAudienceModalOpen, setIsAddAudienceModalOpen] = useState(false);

  const handleAudienceModal = () => {
    setIsAddAudienceModalOpen((o) => !o);
  };

  useEffect(() => {
    getTransports();
  }, []);

  useEffect(() => {
    getAudiences();
  }, [getAudiences, isAddAudienceModalOpen]);

  useEffect(() => {
    getBeneficiaries();
  }, [getBeneficiaries]);

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
  const { handleSubmit, control, getValues } = methods;
  // console.log('first', getValues('audienceIds'));

  const handleFormSubmit = async (data) => {
    try {
      const formatted = {
        ...data,
        startTime: data.startTime.toISOString(),
        details: parseMultiLineInput(data.details, 'OBJECT'),
      };
      const saved = await CommunicationService.createCampaigns(formatted);
      push(`/communications/campaigns/${saved.id}`);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(handleFormSubmit)}>
      <RegisterAudiencesModal isOpen={isAddAudienceModalOpen} onClose={handleAudienceModal} list={beneficiaries} />
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
                <DateTimePicker
                  {...field}
                  label="Start Time"
                  inputFormat="MM/DD/YYYY a"
                  renderInput={(params) => (
                    <TextField fullWidth {...params} error={!!error} helperText={error?.message} />
                  )}
                />
              )}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item md={4}>
          <RHFSelect name="type" label="Select Campaign Type">
            {CAMPAIGN_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </RHFSelect>
        </Grid>

        <Grid item md={12}>
          <RHFTextField id="details" name="details" label="Details" multiline />
        </Grid>
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

      <Grid item md={6} mt={SPACING.GRID_SPACING}>
        <Controller
          name="audienceIds"
          control={control}
          render={({ field, fieldState: { error } }) => (
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
          )}
        />
        <Button size="small" onClick={handleAudienceModal}>
          Register Audiences
        </Button>
      </Grid>

      <Stack mt={2}>
        <LoadingButton type="submit" variant="contained">
          Create Campaign
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
};

export default CreateCampaign;
