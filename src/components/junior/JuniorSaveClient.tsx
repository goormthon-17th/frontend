'use client';

import { useRecipesByLatest, useRecipesByLikes } from '@/app/api/junior/useJunior';
import Card from '@/components/junior/Card';
import CardSkeleton from '@/components/junior/CardSkeleton';
import NavBar from '@/components/junior/NavBar';
import RecipeCard from '@/components/junior/RecipeCard';
import RecipeCardSkeleton from '@/components/junior/RecipeCardSkeleton';
import MobileHeader from '@/components/shared/MobileHeader';
import { PROFILE_IMAGES } from '@/constants/text';
import { useRandomProfile } from '@/hooks/useRandomProfile';
import { Tabs, VStack } from '@vapor-ui/core';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const JuniorSaveClient = () => {
  const router = useRouter();
  const [sortOrder, setSortOrder] = useState<'likes' | 'latest'>('likes');
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<number>>(new Set());
  const randomProfile = useRandomProfile(PROFILE_IMAGES);

  const likesQuery = useRecipesByLikes();
  const latestQuery = useRecipesByLatest();

  // TODO: 저장된 레시피 전용 훅으로 교체 필요 (ex. useBookmarkedRecipes)
  const { data: savedRecipes, isLoading: isSavedLoading, error: savedError } = likesQuery;
  const { data: recipes, isLoading, error } = sortOrder === 'likes' ? likesQuery : latestQuery;

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
            <VStack
              style={{
                gap: '16px',
                alignItems: 'center',
                width: '100%',
                marginTop: '24px',
              }}
            >
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
                  <RecipeCard
                    key={recipe.id}
                    image={recipe.image_url ?? '/card.png'}
                    title={recipe.recipe_name}
                    date={`${recipe.created_at.month}월 ${recipe.created_at.day}일`}
                    like={recipe.like_count}
                    description={recipe.refined_text}
                    onCardClick={() => router.push(`/junior/recipe/${recipe.id}`)}
                    isBookmarked={bookmarkedIds.has(recipe.id)}
                    onBookmarkClick={() => toggleBookmark(recipe.id)}
                  />
                ))
              )}
            </VStack>
          </Tabs.Panel>

          <Tabs.Panel value="tab2">
            <VStack
              style={{
                gap: '16px',
                alignItems: 'center',
                marginTop: '24px',
                width: '100%',
              }}
            >
              {error && <p>데이터를 불러오지 못했어요.</p>}

              {isLoading
                ? Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} />)
                : recipes?.map((recipe) => (
                    <Card
                      key={recipe.id}
                      image={recipe.image_url ?? '/card.png'}
                      profile={recipe.profile_image_url ?? randomProfile}
                      title={recipe.recipe_name}
                      onCardClick={() => router.push(`/junior/recipe/${recipe.id}`)}
                      onProfileClick={() => router.push(`/junior/list/${recipe.id}`)}
                    />
                  ))}
            </VStack>
          </Tabs.Panel>
        </Tabs.Root>
      </div>
      <NavBar />
    </VStack>
  );
};

export default JuniorSaveClient;
