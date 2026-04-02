import { HStack, VStack } from '@vapor-ui/core';

const RecipeCardSkeleton = () => {
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
        <div className="skeleton" style={{ width: '100%', height: '100%' }} />
        <div
          className="skeleton"
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
          }}
        />
      </div>

      <VStack
        style={{
          padding: '16px',
          gap: '8px',
          backgroundColor: 'var(--color-card-bg)',
        }}
      >
        <HStack style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <HStack style={{ gap: '8px', alignItems: 'center' }}>
            <div className="skeleton" style={{ width: '80px', height: '18px' }} />
            <div className="skeleton" style={{ width: '1px', height: '14px' }} />
            <div className="skeleton" style={{ width: '56px', height: '14px' }} />
          </HStack>
          <div className="skeleton" style={{ width: '36px', height: '14px' }} />
        </HStack>
        <div className="skeleton" style={{ width: '75%', height: '14px' }} />
      </VStack>
    </VStack>
  );
};

export default RecipeCardSkeleton;
