'use client';

import { HStack, Text, VStack } from '@vapor-ui/core';
import Image from 'next/image';
import { useState } from 'react';

type EmoType = 'emo_1' | 'emo_2' | 'emo_3' | null;

const EMO_LABELS: Record<Exclude<EmoType, null>, string> = {
  emo_1: '좋아',
  emo_2: '곱닥',
  emo_3: '사랑',
};

const EMO_IMAGES: Record<Exclude<EmoType, null>, string> = {
  emo_1: '/images/emoji-1.png',
  emo_2: '/images/emoji-2.png',
  emo_3: '/images/emoji-3.png',
};

interface Comment {
  id: number;
  nickname: string;
  date: string;
  content: string;
  emo_1: boolean;
  emo_2: boolean;
  emo_3: boolean;
  is_liked: boolean;
  like: number;
}

interface CommentSectionProps {
  comments: Comment[];
  totalCount: number;
  onSubmit: (body: { content: string; emo_1: boolean; emo_2: boolean; emo_3: boolean }) => void;
}

const CommentSection = ({ comments, totalCount, onSubmit }: CommentSectionProps) => {
  const [input, setInput] = useState('');
  const [selectedEmo, setSelectedEmo] = useState<EmoType>(null);

  const handleEmoClick = (emo: Exclude<EmoType, null>) => {
    setSelectedEmo((prev) => (prev === emo ? null : emo));
  };

  const handleSubmit = () => {
    if (!input.trim()) return;
    onSubmit({
      content: input,
      emo_1: selectedEmo === 'emo_1',
      emo_2: selectedEmo === 'emo_2',
      emo_3: selectedEmo === 'emo_3',
    });
    setInput('');
    setSelectedEmo(null);
  };

  return (
    <VStack style={{ gap: '20px', padding: '20px 0' }}>
      <HStack style={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ fontSize: '16px', fontWeight: '700' }}>댓글</Text>
        <Text style={{ fontSize: '14px', fontWeight: '500' }}>{totalCount} 개</Text>
      </HStack>

      {/* 버튼 → 이모지 이미지로 교체 */}
      <HStack style={{ gap: '12px', alignItems: 'center' }}>
        {(Object.keys(EMO_LABELS) as Exclude<EmoType, null>[]).map((emo) => (
          <div
            key={emo}
            onClick={() => handleEmoClick(emo)}
            style={{
              cursor: 'pointer',
              opacity: selectedEmo === null || selectedEmo === emo ? 1 : 0.3,
              transition: 'opacity 0.2s',
              transform: selectedEmo === emo ? 'scale(1.2)' : 'scale(1)',
              transitionProperty: 'opacity, transform',
            }}
          >
            <Image
              src={EMO_IMAGES[emo]}
              alt={EMO_LABELS[emo]}
              width={36}
              height={36}
              style={{ objectFit: 'contain' }}
            />
          </div>
        ))}
      </HStack>

      <HStack
        style={{
          width: '100%',
          border: '1px solid var(--color-border)',
          borderRadius: '8px',
          padding: '12px 16px',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <input
          value={selectedEmo ? `(${EMO_LABELS[selectedEmo]}) ${input}` : input}
          onChange={(e) => {
            const val = e.target.value;
            const prefix = selectedEmo ? `(${EMO_LABELS[selectedEmo]}) ` : '';
            setInput(val.startsWith(prefix) ? val.slice(prefix.length) : val);
          }}
          placeholder="이 비법노트 어땠나요?"
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            fontSize: '14px',
            backgroundColor: 'transparent',
          }}
        />
        <button
          onClick={handleSubmit}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          <Image src="/icons/send.svg" alt="전송" width={24} height={24} />
        </button>
      </HStack>

      {comments.length === 0 ? (
        <Text
          style={{
            fontSize: '14px',
            color: 'var(--color-gray-600)',
            textAlign: 'center',
            padding: '20px 0',
          }}
        >
          댓글이 없습니다.
        </Text>
      ) : (
        comments.map((comment) => {
          const emo = comment.emo_1
            ? 'emoji-1'
            : comment.emo_2
              ? 'emoji-2'
              : comment.emo_3
                ? 'emoji-3'
                : null;
          return (
            <VStack key={comment.id} style={{ gap: '8px', padding: '20px 0' }}>
              <HStack style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <HStack style={{ gap: '8px', alignItems: 'center' }}>
                  <Text style={{ fontSize: '14px', fontWeight: '700' }}>{comment.nickname}</Text>
                  <Text style={{ color: 'var(--color-border)' }}>|</Text>
                  <Text style={{ fontSize: '14px', color: 'var(--color-gray-600)' }}>
                    {comment.date}
                  </Text>
                </HStack>
                <HStack style={{ gap: '4px', alignItems: 'center', cursor: 'pointer' }}>
                  <Image src="/icons/like.svg" alt="좋아요" width={24} height={24} />
                </HStack>
              </HStack>

              <Text
                style={{
                  fontSize: '14px',
                  lineHeight: '1.6',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}
              >
                {comment.content}
              </Text>

              {emo && <Image src={`/images/${emo}.png`} alt={emo} width={100} height={100} />}
            </VStack>
          );
        })
      )}
    </VStack>
  );
};

export default CommentSection;
