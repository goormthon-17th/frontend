'use client';

import { useInnerSize } from '@/utils/useInnerSize';
import { createContext, ReactNode, useContext } from 'react';
import { useMeasure } from 'react-use';

export const ScreenContext = createContext<number>(480);

export const useMobileContainerWidth = (): number => {
  return useContext(ScreenContext);
};

export const MobileContainer = ({ children }: { children: ReactNode }) => {
  const [ref, { width }] = useMeasure<HTMLDivElement>();
  const { innerHeight } = useInnerSize();

  return (
    <ScreenContext.Provider value={width || 390}>
      <div
        ref={ref}
        style={{
          maxWidth: '480px',
          marginLeft: 'auto',
          marginRight: 'auto',
          minHeight: innerHeight > 0 ? innerHeight : '100vh',
          backgroundColor: 'white',
          borderLeft: '1px solid var(--color-profile-bg)',
          borderRight: '1px solid var(--color-profile-bg)',
        }}
      >
        {children}
      </div>
    </ScreenContext.Provider>
  );
};
