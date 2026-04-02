import { Button, Text, VStack } from '@vapor-ui/core';
import Image from 'next/image';
import { ReactNode } from 'react';

interface SeniorStepLayoutProps {
  title: ReactNode;
  subtitle?: string;
  children?: ReactNode;
  button?: {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'outline';
  };
  onBack?: () => void;
  dim?: boolean;
  dimText?: string;
}

const SeniorStepLayout = ({
  title,
  subtitle,
  children,
  button,
  onBack,
  dim,
  dimText,
}: SeniorStepLayoutProps) => {
  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {onBack && (
        <Button
          onClick={onBack}
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
          }}
        >
          <Image src="/icons/back.svg" alt="back" width={28} height={28} />
        </Button>
      )}
      <VStack
        $css={{
          gap: '$150',
          alignItems: 'center',
          position: 'absolute',
          top: '120px',
          zIndex: 10,
        }}
      >
        <Text
          style={{
            fontFamily: 'YPairing',
            fontSize: '38px',
            fontWeight: '400',
            lineHeight: '56px',
            color: 'black',
            textAlign: 'center',
          }}
        >
          {title}
        </Text>
        {subtitle && <Text typography="heading5">{subtitle}</Text>}
      </VStack>

      {children && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
          }}
        >
          {children}
        </div>
      )}

      {button && (
        <Button
          style={{
            position: 'absolute',
            bottom: '32px',
            height: '64px',
            width: '100%',
            backgroundColor: button.variant === 'outline' ? 'white' : 'var(--color-mandolong-500)',
            border: button.variant === 'outline' ? '1px solid #C6C6C6' : 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '500',
            color: button.variant === 'outline' ? 'black' : 'white',
          }}
          onClick={button.onClick}
        >
          {button.label}
        </Button>
      )}

      {dim && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: '#00000066',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontFamily: 'YPairing',
              fontSize: '28px',
              fontWeight: '400',
              lineHeight: '48px',
              color: 'white',
              textAlign: 'center',
            }}
          >
            {dimText}
          </Text>
        </div>
      )}
    </div>
  );
};

export default SeniorStepLayout;
