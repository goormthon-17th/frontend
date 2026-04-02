import { HStack, Text, VStack } from '@vapor-ui/core';
import Image from 'next/image';

interface CardProps {
  image: string;
  profile: string;
  title: string;
  recipeName: string;
  date: string;
  like: number;
  onCardClick: () => void;
  onProfileClick: () => void;
}

const Card = ({
  image,
  profile,
  title,
  recipeName,
  date,
  like,
  onCardClick,
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
        <Image src={image} alt={recipeName} fill style={{ objectFit: 'cover' }} />

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
            <Text style={{ fontSize: '14px', fontWeight: '700', color: 'var(--color-white)' }}>
              {recipeName}
            </Text>
            <Text style={{ color: 'var(--color-border)' }}>|</Text>
            <Text style={{ fontSize: '14px', color: 'var(--color-white)' }}>{date}</Text>
          </HStack>
          <HStack style={{ gap: '4px', alignItems: 'center' }}>
            <span style={{ fontSize: '16px' }}>♥</span>
            <Text style={{ fontSize: '16px', fontWeight: '700', color: 'var(--color-white)' }}>
              {like}
            </Text>
          </HStack>
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
          <Image
            src={profile}
            alt="profile"
            width={72}
            height={72}
            style={{
              objectFit: 'cover',
              backgroundColor: 'var(--color-profile-bg)',
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
        <Text style={{ fontSize: '16px', fontWeight: '700', fontFamily: 'YPairing' }}>{title}</Text>
        <span style={{ fontSize: '18px' }}>›</span>
      </HStack>
    </VStack>
  );
};

export default Card;
