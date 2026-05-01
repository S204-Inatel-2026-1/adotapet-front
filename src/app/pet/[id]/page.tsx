// src/app/pet/[id]/page.tsx
'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { api } from '@/services/api';
import { Pet } from '@/types/pets';

export default function PetDetails() {
  // Pega o ID da URL
  const { id } = useParams();
  
  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        setLoading(true);
        const petId = Number(id); // converte string para número
        const data = await api.getPetById(petId);
        setPet(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar pet');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPet();
    }
  }, [id]);

  if (loading) {
    return (
      <main className="bg-green-100 min-h-screen p-6">
        <div className="text-center py-20">
          <p className="text-gray-600">Carregando detalhes...</p>
        </div>
      </main>
    );
  }

  if (error || !pet) {
    return (
      <main className="bg-green-100 min-h-screen p-6">
        <div className="text-center py-20">
          <p className="text-red-500">{error || 'Pet não encontrado'}</p>
          <button 
            onClick={() => window.history.back()}
            className="mt-4 bg-yellow-400 px-4 py-2 rounded-xl"
          >
            Voltar
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-green-100 min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Botão voltar */}
        <button 
          onClick={() => window.history.back()}
          className="mb-6 text-gray-600 hover:text-gray-900 flex items-center gap-2"
        >
          ← Voltar
        </button>

        {/* Card principal */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Imagem */}
          <img
            src={pet.image}
            alt={pet.name}
            className="w-full h-96 object-cover"
          />

          {/* Conteúdo */}
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-3xl font-bold text-gray-800">{pet.name}</h1>
              <span className="bg-yellow-400 px-3 py-1 rounded-full text-sm font-semibold">
                {pet.type === 'dog' ? '🐕 Cachorro' : '🐱 Gato'}
              </span>
            </div>

            {/* Informações em grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-gray-500 text-sm">Idade</p>
                <p className="font-semibold">{pet.age}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Porte</p>
                <p className="font-semibold">
                  {pet.size === 'small' && 'Pequeno'}
                  {pet.size === 'medium' && 'Médio'}
                  {pet.size === 'large' && 'Grande'}
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-gray-500 text-sm">Localização</p>
                <p className="font-semibold">📍 {pet.location}</p>
              </div>
            </div>

            {/* Descrição */}
            {pet.description && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Sobre {pet.name}</h2>
                <p className="text-gray-600 leading-relaxed">{pet.description}</p>
              </div>
            )}

            {/* Botão de adoção */}
            <button className="w-full bg-yellow-400 text-gray-800 font-semibold py-3 rounded-xl hover:bg-yellow-500 transition-colors">
              Solicitar adoção
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}