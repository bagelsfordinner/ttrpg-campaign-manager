'use client';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import StyledComponentsRegistry from '@/lib/registry';
import { AuthProvider } from '@/lib/AuthContext';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/theme';
import GlobalStyle from '@/styles/GlobalStyle';
import { ToastProvider } from '@/lib/ToastContext';

export default function Providers({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <StyledComponentsRegistry>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <ToastProvider>
            <AnimatePresence mode="wait">
              <motion.div
                key={pathname}
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </ToastProvider>
        </ThemeProvider>
      </AuthProvider>
    </StyledComponentsRegistry>
  );
}
