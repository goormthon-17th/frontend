'use client';

import { useState } from 'react';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';

export function TextToSpeech() {
  const [text, setText] = useState('');
  const { isSpeaking, speak, stop } = useTextToSpeech({
    voice: 'Kore',
    onError: (err) => console.error(err.message),
  });

  return (
    <div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="읽을 텍스트를 입력하세요"
        rows={4}
      />
      <div>
        <button onClick={() => speak(text)} disabled={isSpeaking || !text.trim()}>
          {isSpeaking ? '재생 중...' : '재생'}
        </button>
        {isSpeaking && <button onClick={stop}>중지</button>}
      </div>
    </div>
  );
}
