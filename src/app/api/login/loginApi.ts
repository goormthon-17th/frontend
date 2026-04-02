import axios from 'axios';

export const loginApi = (data: { loginId: string; password: string }) =>
  axios.post('https://goormthon-4.goorm.training/api/auth/login', data).then((res) => res.data);
