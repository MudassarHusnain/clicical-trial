import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import './globals.css'
import NavBar from '@/components/navbar/NavBar'
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer, toast } from 'react-toastify';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <NavBar/>
          <ToastContainer/>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}