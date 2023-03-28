import { GITHUB_API_URL, GITHUB_REPOSITORY, GITHUB_USERNAME } from '@config';
import axios from 'axios';

export const getFolders = async () => {
  try {
    const response = await axios.get(`${GITHUB_API_URL}/repos/${GITHUB_USERNAME}/${GITHUB_REPOSITORY}/contents`);
    return response.data.filter((item) => item.type === 'dir' && !item.name.includes('.'));
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchApiFormFields = async (projectType) => {
  try {
    const response = await axios.get(
      `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${GITHUB_REPOSITORY}/main/${projectType}/cvaProject.metadata`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchContract = async (folderName) => {
  try {
    const response = await axios.get(
      `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${GITHUB_REPOSITORY}/main/${folderName}/projectContract.json`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
