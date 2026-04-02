import axios from 'axios';

export const loginApi = (data: { loginId: string; password: string }) =>
  axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`, data).then((res) => res.data);
