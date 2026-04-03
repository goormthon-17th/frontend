import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

// 메인페이지

type Recipe = {
  id: number;
  user_id: number;
  recipe_name: string;
  profile_image_url: string;
  nickname: string;
  created_at: { year: number; month: number; day: number };
  like_count: number;
  refined_text: string;
  recipe_image_url: string | null;
  following_count: number;
  recipe_likes_total: number;
  recipe_count: number;
};

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

type ReviewBody = {
  content: string;
  emo_1: boolean;
  emo_2: boolean;
  emo_3: boolean;
};

type FollowingUser = {
  user_id: number;
  nickname: string;
  profile_image_url: string | null;
  recipe_image_url: string | null;
};

type UserProfile = {
  ok: boolean;
  user_id: number;
  nickname: string;
  profile_image_url: string | null;
  recipe_count: number;
  recipe_likes_total: number;
  following_count: number;
  is_subscribed: boolean;
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

const getRecipeDetail = (recipeId: number) =>
  axios.get(`${BASE}/api/recipes/${recipeId}`).then((r) => r.data as RecipeDetail);

export const useRecipeDetail = (recipeId: number) =>
  useQuery({ queryKey: ['recipe', recipeId], queryFn: () => getRecipeDetail(recipeId) });

// 댓글 기능

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

// 구독 기능

const toggleSubscribe = (userId: number) =>
  axios
    .post(
      `${BASE}/api/users/${userId}/subscribe`,
      {},
      { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } },
    )
    .then((r) => r.data);

export const useToggleSubscribe = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: number) => toggleSubscribe(userId),
    onSuccess: (data, userId) => {
      queryClient.setQueryData(['user', userId], (old: UserProfile) => ({
        ...old,
        is_subscribed: data.subscribed,
        following_count: data.subscribed ? old.following_count + 1 : old.following_count - 1,
      }));
    },
  });
};

const getFollowing = () =>
  axios
    .get(`${BASE}/api/users/following`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
    .then((r) => r.data.users as FollowingUser[]);

export const useFollowing = () => useQuery({ queryKey: ['following'], queryFn: getFollowing });

// 유저 프로필

const getUserProfile = (userId: number) =>
  axios.get(`${BASE}/api/users/${userId}`).then((r) => r.data as UserProfile);

export const useUserProfile = (userId: number) =>
  useQuery({ queryKey: ['user', userId], queryFn: () => getUserProfile(userId) });

// 토글 좋아요

const toggleLike = (recipeId: number) =>
  axios
    .post(
      `${BASE}/api/recipes/${recipeId}/like`,
      {},
      { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } },
    )
    .then((r) => r.data);

export const useToggleLike = (recipeId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => toggleLike(recipeId),
    onSuccess: (data) => {
      queryClient.setQueryData(['recipe', recipeId], (old: RecipeDetail) => ({
        ...old,
        like_count: data.like_count,
      }));
    },
  });
};

// 좋아요 목록

const getLikedRecipes = () =>
  axios
    .get(`${BASE}/api/recipes/liked`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
    .then((r) => r.data.recipes as Recipe[]);

export const useLikedRecipes = () =>
  useQuery({ queryKey: ['recipes', 'liked'], queryFn: getLikedRecipes });

// 검색 기능

const searchRecipes = (q: string) =>
  axios
    .get(`${BASE}/api/recipes/search`, { params: { q } })
    .then((r) => r.data.recipes as Recipe[]);

export const useSearchRecipes = (q: string) =>
  useQuery({
    queryKey: ['recipes', 'search', q],
    queryFn: () => searchRecipes(q),
    enabled: q.trim().length > 0,
  });
