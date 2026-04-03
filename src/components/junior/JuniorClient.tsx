'use client';

import {
  useRecipesByLatest,
  useRecipesByLikes,
  useSearchRecipes,
} from '@/app/api/junior/useJunior';
import Banner from '@/components/junior/Banner';
import Card from '@/components/junior/Card';
import CardSkeleton from '@/components/junior/CardSkeleton';
import NavBar from '@/components/junior/NavBar';
import SearchInput from '@/components/shared/SearchInput';
import { BANNER_TEXT, PROFILE_IMAGES } from '@/constants/text';
import { useRandomProfile } from '@/hooks/useRandomProfile';
import { Select, VStack } from '@vapor-ui/core';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const JuniorPage = () => {
  const router = useRouter();
  const [bannerText] = useState(() => BANNER_TEXT[Math.floor(Math.random() * BANNER_TEXT.length)]);
  const [sortOrder, setSortOrder] = useState<'likes' | 'latest'>('likes');
  const [searchQuery, setSearchQuery] = useState('');
  const randomProfile = useRandomProfile(PROFILE_IMAGES);

  const likesQuery = useRecipesByLikes();
  const latestQuery = useRecipesByLatest();
  const searchResult = useSearchRecipes(searchQuery);

  const {
    data: recipes,
    isLoading,
    error,
  } = searchQuery.trim() ? searchResult : sortOrder === 'likes' ? likesQuery : latestQuery;

  return (
    <VStack style={{ position: 'relative', gap: '16px', alignItems: 'center' }}>
      <Image
        src="/icons/menu.svg"
        alt="메뉴"
        width={24}
        height={24}
        style={{
          position: 'absolute',
          right: '20px',
          zIndex: 3,
          top: '10px',
        }}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '100%',
          marginBottom: '140px',
        }}
      >
        <Banner title={bannerText}>
          <SearchInput onSearch={(value) => setSearchQuery(value)} />
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
              <Select.Trigger style={{ boxShadow: 'none' }} />
              <Select.Popup
                positionerElement={
                  <Select.PositionerPrimitive side="bottom" style={{ boxShadow: 'none' }} />
                }
              >
                <Select.Item value="likes">좋아요순</Select.Item>
                <Select.Item value="latest">최신순</Select.Item>
              </Select.Popup>
            </Select.Root>
          </div>

          {error && <p>데이터를 불러오지 못했어요.</p>}

          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} />)
          ) : recipes?.length === 0 ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: '100px',
              }}
            >
              <Image src="/images/character-2.png" alt="검색 결과 없음" width={80} height={80} />

              <p style={{ fontSize: '16px', fontFamily: 'YPairing' }}>검색 결과가 없어요</p>
            </div>
          ) : (
            recipes?.map((recipe) => (
              <Card
                key={recipe.id}
                image={
                  recipe.recipe_image_url
                    ? recipe.recipe_image_url.startsWith('/')
                      ? `https://goormthon-4.goorm.training${recipe.recipe_image_url}`
                      : recipe.recipe_image_url
                    : '/card.png'
                }
                profile={
                  recipe.profile_image_url
                    ? recipe.profile_image_url.startsWith('/')
                      ? `https://goormthon-4.goorm.training${recipe.profile_image_url}`
                      : recipe.profile_image_url
                    : randomProfile
                }
                recipeName={recipe.nickname}
                title={recipe.recipe_name}
                date={`${recipe.created_at.month}월 ${recipe.created_at.day}일`}
                like={recipe.like_count}
                onCardClick={() => router.push(`/junior/recipe/${recipe.id}`)}
                onProfileClick={() => router.push(`/junior/list/${recipe.id}`)}
              />
            ))
          )}
        </VStack>
      </div>
      <NavBar />
    </VStack>
  );
};

export default JuniorPage;
