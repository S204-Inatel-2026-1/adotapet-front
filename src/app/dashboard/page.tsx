'use client';

// src/app/dashboard/page.tsx
// Dashboard do Adotante — feed de pets recomendados

import { usePets } from '@/hooks/usePets';
import { useFilters } from '@/hooks/useFilters';
import { useAuth } from '@/contexts/AuthContext';
import PrivateHeader from '@/components/layout/PrivateHeader';
import PetCard from '@/components/pets/PetCard';

export default function DashboardPage() {
  const { user } = useAuth();
  const { pets, loading } = usePets();
  const { filters, updateFilter, filteredPets } = useFilters(pets);

  return (
    <main className="bg-[#F9F7F2] min-h-screen font-sans">
      <PrivateHeader />
      <div className="h-20" />

      <div className="max-w-7xl mx-auto px-8 py-12">

        {/* Boas-vindas */}
        <div className="mb-10">
          <h1 className="text-4xl font-black text-[#2C4A3E] mb-2">
            Olá, {user?.name?.split(' ')[0] ?? 'Adotante'}! 👋
          </h1>
          <p className="text-gray-500">Encontre seu próximo melhor amigo entre os pets disponíveis.</p>
        </div>

        {/* Cards de ação rápida */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {[
            { icon: '🐾', label: 'Minhas Adoções', href: '/minhas-adocoes', color: 'bg-[#E8F0E6]' },
            { icon: '👤', label: 'Meu Perfil', href: '/perfil', color: 'bg-[#FEF9E7]' },
            { icon: '❓', label: 'Preciso de ajuda', href: '/faq', color: 'bg-white' },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`${item.color} p-6 rounded-[24px] border border-gray-100 flex items-center gap-4 hover:shadow-md transition-all font-bold text-[#2C4A3E]`}
            >
              <span className="text-3xl">{item.icon}</span>
              {item.label}
            </a>
          ))}
        </div>

        {/* Filtros rápidos */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#2C4A3E]">Pets disponíveis</h2>
            <p className="text-gray-400 text-sm">{filteredPets.length} pets encontrados</p>
          </div>

          <div className="flex gap-3 flex-wrap">
            {[
              { id: 'all', label: 'Todos' },
              { id: 'dog', label: '🐶 Cães' },
              { id: 'cat', label: '🐱 Gatos' },
            ].map((type) => (
              <button
                key={type.id}
                onClick={() => updateFilter('animalType', type.id)}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  filters.animalType === type.id
                    ? 'bg-[#3A5B4F] text-white shadow-lg'
                    : 'bg-white text-[#2C4A3E] border border-gray-100 hover:border-[#3A5B4F]'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de pets */}
        {loading ? (
          <div className="text-center py-20">
            <div className="w-12 h-12 border-4 border-[#F4C542] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-[#2C4A3E] font-medium">Carregando pets...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPets.map((pet) => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}