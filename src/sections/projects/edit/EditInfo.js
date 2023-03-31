import * as Yup from 'yup';
// form
// @mui
import { Card, Grid, Stack } from '@mui/material';
// components
import { RHFTextField } from '@components/hook-form';
import FormProvider from '@components/hook-form/FormProvider';
import { useProjectContext } from '@contexts/projects';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@mui/material';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ProjectService } from '@services/projects';
import { useSnackbar } from 'notistack';
const community = [];
// ----------------------------------------------------------------------
const FormSchema = Yup.object().shape({
    name: Yup.string().required('Full name is required').min(4, 'Mininum 4 characters').max(24, 'Maximum 15 characters'),
    startDate: Yup.date().nullable().required('Start date is required'),
    endDate: Yup.date()
        .required('End date is required')
        .nullable()
        .min(Yup.ref('startDate'), 'End date must be later than start date'),
    location: Yup.string().required('Project Types is required'),
});

export default function EditInfo() {

    const [formValues, setFormValues] = useState({});
    const [formKeys, setFormKeys] = useState([])
    const { getProjectByAddress, editData } = useProjectContext();
    const { enqueueSnackbar } = useSnackbar()

    const {
        query: { projectId },
        push
    } = useRouter();

    const handleEdit = async (data) => {
        const extrasKey = Object.keys(editData?.extras)

        const extras = {};
        for (const key in data) {
            if (extrasKey.includes(key)) {
                extras[key] = data[key];
                delete data[key];
            }
        }
        console.log('e', extras)

        let payload = {
            extras,
            ...data
        }

        await ProjectService.editProject(projectId, payload);
        enqueueSnackbar('Project Successfully edited');
        push(`/projects/${projectId}`);
    };

    const handleError = async (error) => {
        enqueueSnackbar('Something went wrong!', {
            variant: 'error'
        })
    }

    const methods = useForm({
        mode: 'onTouched',
        resolver: yupResolver(FormSchema),
        defaultValues: formValues,
        value: formValues,
    });


    const { handleSubmit, reset } = methods


    useEffect(() => {
        if (!editData) return;
        setFormKeys(Object.keys(editData))
        const { extras, ...rest } = editData
        const formV = {

            ...rest,
            ...extras,
        }
        setFormValues(formV);
        reset(formV);
    }, [editData]);

    useEffect(() => {
        if (!projectId) return;
        getProjectByAddress(projectId);
    }, [getProjectByAddress, projectId]);

    return (
        <FormProvider methods={methods} value={formValues} onSubmit={handleSubmit(handleEdit, handleError)}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <Card>
                        <Stack spacing={3} padding={6}>
                            <Grid container spacing={5}>
                                {Object.entries(formValues).map(([key, value]) =>
                                    value instanceof Date ? (
                                        <Grid item xs={12} md={3}>
                                            <RHFTextField
                                                id={key}
                                                name={key}
                                                label={key.charAt(0).toUpperCase() + key.slice(1)}
                                            />
                                        </Grid>
                                    ) : (
                                        <Grid item xs={12} md={6}>
                                            <RHFTextField
                                                id={key}
                                                name={key}
                                                label={key.charAt(0).toUpperCase() + key.slice(1)}
                                            />
                                        </Grid>
                                    )
                                )}
                                {formValues?.extras && Object.entries(formValues?.extras).map(([key, value]) =>
                                    value instanceof Date ? (
                                        <Grid item xs={12} md={3}>
                                            <RHFTextField
                                                id={key}
                                                name={key}
                                                label={key.charAt(0).toUpperCase() + key.slice(1)}
                                            />
                                        </Grid>
                                    ) : (
                                        <Grid item xs={12} md={6}>
                                            <RHFTextField
                                                id={key}
                                                name={key}
                                                label={key.charAt(0).toUpperCase() + key.slice(1)}
                                            />
                                        </Grid>
                                    )
                                )}
                            </Grid>
                        </Stack>
                    </Card>
                </Grid>
            </Grid>
            <Stack direction={'row'} paddingTop={2} spacing={2}>
                <Button type='submit' variant={'outlined'}>
                    Edit
                </Button>
            </Stack>
        </FormProvider>
    );
}
