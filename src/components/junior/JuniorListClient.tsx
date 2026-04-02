'use client';

import Header from '@/components/junior/Header';
import NavBar from '@/components/junior/NavBar';
import RecipeCard from '@/components/junior/RecipeCard';
import MobileHeader from '@/components/shared/MobileHeader';
import { Button, VStack } from '@vapor-ui/core';
import { useRouter } from 'next/navigation';

const userData = {
  profile: '/',
  title: '제주 손맛을 담은 정 많은 할머니',
  recipe: 6,
  like: 10,
  subscribe: 10,
  recipes: [
    {
      id: 1,
      image: '/card.png',
      title: '된장찌개',
      date: '2026.04.01',
      like: 16,
      description:
        '제주 된장으로 끓인 구수한 된장찌개 레시피입니다. 제주 된장으로 끓인 구수한 된장찌개 레시피입니다.',
    },
    {
      id: 2,
      image: '/card.png',
      title: '갈치조림',
      date: '2026.03.28',
      like: 24,
      description:
        '제주 은갈치로 만든 칼칼한 갈치조림 레시피입니다. 제주 은갈치로 만든 칼칼한 갈치조림 레시피입니다.',
    },
    {
      id: 3,
      image: '/card.png',
      title: '고사리육개장',
      date: '2026.03.20',
      like: 31,
      description:
        '제주 고사리 듬뿍 넣은 진한 육개장 레시피입니다. 제주 고사리 듬뿍 넣은 진한 육개장 레시피입니다.',
    },
    {
      id: 4,
      image: '/card.png',
      title: '고사리육개장',
      date: '2026.03.20',
      like: 31,
      description:
        '제주 고사리 듬뿍 넣은 진한 육개장 레시피입니다. 제주 고사리 듬뿍 넣은 진한 육개장 레시피입니다.',
    },
    {
      id: 5,
      image: '/card.png',
      title: '고사리육개장',
      date: '2026.03.20',
      like: 31,
      description:
        '제주 고사리 듬뿍 넣은 진한 육개장 레시피입니다. 제주 고사리 듬뿍 넣은 진한 육개장 레시피입니다.',
    },
    {
      id: 6,
      image: '/card.png',
      title: '고사리육개장',
      date: '2026.03.20',
      like: 31,
      description:
        '제주 고사리 듬뿍 넣은 진한 육개장 레시피입니다. 제주 고사리 듬뿍 넣은 진한 육개장 레시피입니다.',
    },
  ],
};

const JuniorListClient = () => {
  const router = useRouter();

  return (
    <VStack style={{ gap: '16px', alignItems: 'center' }}>
      <MobileHeader onBack={() => router.back()} onMenu={() => console.log('메뉴 클릭')} />
      <Header
        profile={userData.profile}
        title={userData.title}
        recipe={userData.recipe}
        like={userData.like}
        subscribe={userData.subscribe}
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
        {userData.recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            image={recipe.image}
            title={recipe.title}
            date={recipe.date}
            like={recipe.like}
            description={recipe.description}
            onCardClick={() => router.push(`/junior/recipe/${recipe.id}`)}
          />
        ))}
      </div>
      <Button
        style={{
          fontSize: '16px',
          fontWeight: 'bold',
          backgroundColor: 'var(--color-mandolong-500)',
          borderRadius: '30px',
          padding: '24px',
          width: '168px',
          height: '48px',
          position: 'fixed',
          bottom: '76px',
          zIndex: '10',
        }}
      >
        구독하기
      </Button>
      <NavBar />
    </VStack>
  );
};

export default JuniorListClient;
