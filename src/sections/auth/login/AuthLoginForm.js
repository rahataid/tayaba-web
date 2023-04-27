import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, Alert, useTheme, Button, Avatar } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// auth
// components
import FormProvider, { RHFTextField } from '@components/hook-form';
import { useLoginContext } from '../../../contexts/auth';
import web3Utils from '@utils/web3Utils';
import { useRouter } from 'next/router';
import { APP_NAME, PATH_AFTER_LOGIN } from '@config';
import { saveKey } from '@utils/sessionManager';
import Iconify from '@components/iconify';
import { useAuthContext } from 'src/auth/useAuthContext';
import useWalletConnection from '@hooks/useWalletConnection';
import { AuthService } from '@services/auth';

// ----------------------------------------------------------------------

export default function AuthLoginForm() {
  const { isDebug } = useAuthContext();
  const { handleOtpRequest, otpSent, handleOtpVerification, setOtpSent, handleLoginWithWallet } = useLoginContext();
  const { account, connectWallet, signMessage } = useWalletConnection();
  const router = useRouter();
  const { signinWalletData } = AuthService;
  const [tempIdentity, setTempIdentity] = useState(null);
  const [otpSentMessage, setOTPSentMessage] = useState(null);

  const LoginSchema = Yup.object().shape(() => {
    if (isDebug) return {};
    return {
      email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    };
  });

  const OTPSchema = Yup.object().shape({
    otp: Yup.string().required('OTP is required'),
  });

  const defaultValues = {
    email: '',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const otpMethods = useForm({
    resolver: yupResolver(OTPSchema),
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const onSubmit = async ({ email }) => {
    try {
      if (isDebug && email.indexOf('@') < 0) {
        email = `${email}@mailinator.com`;
      }
      const otpSent = await handleOtpRequest(email);
      // const otpSent = await handleOtpRequest({ address: email, encryptionKey: tempIdentity.publicKey });
      if (!otpSent.status) {
        reset();
        setError('afterSubmit', {
          ...new Error('test'),
          message: otpSent.msg,
        });
        return;
      }
      setOTPSentMessage(otpSent?.msg);
      reset();
    } catch (error) {
      console.error(error);

      reset();
      setError('afterSubmit', {
        ...error,
        message: error.message,
      });
    }
  };

  const onEmailSubmitError = (error) => {
    console.error(error);
  };

  const onOtpSubmit = async ({ otp }) => {
    try {
      // const isOtpValid = await handleOtpVerification({ otp, encryptionKey: tempIdentity.publicKey });
      const isOtpValid = await handleOtpVerification({ otp: otp?.trim() });

      if (isOtpValid.success) {
        saveKey(isOtpValid.data.privateKey);
        router.reload();
      }

      // if (isOtpValid.data.privateKey) {
      //   const encryptedData = web3Utils.parseFromOtpKey(isOtpValid.privateKey);
      //   const decrypted = await web3Utils.decryptedKey(tempIdentity.privateKey, encryptedData);
      //   saveKey(decrypted);
      //   router.reload();
      // }
    } catch (error) {
      console.error(error);
      reset();
      otpMethods.setError('afterSubmit', {
        ...error,
        message: error.message,
      });
    }
  };
  const handleLoginWithMetamask = async () => {
    try {
      if (!account) await connectWallet();
      const { data } = await signinWalletData();
      const message = data.data;

      let signature = await signMessage(message);
      let user = await handleLoginWithWallet({ signPayload: message, signature });
      if (user.success) {
        saveKey(user.data.privateKey);
        router.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const identity = web3Utils.createRandomIdentity();
    setTempIdentity(identity);
  }, []);

  if (otpSent) {
    return (
      <FormProvider methods={otpMethods} onSubmit={otpMethods.handleSubmit(onOtpSubmit)}>
        <Stack spacing={3} sx={{ mb: 3 }}>
          {!!otpSentMessage && <Alert severity="info">Please find OTP in your email.</Alert>}
          {!!otpMethods.formState.errors.afterSubmit && (
            <Alert severity="error">{otpMethods.formState.errors.afterSubmit.message}</Alert>
          )}

          <RHFTextField
            sx={{
              '& .MuiOutlinedInput-root': {
                color: '#fff',
              },
              '& .MuiInputLabel-root': {
                color: '#fff',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#fff',
              },
            }}
            name="otp"
            label="OTP Code"
          />
        </Stack>

        <LoadingButton
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          disabled={
            (!!otpMethods.formState.errors.afterSubmit && otpMethods.formState.isSubmitSuccessful) ||
            otpMethods.formState.isSubmitting
          }
          loading={
            (!!otpMethods.formState.errors.afterSubmit && otpMethods.formState.isSubmitSuccessful) ||
            otpMethods.formState.isSubmitting
          }
          sx={{
            bgcolor: 'text.primary',
            color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
            '&:hover': {
              bgcolor: 'text.primary',
              color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
            },
          }}
        >
          Login
        </LoadingButton>
        <Stack direction="row" justifyContent="space-between" sx={{ mt: 3, color: 'text.secondary' }}>
          <Button
            sx={{
              color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
            }}
            startIcon={<Iconify sx={{ mr: -1 }} icon="ic:baseline-arrow-back-ios" />}
            onClick={() => {
              setOtpSent(false);
              otpMethods.reset();
            }}
          >
            Go Back
          </Button>
        </Stack>
      </FormProvider>
    );
  }

  return (
    <React.Fragment>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit, onEmailSubmitError)}>
        <Stack spacing={3} sx={{ mb: 2 }}>
          {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
          <RHFTextField
            sx={{
              '& .MuiOutlinedInput-root': {
                color: '#fff',
              },
              '& .MuiInputLabel-root': {
                color: '#fff',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#fff',
              },
            }}
            name="email"
            label="Enter registered email"
          />
        </Stack>

        <LoadingButton
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          loading={(!!errors.afterSubmit && isSubmitSuccessful) || isSubmitting}
          sx={{
            bgcolor: 'text.primary',
            color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
            '&:hover': {
              bgcolor: 'text.primary',
              color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
            },
          }}
        >
          Login into Rahat
        </LoadingButton>
      </FormProvider>
      <Button
        fullWidth
        size="large"
        onClick={handleLoginWithMetamask}
        startIcon={<Avatar src={'https://img.icons8.com/color/512/metamask-logo.png'} />}
        sx={{ mt: 2 }}
        variant="contained"
      >
        Login With Metamask
      </Button>
    </React.Fragment>
  );
}
