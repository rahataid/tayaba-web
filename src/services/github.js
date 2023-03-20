import axios from 'axios';
import { GITHUB_API_URL, GITHUB_USERNAME, GITHUB_REPOSITORY } from '@config';

export const getFolders = async () => {
  try {
    const response = await axios.get(
      `${GITHUB_API_URL}/repos/${GITHUB_USERNAME}/${GITHUB_REPOSITORY}/contents`
    );
    return response.data.filter((item) => item.type === 'dir' && !item.name.includes("."));
  } catch (error) {
    console.error(error);
    return [];
  }
};
