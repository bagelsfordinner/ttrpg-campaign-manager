'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { useToast } from '@/lib/ToastContext';

import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import CenteredPage from '@/components/layout/CenteredPage';
import FormCard from '@/components/layout/FormCard';
import ErrorMessage from '@/components/ui/ErrorMessage';
import LinkedText from '@/components/ui/LinkedText';

import { Eye, EyeOff } from 'lucide-react';

import styled from 'styled-components';

const PasswordInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const PasswordField = styled(Input)`
  padding-right: 40px; // space for the icon
`;

const IconWrapper = styled.div`
  position: absolute;
  right: 12px;
  display: flex;
  align-items: center;
  height: 100%;
  cursor: pointer;
`;

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { showToast } = useToast();

  const handleSignUp = async () => {
    setError('');
    const { error } = await supabase.auth.signUp({ email, password });
    if (!error) router.push('/dashboard');
    else showToast(error.message);
  };

  return (
    <CenteredPage>
      <FormCard>
        <h2>Sign Up</h2>
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <label>Email</label>
        <Input type="email" placeholder="you@example.com" onChange={(e) => setEmail(e.target.value)} />

        <label>Password</label>
        <PasswordInputWrapper>
          <PasswordField
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            onChange={(e) => setPassword(e.target.value)}
          />
          <IconWrapper onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </IconWrapper>
        </PasswordInputWrapper>

        <Button onClick={handleSignUp}>Sign Up</Button>

        <p style={{ marginTop: '1rem', textAlign: 'center' }}>
          Have an account? <LinkedText href="/auth/login">Login</LinkedText>
        </p>
      </FormCard>
    </CenteredPage>
  );
}
