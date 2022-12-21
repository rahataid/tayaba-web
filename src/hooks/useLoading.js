import { useState } from 'react';

const useLoading = () => {
  const [loading, setLoading] = useState({ 0: false });

  function toggleLoading(key = 0) {
    const obj = {};
    obj[key] = !loading[key];
    setLoading((d) => ({
      ...d,
      ...obj,
    }));
  }

  function showLoading(key = 0) {
    const obj = {};
    obj[key] = true;
    setLoading((d) => ({
      ...d,
      ...obj,
    }));
  }

  function hideLoading(key = 0) {
    const obj = {};
    obj[key] = false;
    setLoading((d) => ({
      ...d,
      ...obj,
    }));
  }

  return {
    loading,
    toggleLoading,
    showLoading,
    hideLoading,
  };
};

export default useLoading;
