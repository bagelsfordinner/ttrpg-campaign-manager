'use client';
import styled from 'styled-components';

const ErrorMessage = styled.div`
  background-color: ${({ theme }) => theme.colors.error}22;
  border: 1px solid ${({ theme }) => theme.colors.error};
  color: ${({ theme }) => theme.colors.error};
  padding: 0.75rem;
  margin-bottom: 1rem;
  border-radius: ${({ theme }) => theme.radius.sm};
  font-size: 0.9rem;
`;

export default ErrorMessage;
