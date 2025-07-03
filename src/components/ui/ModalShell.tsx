// src/components/ui/ModalShell.tsx
'use client';

import { ReactNode } from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { X } from 'lucide-react';

const Overlay = styled.div`
  position: fixed;
  top: 0; left: 0;
  width: 100vw;
  height: 100vh;
  background: ${({ theme }) => theme.colors.overlayBackground};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalBox = styled.div`
  background: ${({ theme }) => theme.colors.cardBackground};
  width: min(90vw, 600px);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.6);
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.secondaryText};
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.rust};
  }
`;

type ModalShellProps = {
  onClose: () => void;
  children: ReactNode;
};

export default function ModalShell({ onClose, children }: ModalShellProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Overlay onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <X size={20} />
        </CloseButton>
        {children}
      </ModalBox>
    </Overlay>
  );
}
