'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import Toast from '@/components/ui/Toast';

type ToastContextType = {
  showToast: (message: string) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used inside ToastProvider');
  return context;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState('');

  const showToast = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
        {typeof window !== 'undefined' && message &&
        ReactDOM.createPortal(
            <div style={{ position: 'fixed', top: '24px', right: '24px', zIndex: 9999 }}>
            <Toast message={message} />
            </div>,
            document.body
        )
        }
    </ToastContext.Provider>
  );
}
