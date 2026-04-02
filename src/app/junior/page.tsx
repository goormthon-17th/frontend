'use client';

import MobileHeader from '@/components/shared/MobileHeader';
import SearchInput from '@/components/shared/SearchInput';
import { Select, VStack } from '@vapor-ui/core';
import { useRouter } from 'next/navigation';
import Banner from './components/Banner';
import Card from './components/Card';
import NavBar from './components/NavBar';

const JuniorPage = () => {
  const router = useRouter();

  const userData = [
    {
      id: 1,
      image: '/card.png',
      profile: '/',
      title: '제주 손맛을 담은 정 많은 할머니',
      recipeName: '몸국',
      date: '3일 전',
      like: 16,
    },
    {
      id: 2,
      image: '/card.png',
      profile: '/',
      title: '30년 경력 제주 토박이 아주머니',
      recipeName: '고사리육개장',
      date: '1일 전',
      like: 32,
    },
    {
      id: 3,
      image: '/card.png',
      profile: '/',
      title: '손녀에게 레시피를 물려주고 싶은 할머니',
      recipeName: '옥돔구이',
      date: '5일 전',
      like: 8,
    },
    {
      id: 4,
      image: '/card.png',
      profile: '/',
      title: '제주 향토 음식 연구가',
      recipeName: '빙떡',
      date: '2시간 전',
      like: 24,
    },
  ];

  return (
    <VStack
      style={{
        gap: '16px',
        alignItems: 'center',
      }}
    >
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
            <Select.Root placeholder="좋아요순">
              <Select.Trigger />
              <Select.Popup positionerElement={<Select.PositionerPrimitive side="bottom" />}>
                <Select.Item value="option1">인기순</Select.Item>
              </Select.Popup>
            </Select.Root>
          </div>

          {userData.map((user) => (
            <Card
              key={user.id}
              image={user.image}
              profile={user.profile}
              title={user.title}
              recipeName={user.recipeName}
              date={user.date}
              like={user.like}
              onCardClick={() => router.push(`/junior/recipe/${user.id}`)}
              onProfileClick={() => router.push('/junior/list')}
            />
          ))}
        </VStack>
      </div>
      <NavBar />
    </VStack>
  );
};

export default JuniorPage;
