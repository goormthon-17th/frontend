import { HStack, Text, VStack } from '@vapor-ui/core';
import Image from 'next/image';

interface CardProps {
  image: string;
  profile: string;
  title: string;
  recipeName?: string;
  date?: string;
  like?: number;
  isLiked?: boolean;
  onLikeClick?: () => void;
  onCardClick: () => void;
  onProfileClick: () => void;
}

const Card = ({
  profile,
  image,
  title,
  recipeName,
  date,
  like,
  isLiked,
  onCardClick,
  onLikeClick,
  onProfileClick,
}: CardProps) => {
  return (
    <VStack
      onClick={onCardClick}
      style={{
        borderRadius: '16px',
        overflow: 'hidden',
        width: '100%',
        boxShadow: 'var(--box-shadow-sm)',
        backgroundColor: 'var(--color-white)',
        cursor: 'pointer',
      }}
    >
      <div style={{ position: 'relative', width: '100%', height: '180px' }}>
        <Image src={image} alt="이미지" fill style={{ objectFit: 'cover' }} />

        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '60px',
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)',
          }}
        />

        <HStack
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            padding: '12px 16px',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <HStack style={{ gap: '8px', alignItems: 'center' }}>
            <Text
              style={{
                fontSize: '14px',
                fontWeight: '700',
                color: 'var(--color-white)',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                maxWidth: '150px',
              }}
            >
              {recipeName}
            </Text>
            <Text style={{ color: 'var(--color-border)' }}>|</Text>
            <Text style={{ fontSize: '14px', color: 'var(--color-white)' }}>{date}</Text>
          </HStack>
          {isLiked !== undefined && (
            <HStack style={{ gap: '4px', alignItems: 'center' }}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onLikeClick?.();
                }}
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
                  width={24}
                  height={24}
                />
              </button>
              <Text style={{ fontSize: '16px', fontWeight: '700', color: 'var(--color-white)' }}>
                {like}
              </Text>
            </HStack>
          )}
        </HStack>

        <div
          onClick={(e) => {
            e.stopPropagation();
            onProfileClick();
          }}
          style={{
            position: 'absolute',
            bottom: '-14px',
            left: '16px',
            cursor: 'pointer',
            zIndex: 1,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={profile}
            alt="profile"
            width={72}
            height={72}
            style={{
              objectFit: 'cover',
              backgroundColor: 'transparent',
              borderRadius: '50%',
            }}
          />
        </div>
      </div>

      <HStack
        onClick={(e) => {
          e.stopPropagation();
          onProfileClick();
        }}
        style={{
          padding: '20px 16px',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
        }}
      >
        <Text
          style={{
            fontSize: '16px',
            fontWeight: '700',
            fontFamily: 'YPairing',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            maxWidth: '280px',
          }}
        >
          {title}
        </Text>
        <span style={{ fontSize: '18px' }}>›</span>
      </HStack>
    </VStack>
  );
};

export default Card;
