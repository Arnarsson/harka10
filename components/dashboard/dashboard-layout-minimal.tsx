"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useUser, useClerk } from "@clerk/nextjs"
import {
  LayoutDashboard,
  BookOpen,
  Zap,
  GraduationCap,
  Target,
  BarChart3,
  MessageSquare,
  FileText,
  Award,
  Wrench,
  Shield,
  Moon,
  Sun,
} from "lucide-react"
import { useTheme } from "next-themes"

// Matches the HEKLA brandbook sidebar exactly
const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Learn", href: "/learn/courses", icon: BookOpen },
  { name: "Analytics", href: "/learn/analytics", icon: BarChart3 },
  { name: "Toolkit", href: "/toolkit", icon: Wrench },
  { name: "Resources", href: "/learn/resources", icon: FileText },
  { name: "Certificates", href: "/learn/certificates", icon: Award },
  { name: "Power Hours", href: "/community/power-hour", icon: Zap },
]

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayoutMinimal({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false)
  const avatarRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const { user, isLoaded } = useUser()
  const { signOut } = useClerk()
  const { theme, setTheme } = useTheme()

  const isAdmin = user?.publicMetadata?.role === "admin"

  const navItems = isAdmin
    ? [...navigation, { name: "Admin", href: "/admin", icon: Shield }]
    : navigation

  // Close avatar menu on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (avatarRef.current && !avatarRef.current.contains(e.target as Node)) {
        setAvatarMenuOpen(false)
      }
    }
    if (avatarMenuOpen) document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [avatarMenuOpen])

  const userInitial =
    user?.firstName?.[0]?.toUpperCase() ||
    user?.fullName?.[0]?.toUpperCase() ||
    "U"

  const userName = user?.firstName || user?.fullName || "User"

  return (
    <div style={{ minHeight: "100vh", background: "var(--paper)" }}>
      {/* ── TOPBAR ─────────────────────────────────────────────────────── */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 60,
          height: 60,
          width: "100%",
          background: "rgba(245,245,243,0.92)",
          backdropFilter: "blur(8px)",
          borderBottom: "1px solid var(--black)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
          boxSizing: "border-box",
        }}
      >
        {/* LEFT: hamburger (mobile) + brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {/* Hamburger — mobile only */}
          <button
            aria-label="Open sidebar"
            onClick={() => setSidebarOpen(true)}
            style={{
              display: "none",
              width: 30,
              height: 30,
              border: "1px solid var(--black)",
              background: "transparent",
              cursor: "pointer",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 5,
              padding: 0,
              flexShrink: 0,
            }}
            className="hekla-hamburger"
          >
            <span style={{ display: "block", width: 16, height: 1.5, background: "var(--black)" }} />
            <span style={{ display: "block", width: 16, height: 1.5, background: "var(--black)" }} />
            <span style={{ display: "block", width: 16, height: 1.5, background: "var(--black)" }} />
          </button>

          {/* Brand */}
          <Link
            href="/dashboard"
            style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}
          >
            {/* Violet square with H */}
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 30,
                height: 30,
                background: "var(--violet)",
                flexShrink: 0,
              }}
            >
              <span
                className="mark"
                style={{ fontSize: 17, color: "#fff", lineHeight: 1 }}
              >
                H
              </span>
            </span>
            <span
              className="mark"
              style={{ fontSize: 19, color: "var(--black)", letterSpacing: "0.04em" }}
            >
              HEKLA
            </span>
          </Link>
        </div>

        {/* RIGHT: avatar (brandbook is light-only — no theme toggle) */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {/* Avatar + dropdown */}
          <div ref={avatarRef} style={{ position: "relative" }}>
            <button
              onClick={() => setAvatarMenuOpen((v) => !v)}
              aria-label="User menu"
              style={{
                width: 30,
                height: 30,
                background: "var(--black)",
                color: "var(--paper)",
                border: "none",
                cursor: "pointer",
                fontSize: 12,
                fontWeight: 700,
                fontFamily: "Inter, sans-serif",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {userInitial}
            </button>

            {avatarMenuOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 6px)",
                  right: 0,
                  background: "var(--white)",
                  border: "1px solid var(--black)",
                  minWidth: 160,
                  zIndex: 100,
                  fontFamily: "Inter, sans-serif",
                }}
              >
                <Link
                  href="/settings"
                  onClick={() => setAvatarMenuOpen(false)}
                  style={{
                    display: "block",
                    padding: "10px 16px",
                    fontSize: 12,
                    fontWeight: 600,
                    color: "var(--black)",
                    textDecoration: "none",
                    letterSpacing: "0.02em",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.background = "var(--smoke)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.background = "transparent")
                  }
                >
                  Settings
                </Link>

                {isAdmin && (
                  <Link
                    href="/admin"
                    onClick={() => setAvatarMenuOpen(false)}
                    style={{
                      display: "block",
                      padding: "10px 16px",
                      fontSize: 12,
                      fontWeight: 600,
                      color: "var(--black)",
                      textDecoration: "none",
                      letterSpacing: "0.02em",
                    }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.background = "var(--smoke)")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.background = "transparent")
                    }
                  >
                    Admin
                  </Link>
                )}

                <div style={{ borderTop: "1px solid var(--smoke)" }} />

                <button
                  onClick={() => { setAvatarMenuOpen(false); signOut() }}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    padding: "10px 16px",
                    fontSize: 12,
                    fontWeight: 600,
                    color: "var(--black)",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    letterSpacing: "0.02em",
                    fontFamily: "Inter, sans-serif",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.background = "var(--smoke)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.background = "transparent")
                  }
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ── BODY GRID ──────────────────────────────────────────────────── */}
      <div className="hekla-body-grid">
        {/* ── SIDEBAR ──────────────────────────────────────────────────── */}
        <>
          {/* Mobile backdrop */}
          {sidebarOpen && (
            <div
              onClick={() => setSidebarOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 54,
                background: "rgba(0,0,0,0.2)",
              }}
            />
          )}

          <aside
            className={`hekla-sidebar${sidebarOpen ? " hekla-sidebar--open" : ""}`}
            style={{
              background: "var(--paper)",
              borderRight: "1px solid var(--black)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "22px 0",
            }}
          >
            {/* Nav */}
            <nav>
              {navItems.map((item) => {
                const isActive =
                  pathname === item.href || pathname.startsWith(item.href + "/")
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "11px 24px",
                      fontWeight: 600,
                      fontSize: 13,
                      fontFamily: "Inter, sans-serif",
                      textDecoration: "none",
                      color: isActive ? "var(--black)" : "var(--ash)",
                      borderLeft: isActive
                        ? "3px solid var(--violet)"
                        : "3px solid transparent",
                      background: isActive ? "var(--white)" : "transparent",
                      transition: "color 0.1s",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive)
                        (e.currentTarget as HTMLElement).style.color = "var(--black)"
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive)
                        (e.currentTarget as HTMLElement).style.color = "var(--ash)"
                    }}
                  >
                    <item.icon size={15} color="currentColor" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </nav>

            {/* Me box */}
            <div
              style={{
                margin: "0 16px",
                border: "1px solid var(--smoke)",
                padding: 12,
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              {/* Mini avatar */}
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 28,
                  height: 28,
                  background: "var(--black)",
                  color: "var(--paper)",
                  fontSize: 11,
                  fontWeight: 700,
                  fontFamily: "Inter, sans-serif",
                  flexShrink: 0,
                }}
              >
                {userInitial}
              </span>
              <div style={{ minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "var(--black)",
                    fontFamily: "Inter, sans-serif",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {userName}
                </div>
                <Link
                  href="/settings"
                  style={{
                    fontSize: 11,
                    color: "var(--ash)",
                    textDecoration: "none",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  View profile →
                </Link>
              </div>
            </div>
          </aside>
        </>

        {/* ── MAIN ─────────────────────────────────────────────────────── */}
        <main style={{ minWidth: 0 }}>{children}</main>
      </div>

      {/* ── Layout styles ─────────────────────────────────────────────── */}
      <style>{`
        /* Body grid: sidebar + main */
        .hekla-body-grid {
          display: grid;
          grid-template-columns: 248px 1fr;
        }

        /* Sidebar: sticky on desktop */
        .hekla-sidebar {
          position: sticky;
          top: 60px;
          align-self: start;
          height: calc(100vh - 60px);
          overflow-y: auto;
        }

        /* Mobile: fixed drawer */
        @media (max-width: 1023px) {
          .hekla-body-grid {
            grid-template-columns: 1fr;
          }

          .hekla-sidebar {
            position: fixed;
            top: 60px;
            left: 0;
            width: 240px;
            height: calc(100vh - 60px);
            z-index: 55;
            transform: translateX(-100%);
            transition: transform 0.22s ease;
          }

          .hekla-sidebar--open {
            transform: translateX(0);
          }

          .hekla-hamburger {
            display: flex !important;
          }
        }
      `}</style>
    </div>
  )
}
