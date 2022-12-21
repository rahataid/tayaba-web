import { useState } from 'react';

const useDialog = () => {
  const [isDialogShow, setIsDialogShow] = useState(false);

  function toggleDialog() {
    setIsDialogShow(!isDialogShow);
  }

  function showDialog() {
    setIsDialogShow(true);
  }

  function hideDialog() {
    setIsDialogShow(false);
  }

  return {
    isDialogShow,
    toggleDialog,
    showDialog,
    hideDialog,
  };
};

export default useDialog;
