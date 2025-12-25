import React from 'react';
import { ArrowRight, Play, TrendingUp, ShieldCheck, Zap } from 'lucide-react';
import { Button } from './ui/Button';
import { FadeIn } from './ui/FadeIn';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden">
      
      <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Content */}
        <div className="text-center lg:text-left">
          <FadeIn delay={100}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
              </span>
              <span className="text-xs font-medium text-purple-300 uppercase tracking-wide">Mindy AI 2.0 Disponível</span>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              Controle Total das <br />
              <span className="text-gradient-purple">Suas Despesas</span>
            </h1>
          </FadeIn>

          <FadeIn delay={300}>
            <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-xl mx-auto lg:mx-0">
              Registre, analise e economize com a inteligência artificial da Mindy. 
              Organize suas finanças sem planilhas complexas.
            </p>
          </FadeIn>

          <FadeIn delay={400} className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
            <Button size="lg" className="w-full sm:w-auto gap-2 group">
              Começar Agora
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="secondary" size="lg" className="w-full sm:w-auto gap-2">
              <Play className="w-4 h-4 fill-current" />
              Ver Demo
            </Button>
          </FadeIn>
        </div>

        {/* Right Visual (Abstract Mockup) */}
        <FadeIn delay={500} direction="left" className="relative lg:h-[600px] flex items-center justify-center">
          <div className="relative w-full max-w-md mx-auto aspect-square">
            {/* Main Center Circle/App Interface */}
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
            
            <div className="relative z-10 w-full h-full glass-panel rounded-3xl p-6 flex flex-col justify-between border-t border-l border-white/20 animate-float">
                {/* Header Mockup */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
                            <span className="font-bold text-white">M</span>
                        </div>
                        <div>
                            <div className="h-2 w-24 bg-white/20 rounded mb-1"></div>
                            <div className="h-2 w-16 bg-white/10 rounded"></div>
                        </div>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-white/5 border border-white/10"></div>
                </div>

                {/* Chart Mockup */}
                <div className="space-y-3 mb-6">
                    <div className="flex items-end justify-between h-32 gap-2 px-2">
                        <div className="w-full bg-purple-500/30 rounded-t-lg h-[40%]"></div>
                        <div className="w-full bg-purple-500/50 rounded-t-lg h-[70%]"></div>
                        <div className="w-full bg-purple-500/80 rounded-t-lg h-[50%]"></div>
                        <div className="w-full bg-white/90 rounded-t-lg h-[90%] shadow-[0_0_15px_rgba(255,255,255,0.4)]"></div>
                        <div className="w-full bg-purple-500/40 rounded-t-lg h-[60%]"></div>
                    </div>
                </div>

                {/* List Mockup */}
                <div className="space-y-3">
                    {[1,2,3].map((i) => (
                        <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-white/10"></div>
                                <div className="space-y-1">
                                    <div className="h-2 w-20 bg-white/20 rounded"></div>
                                    <div className="h-1.5 w-12 bg-white/10 rounded"></div>
                                </div>
                            </div>
                            <div className="h-2 w-12 bg-white/30 rounded"></div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Floating Cards */}
            <div className="absolute -right-8 top-20 glass-card p-4 rounded-xl flex items-center gap-3 animate-float" style={{ animationDelay: '1s' }}>
                <div className="p-2 rounded-lg bg-green-500/20 text-green-400">
                    <TrendingUp size={20} />
                </div>
                <div>
                    <p className="text-xs text-gray-400">Economia</p>
                    <p className="font-bold text-green-400">+24%</p>
                </div>
            </div>

            <div className="absolute -left-8 bottom-32 glass-card p-4 rounded-xl flex items-center gap-3 animate-float" style={{ animationDelay: '2s' }}>
                <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                    <ShieldCheck size={20} />
                </div>
                <div>
                    <p className="text-xs text-gray-400">Status</p>
                    <p className="font-bold text-white">Protegido</p>
                </div>
            </div>
            
             <div className="absolute right-0 -bottom-4 glass-card p-4 rounded-xl flex items-center gap-3 animate-float" style={{ animationDelay: '3s' }}>
                <div className="p-2 rounded-lg bg-yellow-500/20 text-yellow-400">
                    <Zap size={20} />
                </div>
                <div>
                    <p className="text-xs text-gray-400">Insights</p>
                    <p className="font-bold text-white">3 Novos</p>
                </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};