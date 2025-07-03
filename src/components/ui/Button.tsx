'use client';
import styled from 'styled-components';

const Button = styled.button`
  margin-top: ${({ theme }) => theme.spacing.md};
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  font-weight: 600;
  background-color: ${({ theme }) => theme.colors.highlight};
  color: ${({ theme }) => theme.colors.text};
  border: none;
  border-radius: ${({ theme }) => theme.radius.sm};
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.accent};
  }
`;

export default Button;
