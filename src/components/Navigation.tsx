'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Stream' },
  { href: '/essays', label: 'Essays' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="glass-strong mx-4 mt-4 px-6 py-3 flex items-center justify-between rounded-2xl">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-xs font-bold text-white group-hover:shadow-lg group-hover:shadow-cyan-500/20 transition-shadow">
            M
          </div>
          <span className="text-sm font-semibold tracking-wide" style={{ color: 'var(--text-primary)' }}>
            METAVERSAL<span className="text-cyan-400">.SPACE</span>
          </span>
        </Link>

        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-white/10 text-cyan-400 glow-cyan'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
