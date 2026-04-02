export interface UploadVoiceResult {
  text: string;
  audioUrl: string | null;
}

export async function uploadVoice(audioUrl: string): Promise<UploadVoiceResult> {
  const audioBlob = await fetch(audioUrl).then((r) => r.blob());
  const formData = new FormData();
  formData.append('audio', audioBlob, 'recording.webm');

  const response = await fetch('https://goormthon-4.goorm.training/api/voice', {
    method: 'POST',
    body: formData,
  });

  const responseFormData = await response.formData();
  const text = (responseFormData.get('text') as string) ?? '';
  const audioFile = responseFormData.get('audio') as File | null;
  const ttsAudioUrl = audioFile ? URL.createObjectURL(audioFile) : null;

  console.log('uploadVoice text:', text, 'audioUrl:', ttsAudioUrl);
  return { text, audioUrl: ttsAudioUrl };
}
