import React from 'react';
import { Bot, Twitter, Instagram, Linkedin, Github } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 bg-black/80 backdrop-blur-xl pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-6">
              <div className="p-1.5 rounded-lg bg-white/10 border border-white/20">
                <Bot className="w-5 h-5 text-purple-400" />
              </div>
              <span className="text-xl font-bold">Mindy</span>
            </a>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Sua assistente financeira pessoal movida por inteligência artificial. 
              Simplifique sua vida financeira hoje.
            </p>
            <div className="flex gap-4">
              {[Twitter, Instagram, Linkedin, Github].map((Icon, i) => (
                <a key={i} href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6">Produto</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="#" className="hover:text-purple-400 transition-colors">Recursos</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Integrações</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Preços</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Changelog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6">Empresa</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="#" className="hover:text-purple-400 transition-colors">Sobre Nós</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Carreiras</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Contato</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6">Legal</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="#" className="hover:text-purple-400 transition-colors">Privacidade</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Termos</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Segurança</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">© 2024 Mindy AI Financial. Todos os direitos reservados.</p>
          <p className="text-sm text-gray-500 flex items-center gap-2">
            Feito com <span className="text-red-500">❤</span> para suas finanças
          </p>
        </div>
      </div>
    </footer>
  );
};