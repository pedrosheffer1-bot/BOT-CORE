import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Testimonial } from '../types';
import { FadeIn } from './ui/FadeIn';

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Ana Silva",
    role: "Designer Freelancer",
    content: "A Mindy mudou completamente como gerencio meus gastos variáveis. A função de escanear recibos é mágica!",
    rating: 5,
    avatar: "https://picsum.photos/100/100?random=1"
  },
  {
    id: 2,
    name: "Carlos Mendes",
    role: "Engenheiro de Software",
    content: "Interface limpa, rápida e o dark mode é perfeito. Os gráficos me ajudaram a cortar 20% das despesas no primeiro mês.",
    rating: 5,
    avatar: "https://picsum.photos/100/100?random=2"
  },
  {
    id: 3,
    name: "Beatriz Costa",
    role: "Gerente de Marketing",
    content: "Eu odiava planilhas. Com a Mindy, sinto que tenho um assistente financeiro pessoal 24h por dia.",
    rating: 5,
    avatar: "https://picsum.photos/100/100?random=3"
  },
  {
    id: 4,
    name: "Roberto Campos",
    role: "Empresário",
    content: "Uso o plano Enterprise para minha pequena equipe. O controle de reembolso ficou 10x mais rápido.",
    rating: 5,
    avatar: "https://picsum.photos/100/100?random=4"
  }
];

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Logic to show 1 card on mobile, 3 on desktop (looping)
  const getVisibleTestimonials = () => {
    const items = [];
    for (let i = 0; i < 3; i++) {
        items.push(testimonials[(currentIndex + i) % testimonials.length]);
    }
    return items;
  };

  return (
    <section id="testimonials" className="py-24">
      <div className="container mx-auto px-6">
        <FadeIn className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Quem usa <span className="text-purple-400">ama</span></h2>
            <p className="text-gray-400">Junte-se a milhares de usuários satisfeitos.</p>
          </div>
          <div className="flex gap-2">
            <button onClick={prev} className="p-3 rounded-full border border-white/10 hover:bg-white/10 transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={next} className="p-3 rounded-full border border-white/10 hover:bg-white/10 transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {getVisibleTestimonials().map((t, idx) => (
                <div key={`${t.id}-${idx}`} className="glass-panel p-8 rounded-2xl flex flex-col h-full animate-float" style={{ animationDuration: `${6 + idx}s`, animationDelay: `${idx * 0.5}s` }}>
                    <div className="flex gap-1 mb-6">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                        ))}
                    </div>
                    <p className="text-gray-300 mb-8 flex-1 leading-relaxed">"{t.content}"</p>
                    <div className="flex items-center gap-4">
                        <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full border-2 border-purple-500/30" />
                        <div>
                            <h4 className="font-bold text-white">{t.name}</h4>
                            <p className="text-sm text-gray-500">{t.role}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};