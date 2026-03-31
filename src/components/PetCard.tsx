// src/components/PetCard.tsx
'use client'; // Importante para usar o router

import { useRouter } from 'next/navigation';

// Atualizando o tipo Pet para ter mais informações
type Pet = {
  id: number;
  name: string;
  image: string;
  type: 'dog' | 'cat';
  age: string;
  size: 'small' | 'medium' | 'large';
  location: string;
  description?: string;
};

export default function PetCard({ pet }: { pet: Pet }) {
  const router = useRouter();

  const handleViewDetails = () => {
    // Navega para a página de detalhes
    router.push(`/pet/${pet.id}`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* Imagem */}
      <img
        src={pet.image}
        alt={pet.name}
        className="w-full h-48 object-cover"
      />

      {/* Conteúdo */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-semibold">{pet.name}</h2>
          {/* Badge de tipo */}
          <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
            {pet.type === 'dog' ? '🐕' : '🐱'}
          </span>
        </div>
        
        {/* Idade */}
        <p className="text-gray-600 text-sm">{pet.age}</p>
        
        {/* Localização */}
        <p className="text-gray-500 text-xs mt-1">📍 {pet.location}</p>

        {/* Botão */}
        <button 
          onClick={handleViewDetails}
          className="mt-3 w-full bg-green-500 text-white py-2 rounded-xl hover:bg-green-600 transition-colors"
        >
          Ver detalhes
        </button>
      </div>
    </div>
  );
}