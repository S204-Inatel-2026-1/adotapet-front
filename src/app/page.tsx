// src/app/page.tsx
'use client'; // Porque vamos usar hooks

import { usePets } from '@/hooks/usePets';
import { useFilters } from '@/hooks/useFilters';
import PetCard from '@/components/PetCard';

export default function Home() {
  // Usando nossos hooks
  const { pets, loading, error } = usePets();
  const { filters, updateFilter, filteredPets } = useFilters(pets);

  // Enquanto carrega
  if (loading) {
    return (
      <main className="bg-green-100 min-h-screen p-6">
        <div className="text-center py-20">
          <p className="text-gray-600">Carregando pets...</p>
          <div className="mt-4 animate-pulse flex justify-center">
            <div className="w-10 h-10 bg-green-300 rounded-full"></div>
          </div>
        </div>
      </main>
    );
  }

  // Se deu erro
  if (error) {
    return (
      <main className="bg-green-100 min-h-screen p-6">
        <div className="text-center py-20">
          <p className="text-red-500">Erro: {error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 bg-yellow-400 px-4 py-2 rounded-xl font-semibold"
          >
            Tentar novamente
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-green-100 min-h-screen p-6">
      {/* HERO SECTION */}
      <section className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Encontre seu novo melhor amigo 🐾
        </h1>
        <p className="mt-2 text-gray-600">
          Adote um pet e transforme uma vida — inclusive a sua.
        </p>
        <button className="mt-4 bg-yellow-400 px-6 py-2 rounded-xl font-semibold hover:bg-yellow-500 transition-colors">
          Adotar agora
        </button>
      </section>

      {/* BARRA DE BUSCA */}
      <section className="mb-6 max-w-2xl mx-auto">
        <input
          type="text"
          placeholder="🔍 Buscar pet por nome..."
          value={filters.search}
          onChange={(e) => updateFilter('search', e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
        />
      </section>

      {/* FILTROS */}
      <section className="mb-8 flex justify-center gap-3 flex-wrap">
        <button
          onClick={() => updateFilter('animalType', 'all')}
          className={`px-5 py-2 rounded-full font-medium transition-all ${
            filters.animalType === 'all' 
              ? 'bg-yellow-400 text-gray-800 shadow-md' 
              : 'bg-white text-gray-600 hover:bg-gray-100'
          }`}
        >
          Todos
        </button>
        <button
          onClick={() => updateFilter('animalType', 'dog')}
          className={`px-5 py-2 rounded-full font-medium transition-all ${
            filters.animalType === 'dog' 
              ? 'bg-yellow-400 text-gray-800 shadow-md' 
              : 'bg-white text-gray-600 hover:bg-gray-100'
          }`}
        >
          🐕 Cachorros
        </button>
        <button
          onClick={() => updateFilter('animalType', 'cat')}
          className={`px-5 py-2 rounded-full font-medium transition-all ${
            filters.animalType === 'cat' 
              ? 'bg-yellow-400 text-gray-800 shadow-md' 
              : 'bg-white text-gray-600 hover:bg-gray-100'
          }`}
        >
          🐱 Gatos
        </button>
      </section>

      {/* LISTA DE PETS */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Pets disponíveis
          </h2>
          <p className="text-sm text-gray-500">
            {filteredPets.length} pets encontrados
          </p>
        </div>

        {filteredPets.length === 0 ? (
          <div className="text-center py-20 bg-white/50 rounded-2xl">
            <p className="text-gray-500 text-lg">
              😢 Nenhum pet encontrado com esses filtros
            </p>
            <button 
              onClick={() => {
                updateFilter('search', '');
                updateFilter('animalType', 'all');
              }}
              className="mt-4 text-green-600 hover:text-green-700 underline"
            >
              Limpar filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPets.map((pet) => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}