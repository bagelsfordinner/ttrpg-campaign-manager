// app/layout.tsx
import { ReactNode } from 'react';
import Providers from '@/components/Providers';

export const metadata = {
  title: 'Hierloom',
  description: 'TTRPG Campaign Manager',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
