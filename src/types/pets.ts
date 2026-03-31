// src/types/pet.ts

// Definindo o formato que um pet vai ter
// Isso ajuda o TypeScript a saber quais campos existem
export interface Pet {
  id: number;
  name: string;
  image: string;
  type: 'dog' | 'cat';      // só pode ser 'dog' ou 'cat'
  age: string;
  size: 'small' | 'medium' | 'large';
  location: string;
  description?: string;      // o ? significa que é opcional
}