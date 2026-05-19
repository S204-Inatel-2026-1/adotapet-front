'use client';

// src/components/layout/PrivateHeader.tsx
// Visual igual à Navbar pública, mas com links e menu privados

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function PrivateHeader() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const navLinks =
    user?.role === 'ong'
      ? [
          { href: '/painel', label: 'Painel' },
          { href: '/painel/pets', label: 'Meus Pets' },
          { href: '/painel/adocoes', label: 'Adoções Recebidas' },
        ]
      : [
          { href: '/dashboard', label: 'Início' },
          { href: '/minhas-adocoes', label: 'Minhas Adoções' },
          { href: '/perfil', label: 'Meu Perfil' },
        ];

  const dropdownLinks =
    user?.role === 'ong'
      ? [
          { href: '/perfil', label: '👤 Meu Perfil' },
          { href: '/painel/organizacao', label: '🏢 Minha Organização' },
          { href: '/faq', label: '❓ Ajuda' },
        ]
      : [
          { href: '/perfil', label: '👤 Meu Perfil' },
          { href: '/minhas-adocoes', label: '🐾 Minhas Adoções' },
          { href: '/faq', label: '❓ Ajuda' },
        ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F9F7F2]/80 backdrop-blur-md border-b border-gray-100">
      <div className="flex items-center justify-between px-8 py-4 max-w-7xl mx-auto">

        {/* Logo — idêntico à Navbar pública */}
        <Link
          href={user?.role === 'ong' ? '/painel' : '/dashboard'}
          className="flex items-center gap-2"
        >
          <div className="bg-[#F4C542] w-10 h-10 flex items-center justify-center rounded-full text-2xl">
            ❤︎
          </div>
          <span className="font-bold text-[#2C4A3E] text-xl tracking-tight">AdotaPET</span>
        </Link>

        {/* Links + perfil — mesmo estilo dos links da Navbar */}
        <div className="hidden md:flex items-center gap-8 text-[#2C4A3E] font-medium text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-black transition-colors"
            >
              {link.label}
            </Link>
          ))}

          {/* Botão de perfil — mesmo estilo do botão "Entrar" */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 text-[#2C4A3E] font-bold border border-[#2C4A3E] px-5 py-2 rounded-full hover:bg-[#2C4A3E] hover:text-white transition-all text-sm shadow-[4px_4px_0px_0px_rgba(44,74,62,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] group"
            >
              <div className="w-5 h-5 rounded-full bg-[#F4C542] flex items-center justify-center text-[#2C4A3E] font-black text-[10px] group-hover:bg-white transition-colors overflow-hidden flex-shrink-0">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  user?.name?.[0]?.toUpperCase() ?? '?'
                )}
              </div>
              <span>{user?.name?.split(' ')[0] ?? 'Conta'}</span>
              <span className={`text-[10px] transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}>▼</span>
            </button>

            {/* Dropdown */}
            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-3 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">
                {/* Cabeçalho do dropdown */}
                <div className="px-5 py-4 border-b border-gray-50 bg-[#F9F7F2]">
                  <p className="font-black text-[#2C4A3E] text-sm">{user?.name ?? 'Usuário'}</p>
                  <p className="text-xs text-gray-400 truncate">{user?.email ?? ''}</p>
                  <span className="text-[10px] font-bold bg-[#E8F0E6] text-[#3A5B4F] px-2 py-0.5 rounded-full mt-1.5 inline-block">
                    {user?.role === 'ong' ? 'ONG / Protetor' : 'Adotante'}
                  </span>
                </div>

                {/* Links do menu */}
                <div className="py-2">
                  {dropdownLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-5 py-3 text-sm font-bold text-[#2C4A3E] hover:bg-[#F9F7F2] transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                {/* Sair */}
                <div className="border-t border-gray-50 py-2">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-5 py-3 text-sm font-bold text-red-500 hover:bg-red-50 transition-colors w-full text-left"
                  >
                    🚪 Sair da conta
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}