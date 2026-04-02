import axios from 'axios';

export interface RegisterRecipeParams {
  raw_text: string;
  refined_text: string;
  audio_url: string;
  image_url: string;
}

export const registerRecipeApi = (data: RegisterRecipeParams) => {
  const token = localStorage.getItem('token');
  return axios
    .post('https://goormthon-4.goorm.training/api/recipes', data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data);
};
