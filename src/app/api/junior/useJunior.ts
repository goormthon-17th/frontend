import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

// 메인페이지

type Recipe = {
  id: number;
  recipe_name: string;
  profile_image_url: string;
  nickname: string;
  created_at: { year: number; month: number; day: number };
  like_count: number;
  refined_text: string;
  image_url: string | null;
  following_count: number;
  recipe_likes_total: number;
  recipe_count: number;
};

const BASE = 'https://goormthon-4.goorm.training';

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

// 레시피 상세 페이지

type Review = {
  id: number;
  user_id: number;
  nickname: string;
  content: string;
  is_liked: boolean;
  emo_1: boolean;
  emo_2: boolean;
  emo_3: boolean;
  created_at: { year: number; month: number; day: number };
  updated_at: { year: number; month: number; day: number };
};

type RecipeDetail = {
  ok: boolean;
  id: number;
  user_id: number;
  nickname: string;
  profile_image_url: string | null;
  recipe_image_url: string | null;
  recipe_name: string;
  created_at: { year: number; month: number; day: number };
  like_count: number;
  refined_text: string;
  raw_text: string;
  reviews: Review[];
};

const getRecipeDetail = (recipeId: number) =>
  axios.get(`${BASE}/api/recipes/${recipeId}`).then((r) => r.data as RecipeDetail);

export const useRecipeDetail = (recipeId: number) =>
  useQuery({ queryKey: ['recipe', recipeId], queryFn: () => getRecipeDetail(recipeId) });

// 댓글 기능

type ReviewBody = {
  content: string;
  emo_1: boolean;
  emo_2: boolean;
  emo_3: boolean;
};

const postReview = (recipeId: number, body: ReviewBody) =>
  axios.post(`${BASE}/api/recipes/${recipeId}/reviews`, body).then((r) => r.data);

export const usePostReview = (recipeId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: ReviewBody) => postReview(recipeId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipe', recipeId] });
    },
  });
};
