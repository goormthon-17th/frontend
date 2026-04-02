import { useMutation } from '@tanstack/react-query';
import { generateRecipeApi } from './generateRecipeApi';

export const useGenerateRecipe = () =>
  useMutation({
    mutationFn: generateRecipeApi,
  });
