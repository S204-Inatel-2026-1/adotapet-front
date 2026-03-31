// src/services/api.ts

// Importando o tipo Pet que criamos
import { Pet } from '@/types/pet';

// Por enquanto, vamos usar dados mockados
// Quando a API real estiver pronta, é só substituir
const MOCK_PETS: Pet[] = [
  {
    id: 1,
    name: 'Rex',
    image: 'https://images.dog.ceo/breeds/sheepdog-english/n02105641_1234.jpg',
    type: 'dog',
    age: '2 anos',
    size: 'medium',
    location: 'São Paulo, SP',
    description: 'Muito brincalhão e adora crianças'
  },
  {
    id: 2,
    name: 'Mimi',
    image: 'https://cdn2.thecatapi.com/images/9j5.jpg',
    type: 'cat',
    age: '1 ano',
    size: 'small',
    location: 'Rio de Janeiro, RJ',
    description: 'Carinhosa e tranquila'
  },
  {
    id: 3,
    name: 'Luna',
    image: 'https://images.dog.ceo/breeds/husky/n02110185_100.jpg',
    type: 'dog',
    age: '3 anos',
    size: 'large',
    location: 'Belo Horizonte, MG',
    description: 'Energética e leal'
  }
];

// Nosso serviço de API
export const api = {
  // Busca todos os pets
  getPets: async (): Promise<Pet[]> => {
    // Simula um delay de rede (como se estivesse carregando)
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Retorna os dados mockados
    return MOCK_PETS;
    
    // 🔜 QUANDO A API ESTIVER PRONTA, SUBSTITUA POR:
    // const response = await fetch('http://localhost:3000/api/pets');
    // return response.json();
  },

  // Busca um pet específico pelo ID
  getPetById: async (id: number): Promise<Pet> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const pet = MOCK_PETS.find(p => p.id === id);
    if (!pet) throw new Error('Pet não encontrado');
    return pet;
    
    // 🔜 QUANDO A API ESTIVER PRONTA:
    // const response = await fetch(`http://localhost:3000/api/pets/${id}`);
    // return response.json();
  }
};