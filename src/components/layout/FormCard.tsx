'use client';
import styled from 'styled-components';
import Card from '../ui/Card';

const FormCard = styled(Card)`
  width: 100%;
  max-width: 400px;
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.radius.md};

  h2 {
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    text-align: center;
  }
`;

export default FormCard;
