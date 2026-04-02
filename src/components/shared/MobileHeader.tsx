import { HStack } from '@vapor-ui/core';
import Image from 'next/image';

interface MobileHeaderProps {
  onBack?: () => void;
  onMenu?: () => void;
}
const MobileHeader = ({ onBack, onMenu }: MobileHeaderProps) => {
  return (
    <HStack
      style={{
        position: 'fixed',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: '430px',
        height: '50px',
        backgroundColor: 'transparent',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 20px',
        zIndex: 100,
      }}
    >
      {onBack ? (
        <button
          onClick={onBack}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          aria-label="뒤로가기"
        >
          <Image src="/icons/arrow-left.svg" alt="뒤로가기" width={24} height={24} />
        </button>
      ) : (
        <div style={{ width: '24px' }} />
      )}

      {onMenu ? (
        <button
          onClick={onMenu}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          aria-label="메뉴"
        >
          <Image src="/icons/menu.svg" alt="메뉴" width={24} height={24} />
        </button>
      ) : (
        <div style={{ width: '24px' }} />
      )}
    </HStack>
  );
};

export default MobileHeader;
