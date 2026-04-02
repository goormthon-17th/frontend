'use client';

import { HStack, Text, VStack } from '@vapor-ui/core';
import Image from 'next/image';
import { useState } from 'react';

interface Comment {
  id: number;
  nickname: string;
  date: string;
  content: string;
  image?: string;
  like: number;
  isMine: boolean;
}

interface CommentSectionProps {
  comments: Comment[];
  totalCount: number;
}

const CommentSection = ({ comments, totalCount }: CommentSectionProps) => {
  const [input, setInput] = useState('');

  return (
    <VStack style={{ gap: '20px', padding: '20px 0' }}>
      <HStack style={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ fontSize: '16px', fontWeight: '500' }}>댓글</Text>
        <Text style={{ fontSize: '14px', fontWeight: '500' }}>{totalCount} 개</Text>
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
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder=""
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            fontSize: '14px',
            backgroundColor: 'transparent',
          }}
        />
        <button
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
          }}
        >
          <Image src="/icons/send.svg" alt="전송" width={24} height={24} />
        </button>
      </HStack>

      {comments.map((comment) => (
        <VStack key={comment.id} style={{ gap: '8px', padding: '20px 0' }}>
          <HStack style={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <HStack style={{ gap: '8px', alignItems: 'center' }}>
              <Text style={{ fontSize: '14px', fontWeight: '700' }}>{comment.nickname}</Text>
              <Text style={{ color: 'var(--color-border)' }}>|</Text>
              <Text style={{ fontSize: '14px', color: 'var(--color-gray-600)' }}>
                {comment.date}
              </Text>
            </HStack>
            <HStack style={{ gap: '8px', alignItems: 'center' }}>
              <HStack style={{ gap: '4px', alignItems: 'center', cursor: 'pointer' }}>
                <span style={{ fontSize: '16px' }}>♥</span>
              </HStack>
            </HStack>
          </HStack>

          <Text
            style={{
              fontSize: '14px',
              lineHeight: '1.6',
              color: 'var(--color-black)',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}
          >
            {comment.content}
          </Text>

          {comment.image && (
            <div
              style={{
                position: 'relative',
                width: '100px',
                height: '100px',
                overflow: 'hidden',
                backgroundColor: 'var(--color-border)',
              }}
            >
              <Image src={comment.image} alt="댓글 이미지" fill style={{ objectFit: 'cover' }} />
            </div>
          )}
        </VStack>
      ))}
    </VStack>
  );
};

export default CommentSection;
