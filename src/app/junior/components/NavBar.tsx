'use client';

import { HStack, Text, VStack } from '@vapor-ui/core';
import Image from 'next/image';

const navItems = [
  { id: 1, icon: '/category.svg', label: '리스트' },
  { id: 2, icon: '/home.svg', label: '녹음' },
  { id: 3, icon: '/heart.svg', label: '저장' },
];

const NavBar = () => {
  return (
    <HStack
      style={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: '480px',
        height: '60px',
        backgroundColor: '#ffffff',
        borderTop: '1px solid var(--color-nav-border)',
        justifyContent: 'space-around',
        alignItems: 'center',
        zIndex: 100,
        padding: '0 20px',
      }}
    >
      {navItems.map((item) => (
        <button
          key={item.id}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
          }}
          aria-label={item.label}
        >
          <VStack style={{ alignItems: 'center', gap: '4px' }}>
            {item.icon && <Image src={item.icon} alt={item.label} width={24} height={24} />}
            <Text style={{ fontSize: '12px', color: 'var(--color-nav-text)', fontWeight: '500' }}>
              {item.label}
            </Text>
          </VStack>
        </button>
      ))}
    </HStack>
  );
};

export default NavBar;
