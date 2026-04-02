import { HStack, Text } from '@vapor-ui/core';
import Image from 'next/image';

const Badge = () => {
  return (
    <HStack
      style={{
        gap: '4px',
        alignItems: 'center',
        backgroundColor: 'var(--color-card-bg)',
        borderRadius: '20px',
        padding: '4px 8px',
        alignSelf: 'flex-start',
      }}
    >
      <Image src="/icons/sparkle.svg" alt="sparkle" width={20} height={20} />
      <Text style={{ fontSize: '12px' }}>AI로 정리된 레시피에요</Text>
    </HStack>
  );
};

export default Badge;
