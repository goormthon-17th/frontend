'use client';

import AiText from '@/components/junior/AiText';
import Badge from '@/components/junior/Badge';
import CommentSection from '@/components/junior/CommentSection';
import NaverMap from '@/components/junior/NaverMap';
import AudioPlayer from '@/components/senior/AudioPlayer';
import MobileHeader from '@/components/shared/MobileHeader';
import { LOCATION } from '@/constants/text';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import { HStack, Text, VStack } from '@vapor-ui/core';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const userData = {
  image: '/card.png',
  title: '톳밥',
  location: '제주 서귀포시 남원읍',
  date: '2026.04.02',
  like: 16,
  aiText: `전통 오메기떡은, 음… 그거 막 어렵지 안허고,\n 집에서 허던 거라게, 그냥 단순허우다. 전통 오메기떡은, 음… 그거 막 어렵지 안허고,\n 집에서 허던 거라게, 그냥 단순허우다. 전통 오메기떡은, 음… 그거 막 어렵지 안허고,\n 집에서 허던 거라게, 그냥 단순허우다.`,
  isAiGenerated: true,
  description: `재료\n• 차조(또는 조)\n• 물\n• (선택) 소금 조금\n\n조리방법\n1. 차조를 바로 쓰는 게 아니라, 먼저 물에 3~4시간 정도 불려준다. 그래야 부드러워져서 이후 작업이 쉬워진다.\n2. 불린 차조를 절구에 넣고 계속 찧어준다. 반죽처럼 될 때까지 충분히 찧어야 한다.\n3. 반죽이 되면 손으로 조금씩 떼어 한 입 크기로 동그랗게 빚는다.\n4. 물을 미리 팔팔 끓여 놓은 뒤, 반죽을 넣고 삶는다. 떡이 물 위로 떠오르면 다 익은 것으로 보고 건져낸다.`,
  audioUrl: null,
};

const comments = [
  {
    id: 1,
    nickname: '할머니 손주1',
    date: '3시간 전',
    content: '레시피내용레시피내용레시피내용레시피내용레시피내용레시피내용',
    image: '/card.png',
    like: 0,
    isMine: true,
  },
  {
    id: 2,
    nickname: '할머니 손주2',
    date: '3시간 전',
    content: '레시피내용레시피내용레시피내용레시피내용레시피내용레시피내용',
    image: '/card.png',
    like: 0,
    isMine: false,
  },
];

const JuniorRecipeClient = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const audioPlayer = useAudioPlayer(userData.audioUrl);
  const [mockLocation] = useState(() => LOCATION[Math.floor(Math.random() * LOCATION.length)]);

  return (
    <VStack
      style={{ backgroundColor: 'var(--color-white)', minHeight: '100vh', paddingBottom: '100px' }}
    >
      <MobileHeader onBack={() => router.back()} onMenu={() => console.log('메뉴 클릭')} />
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '240px',
          backgroundColor: 'var(--color-gray-800)',
        }}
      >
        {userData.image && (
          <Image src={userData.image} alt={userData.title} fill style={{ objectFit: 'cover' }} />
        )}
      </div>

      <VStack
        style={{
          padding: '24px 20px',
          gap: '16px',
          borderRadius: '20px 20px 0 0',
          marginTop: '-16px',
          backgroundColor: 'var(--color-white)',
          position: 'relative',
          flex: 1,
        }}
      >
        <Text style={{ fontSize: '24px', fontWeight: '700', fontFamily: 'YPairing' }}>
          {userData.title}
        </Text>

        <HStack style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <HStack style={{ gap: '6px', alignItems: 'center' }}>
            <Image src="/icons/map.svg" alt="location" width={16} height={16} />
            <Text
              style={{
                fontSize: '14px',
                color: 'var(--color-gray-600)',
                textDecoration: 'underline',
                cursor: 'pointer',
              }}
            >
              {mockLocation.address}
            </Text>
          </HStack>

          <HStack style={{ gap: '12px', alignItems: 'center' }}>
            <Text style={{ fontSize: '14px', color: 'var(--color-gray-600)' }}>
              {userData.date}
            </Text>
            <Text style={{ color: 'var(--color-border)' }}>|</Text>
            <HStack style={{ gap: '4px', alignItems: 'center' }}>
              <span style={{ fontSize: '16px' }}>♥</span>
              <Text style={{ fontSize: '14px', fontWeight: '700' }}>{userData.like}</Text>
            </HStack>
          </HStack>
        </HStack>

        <hr
          style={{
            width: '100%',
            border: '0',
            borderTop: '1px solid var(--color-border)',
            marginBottom: '8px',
          }}
        />

        <Badge />

        <Text
          style={{
            fontSize: '16px',
            lineHeight: '1.8',
            color: 'var(--color-black)',
            whiteSpace: 'pre-wrap',
          }}
        >
          {userData.description}
        </Text>

        <hr
          style={{
            width: '100%',
            border: '0',
            borderTop: '1px solid var(--color-border)',
            margin: '0',
          }}
        />

        <AiText text={userData.aiText} linesToShow={3} />

        <div style={{ margin: '8px 0' }}>
          <NaverMap lat={mockLocation.lat} lng={mockLocation.lng} />
        </div>

        <hr
          style={{
            width: '100%',
            border: '0',
            borderTop: '1px solid var(--color-border)',
            margin: '0',
          }}
        />

        <CommentSection comments={comments} totalCount={4} />

        <div
          style={{
            position: 'fixed',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
            backgroundColor: 'var(--color-white)',
            width: '100%',
            maxWidth: '430px',
          }}
        >
          <AudioPlayer
            isPlaying={audioPlayer.isPlaying}
            onToggle={audioPlayer.toggle}
            currentTime={audioPlayer.currentTime}
            totalTime={audioPlayer.totalTime}
            progress={audioPlayer.progress}
          />
        </div>
      </VStack>
    </VStack>
  );
};

export default JuniorRecipeClient;
