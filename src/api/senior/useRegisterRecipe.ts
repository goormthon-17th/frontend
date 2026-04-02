import { useMutation } from '@tanstack/react-query';
import { registerRecipeApi } from './registerRecipeApi';

export const useRegisterRecipe = () =>
  useMutation({
    mutationFn: registerRecipeApi,
  });
