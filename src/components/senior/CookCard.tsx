import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import { Card, HStack, Text } from '@vapor-ui/core';
import AudioPlayer from './AudioPlayer';

interface CookCardProps {
  audioUrl: string | null;
}

const CookCard = ({ audioUrl }: CookCardProps) => {
  const audioPlayer = useAudioPlayer(audioUrl);
  return (
    <Card.Root $css={{ width: '350px', padding: '24px 20px', gap: '24px' }}>
      <Card.Header $css={{ padding: 0, borderBottom: 'none' }}>
        <HStack
          $css={{
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '16px',
            borderBottom: '1px solid var(--vapor-color-gray-050)',
            paddingBottom: '16px',
          }}
        >
          <Text typography="heading3">톳밥</Text>
          <Text typography="body1">2026.04.02</Text>
        </HStack>
      </Card.Header>
      <Card.Body $css={{ padding: 0, borderBottom: 'none', height: '329px' }}>
        <Text typography="body2">
          톳밥 4인분 · 30분 <br />
          재료 쌀 2컵 씻어 불리기 <br />
          생톳 200g 데쳐서 썰기
          <br />
          참기름 1큰술 마지막에 둘러
          <br />
          <br />
          꿀팁
          <br />
          “톳은 너무 오래 데치면 식감이 살짝 죽어 이수다...”
        </Text>
      </Card.Body>
      <Card.Footer $css={{ borderTop: 'none', padding: 0 }}>
        <AudioPlayer
          isPlaying={audioPlayer.isPlaying}
          onToggle={audioPlayer.toggle}
          currentTime={audioPlayer.currentTime}
          totalTime={audioPlayer.totalTime}
          progress={audioPlayer.progress}
        />
      </Card.Footer>
    </Card.Root>
  );
};

export default CookCard;
