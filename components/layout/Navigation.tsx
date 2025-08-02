'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Home,
  BookOpen,
  Users,
  MessageSquare,
  Bookmark,
  Trophy,
  Settings,
  Globe,
  BrainCircuit,
  Target,
  PlayCircle,
  BarChart3,
  Menu,
  X
} from 'lucide-react';

interface NavigationProps {
  language?: 'en' | 'da';
  onLanguageChange?: (lang: 'en' | 'da') => void;
}

export default function Navigation({ language = 'en', onLanguageChange }: NavigationProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const texts = {
    en: {
      dashboard: 'Dashboard',
      courses: 'Courses',
      team: 'Team',
      aiAssistant: 'AI Assistant',
      notes: 'Notes & Bookmarks',
      certificates: 'Certificates',
      programs: '48-Hour Program',
      analytics: 'Analytics',
      settings: 'Settings',
      language: 'Language',
      english: 'English',
      danish: 'Danish'
    },
    da: {
      dashboard: 'Dashboard',
      courses: 'Kurser',
      team: 'Team',
      aiAssistant: 'AI Assistent',
      notes: 'Noter & Bogmærker',
      certificates: 'Certifikater',
      programs: '48-Timers Program',
      analytics: 'Analyser',
      settings: 'Indstillinger',
      language: 'Sprog',
      english: 'Engelsk',
      danish: 'Dansk'
    }
  };

  const t = texts[language];

  const navigationItems = [
    {
      name: t.dashboard,
      href: '/dashboard',
      icon: Home,
      current: pathname === '/dashboard'
    },
    {
      name: t.courses,
      href: '/courses',
      icon: BookOpen,
      current: pathname.startsWith('/courses'),
      badge: '3 New'
    },
    {
      name: t.programs,
      href: '/programs',
      icon: Target,
      current: pathname.startsWith('/programs'),
      badge: 'Featured'
    },
    {
      name: t.team,
      href: '/team',
      icon: Users,
      current: pathname.startsWith('/team')
    },
    {
      name: t.aiAssistant,
      href: '/ai-assistant',
      icon: BrainCircuit,
      current: pathname.startsWith('/ai-assistant'),
      badge: 'New'
    },
    {
      name: t.notes,
      href: '/notes',
      icon: Bookmark,
      current: pathname.startsWith('/notes')
    },
    {
      name: t.certificates,
      href: '/certificates',
      icon: Trophy,
      current: pathname.startsWith('/certificates')
    },
    {
      name: t.analytics,
      href: '/analytics',
      icon: BarChart3,
      current: pathname.startsWith('/analytics')
    }
  ];

  const NavItem = ({ item }: { item: typeof navigationItems[0] }) => (
    <Link href={item.href}>
      <Button
        variant={item.current ? "default" : "ghost"}
        className={`w-full justify-start gap-3 ${
          item.current 
            ? 'bg-blue-600 text-white hover:bg-blue-700' 
            : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
        }`}
      >
        <item.icon className="w-4 h-4" />
        {item.name}
        {item.badge && (
          <Badge variant="secondary" className="ml-auto text-xs">
            {item.badge}
          </Badge>
        )}
      </Button>
    </Link>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </Button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <BrainCircuit className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-gray-900">HARKA10</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigationItems.map((item) => (
              <NavItem key={item.href} item={item} />
            ))}
          </nav>

          {/* Bottom Section */}
          <div className="p-4 border-t border-gray-200 space-y-4">
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start gap-3">
                  <Globe className="w-4 h-4" />
                  {t.language}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuLabel>{t.language}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={() => onLanguageChange?.('en')}
                  className={language === 'en' ? 'bg-blue-50' : ''}
                >
                  🇺🇸 {t.english}
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => onLanguageChange?.('da')}
                  className={language === 'da' ? 'bg-blue-50' : ''}
                >
                  🇩🇰 {t.danish}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Settings */}
            <Link href="/settings">
              <Button variant="ghost" className="w-full justify-start gap-3">
                <Settings className="w-4 h-4" />
                {t.settings}
              </Button>
            </Link>

            {/* User Profile */}
            <div className="flex items-center gap-3 p-2">
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8"
                  }
                }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  Learning Mode
                </p>
                <p className="text-xs text-gray-500">
                  7 day streak 🔥
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Spacer for Desktop */}
      <div className="hidden lg:block w-64 flex-shrink-0"></div>
    </>
  );
}