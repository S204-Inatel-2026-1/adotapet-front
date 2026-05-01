// src/types/pet.ts

// Definindo o formato que um pet vai ter
// Isso ajuda o TypeScript a saber quais campos existem
// src/types/pet.ts
export type Pet = {
  id: number;
  name: string;
  image: string;
  type: 'dog' | 'cat';
  breed: string; // Adicionado
  gender: 'male' | 'female'; // Adicionado
  age: string;
  size: 'small' | 'medium' | 'large';
  location: string;
  description: string;
  tags?: string[];
};