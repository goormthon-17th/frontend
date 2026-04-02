import { NextRequest, NextResponse } from 'next/server';

const SAMPLE_RATE = 24000;
const CHANNELS = 1;
const BITS_PER_SAMPLE = 16;

function pcmToWav(pcmBase64: string): Buffer {
  const pcm = Buffer.from(pcmBase64, 'base64');
  const dataSize = pcm.byteLength;
  const wav = Buffer.alloc(44 + dataSize);

  wav.write('RIFF', 0);
  wav.writeUInt32LE(36 + dataSize, 4);
  wav.write('WAVE', 8);
  wav.write('fmt ', 12);
  wav.writeUInt32LE(16, 16);
  wav.writeUInt16LE(1, 20); // PCM
  wav.writeUInt16LE(CHANNELS, 22);
  wav.writeUInt32LE(SAMPLE_RATE, 24);
  wav.writeUInt32LE(SAMPLE_RATE * CHANNELS * (BITS_PER_SAMPLE / 8), 28);
  wav.writeUInt16LE(CHANNELS * (BITS_PER_SAMPLE / 8), 32);
  wav.writeUInt16LE(BITS_PER_SAMPLE, 34);
  wav.write('data', 36);
  wav.writeUInt32LE(dataSize, 40);
  pcm.copy(wav, 44);

  return wav;
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: 'GEMINI_API_KEY가 설정되지 않았습니다.' }, { status: 500 });
  }

  const { text, voice } = await request.json();

  const body = JSON.stringify({
    contents: [{ parts: [{ text }] }],
    generationConfig: {
      responseModalities: ['AUDIO'],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: {
            voiceName: voice ?? 'Kore',
          },
        },
      },
    },
  });

  let response: Response | null = null;
  for (let attempt = 0; attempt < 3; attempt++) {
    response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-preview-tts:generateContent?key=${apiKey}`,
      { method: 'POST', headers: { 'Content-Type': 'application/json' }, body },
    );
    if (response.ok) break;
    const errorData = await response.json().catch(() => ({}));
    if (errorData?.error?.status !== 'INVALID_ARGUMENT') {
      return NextResponse.json(errorData, { status: response.status });
    }
    if (attempt < 2) await new Promise((r) => setTimeout(r, 500));
    else return NextResponse.json(errorData, { status: response.status });
  }

  const data = await response!.json();
  const pcmBase64 = data?.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

  if (!pcmBase64) {
    return NextResponse.json({ error: '오디오 데이터가 없습니다.' }, { status: 500 });
  }

  const wav = pcmToWav(pcmBase64);
  return new NextResponse(new Uint8Array(wav), {
    headers: { 'Content-Type': 'audio/wav' },
  });
}
