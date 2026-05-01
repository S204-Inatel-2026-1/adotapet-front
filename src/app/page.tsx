'use client';

import { usePets } from '@/hooks/usePets';
import { useFilters } from '@/hooks/useFilters';
import PetCard from '@/components/PetCard';
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const { pets, loading, error } = usePets();
  const { filters, updateFilter, filteredPets } = useFilters(pets);
  const [socialMessage, setSocialMessage] = useState<string | null>(null);

  // Função para mostrar card temporário de redes sociais
  const showComingSoon = (platform: string) => {
    setSocialMessage(`📢 Estamos criando nossa conta no ${platform}! Em breve você poderá nos seguir.`);
    setTimeout(() => setSocialMessage(null), 3000);
  };

  if (loading) {
    return (
      <main className="bg-[#F9F7F2] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#F4C542] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#2C4A3E] font-medium">Carregando amigos...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="bg-[#F9F7F2] min-h-screen flex items-center justify-center p-6">
        <div className="text-center bg-white p-8 rounded-3xl shadow-sm max-w-md">
          <p className="text-red-500 mb-4">Erro ao carregar: {error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-[#3A5B4F] text-white px-6 py-2 rounded-xl font-semibold hover:bg-[#2C4A3E] transition-all"
          >
            Tentar novamente
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#F9F7F2] min-h-screen font-sans scroll-smooth">
      {/* Mensagem flutuante para redes sociais */}
      {socialMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#2C4A3E] text-white px-6 py-3 rounded-full shadow-lg text-sm font-medium animate-bounce">
          {socialMessage}
        </div>
      )}

      {/* 1. NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F9F7F2]/80 backdrop-blur-md border-b border-gray-100">
        <div className="flex items-center justify-between px-8 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="bg-[#F4C542] w-10 h-10 flex items-center justify-center rounded-full text-2xl">❤︎</div>
            <span className="font-bold text-[#2C4A3E] text-xl tracking-tight">AdotaPET</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-[#2C4A3E] font-medium text-sm">
            <a href="#pets" className="hover:text-black transition-colors">Adotar</a>
            <a href="#como-funciona" className="hover:text-black transition-colors">Como funciona</a>
            <a href="#ongs" className="hover:text-black transition-colors">ONGs</a>
            {/* Links corrigidos para as rotas existentes */}
            <Link href="/resgate" className="hover:text-black transition-colors">Resgate</Link>
            <Link href="/denunciar" className="hover:text-black transition-colors">Denunciar</Link>
            
            <Link href="/login" className="flex items-center gap-2 text-[#2C4A3E] font-bold border-1 border-[#2C4A3E] px-8 py-2 rounded-full hover:bg-[#2C4A3E] hover:text-white transition-all text-sm shadow-[4px_4px_0px_0px_rgba(44,74,62,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]">
              <span>➜]</span> Entrar
            </Link>
          </div>
        </div>
      </nav>

      <div className="h-20"></div>

      {/* 2. HERO SECTION */}
      <section className="max-w-7xl mx-auto px-8 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          {/* Emoji substituído por patinha, mesma cor do texto */}
          <span className="text-[#3A5B4F] font-bold bg-[#E8F0E6] px-4 py-1.5 rounded-full text-xs flex items-center w-fit gap-2 mb-6">
            🐾 Adoção responsável
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold text-[#2C4A3E] leading-[1.1] mb-6">
            Encontre seu novo <br /> 
            <span className="relative inline-block mt-2">
              melhor amigo
              <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 300 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 9C40 3.5 120 1 297 8.5" stroke="#F4C542" strokeWidth="6" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p className="text-gray-500 text-lg mb-10 max-w-lg leading-relaxed">
            Milhares de pets esperando por um lar cheio de amor. Adote e transforme vidas!
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#pets" className="bg-[#3A5B4F] text-white px-10 py-4 rounded-2xl font-bold flex items-center gap-2 hover:shadow-xl transition-all shadow-[#3A5B4F]/20">
              Adotar agora <span className="text-sm">♡</span>
            </a>
            <a href="#como-funciona" className="bg-[#F4C542] text-[#3A5B4F] px-10 py-4 rounded-2xl font-bold hover:shadow-xl transition-all flex items-center justify-center">
              Como funciona
            </a>
          </div>
          <div className="flex gap-16 mt-16">
            <div>
              <p className="text-4xl font-black text-[#2C4A3E]">500+</p>
              <p className="text-gray-400 font-medium">Pets adotados</p>
            </div>
            <div>
              <p className="text-4xl font-black text-[#2C4A3E]">50+</p>
              <p className="text-gray-400 font-medium">ONGs parceiras</p>
            </div>
          </div>
        </div>
        <div className="relative h-[550px] w-full">
          <div className="relative h-full w-full rounded-[60px] overflow-hidden shadow-2xl">
            <Image
              src="/capa1.png"
              alt="Capa feliz mostrando pets e uma pessoa"
              fill
              sizes='100vw'
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute -bottom-6 -right-6 bg-[#F4C542] p-6 rounded-[24px] shadow-2xl z-10">
            <span className="text-3xl text-[#2C4A3E]">🐾</span>
          </div>
        </div>
      </section>

      {/* 3. COMO FUNCIONA */}
      <section id="como-funciona" className="bg-white py-24 px-8 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#2C4A3E] mb-3">Como funciona a adoção?</h2>
            <p className="text-gray-400 font-medium">Processo simples e rápido em apenas 3 passos</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { step: 1, title: 'Encontre seu pet', text: 'Navegue pelos perfis e encontre o pet ideal para sua família.', icon: '🐾', iconColor: 'text-black' },
              { step: 2, title: 'Preencha o formulário', text: 'Manifeste seu interesse e conte um pouco sobre você.', icon: '📋', iconColor: '' },
              { step: 3, title: 'Leve para casa', text: 'Após aprovação, você pode buscar seu novo melhor amigo!', icon: '🏠', iconColor: '' }
            ].map((item) => (
              <div key={item.step} className="bg-[#F9F7F2] p-12 rounded-[40px] relative text-center group hover:bg-[#F4C542]/10 transition-colors">
                <div className="absolute -top-3 -right-3 bg-[#3A5B4F] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-lg">
                  {item.step}
                </div>
                <div className="bg-[#F4C542] w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-8 text-3xl shadow-sm">
                  <span className={item.iconColor || ''}>{item.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-[#2C4A3E] mb-4">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed font-medium">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. BUSCA E FILTROS / PETS DISPONÍVEIS */}
      <section id="pets" className="py-24 px-8 max-w-7xl mx-auto scroll-mt-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#2C4A3E] mb-3">Pets disponíveis para adoção</h2>
          <p className="text-gray-400 font-medium">Encontre o companheiro perfeito para você</p>
        </div>

        <div className="max-w-4xl mx-auto bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 mb-12">
          <div className="relative mb-8">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-xl">🔍</span>
            <input
              type="text"
              placeholder="Buscar por nome..."
              className="w-full pl-14 pr-6 py-4 rounded-2xl bg-[#F9F7F2] border-none outline-none focus:ring-2 focus:ring-[#F4C542] font-medium"
              value={filters.search}
              onChange={(e) => updateFilter('search', e.target.value)}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-10 justify-center">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-black text-[#2C4A3E] uppercase tracking-widest ml-1">Tipo de Animal</span>
              <div className="flex bg-[#F9F7F2] p-1.5 rounded-2xl">
                {[
                  { id: 'all', label: 'Todos' },
                  { id: 'dog', label: 'Cães', icon: '🐶' },
                  { id: 'cat', label: 'Gatos', icon: '🐱' }
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => updateFilter('animalType', type.id)}
                    className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                      filters.animalType === type.id ? 'bg-[#3A5B4F] text-white shadow-lg shadow-[#3A5B4F]/20' : 'text-[#2C4A3E] hover:bg-gray-200/50'
                    }`}
                  >
                    {type.icon && <span>{type.icon}</span>}
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-xs font-black text-[#2C4A3E] uppercase tracking-widest ml-1">Tamanho</span>
              <div className="flex bg-[#F9F7F2] p-1.5 rounded-2xl">
                {[
                  { id: 'all', label: 'Todos' },
                  { id: 'small', label: 'Pequeno' },
                  { id: 'medium', label: 'Médio' },
                  { id: 'large', label: 'Grande' }
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => updateFilter('size', option.id)}
                    className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                      filters.size === option.id ? 'bg-[#3A5B4F] text-white shadow-lg shadow-[#3A5B4F]/20' : 'text-[#2C4A3E] hover:bg-gray-200/50'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <p className="text-center font-bold text-[#2C4A3E] mb-10">{filteredPets.length} pets encontrados</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPets.map((pet) => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </div>
      </section>

      {/* 5. ONGS PARCEIRAS */}
      <section id="ongs" className="bg-[#E8E8E8]/50 py-24 px-8 scroll-mt-20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#2C4A3E] mb-2">Nossas ONGs parceiras</h2>
          <p className="text-gray-500 mb-12">Trabalhamos com organizações comprometidas com o bem-estar animal</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Abrigo Feliz", city: "São Paulo", pets: 45 },
              { name: "Patinhas do Bem", city: "Rio de Janeiro", pets: 32 },
              { name: "Adote um Amigo", city: "Belo Horizonte", pets: 38 }
            ].map((ong, i) => (
              <div key={i} className="bg-white p-8 rounded-[32px] shadow-sm flex flex-col items-center">
                <div className="bg-[#F9F7F2] w-16 h-16 rounded-2xl flex items-center justify-center mb-4 text-2xl">🐾</div>
                <h3 className="font-bold text-[#2C4A3E] text-xl">{ong.name}</h3>
                <p className="text-gray-400 mb-4">{ong.city}</p>
                <span className="text-[#3A5B4F] text-sm font-semibold">🐾 {ong.pets} animais disponíveis</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. DEPOIMENTOS COM FOTOS REAIS */}
      <section className="py-24 px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-[#2C4A3E] mb-2">Histórias de amor</h2>
          <p className="text-gray-500">Veja o que nossos adotantes têm a dizer</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Maria Silva", pet: "Luna", text: "Adotar a Luna foi a melhor decisão da minha vida! Ela trouxe tanta alegria para casa.", image: "/users/user2.jpg" },
            { name: "João Santos", pet: "Thor", text: "O processo foi super fácil e a equipe muito atenciosa. Thor é parte da família agora.", image: "/users/user3.jpg" },
            { name: "Ana Paula", pet: "Bob", text: "Nossa família está completa com o Bob! As crianças adoram brincar com ele.", image: "/users/user1.jpg" }
          ].map((dep, i) => (
            <div key={i} className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-50">
              <div className="text-[#F4C542] flex gap-1 mb-4">★★★★★</div>
              <p className="text-gray-600 italic mb-6">
                &quot;{dep.text}&quot;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                  <Image src={dep.image} alt={dep.name} width={48} height={48} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-bold text-[#2C4A3E]">{dep.name}</p>
                  <p className="text-xs text-gray-400">Adotou {dep.pet}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. CTA FINAL */}
      <section className="w-full bg-[#3A5B4F] py-20 md:py-24 text-center text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-8 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Pronto para mudar uma vida?</h2>
          <p className="text-[#E8F0E6] mb-10 max-w-xl mx-auto text-lg">
            Milhares de pets estão esperando por você. Adote agora e ganhe um amigo para a vida toda!
          </p>
          <a href="#pets" className="bg-[#F4C542] text-[#2C4A3E] px-10 py-4 rounded-2xl font-bold hover:scale-105 transition-transform shadow-xl shadow-black/10 inline-block">
            Ver pets disponíveis →
          </a>
        </div>
        <div className="absolute top-0 right-0 p-20 opacity-10 text-9xl">🐾</div>
      </section>

      {/* 8. FOOTER COM TODOS OS AJUSTES */}
      <footer className="bg-white pt-20 pb-10 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-12 border-b border-gray-100 pb-12 mb-8 text-left">
          <div>
            <h3 className="font-bold text-[#2C4A3E] text-xl flex items-center gap-2 mb-6 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
              <span className="bg-[#F4C542] w-10 h-10 flex items-center justify-center rounded-full text-2xl">❤︎</span> AdotaPET
            </h3>
            <p className="text-gray-400 text-sm">Conectando pets e pessoas para uma vida mais feliz.</p>
          </div>
          <div>
            <h4 className="font-bold text-[#2C4A3E] mb-6">Acesse rápido</h4>
            <ul className="text-gray-400 space-y-4 text-sm">
              <li><a href="#pets" className="hover:text-[#3A5B4F] transition-colors">Adotar</a></li>
              <li><a href="#como-funciona" className="hover:text-[#3A5B4F] transition-colors">Como Funciona</a></li>
              <li><a href="#ongs" className="hover:text-[#3A5B4F] transition-colors">ONGs</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-[#2C4A3E] mb-6">Suporte</h4>
            <ul className="text-gray-400 space-y-4 text-sm">
              <li><Link href="/faq" className="hover:text-[#3A5B4F] transition-colors">FAQ</Link></li>
              <li><Link href="/contato" className="hover:text-[#3A5B4F] transition-colors">Contato</Link></li>
              <li><Link href="/denunciar" className="hover:text-[#3A5B4F] transition-colors">Denunciar</Link></li>
              <li><Link href="/resgate" className="hover:text-[#3A5B4F] transition-colors">Ajuda com resgate</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-[#2C4A3E] mb-6">Redes Sociais</h4>
            <ul className="text-gray-400 space-y-4 text-sm">
              <li>
                <button onClick={() => showComingSoon('Instagram')} className="hover:text-[#3A5B4F] transition-colors cursor-pointer">
                  Instagram
                </button>
              </li>
              <li>
                <button onClick={() => showComingSoon('Facebook')} className="hover:text-[#3A5B4F] transition-colors cursor-pointer">
                  Facebook
                </button>
              </li>
            </ul>
          </div>
        </div>
        <p className="text-center text-gray-300 text-xs">© 2025 AdotaPET. Todos os direitos reservados.</p>
      </footer>
    </main>
  );
}