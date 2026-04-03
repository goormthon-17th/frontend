import { HStack, Text, VStack } from '@vapor-ui/core';
import Image from 'next/image';

interface RecipeCardProps {
  image: string;
  title: string;
  date: string;
  like: number;
  description: string;
  isLiked?: boolean;
  isBookmarked?: boolean;
  onLikeClick: () => void;
  onCardClick?: () => void;
  onBookmarkClick?: () => void;
}

const RecipeCard = ({
  image,
  title,
  date,
  like,
  description,
  isLiked = false,
  onLikeClick,
  onCardClick,
}: RecipeCardProps) => {
  return (
    <VStack
      onClick={onCardClick}
      style={{
        borderRadius: '16px',
        overflow: 'hidden',
        width: '100%',
        cursor: 'pointer',
        height: '220px',
        boxShadow: 'var(--box-shadow-sm)',
      }}
    >
      <div style={{ position: 'relative', flex: 1, width: '100%' }}>
        <Image
          src={image}
          alt={title || '레시피 이미지'}
          fill
          style={{ objectFit: 'cover', width: '100%' }}
        />
      </div>

      <VStack
        style={{
          padding: '16px',
          gap: '4px',
          backgroundColor: 'var(--color-card-bg)',
        }}
      >
        <HStack style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <HStack style={{ gap: '8px', alignItems: 'center' }}>
            <Text
              style={{
                fontWeight: '700',
                fontSize: '18px',
                maxWidth: '200px',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
              }}
            >
              {title || '제목 없음'}
            </Text>
            <Text style={{ color: 'var(--color-border)' }}>|</Text>
            <Text style={{ color: 'var(--color-gray-600)', fontSize: '14px' }}>{date}</Text>
          </HStack>
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
            <Text style={{ fontWeight: '700', fontSize: '14px' }}>{like}</Text>
          </HStack>
        </HStack>

        <Text
          style={{
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            fontSize: '14px',
          }}
        >
          {description}
        </Text>
      </VStack>
    </VStack>
  );
};

export default RecipeCard;
