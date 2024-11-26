import React from 'react';
import { ThemeCustomProvider } from './theme-context';
import { ModalProvider } from './modal-context/modal-context';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeCustomProvider>
      <ModalProvider>{children}</ModalProvider>
    </ThemeCustomProvider>
  );
}
