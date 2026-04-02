import { HStack, VStack } from '@vapor-ui/core';

const CardSkeleton = () => {
  return (
    <VStack
      style={{
        borderRadius: '16px',
        overflow: 'hidden',
        width: '100%',
        boxShadow: 'var(--box-shadow-sm)',
        backgroundColor: 'var(--color-white)',
      }}
    >
      {/* 이미지 영역 */}
      <div style={{ position: 'relative', width: '100%', height: '180px' }}>
        {/* 이미지 */}
        <div className="skeleton" style={{ width: '100%', height: '100%' }} />

        {/* 그라디언트 오버레이 */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '60px',
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.15), transparent)',
          }}
        />

        {/* recipeName | date / like */}
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
            <div className="skeleton" style={{ width: '56px', height: '14px' }} />
            <div className="skeleton" style={{ width: '1px', height: '14px' }} />
            <div className="skeleton" style={{ width: '48px', height: '14px' }} />
          </HStack>
          <div className="skeleton" style={{ width: '32px', height: '14px' }} />
        </HStack>

        {/* 프로필 이미지 */}
        <div
          style={{
            position: 'absolute',
            bottom: '-14px',
            left: '16px',
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            zIndex: 1,
            overflow: 'hidden',
          }}
        >
          <div
            className="skeleton"
            style={{ width: '100%', height: '100%', borderRadius: '50%' }}
          />
        </div>
      </div>

      {/* 하단 title / 화살표 */}
      <HStack
        style={{
          padding: '20px 16px',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div className="skeleton" style={{ width: '55%', height: '18px' }} />
        <div className="skeleton" style={{ width: '18px', height: '18px', borderRadius: '4px' }} />
      </HStack>
    </VStack>
  );
};

export default CardSkeleton;
