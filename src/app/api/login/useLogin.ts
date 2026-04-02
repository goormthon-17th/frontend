import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { loginApi } from './loginApi';

export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      router.push('/senior');
    },
  });
};
