import { NextRequest, NextResponse } from 'next/server';
import { correctJejuDialect, JEJU_BOOSTINGS } from '@/lib/jejuDialect';

export async function POST(request: NextRequest) {
  const invokeUrl = process.env.NEXT_PUBLIC_CLOVA_INVOKE_URL;
  const secretKey = process.env.NEXT_PUBLIC_CLOVA_SECRET_KEY;

  if (!invokeUrl || !secretKey) {
    return NextResponse.json({ error: 'CLOVA 환경변수가 설정되지 않았습니다.' }, { status: 500 });
  }

  const formData = await request.formData();
  const media = formData.get('media');
  const rawParams = formData.get('params');

  const params = {
    ...(rawParams ? JSON.parse(rawParams as string) : {}),
    boostings: JEJU_BOOSTINGS.map((word) => ({ word })),
  };

  const clovaForm = new FormData();
  clovaForm.append('media', media as Blob, 'recording.webm');
  clovaForm.append('params', JSON.stringify(params));

  const response = await fetch(
    'https://clovaspeech-gw.ncloud.com/external/v1/14971/ba9ae1d0f7785c4b2c4b906de71f2b30a5b390942a7900657eee2aee3e0e3b59/recognizer/upload',
    {
      method: 'POST',
      headers: {
        'X-CLOVASPEECH-API-KEY': secretKey,
      },
      body: clovaForm,
    },
  );

  const data = await response.json();

  if (!response.ok) {
    return NextResponse.json(data, { status: response.status });
  }

  return NextResponse.json({
    ...data,
    text: correctJejuDialect(data.text ?? ''),
  });
}
