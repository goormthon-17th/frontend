import { HStack, Text, VStack } from '@vapor-ui/core';
import Image from 'next/image';

interface HeaderProps {
  profile: string;
  title: string;
  recipe: number;
  like: number;
  subscribe: number;
}

const Header = ({ profile, title, recipe, like, subscribe }: HeaderProps) => {
  return (
    <div style={{ position: 'relative', width: '100%' }}>
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
          src={profile}
          alt="profile"
          width={100}
          height={100}
          style={{ objectFit: 'cover', backgroundColor: 'var(--color-profile-bg)' }}
        />

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
