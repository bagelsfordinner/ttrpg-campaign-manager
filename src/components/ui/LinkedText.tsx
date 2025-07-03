'use client';
import styled from 'styled-components';
import Link from 'next/link';

const LinkedText = styled(Link)`
  color: ${({ theme }) => theme.colors.rustLight};
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    text-decoration: underline;
  }

  &:visited {
    color: ${({ theme }) => theme.colors.rust}; // dark rust stays on visit
  }
`;

export default LinkedText;
