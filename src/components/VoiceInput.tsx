'use client';

import { useSpeechToText } from '@/hooks/useSpeechToText';
import { Button, Text } from '@vapor-ui/core';

interface VoiceInputProps {
  onResult?: (text: string) => void;
}

export function VoiceInput({ onResult }: VoiceInputProps) {
  const { isRecording, transcript, start, stop, reset } = useSpeechToText({
    lang: 'ko-KR',
    onResult,
    onError: (err) => console.error(err.message),
  });

  return (
    <div>
      <Button onClick={isRecording ? stop : start}>
        {isRecording ? '녹음 중지' : '녹음 시작'}
      </Button>
      <Text
        style={{
          fontFamily: 'YPairing',
          fontSize: '38px',
          fontWeight: '400',
          marginBottom: '12px',
          lineHeight: 1.2,
          color: 'var(--vapor-color-gray-900)',
        }}
      >
        하이
      </Text>
      {transcript && (
        <div>
          <p>{transcript}</p>
          <Button onClick={reset}>초기화</Button>
        </div>
      )}
    </div>
  );
}
