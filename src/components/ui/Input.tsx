'use client';
import styled from 'styled-components';

const Input = styled.input`
  background-color: ${({ theme }) => theme.colors.inputBackground};
  color: ${({ theme }) => theme.colors.text};
  padding: 0.75rem 0.75rem; // EVEN top & bottom
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  width: 100%;
  font-size: 1rem;
  line-height: 1.5;
`;
export default Input;
