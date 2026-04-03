'use client';

import { HStack, Text, VStack } from '@vapor-ui/core';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  {
    id: 1,
    icon: '/icons/hambuger.svg',
    activeIcon: '/icons/hambuger_active.svg',
    label: '리스트',
    href: '/junior',
  },
  {
    id: 2,
    icon: '/icons/record.svg',
    activeIcon: '/icons/record_active.svg',
    label: '녹음',
    href: '/senior',
  },
  {
    id: 3,
    icon: '/icons/bookmark.svg',
    activeIcon: '/icons/bookmark_active.svg',
    label: '저장',
    href: '/junior/save',
  },
];

const NavBar = () => {
  const pathname = usePathname();

  return (
    <HStack
      style={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: '430px',
        height: '60px',
        backgroundColor: '#ffffff',
        border: '1px solid var(--color-nav-border)',
        justifyContent: 'space-around',
        alignItems: 'center',
        zIndex: 100,
        padding: '0 20px',
      }}
    >
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.id}
            href={item.href}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              textDecoration: 'none',
            }}
            aria-label={item.label}
          >
            <VStack style={{ alignItems: 'center', gap: '4px' }}>
              {item.icon && (
                <Image
                  src={isActive ? item.activeIcon : item.icon}
                  alt={item.label}
                  width={24}
                  height={24}
                />
              )}
              <Text
                style={{
                  fontSize: '12px',
                  color: isActive ? 'var(--color-mandolong-500)' : 'var(--color-nav-text)',
                  fontWeight: '500',
                }}
              >
                {item.label}
              </Text>
            </VStack>
          </Link>
        );
      })}
    </HStack>
  );
};

export default NavBar;
