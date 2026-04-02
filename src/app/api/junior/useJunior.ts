import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

type Recipe = {
  id: number;
  recipe_name: string;
  created_at: { year: number; month: number; day: number };
  like_count: number;
  refined_text: string;
  image_url: string | null;
};

const BASE = process.env.NEXT_PUBLIC_BACKEND_URL;

const getRecipesByLikes = () =>
  axios.get(`${BASE}/api/recipes/by-likes`).then((r) => r.data.recipes as Recipe[]);

const getRecipesByLatest = () =>
  axios.get(`${BASE}/api/recipes/latest`).then((r) => r.data.recipes as Recipe[]);

const getRecipesByUser = (userId: number) =>
  axios.get(`${BASE}/api/recipes/user/${userId}`).then((r) => r.data.recipes as Recipe[]);

export const useRecipesByLikes = () =>
  useQuery({ queryKey: ['recipes', 'likes'], queryFn: getRecipesByLikes });

export const useRecipesByLatest = () =>
  useQuery({ queryKey: ['recipes', 'latest'], queryFn: getRecipesByLatest });

export const useRecipesByUser = (id: number) =>
  useQuery({ queryKey: ['recipes', 'user', id], queryFn: () => getRecipesByUser(id) });
