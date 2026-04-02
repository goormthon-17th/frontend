'use client';

import {
  useFollowing,
  useLikedRecipes,
  useRecipesByLikes,
  useToggleLike,
} from '@/app/api/junior/useJunior';
import Card from '@/components/junior/Card';
import CardSkeleton from '@/components/junior/CardSkeleton';
import NavBar from '@/components/junior/NavBar';
import RecipeCard from '@/components/junior/RecipeCard';
import RecipeCardSkeleton from '@/components/junior/RecipeCardSkeleton';
import MobileHeader from '@/components/shared/MobileHeader';
import { Tabs, VStack } from '@vapor-ui/core';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Recipe = {
  id: number;
  recipe_name: string;
  created_at: { year: number; month: number; day: number };
  like_count: number;
  refined_text: string;
  image_url: string | null;
};

const RecipeCardWithLike = ({
  recipe,
  onCardClick,
  initialLiked = false,
}: {
  recipe: Recipe;
  onCardClick: () => void;
  initialLiked?: boolean;
}) => {
  const { mutate: toggleLike, data } = useToggleLike(recipe.id);
  const [isLiked, setIsLiked] = useState(initialLiked);
  const likeCount = data?.like_count ?? recipe.like_count;

  return (
    <RecipeCard
      image={recipe.image_url ?? '/card.png'}
      title={recipe.recipe_name}
      date={`${recipe.created_at.month}월 ${recipe.created_at.day}일`}
      like={likeCount}
      description={recipe.refined_text}
      isLiked={isLiked}
      onLikeClick={() => {
        toggleLike(undefined, {
          onSuccess: (data) => setIsLiked(data.liked),
        });
      }}
      onCardClick={onCardClick}
    />
  );
};

const JuniorSaveClient = () => {
  const router = useRouter();
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<number>>(new Set());

  const likesQuery = useRecipesByLikes();
  const { data: following, isLoading: isFollowingLoading, error: followingError } = useFollowing();

  const { data: savedRecipes, isLoading: isSavedLoading, error: savedError } = useLikedRecipes();

  const toggleBookmark = (id: number) => {
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <VStack style={{ gap: '16px', alignItems: 'center' }}>
      <MobileHeader onMenu={() => console.log('메뉴 클릭')} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '100%',
          paddingTop: '100px',
          marginBottom: '140px',
        }}
      >
        <Tabs.Root defaultValue="tab1" style={{ width: '100%', padding: '0 20px' }}>
          <Tabs.List>
            <Tabs.Button value="tab1" style={{ fontSize: '20px', fontFamily: 'YPairing' }}>
              저장된 비법 노트
            </Tabs.Button>
            <Tabs.Button value="tab2" style={{ fontSize: '20px', fontFamily: 'YPairing' }}>
              구독중인 할망
            </Tabs.Button>
          </Tabs.List>

          <Tabs.Panel value="tab1">
            <VStack style={{ gap: '16px', alignItems: 'center', width: '100%', marginTop: '24px' }}>
              {savedError && <p>데이터를 불러오지 못했어요.</p>}

              {isSavedLoading ? (
                Array.from({ length: 3 }).map((_, i) => <RecipeCardSkeleton key={i} />)
              ) : savedRecipes?.length === 0 ? (
                <p
                  style={{
                    fontSize: '14px',
                    color: 'var(--color-gray-600)',
                    textAlign: 'center',
                    padding: '40px 0',
                  }}
                >
                  저장된 레시피가 없습니다.
                </p>
              ) : (
                savedRecipes?.map((recipe) => (
                  <RecipeCardWithLike
                    key={recipe.id}
                    initialLiked={true}
                    recipe={recipe}
                    onCardClick={() => router.push(`/junior/recipe/${recipe.id}`)}
                  />
                ))
              )}
            </VStack>
          </Tabs.Panel>

          <Tabs.Panel value="tab2">
            <VStack style={{ gap: '16px', alignItems: 'center', marginTop: '24px', width: '100%' }}>
              {followingError && <p>데이터를 불러오지 못했어요.</p>}

              {isFollowingLoading ? (
                Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} />)
              ) : following?.length === 0 ? (
                <p
                  style={{
                    fontSize: '14px',
                    color: 'var(--color-gray-600)',
                    textAlign: 'center',
                    padding: '40px 0',
                  }}
                >
                  구독중인 할망이 없습니다.
                </p>
              ) : (
                following?.map((user) => (
                  <Card
                    key={user.user_id}
                    image={user.recipe_image_url ?? '/card.png'}
                    profile={user.profile_image_url ?? '/images/profile-1.png'}
                    title={user.nickname}
                    onCardClick={() => router.push(`/junior/list/${user.user_id}`)}
                    onProfileClick={() => router.push(`/junior/list/${user.user_id}`)}
                  />
                ))
              )}
            </VStack>
          </Tabs.Panel>
        </Tabs.Root>
      </div>
      <NavBar />
    </VStack>
  );
};

export default JuniorSaveClient;
