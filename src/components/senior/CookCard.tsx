import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import { Card, HStack, Text } from '@vapor-ui/core';
import AudioPlayer from './AudioPlayer';

interface CookCardProps {
  audioUrl: string | null;
  resultText: string | null;
}

const CookCard = ({ audioUrl, resultText }: CookCardProps) => {
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
          <Text typography="heading3">고사리 해장국</Text>
          <Text typography="body1">{new Date().toLocaleDateString('ko-KR')}</Text>
        </HStack>
      </Card.Header>
      <Card.Body $css={{ padding: 0, borderBottom: 'none', height: '329px', overflowY: 'auto' }}>
        <Text typography="body2" style={{ whiteSpace: 'pre-wrap' }}>
          {resultText ?? ''}
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
