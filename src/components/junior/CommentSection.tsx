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
        <Text style={{ fontSize: '16px', fontWeight: '500' }}>댓글</Text>
        <Text style={{ fontSize: '14px', fontWeight: '500' }}>{totalCount} 개</Text>
      </HStack>

      <HStack style={{ gap: '8px' }}>
        {(Object.keys(EMO_LABELS) as Exclude<EmoType, null>[]).map((emo) => (
          <button
            key={emo}
            onClick={() => handleEmoClick(emo)}
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              border: `1px solid ${selectedEmo === emo ? 'var(--color-mandolong-500)' : 'var(--color-border)'}`,
              backgroundColor: selectedEmo === emo ? 'var(--color-mandolong-500)' : 'transparent',
              color: selectedEmo === emo ? 'white' : 'var(--color-gray-600)',
              fontSize: '13px',
              cursor: 'pointer',
            }}
          >
            {EMO_LABELS[emo]}
          </button>
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
          placeholder="댓글을 입력하세요"
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
