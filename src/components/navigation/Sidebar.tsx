// src/components/navigation/Sidebar.tsx
'use client';

import styled from 'styled-components';
import LinkedText from '@/components/ui/LinkedText';
import { useRouter } from 'next/navigation';

const SidebarWrapper = styled.nav`
  width: 240px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
  padding: 2rem 1rem;
  gap: 1.5rem;
`;

const NavSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const NavLink = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  cursor: pointer;
  text-align: left;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

export default function Sidebar() {
  const router = useRouter();

  return (
    <SidebarWrapper>
      <h3 style={{ marginBottom: '1rem' }}>RealmForge</h3>
      <NavSection>
        <NavLink onClick={() => router.push('/dashboard')}>Dashboard</NavLink>
        <NavLink onClick={() => router.push('/settings')}>Settings</NavLink>
        <NavLink onClick={() => router.push('/profile')}>Profile</NavLink>
      </NavSection>
    </SidebarWrapper>
  );
}
