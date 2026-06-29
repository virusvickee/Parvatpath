'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Mountain, Menu, X, ChevronDown, User, LogOut, LayoutDashboard, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

function Avatar({ name }: { name: string }) {
  const initials = name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2) || 'U';
  return (
    <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold font-heading cursor-pointer transition-all"
      style={{ background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)', boxShadow: '0 0 12px rgba(249,115,22,0.3)' }}>
      {initials}
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [treksOpen, setTreksOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const navLinks = [
    { name: 'Tours', href: '/tours' },
    { name: 'Char Dham', href: '/char-dham' },
    { name: 'Blog', href: '/blogs' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const trekItems = [
    { name: 'All Treks', href: '/treks' },
    { name: 'Uttarakhand', href: '/treks?region=Uttarakhand' },
    { name: 'Himachal Pradesh', href: '/treks?region=Himachal+Pradesh' },
    { name: 'Kashmir', href: '/treks?region=Kashmir' },
    { name: 'Easy Treks', href: '/treks?difficulty=Easy' },
    { name: 'Moderate Treks', href: '/treks?difficulty=Moderate' },
    { name: 'Difficult Treks', href: '/treks?difficulty=Difficult' },
  ];

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 w-full z-50 transition-all duration-400',
          scrolled
            ? 'py-3 px-6 md:px-10'
            : 'py-5 px-6 md:px-10 bg-transparent'
        )}
        style={scrolled ? {
          background: 'rgba(10,15,13,0.95)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(42,63,45,0.5)',
          boxShadow: '0 4px 32px rgba(0,0,0,0.4)',
        } : {}}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all group-hover:shadow-glow-accent"
              style={{ background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)' }}
            >
              <Mountain className="w-5 h-5 text-white" />
            </div>
            <span className="font-heading font-bold text-xl tracking-wide text-text-primary">
              Parvatpath
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-7">
            {/* Treks Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setTreksOpen(true)}
              onMouseLeave={() => setTreksOpen(false)}
            >
              <button
                className={cn(
                  'flex items-center gap-1 font-body text-sm font-medium transition-colors py-2',
                  pathname?.startsWith('/treks') ? 'text-accent' : 'text-text-secondary hover:text-text-primary'
                )}
              >
                Treks
                <ChevronDown className={cn('w-3.5 h-3.5 transition-transform', treksOpen && 'rotate-180')} />
              </button>

              {treksOpen && (
                <div
                  className="absolute top-full left-0 w-56 rounded-xl p-2 z-50 flex flex-col gap-0.5"
                  style={{
                    background: 'rgba(17,26,20,0.97)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid #2A3F2D',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                    marginTop: '8px',
                  }}
                >
                  {/* Top accent */}
                  <div className="h-px mb-1" style={{ background: 'linear-gradient(90deg, #F97316, transparent)' }} />
                  {trekItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setTreksOpen(false)}
                      className="px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-hover rounded-lg transition-all font-body"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  'font-body text-sm font-medium transition-colors',
                  pathname === link.href ? 'text-accent' : 'text-text-secondary hover:text-text-primary'
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA / User */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div
                className="relative"
                onMouseEnter={() => setUserOpen(true)}
                onMouseLeave={() => setUserOpen(false)}
              >
                <div className="flex items-center gap-2 cursor-pointer">
                  <span className="text-sm font-body text-text-secondary hidden lg:block">
                    Hi, {user.name?.split(' ')[0]}
                  </span>
                  <Avatar name={user.name} />
                </div>

                {userOpen && (
                  <div
                    className="absolute top-full right-0 w-52 rounded-xl p-2 z-50 flex flex-col gap-0.5"
                    style={{
                      background: 'rgba(17,26,20,0.97)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid #2A3F2D',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                      marginTop: '8px',
                    }}
                  >
                    <div className="px-3 py-2 border-b mb-1" style={{ borderColor: '#1E2E20' }}>
                      <p className="text-text-primary text-sm font-semibold font-sub truncate">{user.name}</p>
                      <p className="text-text-muted text-xs font-body truncate">{user.email || ''}</p>
                    </div>
                    <Link href="/dashboard" onClick={() => setUserOpen(false)} className="px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-hover rounded-lg transition-all font-body flex items-center gap-2">
                      <LayoutDashboard className="w-3.5 h-3.5 text-accent" /> Dashboard
                    </Link>
                    <Link href="/dashboard/bookings" onClick={() => setUserOpen(false)} className="px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-hover rounded-lg transition-all font-body flex items-center gap-2">
                      <BookOpen className="w-3.5 h-3.5 text-accent" /> My Bookings
                    </Link>
                    <button
                      onClick={() => { setUserOpen(false); logout(); }}
                      className="w-full text-left px-3 py-2 text-sm text-danger hover:bg-red-900/10 rounded-lg transition-all font-body flex items-center gap-2"
                    >
                      <LogOut className="w-3.5 h-3.5" /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-text-secondary hover:text-text-primary font-body text-sm font-medium transition-colors flex items-center gap-1.5"
                >
                  <User className="w-4 h-4" /> Login
                </Link>
                <Link
                  href="/treks"
                  className="btn-accent text-white px-5 py-2.5 rounded-full font-sub text-sm font-bold"
                >
                  Book Now
                </Link>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-text-primary p-2 rounded-lg transition-colors"
            style={{ background: mobileOpen ? 'rgba(42,63,45,0.5)' : 'transparent' }}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={cn(
          'fixed inset-0 z-40 md:hidden transition-all duration-300',
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        style={{
          background: 'rgba(10,15,13,0.98)',
          backdropFilter: 'blur(20px)',
          paddingTop: '80px',
        }}
      >
        <div className="flex flex-col h-full overflow-y-auto p-6">
          {/* Trek links */}
          <div className="mb-6">
            <span className="text-text-muted text-[10px] uppercase tracking-widest font-sub font-semibold mb-3 block">Treks</span>
            <div className="grid grid-cols-2 gap-2">
              {trekItems.slice(0, 4).map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-text-secondary hover:text-accent text-sm font-body py-1.5 transition-colors"
                >
                  → {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="h-px mb-6" style={{ background: '#1E2E20' }} />

          {/* Main links */}
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  'text-xl font-heading font-semibold py-3 border-b transition-colors',
                  pathname === link.href ? 'text-accent' : 'text-text-primary hover:text-accent',
                )}
                style={{ borderColor: '#1E2E20' }}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="mt-auto pt-8 flex flex-col gap-3">
            {user ? (
              <>
                <div className="flex items-center gap-3 mb-4">
                  <Avatar name={user.name} />
                  <div>
                    <p className="text-text-primary font-semibold font-sub text-sm">{user.name}</p>
                    <p className="text-text-muted text-xs font-body">{user.email || ''}</p>
                  </div>
                </div>
                <Link href="/dashboard" className="text-center py-3 rounded-full font-sub text-sm font-bold border text-text-primary" style={{ borderColor: '#2A3F2D' }}>
                  Dashboard
                </Link>
                <button onClick={() => { logout(); }} className="text-center py-3 rounded-full font-sub text-sm font-bold text-danger border border-red-900/30">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-center py-3.5 rounded-full font-sub text-sm font-bold border text-text-primary" style={{ borderColor: '#2A3F2D' }}>
                  Login
                </Link>
                <Link href="/treks" className="btn-accent text-white text-center py-3.5 rounded-full font-sub text-sm font-bold">
                  Book Now
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
