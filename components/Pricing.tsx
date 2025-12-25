import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { Button } from './ui/Button';
import { FadeIn } from './ui/FadeIn';
import { Plan } from '../types';

const plans: Plan[] = [
  {
    name: "Starter",
    priceMonthly: 0,
    priceYearly: 0,
    features: ["50 lançamentos/mês", "Categorização básica", "Exportação simples", "Suporte via email"],
  },
  {
    name: "Pro",
    priceMonthly: 29,
    priceYearly: 290,
    recommended: true,
    features: ["Lançamentos ilimitados", "IA Avançada Mindy", "Relatórios PDF detalhados", "Scan de recibos ilimitado", "Múltiplas carteiras"],
  },
  {
    name: "Enterprise",
    priceMonthly: 99,
    priceYearly: 990,
    features: ["API de integração", "Gestor de conta dedicado", "Treinamento de equipe", "Dashboards customizados", "SLA 99.9%"],
  }
];

export const Pricing: React.FC = () => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section id="pricing" className="py-24 relative">
      <div className="container mx-auto px-6">
        <FadeIn className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Investimento Inteligente</h2>
          
          {/* Toggle */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <span className={`text-sm font-medium ${!isYearly ? 'text-white' : 'text-gray-500'}`}>Mensal</span>
            <button 
              onClick={() => setIsYearly(!isYearly)}
              className="relative w-14 h-8 rounded-full bg-white/10 border border-white/10 transition-colors hover:bg-white/20"
            >
              <div className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-purple-500 transition-transform duration-300 ${isYearly ? 'translate-x-6' : 'translate-x-0'}`}></div>
            </button>
            <span className={`text-sm font-medium ${isYearly ? 'text-white' : 'text-gray-500'}`}>
              Anual <span className="text-xs text-green-400 ml-1 font-bold">-20% OFF</span>
            </span>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
          {plans.map((plan, index) => (
            <FadeIn key={plan.name} delay={index * 150}>
              <div 
                className={`relative p-8 rounded-2xl border transition-all duration-300 flex flex-col h-full ${
                  plan.recommended 
                    ? 'bg-white/10 border-purple-500/50 shadow-[0_0_40px_rgba(168,85,247,0.15)] md:scale-105 z-10' 
                    : 'glass-panel border-white/5 hover:border-white/20'
                }`}
              >
                {plan.recommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-purple-500 text-xs font-bold uppercase tracking-wider">
                    Mais Popular
                  </div>
                )}
                
                <div className="mb-8">
                  <h3 className="text-xl font-medium text-gray-300 mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-sm text-gray-400">R$</span>
                    <span className="text-4xl font-bold">{isYearly ? plan.priceYearly : plan.priceMonthly}</span>
                    <span className="text-sm text-gray-400">/{isYearly ? 'ano' : 'mês'}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8 flex-1">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                      <Check className="w-5 h-5 text-purple-400 shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>

                <Button 
                  fullWidth 
                  variant={plan.recommended ? 'primary' : 'outline'}
                >
                  Escolher Plano
                </Button>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};