'use client';
import styled from 'styled-components';

const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.cardBackground};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  color: ${({ theme }) => theme.colors.text};
`;

export default Card;
