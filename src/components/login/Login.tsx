'use client';

import { useMutation } from '@tanstack/react-query';
import { Button, Field, Form, TextInput, VStack } from '@vapor-ui/core';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Login = () => {
  const router = useRouter();
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');

  const {
    mutate: login,
    isPending,
    error,
  } = useMutation({
    mutationFn: (data: { loginId: string; password: string }) =>
      axios
        .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`, data)
        .then((res) => res.data),
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      router.push('/senior');
    },
  });

  return (
    <VStack
      $css={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '134px',
      }}
    >
      <Image src="/icons/login_logo.svg" alt="logo" width={244} height={48} />
      <Form
        style={{ marginTop: '60px' }}
        onSubmit={(event) => {
          event.preventDefault();
          login({ loginId, password });
        }}
      >
        <VStack $css={{ gap: '26px' }}>
          <Field.Root name="email">
            <VStack
              render={<Field.Label $css={{ flexDirection: 'column' }} />}
              $css={{ gap: '8px', flexDirection: 'column', fontSize: '16px', fontWeight: '500' }}
            >
              아이디
              <TextInput
                type="text"
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                $css={{
                  height: '40px',
                  width: '350px',
                  fontSize: '11px',
                  fontWeight: '700',
                  borderRadius: 'none',
                  borderColor: 'var(--color-nav-border)',
                }}
              />
            </VStack>
            <Field.Description
              $css={{
                fontSize: '12px',
                fontWeight: '500',
              }}
            >
              영문 소문자, 숫자 4~16자 조합을 사용해주세요.
            </Field.Description>
          </Field.Root>
          <Field.Root name="password">
            <VStack
              render={<Field.Label />}
              $css={{ gap: '8px', fontSize: '16px', fontWeight: '500' }}
            >
              비밀번호
              <TextInput
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                $css={{
                  height: '40px',
                  width: '350px',
                  fontSize: '11px',
                  fontWeight: '700',
                  borderRadius: 'none',
                  borderColor: 'var(--color-nav-border)',
                }}
              />
            </VStack>
            <Field.Description
              $css={{
                fontSize: '12px',
                fontWeight: '500',
              }}
            >
              영문, 숫자, 특수문자 8~16자 3가지 조합을 사용해주세요.
            </Field.Description>
          </Field.Root>
          {error && (
            <p style={{ color: 'red', fontSize: '13px', textAlign: 'center' }}>
              아이디 또는 비밀번호를 확인해주세요.
            </p>
          )}
          <Button
            type="submit"
            disabled={isPending}
            $css={{
              position: 'absolute',
              bottom: '32px',
              height: '64px',
              width: '350px',
              backgroundColor: 'var(--color-mandolong-500)',
              borderRadius: '8px',
              fontSize: '20px',
              fontWeight: '700',
              color: 'white',
            }}
          >
            {isPending ? '로그인 중...' : '로그인'}
          </Button>
        </VStack>
      </Form>
    </VStack>
  );
};

export default Login;
