import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import { Card, HStack, Text } from '@vapor-ui/core';
import axios from 'axios';
import { useEffect, useState } from 'react';
import AudioPlayer from './AudioPlayer';

interface CookCardProps {
  audioUrl: string | null;
  resultText: string | null;
}

const CookCard = ({ audioUrl, resultText }: CookCardProps) => {
  const [ttsUrl, setTtsUrl] = useState<string | null>(null);
  const audioPlayer = useAudioPlayer(ttsUrl ?? audioUrl);

  useEffect(() => {
    if (!resultText) return;
    axios
      .post('/api/internal/tts', { text: resultText }, { responseType: 'blob' })
      .then((res) => setTtsUrl(URL.createObjectURL(res.data)));
  }, [resultText]);

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
          <Text typography="heading3">비법노트</Text>
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
