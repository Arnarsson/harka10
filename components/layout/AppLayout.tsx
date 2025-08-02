'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import Navigation from './Navigation';
import { useLanguage } from '@/lib/language';

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();
  const { isSignedIn, isLoaded } = useAuth();
  const { language, changeLanguage } = useLanguage();

  // Pages that should not show navigation
  const publicPages = [
    '/',
    '/sign-in',
    '/sign-up',
    '/sign-in/sso-callback',
    '/sign-up/sso-callback'
  ];

  const isPublicPage = publicPages.some(page => pathname === page || pathname.startsWith(page));
  const showNavigation = isSignedIn && !isPublicPage;

  // Show loading state while Clerk is loading
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (showNavigation) {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        <Navigation 
          language={language}
          onLanguageChange={changeLanguage}
        />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    );
  }

  // Public pages without navigation
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  );
}