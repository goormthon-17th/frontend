'use client';

import { useRecipesByLatest, useRecipesByLikes } from '@/app/api/junior/useJunior';
import Banner from '@/components/junior/Banner';
import Card from '@/components/junior/Card';
import NavBar from '@/components/junior/NavBar';
import MobileHeader from '@/components/shared/MobileHeader';
import SearchInput from '@/components/shared/SearchInput';
import { Select, VStack } from '@vapor-ui/core';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const JuniorPage = () => {
  const router = useRouter();
  const [sortOrder, setSortOrder] = useState<'likes' | 'latest'>('likes');

  const likesQuery = useRecipesByLikes();
  const latestQuery = useRecipesByLatest();

  const { data: recipes, isLoading, error } = sortOrder === 'likes' ? likesQuery : latestQuery;

  console.log(recipes);

  return (
    <VStack style={{ gap: '16px', alignItems: 'center' }}>
      <MobileHeader onMenu={() => console.log('메뉴 클릭')} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '100%',
          marginBottom: '140px',
        }}
      >
        <Banner title={`또똣한 몸국\n어떠세요`}>
          <SearchInput />
        </Banner>

        <VStack
          style={{
            gap: '16px',
            alignItems: 'center',
            padding: '0 20px',
            width: '100%',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
            <Select.Root
              placeholder="좋아요순"
              onValueChange={(value) => setSortOrder(value as 'likes' | 'latest')}
            >
              <Select.Trigger />
              <Select.Popup positionerElement={<Select.PositionerPrimitive side="bottom" />}>
                <Select.Item value="likes">좋아요순</Select.Item>
                <Select.Item value="latest">최신순</Select.Item>
              </Select.Popup>
            </Select.Root>
          </div>

          {isLoading && <p>로딩 중...</p>}
          {error && <p>데이터를 불러오지 못했어요.</p>}

          {recipes?.map((recipe) => (
            <Card
              key={recipe.id}
              image={recipe.image_url ?? '/card.png'}
              profile="/"
              title={recipe.refined_text}
              recipeName={recipe.recipe_name}
              date={`${recipe.created_at.month}월 ${recipe.created_at.day}일`}
              like={recipe.like_count}
              onCardClick={() => router.push(`/junior/recipe/${recipe.id}`)}
              onProfileClick={() => router.push(`/junior/list/${recipe.id}`)}
            />
          ))}
        </VStack>
      </div>
      <NavBar />
    </VStack>
  );
};

export default JuniorPage;
