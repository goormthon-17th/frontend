import { HStack, Text, VStack } from '@vapor-ui/core';
import Image from 'next/image';

interface RecipeCardProps {
  image: string;
  title: string;
  date: string;
  like: number;
  description: string;
  isLiked?: boolean;
}

const RecipeCard = ({
  image,
  title,
  date,
  like,
  description,
  isLiked = false,
}: RecipeCardProps) => {
  return (
    <VStack
      style={{
        borderRadius: '16px',
        overflow: 'hidden',
        width: '100%',
        height: '220px',
        boxShadow: 'var(--box-shadow-sm)',
      }}
    >
      <div style={{ position: 'relative', flex: 1, width: '100%' }}>
        <Image src={image} alt={title} fill style={{ objectFit: 'cover', width: '100%' }} />
        <button
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-mandolong-500)',
            color: 'var(--color-white)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          ♥
        </button>
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
            <Text style={{ fontWeight: '700', fontSize: '18px' }}>{title}</Text>
            <Text style={{ color: 'var(--color-border)' }}>|</Text>
            <Text style={{ color: 'var(--color-gray-600)', fontSize: '14px' }}>{date}</Text>
          </HStack>
          <HStack style={{ gap: '4px', alignItems: 'center' }}>
            <span
              style={{
                fontSize: '24px',
                color: 'var(--color-white)',
              }}
            >
              ♥
            </span>
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
