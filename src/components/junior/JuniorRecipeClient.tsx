'use client';

import { usePostReview, useRecipeDetail, useToggleLike } from '@/app/api/junior/useJunior';
import AiText from '@/components/junior/AiText';
import Badge from '@/components/junior/Badge';
import CommentSection from '@/components/junior/CommentSection';
import NaverMap from '@/components/junior/NaverMap';
import MobileHeader from '@/components/shared/MobileHeader';
import { LOCATION } from '@/constants/text';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import { HStack, Text, VStack } from '@vapor-ui/core';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import AudioPlayerBar from './AutoPlayerBar';

const JuniorRecipeClient = () => {
  const { id } = useParams();
  const { data: recipe, isLoading, error } = useRecipeDetail(Number(id));
  const { mutate: postReview } = usePostReview(Number(id));
  const { mutate: toggleLike, data: likeData } = useToggleLike(Number(id));

  const likeCount = likeData?.like_count ?? recipe?.like_count ?? 0;
  const isLiked = likeData?.liked ?? false;

  const router = useRouter();
  const audioPlayer = useAudioPlayer(null);
  const [mockLocation] = useState(() => LOCATION[Math.floor(Math.random() * LOCATION.length)]);

  if (isLoading)
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          gap: '16px',
        }}
      >
        <motion.div
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Image src="/images/character-2.png" alt="로딩중" width={80} height={80} />
        </motion.div>
        <p style={{ fontSize: '16px', fontFamily: 'YPairing' }}>로딩 중...</p>
      </div>
    );

  if (error || !recipe) return <p>데이터를 불러오지 못했어요.</p>;

  return (
    <VStack
      style={{ backgroundColor: 'var(--color-white)', minHeight: '100vh', paddingBottom: '150px' }}
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
        {recipe.recipe_image_url && (
          <Image
            src={recipe.recipe_image_url}
            alt={recipe.recipe_name}
            fill
            style={{ objectFit: 'cover' }}
          />
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
          {recipe.recipe_name}
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
              {`${recipe.created_at.month}월 ${recipe.created_at.day}일`}
            </Text>
            <Text style={{ color: 'var(--color-border)' }}>|</Text>
            <HStack style={{ gap: '4px', alignItems: 'center' }}>
              <button
                onClick={() => toggleLike(undefined)}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Image
                  src={isLiked ? '/icons/filled-heart.svg' : '/icons/empty-heart.svg'}
                  alt={isLiked ? '좋아요 취소' : '좋아요'}
                  width={20}
                  height={20}
                />
              </button>
              <Text style={{ fontSize: '14px', fontWeight: '700' }}>{likeCount}</Text>
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

        {recipe.refined_text ? (
          <Text
            style={{
              fontSize: '16px',
              lineHeight: '1.8',
              color: 'var(--color-black)',
              whiteSpace: 'pre-wrap',
            }}
          >
            {recipe.refined_text}
          </Text>
        ) : (
          <Text style={{ fontSize: '14px', color: 'var(--color-gray-600)' }}>
            작성된 글이 없습니다.
          </Text>
        )}

        <hr
          style={{
            width: '100%',
            border: '0',
            borderTop: '1px solid var(--color-border)',
            margin: '0',
          }}
        />

        {recipe.raw_text && <AiText text={recipe.raw_text} linesToShow={3} />}

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

        <CommentSection
          comments={recipe.reviews.map((r) => ({
            id: r.id,
            nickname: r.nickname,
            date: `${r.created_at.month}월 ${r.created_at.day}일`,
            content: r.content,
            emo_1: r.emo_1,
            emo_2: r.emo_2,
            emo_3: r.emo_3,
            like: 0,
            is_liked: r.is_liked,
          }))}
          totalCount={recipe.reviews.length}
          onSubmit={postReview}
        />

        <AudioPlayerBar
          isPlaying={audioPlayer.isPlaying}
          onToggle={audioPlayer.toggle}
          currentTime={audioPlayer.currentTime}
          totalTime={audioPlayer.totalTime}
          progress={audioPlayer.progress}
        />
      </VStack>
    </VStack>
  );
};

export default JuniorRecipeClient;
