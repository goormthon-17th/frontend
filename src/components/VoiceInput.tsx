'use client'

import { useSpeechToText } from '@/hooks/useSpeechToText'

interface VoiceInputProps {
  onResult?: (text: string) => void
}

export function VoiceInput({ onResult }: VoiceInputProps) {
  const { isRecording, transcript, start, stop, reset } = useSpeechToText({
    lang: 'ko-KR',
    onResult,
    onError: (err) => console.error(err.message),
  })

  return (
    <div>
      <button onClick={isRecording ? stop : start}>
        {isRecording ? '녹음 중지' : '녹음 시작'}
      </button>
      {transcript && (
        <div>
          <p>{transcript}</p>
          <button onClick={reset}>초기화</button>
        </div>
      )}
    </div>
  )
}
