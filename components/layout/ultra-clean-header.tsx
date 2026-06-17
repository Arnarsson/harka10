"use client"

import Link from "next/link"
import { useUser, UserButton, SignInButton, SignUpButton } from "@clerk/nextjs"
import { Menu, X, ChevronDown } from "lucide-react"
import { useState, useEffect } from "react"
import { useLanguage } from "@/lib/i18n/language-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

export function UltraCleanHeader() {
  const { isSignedIn, user } = useUser()
  const { language, setLanguage } = useLanguage()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  const isAdmin = user?.publicMetadata?.role === 'admin'
  const isTeacher = user?.publicMetadata?.role === 'teacher' || isAdmin

  // Ensure client-side only for language toggle
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLanguageToggle = () => {
    setLanguage(language === 'da' ? 'en' : 'da')
  }

  // User initial for avatar
  const userInitial = user?.firstName?.[0] ?? user?.emailAddresses?.[0]?.emailAddress?.[0]?.toUpperCase() ?? '?'

  const guestNavItems = [
    { href: '/demo/interactive-learning', label: 'Demo' },
    { href: '/toolkit', label: 'Resources' },
    { href: '#pricing', label: 'Pricing' },
  ]

  const authenticatedNavItems = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/learn/courses', label: 'Learn' },
    { href: '/community/power-hour', label: 'Community' },
  ]

  const navItems = isSignedIn ? authenticatedNavItems : guestNavItems

  // Nav link style: 600 weight, 11px, uppercase, ash → black on hover/active
  const navLinkStyle: React.CSSProperties = {
    fontWeight: 600,
    fontSize: 11,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'var(--ash)',
    textDecoration: 'none',
    transition: 'color 0.15s',
  }

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        width: '100%',
        height: 60,
        background: 'rgba(245,245,243,0.92)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        borderBottom: '1px solid var(--black)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        boxSizing: 'border-box',
      }}
    >
      {/* Brand */}
      <Link
        href="/"
        style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}
      >
        {/* Violet tile — flat square, no border-radius */}
        <span
          style={{
            width: 30,
            height: 30,
            background: 'var(--violet)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <span
            className="mark"
            style={{ fontSize: 17, color: 'white', lineHeight: 1 }}
          >
            H
          </span>
        </span>
        {/* Wordmark */}
        <span
          className="mark"
          style={{ fontSize: 19, color: 'var(--black)' }}
        >
          HEKLA
        </span>
      </Link>

      {/* Center navigation — desktop */}
      <nav
        style={{ display: 'flex', alignItems: 'center', gap: 32 }}
        className="hidden-mobile"
      >
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            style={navLinkStyle}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--black)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--ash)')}
          >
            {item.label}
          </Link>
        ))}

        {/* More dropdown — authenticated only */}
        {isSignedIn && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                style={{ ...navLinkStyle, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, padding: 0 }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--black)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--ash)')}
              >
                More
                <ChevronDown style={{ width: 12, height: 12 }} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              style={{
                background: 'var(--paper)',
                border: '1px solid var(--black)',
                borderRadius: 0,
                minWidth: 180,
              }}
            >
              <DropdownMenuItem asChild>
                <Link href="/learn/ai-kompas" className="cursor-pointer">AI Compass</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/analytics" className="cursor-pointer">Analytics</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/learn/resources" className="cursor-pointer">Resources</Link>
              </DropdownMenuItem>

              {(isTeacher || isAdmin) && (
                <>
                  <DropdownMenuSeparator />
                  {isTeacher && (
                    <DropdownMenuItem asChild>
                      <Link href="/teach/dashboard" className="cursor-pointer">Teaching Portal</Link>
                    </DropdownMenuItem>
                  )}
                  {isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin/dashboard" className="cursor-pointer">Admin Panel</Link>
                    </DropdownMenuItem>
                  )}
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </nav>

      {/* Right section — desktop */}
      <div
        style={{ display: 'flex', alignItems: 'center', gap: 20 }}
        className="hidden-mobile"
      >
        {/* Language toggle: "EN →" or "DA →", ash uppercase */}
        {mounted && (
          <button
            onClick={handleLanguageToggle}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: 11,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--ash)',
              padding: 0,
              transition: 'color 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--black)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--ash)')}
          >
            {language === 'da' ? 'EN →' : 'DA →'}
          </button>
        )}

        {isSignedIn ? (
          /* Avatar: 30×30 black square, paper text, user initial */
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: {
                    width: 30,
                    height: 30,
                    borderRadius: 0,
                    background: 'var(--black)',
                    color: 'var(--paper)',
                  },
                },
              }}
            />
          </div>
        ) : (
          <>
            {/* Sign In — plain ash uppercase link */}
            <SignInButton mode="modal">
              <button
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: 11,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--ash)',
                  padding: 0,
                  transition: 'color 0.15s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--black)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--ash)')}
              >
                Sign In
              </button>
            </SignInButton>
            {/* Get Started — btn btn--primary btn--sm */}
            <SignUpButton mode="modal">
              <button className="btn btn--primary btn--sm">
                Get Started
              </button>
            </SignUpButton>
          </>
        )}
      </div>

      {/* Mobile hamburger */}
      <button
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: 'var(--black)',
          padding: 4,
          display: 'none',
        }}
        className="show-mobile"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? <X style={{ width: 20, height: 20 }} /> : <Menu style={{ width: 20, height: 20 }} />}
      </button>

      {/* Mobile nav — rendered below the bar via a portal-like wrapper */}
      {mounted && mobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: 60,
            left: 0,
            right: 0,
            background: 'var(--paper)',
            borderBottom: '1px solid var(--black)',
            padding: '16px 24px 24px',
            zIndex: 49,
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={navLinkStyle}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}

          {isSignedIn && (
            <>
              <div style={{ borderTop: '1px solid var(--black)', paddingTop: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <Link
                  href="/learn/ai-kompas"
                  style={navLinkStyle}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  AI Compass
                </Link>
                <Link
                  href="/analytics"
                  style={navLinkStyle}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Analytics
                </Link>
              </div>
            </>
          )}

          <div style={{ borderTop: '1px solid var(--black)', paddingTop: 12, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {mounted && (
              <button
                onClick={handleLanguageToggle}
                style={{
                  ...navLinkStyle,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  padding: 0,
                }}
              >
                {language === 'da' ? 'EN →' : 'DA →'}
              </button>
            )}

            {isSignedIn ? (
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: {
                      width: 30,
                      height: 30,
                      borderRadius: 0,
                    },
                  },
                }}
              />
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <SignInButton mode="modal">
                  <button
                    style={{
                      ...navLinkStyle,
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      padding: 0,
                    }}
                  >
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="btn btn--primary btn--sm" style={{ alignSelf: 'flex-start' }}>
                    Get Started
                  </button>
                </SignUpButton>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Inline responsive helpers — avoids adding a global CSS file */}
      <style>{`
        @media (min-width: 768px) {
          .hidden-mobile { display: flex !important; }
          .show-mobile { display: none !important; }
        }
        @media (max-width: 767px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: block !important; }
        }
      `}</style>
    </header>
  )
}
