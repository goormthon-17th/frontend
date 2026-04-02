import { Text, VStack } from '@vapor-ui/core';
import Image from 'next/image';
import { ReactNode } from 'react';

interface BannerProps {
  title: string;
  children?: ReactNode;
}

const Banner = ({ title, children }: BannerProps) => {
  return (
    <VStack
      style={{
        backgroundColor: 'var(--color-mandolong-600)',
        borderRadius: '0',
        padding: '60px 20px 26px 20px',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text
          style={{
            fontFamily: 'YPairing',
            fontSize: '30px',
            fontWeight: '700',
            lineHeight: '1.4',
            whiteSpace: 'pre-line',
          }}
        >
          {title}
        </Text>
        <Image
          src="/images/character-1.png"
          alt="banner"
          width={120}
          height={100}
          style={{ objectFit: 'contain' }}
        />
      </div>
      {children}
    </VStack>
  );
};

export default Banner;
