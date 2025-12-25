import React, { useState } from 'react';
import { Mic, PieChart, FileText, Bell, CheckCircle2 } from 'lucide-react';
import { FadeIn } from './ui/FadeIn';
import { Feature } from '../types';

const features: Feature[] = [
  {
    id: 'recording',
    title: 'Registro Rápido',
    description: 'Adicione despesas por voz, texto ou foto do recibo em segundos.',
    icon: <Mic className="w-5 h-5" />,
    benefits: ['Comando de voz natural', 'Scan de recibos OCR', 'Categorização automática'],
    image: 'https://picsum.photos/600/400?grayscale&blur=2'
  },
  {
    id: 'analytics',
    title: 'Análises Inteligentes',
    description: 'Entenda para onde vai seu dinheiro com gráficos interativos.',
    icon: <PieChart className="w-5 h-5" />,
    benefits: ['Gráficos detalhados', 'Comparativo mensal', 'Identificação de padrões'],
    image: 'https://picsum.photos/601/400?grayscale&blur=2'
  },
  {
    id: 'reports',
    title: 'Relatórios Visuais',
    description: 'Relatórios PDF semanais e mensais entregues diretamente a você.',
    icon: <FileText className="w-5 h-5" />,
    benefits: ['Exportação PDF/Excel', 'Resumo executivo', 'Histórico completo'],
    image: 'https://picsum.photos/602/400?grayscale&blur=2'
  },
  {
    id: 'alerts',
    title: 'Alertas Personalizados',
    description: 'Seja avisado antes de estourar o orçamento ou vencer uma conta.',
    icon: <Bell className="w-5 h-5" />,
    benefits: ['Notificações push', 'Alertas de vencimento', 'Limites por categoria'],
    image: 'https://picsum.photos/603/400?grayscale&blur=2'
  },
];

export const Features: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="features" className="py-24 relative">
      <div className="container mx-auto px-6">
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Poder da IA no seu <span className="text-gradient-purple">Bolso</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A Mindy não apenas registra gastos, ela entende seus hábitos financeiros e ajuda você a tomar decisões melhores.
          </p>
        </FadeIn>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {features.map((feature, index) => (
            <button
              key={feature.id}
              onClick={() => setActiveTab(index)}
              className={`flex items-center gap-3 px-6 py-4 rounded-xl border transition-all duration-300 ${
                activeTab === index 
                  ? 'bg-white/10 border-purple-500/50 text-white shadow-[0_0_20px_rgba(168,85,247,0.15)]' 
                  : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
              }`}
            >
              <span className={activeTab === index ? 'text-purple-400' : 'text-gray-500'}>
                {feature.icon}
              </span>
              <span className="font-medium">{feature.title}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="glass-panel rounded-3xl p-8 md:p-12 relative overflow-hidden min-h-[400px]">
          {features.map((feature, index) => (
             <div 
                key={feature.id}
                className={`transition-all duration-500 absolute inset-0 p-8 md:p-12 flex flex-col md:flex-row gap-12 items-center ${
                  activeTab === index ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 translate-x-10 pointer-events-none'
                }`}
             >
                <div className="flex-1 space-y-6">
                  <div className="inline-flex p-3 rounded-xl bg-purple-500/20 text-purple-400 mb-2">
                    {feature.icon}
                  </div>
                  <h3 className="text-3xl font-bold">{feature.title}</h3>
                  <p className="text-gray-400 text-lg leading-relaxed">{feature.description}</p>
                  <ul className="space-y-3 pt-4">
                    {feature.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center gap-3 text-gray-300">
                        <CheckCircle2 className="w-5 h-5 text-green-400" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex-1 w-full relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden border border-white/10 group">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                  <img 
                    src={feature.image} 
                    alt={feature.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  {/* Decorative Elements on Image */}
                  <div className="absolute bottom-6 left-6 z-20 glass-card px-4 py-2 rounded-lg">
                     <span className="text-sm font-medium">✨ Powered by Mindy AI</span>
                  </div>
                </div>
             </div>
          ))}
        </div>
      </div>
    </section>
  );
};