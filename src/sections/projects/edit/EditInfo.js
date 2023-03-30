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
const community = [];
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

export default function EditInfo() {
    const [formValues, setFormValues] = useState({});
    const { getProjectById, editData } = useProjectContext();

    const methods = useForm({
        mode: 'onTouched',
        resolver: yupResolver(FormSchema),
        values: formValues,
    });

    const {
        query: { projectId },
    } = useRouter();

    useEffect(() => {
        if (!editData) return;
        setFormValues(editData);
    }, [editData]);

    useEffect(() => {
        if (!projectId) return;
        getProjectById(projectId);
    }, [getProjectById, projectId]);

    return (
        <FormProvider methods={methods} value={formValues}>
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
                                                value={moment(value).format('DD MMM YYYY')}
                                            />
                                        </Grid>
                                    ) : (
                                        <Grid item xs={12} md={6}>
                                            <RHFTextField
                                                id={key}
                                                name={key}
                                                label={key.charAt(0).toUpperCase() + key.slice(1)}
                                                value={value}
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
                                                value={moment(value).format('DD MMM YYYY')}
                                            />
                                        </Grid>
                                    ) : (
                                        <Grid item xs={12} md={6}>
                                            <RHFTextField
                                                id={key}
                                                name={key}
                                                label={key.charAt(0).toUpperCase() + key.slice(1)}
                                                value={value}
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
                <Button variant={'outlined'}>
                    Edit
                </Button>
            </Stack>
        </FormProvider>
    );
}
