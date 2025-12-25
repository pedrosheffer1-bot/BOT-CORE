import React from 'react';
import { MessageSquarePlus, Bot, Wallet } from 'lucide-react';
import { FadeIn } from './ui/FadeIn';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: <MessageSquarePlus className="w-8 h-8" />,
      title: "1. Registre",
      desc: "Envie uma mensagem de texto, áudio ou foto para a Mindy no WhatsApp ou Telegram."
    },
    {
      icon: <Bot className="w-8 h-8" />,
      title: "2. Processamento",
      desc: "A IA analisa o contexto, categoriza a despesa e extrai data e valor automaticamente."
    },
    {
      icon: <Wallet className="w-8 h-8" />,
      title: "3. Economize",
      desc: "Receba insights semanais e alertas que ajudam você a manter o orçamento em dia."
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-black/40">
      <div className="container mx-auto px-6">
        <FadeIn className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simples como enviar uma <span className="text-purple-400">mensagem</span></h2>
          <p className="text-gray-400">Sem formulários chatos. Converse com suas finanças.</p>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>

          {steps.map((step, index) => (
            <FadeIn key={index} delay={index * 200} className="relative z-10">
              <div className="glass-card p-8 rounded-2xl text-center h-full hover:border-purple-500/30 transition-colors">
                <div className="w-24 h-24 mx-auto bg-[#0a0a0a] rounded-full flex items-center justify-center border border-white/10 mb-6 shadow-[0_0_30px_rgba(168,85,247,0.1)]">
                  <div className="text-purple-400">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};