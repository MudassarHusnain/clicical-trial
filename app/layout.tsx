'use client'
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs';
import './globals.css';
import NavBar from '@/components/navbar/NavBar';
import "react-toastify/dist/ReactToastify.css";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import { useState } from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Create a query client to manage queries across the app
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ClerkProvider>
      <QueryClientProvider client={queryClient}>
        <html lang="en">
          <body>
            <NavBar />
            <ToastContainer />
            {children}
          </body>
        </html>
      </QueryClientProvider>
    </ClerkProvider>
  );
}
