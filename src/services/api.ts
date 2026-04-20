// src/services/api.ts

// Importando o tipo Pet que criamos
import { Pet } from '@/types/pets';

// Por enquanto, vamos usar dados mockados
// Quando a API real estiver pronta, é só substituir
const MOCK_PETS: Pet[] = [
  {
    id: 1,
    name: 'Thor',
    image: 'https://static.casapino.com.br/casapino/2017/02/201702/vira_latacorrendo-86d7fa10.jpg',
    type: 'dog',
    breed: 'Vira-lata (SRD)',
    gender: 'male',
    age: '2 anos',
    size: 'small',
    location: 'Santa Rita do Sapucaí - MG',
    description: 'Muito brincalhão e adora crianças',
    tags: ['Amigável', 'Brincalhão']
  },
  {
    id: 2,
    name: 'Luna',
    image: 'https://blog.polipet.com.br/wp-content/uploads/2023/08/AdobeStock_237421026-445x445.jpeg',
    type: 'cat',
    breed: 'Vira-lata (SRD) Rajada',
    gender: 'female',
    age: '5 anos',
    size: 'medium',
    location: 'Santa Rita do Sapucaí - MG',
    description: 'Muito tranquila e carinhosa',
    tags: ['Calma', 'Carinhosa']
  },
  {
    id: 3,
    name: 'Bob',
    image: 'https://www.pedigree.com.br/sites/g/files/fnmzdf2401/files/2024-06/vira-latas-02.png',
    type: 'dog',
    breed: 'Vira-lata',
    gender: 'male',
    age: '3 anos',
    size: 'medium',
    location: 'Santa Rita do Sapucaí - MG',
    description: 'Muito brincalhão e adora crianças',
    tags: ['Ativo', 'Protetor']
  },
  {
    id: 4,
    name: 'Mia',
    image: 'https://revistaanamaria.com.br/wp-content/uploads/2026/01/gato-srd-felinos-sem-raca-definida-dominam-os-lares-brasileiros-1.jpg',
    type: 'cat',
    breed: 'Vira-lata (SRD)',
    gender: 'female',
    age: '1 ano',
    size: 'medium',
    location: 'Santa Rita do Sapucaí - MG',
    description: 'Muito curiosa e adora brincar',
    tags: ['Curiosa', 'Brincalhona']
  },
  {
    id: 5,
    name: 'Zeus',
    image: 'https://pearsonsaudeanimal.com/wp-content/uploads/2024/06/transly-translation-agency-FI9J0gjJI_8-unsplash-1024x684.jpg',
    type: 'dog',
    breed: 'Vira-lata Preto',
    gender: 'male',
    age: '1 ano',
    size: 'large',
    location: 'Santa Rita do Sapucaí - MG',
    description: 'Energético e adora correr no parque',
    tags: ['Energético', 'Leal']
  },
  {
    id: 6,
    name: 'Mel',
    image: 'https://www.pedigree.com.br/sites/g/files/fnmzdf2401/files/2024-05/dia-do-vira-lata-02_0.jpg',
    type: 'dog',
    breed: 'Vira-lata',
    gender: 'female',
    age: '2 anos',
    size: 'medium',
    location: 'Santa Rita do Sapucaí - MG',
    description: 'Extremamente dócil e companheira',
    tags: ['Dócil', 'Companheira']
  },
  {
    id: 7,
    name: 'Max',
    image: 'https://cdn.shopify.com/s/files/1/0500/8965/6473/files/pexels-arina-krasnikova-7726295_480x480.jpg?v=1663249037',
    type: 'cat',
    breed: 'Vira-lata (SRD)',
    gender: 'male',
    age: '1 ano',
    size: 'medium',
    location: 'Santa Rita do Sapucaí - MG',
    description: 'Carinhoso e muito tranquilo',
    tags: ['Silencioso', 'Independente']
  },
  {
    id: 8,
    name: 'Nina',
    image: 'https://p2.trrsf.com/image/fget/cf/1200/1200/middle/images.terra.com/2025/09/04/2062023514-gatinho-pipo-2024.jpg',
    type: 'cat',
    breed: 'Vira-lata (SRD)',
    gender: 'female',
    age: '3 anos',
    size: 'medium',
    location: 'Santa Rita do Sapucaí - MG',
    description: 'Adora um colo e dormir ao sol',
    tags: ['Carinhosa', 'Preguiçosa']
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