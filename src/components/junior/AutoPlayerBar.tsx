import { HStack, Text, VStack } from '@vapor-ui/core';
import Image from 'next/image';

interface AudioPlayerBarProps {
  isPlaying: boolean;
  onToggle: () => void;
  currentTime: string;
  totalTime: string;
  progress: number;
}

const AudioPlayerBar = ({
  isPlaying,
  onToggle,
  currentTime,
  totalTime,
  progress,
}: AudioPlayerBarProps) => {
  return (
    <VStack
      style={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        border: '1px solid var(--color-border)',
        backgroundColor: 'var(--color-white)',
        width: '100%',
        padding: '32px 20px',
        maxWidth: '430px',
      }}
    >
      <div
        style={{
          position: 'relative',
          height: '4px',
          backgroundColor: '#e0e0e0',
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: '100%',
            backgroundColor: 'var(--color-mandolong-500)',
          }}
        />
      </div>
      <HStack $css={{ justifyContent: 'space-between' }}>
        <Text typography="subtitle1" style={{ color: '#a7a7a7' }}>
          {currentTime}
        </Text>
        <Text typography="subtitle1" style={{ color: '#a7a7a7' }}>
          {totalTime}
        </Text>
      </HStack>
      <HStack $css={{ justifyContent: 'center', gap: '32px', alignItems: 'center' }}>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
          <Image src="/icons/replay5.svg" alt="replay5" width={22} height={25} />
        </button>
        <button
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          onClick={onToggle}
        >
          <Image
            src={isPlaying ? '/icons/pause_circle.svg' : '/icons/play_circle.svg'}
            alt={isPlaying ? 'pause' : 'play'}
            width={40}
            height={40}
          />
        </button>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
          <Image src="/icons/forward5.svg" alt="forward5" width={22} height={25} />
        </button>
      </HStack>
    </VStack>
  );
};

export default AudioPlayerBar;
