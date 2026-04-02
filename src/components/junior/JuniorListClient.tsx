'use client';

import { useRecipesByUser } from '@/app/api/junior/useJunior';
import Header from '@/components/junior/Header';
import NavBar from '@/components/junior/NavBar';
import RecipeCard from '@/components/junior/RecipeCard';
import MobileHeader from '@/components/shared/MobileHeader';
import { Button, VStack } from '@vapor-ui/core';
import { useParams, useRouter } from 'next/navigation';

const JuniorListClient = () => {
  const router = useRouter();
  const { id } = useParams();
  const { data: recipes, isLoading, error } = useRecipesByUser(Number(id));

  console.log(id);

  return (
    <VStack style={{ gap: '16px', alignItems: 'center' }}>
      <MobileHeader onBack={() => router.back()} onMenu={() => console.log('메뉴 클릭')} />
      <Header
        profile="/"
        title="제주 손맛을 담은 정 많은 할머니"
        recipe={recipes?.length ?? 0}
        like={0}
        subscribe={0}
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
        {isLoading && <p>로딩 중...</p>}
        {error && <p>데이터를 불러오지 못했어요.</p>}

        {recipes?.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            image={recipe.image_url ?? '/card.png'}
            title={recipe.recipe_name}
            date={`${recipe.created_at.month}월 ${recipe.created_at.day}일`}
            like={recipe.like_count}
            description={recipe.refined_text}
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
