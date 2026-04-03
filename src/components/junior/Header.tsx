import { HStack, Text, VStack } from '@vapor-ui/core';
import Image from 'next/image';

interface HeaderProps {
  profile: string;
  title: string;
  recipe: number;
  like: number;
  subscribe: number;
  isLoading?: boolean;
  isSubscribed?: boolean;
  onSubscribe?: () => void;
}

const Header = ({
  profile,
  title,
  recipe,
  like,
  subscribe,
  isLoading,
  isSubscribed,
  onSubscribe,
}: HeaderProps) => {
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <button
        onClick={onSubscribe}
        style={{
          position: 'absolute',
          right: '20px',
          top: '80px',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          fontSize: '14px',
          fontWeight: 'bold',
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer',
          color: 'var(--color-mandolong-500)',
        }}
      >
        {isSubscribed ? '구독중' : '구독하기'}
        {!isSubscribed && <Image src="/icons/plus.svg" alt="구독" width={16} height={16} />}
      </button>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '140px',
          backgroundColor: 'var(--color-mandolong-900)',
        }}
      />
      <VStack
        style={{
          position: 'relative',
          alignItems: 'center',
          gap: '16px',
          paddingTop: '78px',
          padding: '78px 20px 0 20px',
        }}
      >
        <Image
          src={
            profile?.startsWith('http') || profile?.startsWith('/')
              ? profile
              : '/images/profile-1.png'
          }
          alt="profile"
          width={100}
          height={100}
          style={{ objectFit: 'cover', backgroundColor: 'transparent' }}
        />

        {isLoading ? (
          <div
            className="skeleton"
            style={{ width: '100px', height: '24px', borderRadius: '8px' }}
          />
        ) : (
          <Text
            style={{
              fontFamily: 'YPairing',
              fontWeight: '700',
              textAlign: 'center',
              fontSize: '20px',
            }}
          >
            {title}
          </Text>
        )}

        <HStack
          style={{
            gap: '24px',
            alignItems: 'center',
            backgroundColor: 'var(--color-gray-50)',
            borderRadius: '8px',
            padding: '8px 26px',
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignContent: 'center',
            textAlign: 'center',
            justifyContent: 'center',
          }}
        >
          <HStack style={{ alignItems: 'center', gap: '6px' }}>
            <Text style={{ fontSize: '16px' }}>레시피</Text>
            <Text style={{ fontSize: '16px', fontWeight: 'bold' }}>{recipe}</Text>
          </HStack>
          <Text style={{ color: 'var(--color-border)' }}>|</Text>
          <HStack style={{ alignItems: 'center', gap: '6px' }}>
            <Text style={{ fontSize: '16px' }}>좋아요</Text>
            <Text style={{ fontSize: '16px', fontWeight: 'bold' }}>{like}</Text>
          </HStack>
          <Text style={{ color: 'var(--color-border)' }}>|</Text>
          <HStack style={{ alignItems: 'center', gap: '6px' }}>
            <Text style={{ fontSize: '16px' }}>구독자</Text>
            <Text style={{ fontSize: '16px', fontWeight: 'bold' }}>{subscribe}</Text>
          </HStack>
        </HStack>
      </VStack>
    </div>
  );
};

export default Header;
