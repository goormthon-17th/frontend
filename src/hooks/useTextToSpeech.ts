import axios from 'axios'
import { useRef, useState } from 'react'

interface UseTextToSpeechOptions {
  voice?: string
  onError?: (error: Error) => void
}

interface UseTextToSpeechReturn {
  isSpeaking: boolean
  speak: (text: string) => Promise<void>
  stop: () => void
}

export function useTextToSpeech({
  voice = 'Kore',
  onError,
}: UseTextToSpeechOptions = {}): UseTextToSpeechReturn {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const speak = async (text: string) => {
    if (!text.trim()) return

    stop()

    try {
      const response = await axios.post('/api/tts', { text, voice }, { responseType: 'blob' })
      const blob: Blob = response.data
      const url = URL.createObjectURL(blob)
      const audio = new Audio(url)
      audioRef.current = audio

      audio.onended = () => {
        URL.revokeObjectURL(url)
        setIsSpeaking(false)
      }

      setIsSpeaking(true)
      await audio.play()
    } catch (err) {
      setIsSpeaking(false)
      const error = err instanceof Error ? err : new Error('TTS 실패')
      onError?.(error)
    }
  }

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }
    setIsSpeaking(false)
  }

  return { isSpeaking, speak, stop }
}
