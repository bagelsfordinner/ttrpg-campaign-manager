'use client';

import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ToastBox = styled.div`
  background-color: ${({ theme }) => theme.colors.error};
  color: ${({ theme }) => theme.colors.text};
  padding: 1rem 1.25rem;
  border-radius: ${({ theme }) => theme.radius.sm};
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.6);
  animation: ${fadeIn} 0.3s ease forwards;
  font-size: 0.95rem;
  max-width: 300px;
`;

type Props = {
  message: string;
};

export default function Toast({ message }: Props) {
  return <ToastBox>{message}</ToastBox>;
}
