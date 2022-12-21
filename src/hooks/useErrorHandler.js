import { useSnackbar } from 'notistack';
import ERRORS from '@constants/errors';

class RSError extends Error {
  constructor(message, source = 'Error', type = 'general') {
    super();
    this.message = message;
    this.source = source;
    this.data = {
      type,
      source,
      message,
    };
    this.stack = new Error(message).stack;
  }
}

export const useErrorHandler = () => {
  const snackBar = useSnackbar();
  function showError(message) {
    snackBar.enqueueSnackbar(message, {
      variant: 'error',
      sx: {
        '& .SnackbarContent-root': {
          backgroundColor: '#e6ebf1 !important',
        },
      },
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right',
      },
    });
  }

  function handleError(error) {
    showError(`${error.source}: ${error.message}`);
  }

  function handleContractError(error) {
    try {
      let message = error.error.error.error.toString();
      message = message.replace('Error: VM Exception while processing transaction: revert ', '');
      showError(message);
    } catch (e) {
      showError('Error occured calling contract. Please check logs for details.');
      console.error(error);
    }
  }

  function throwError(nameOrMessage, source) {
    throw new RSError(nameOrMessage, source);
  }

  return {
    ERRORS,
    throwError,
    showError,
    handleError,
    apiError: showError,
    handleContractError,
  };
};
