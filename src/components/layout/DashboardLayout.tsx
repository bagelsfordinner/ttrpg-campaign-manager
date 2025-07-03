'use client';

import styled from 'styled-components';
import Sidebar from '../navigation/Sidebar';

const LayoutWrapper = styled.div`
  display: flex;
  height: 100vh;
  background: ${({ theme }) => theme.colors.background};
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
`;

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutWrapper>
      <Sidebar />
      <MainContent>{children}</MainContent>
    </LayoutWrapper>
  );
}