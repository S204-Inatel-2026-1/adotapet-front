// src/hooks/useFilters.ts
import { useState, useMemo } from 'react';
import { Pet } from '@/types/pet';

// Define quais filtros vamos ter
interface Filters {
  search: string;           // busca por nome
  animalType: 'all' | 'dog' | 'cat';  // tipo de animal
}

export function useFilters(pets: Pet[]) {
  // Estado dos filtros (valores iniciais)
  const [filters, setFilters] = useState<Filters>({
    search: '',
    animalType: 'all',
  });

  // Função para atualizar um filtro específico
  const updateFilter = (key: keyof Filters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // useMemo = recalcula só quando necessário (otimização)
  const filteredPets = useMemo(() => {
    let result = [...pets];

    // Filtro por nome (busca)
    if (filters.search.trim() !== '') {
      result = result.filter(pet =>
        pet.name.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Filtro por tipo (cachorro/gato)
    if (filters.animalType !== 'all') {
      result = result.filter(pet => pet.type === filters.animalType);
    }

    return result;
  }, [pets, filters.search, filters.animalType]);

  return { filters, updateFilter, filteredPets };
}