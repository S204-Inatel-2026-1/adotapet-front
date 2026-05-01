'use client';

import { useRouter } from 'next/navigation';

// Tipo Pet atualizado com o campo gender
type Pet = {
  id: number;
  name: string;
  image: string;
  type: 'dog' | 'cat';
  breed: string; 
  age: string;
  gender: 'male' | 'female'; // Novo campo para o sexo
  size: 'small' | 'medium' | 'large';
  location: string;
  tags?: string[]; 
};

export default function PetCard({ pet }: { pet: Pet }) {
  const router = useRouter();

  const handleViewDetails = () => {
    router.push(`/pet/${pet.id}`);
  };

  return (
    <div 
      onClick={handleViewDetails}
      className="bg-white rounded-[40px] overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer group border border-gray-100 flex flex-col h-full"
    >
      {/* Container da Imagem com Badge Flutuante */}
      <div className="relative h-80 w-full overflow-hidden">
        <img
          src={pet.image}
          alt={pet.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute top-6 right-6 bg-[#F4C542] px-4 py-2 rounded-full shadow-md">
          <span className="text-[12px] font-black text-[#2C4A3E] uppercase tracking-widest flex items-center gap-2">
            {pet.type === 'dog' ? '🐶 Cachorro' : '🐱 Gato'}
          </span>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="p-8 flex flex-col flex-grow">
        <div className="mb-4">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-black text-[#2C4A3E] leading-tight">
              {pet.name}
            </h3>
            {/* Exibição do Sexo com Emoji */}
            <span className="text-xl" title={pet.gender === 'male' ? 'Macho' : 'Fêmea'}>
              {pet.gender === 'male' ? '♂️' : '♀️'}
            </span>
          </div>
          
          {/* Formato solicitado: idade - raça */}
          <p className="text-sm font-bold text-gray-400 mt-2">
            {pet.age} — {pet.breed}
          </p>
        </div>
        
        {/* Localização */}
        <div className="flex items-center gap-2 text-gray-400 mb-6">
          <span className="text-lg">📍</span>
          <span className="text-xs font-bold uppercase tracking-tight">{pet.location}</span>
        </div>

        {/* Tags de Temperamento */}
        <div className="flex flex-wrap gap-3 mt-auto">
          {(pet.tags || ['Amigável', 'Brincalhão']).map((tag) => (
            <span 
              key={tag} 
              className="bg-[#E8F0E6] text-[#3A5B4F] text-xs font-black px-5 py-2 rounded-full border border-[#3A5B4F]/5"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}