'use client';

import { useRecipesByUser, useToggleSubscribe, useUserProfile } from '@/app/api/junior/useJunior';
import Header from '@/components/junior/Header';
import NavBar from '@/components/junior/NavBar';
import RecipeCard from '@/components/junior/RecipeCard';
import RecipeCardSkeleton from '@/components/junior/RecipeCardSkeleton';
import { PROFILE_IMAGES } from '@/constants/text';
import { useRandomProfile } from '@/hooks/useRandomProfile';
import { VStack } from '@vapor-ui/core';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

const JuniorListClient = () => {
  const router = useRouter();
  const { id } = useParams();
  const userId = Number(id);

  const [bookmarkedIds, setBookmarkedIds] = useState<Set<number>>(new Set());
  const [isSubscribed, setIsSubscribed] = useState<boolean | null>(null);
  const randomProfile = useRandomProfile(PROFILE_IMAGES);

  const { data: userProfile } = useUserProfile(userId);
  const { data: recipes, isLoading, error } = useRecipesByUser(userId);
  const { mutate: toggleSubscribe } = useToggleSubscribe();

  const subscribed = isSubscribed ?? userProfile?.is_subscribed ?? false;

  const handleSubscribe = () => {
    toggleSubscribe(userId, {
      onSuccess: (data) => setIsSubscribed(data.subscribed),
    });
  };

  const toggleBookmark = (id: number) => {
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <VStack style={{ gap: '16px', alignItems: 'center' }}>
      <Header
        profile={userProfile?.profile_image_url ?? randomProfile}
        title={userProfile?.nickname ?? ''}
        recipe={userProfile?.recipe_count ?? 0}
        like={userProfile?.recipe_likes_total ?? 0}
        subscribe={userProfile?.following_count ?? 0}
        isLoading={isLoading}
        isSubscribed={subscribed}
        onSubscribe={handleSubscribe}
      />
      <div
        style={{
          padding: '0 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '100%',
          marginBottom: '140px',
        }}
      >
        {error && <p>데이터를 불러오지 못했어요.</p>}

        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => <RecipeCardSkeleton key={i} />)
        ) : recipes?.length === 0 ? (
          <p
            style={{
              fontSize: '14px',
              color: 'var(--color-gray-600)',
              textAlign: 'center',
              padding: '40px 0',
            }}
          >
            작성된 레시피가 없습니다.
          </p>
        ) : (
          recipes?.map((recipe) => (
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
      </div>
      <NavBar />
    </VStack>
  );
};

export default JuniorListClient;
