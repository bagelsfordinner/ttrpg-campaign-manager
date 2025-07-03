// src/components/campaigns/CampaignCard.tsx
'use client';

import styled from 'styled-components';
import { useRouter } from 'next/navigation';

const Card = styled.div`
  background: ${({ theme }) => theme.colors.rust};
  border-radius: ${({ theme }) => theme.radius.sm};
  padding: 1.25rem;
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    background: ${({ theme }) => theme.colors.surfaceContrast};
  }
`;

type CampaignCardProps = {
  id: string;
  title: string;
  system: string;
  description: string;
};

export default function CampaignCard({ id, title, system, description }: CampaignCardProps) {
  const router = useRouter();

  return (
    <Card onClick={() => router.push(`/campaigns/${id}`)}>
      <h3>{title}</h3>
      <p style={{ color: '#8E9A96', fontSize: '0.9rem' }}>{system}</p>
      <p style={{ fontSize: '0.95rem' }}>{description}</p>
    </Card>
  );
}
