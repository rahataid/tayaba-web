import { Alert, Stack } from '@mui/material';
// import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';

export const useResponseHandler = () => {
  const snackBar = useSnackbar();
  // const router = useRouter();

  const errorStatusCodeHandler = {
    401: () => {
      snackBar.enqueueSnackbar('Unauthorized', {
        variant: 'error',
      });
    },
    404: (source) => {
      snackBar.enqueueSnackbar(`${source}: Not Found`, {
        variant: 'error',
      });
      return {
        data: (
          <Stack sx={{ p: 2 }}>
            <Alert severity="error">{`${source}: Not Found`}</Alert>
          </Stack>
        ),
        code: 404,
      };
    },
  };

  const apiHandler = {
    apiError: (error, source) => {
      let code = error.statusCode;

      return errorStatusCodeHandler[code]?.(source);
    },
    // apiResponse: (response, source) => {
    //   return {
    //     data: response.data,
    //     code: response.statusCode,
    //     source,
    //   };
    // },
  };

  return apiHandler;
};
