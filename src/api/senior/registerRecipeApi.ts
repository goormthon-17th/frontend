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
    .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/recipes`, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data);
};
