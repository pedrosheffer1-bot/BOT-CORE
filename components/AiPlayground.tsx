import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Bot, Image as ImageIcon, Wand2, Send, Loader2, BrainCircuit, Upload, Download, Sparkles, X, ChevronRight } from 'lucide-react';
import { Button } from './ui/Button';
import { FadeIn } from './ui/FadeIn';

type Mode = 'chat' | 'generate' | 'edit';

const AI_MODELS = {
    chat: 'gemini-3-pro-preview',
    generate: 'gemini-3-pro-image-preview',
    edit: 'gemini-2.5-flash-image'
};

const ChatView = () => {
    const [messages, setMessages] = useState<{role: 'user' | 'model', text: string, isThinking?: boolean}[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [thinkingMode, setThinkingMode] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || loading) return;
        
        const userMsg = input;
        setInput('');
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setLoading(true);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            
            const config: any = {};
            if (thinkingMode) {
                // As per guidelines: max thinking budget for gemini-3-pro-preview is 32768.
                // Do not set maxOutputTokens.
                config.thinkingConfig = { thinkingBudget: 32768 };
            }

            const response = await ai.models.generateContent({
                model: AI_MODELS.chat,
                contents: [{ role: 'user', parts: [{ text: userMsg }] }],
                config: config
            });
            
            setMessages(prev => [...prev, { 
                role: 'model', 
                text: response.text || "Desculpe, não consegui processar sua solicitação.",
                isThinking: thinkingMode
            }]);
        } catch (error: any) {
            console.error("Chat Error:", error);
            setMessages(prev => [...prev, { role: 'model', text: "Ocorreu um erro ao processar sua mensagem. Verifique sua conexão ou chave de API." }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-[550px]">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                     <div className={`p-2.5 rounded-xl transition-all duration-500 ${thinkingMode ? 'bg-purple-500/20 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.3)]' : 'bg-white/5 text-gray-400'}`}>
                        <BrainCircuit size={22} className={thinkingMode ? 'animate-pulse' : ''} />
                     </div>
                     <div>
                        <span className="font-bold text-sm block tracking-wide">Modo de Raciocínio Profundo</span>
                        <span className="text-[10px] text-gray-500 uppercase tracking-widest">{thinkingMode ? 'Ativado • Gemini 3 Pro' : 'Desativado • Resposta Rápida'}</span>
                     </div>
                </div>
                <button 
                    onClick={() => setThinkingMode(!thinkingMode)}
                    className={`relative w-14 h-7 rounded-full transition-all duration-300 ${thinkingMode ? 'bg-purple-600 shadow-[0_0_20px_rgba(168,85,247,0.5)]' : 'bg-white/10'}`}
                >
                    <div className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-300 ${thinkingMode ? 'translate-x-7' : 'translate-x-0'}`} />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto mb-6 space-y-6 pr-2 custom-scrollbar" ref={scrollRef}>
                {messages.length === 0 && (
                    <div className="text-center text-gray-500 mt-20 animate-float">
                        <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/10">
                            <Bot className="w-8 h-8 text-purple-400 opacity-70" />
                        </div>
                        <h4 className="text-white font-medium mb-2">Assistente Financeira Mindy</h4>
                        <p className="text-sm max-w-[250px] mx-auto opacity-60 italic">"Como posso ajudar você a organizar suas finanças ou analisar seus investimentos hoje?"</p>
                    </div>
                )}
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] p-4 rounded-2xl shadow-xl border ${
                            msg.role === 'user' 
                                ? 'bg-purple-600/20 text-white rounded-br-none border-purple-500/30' 
                                : 'bg-white/5 text-gray-200 rounded-bl-none border-white/10'
                        }`}>
                            {msg.isThinking && msg.role === 'model' && (
                                <div className="flex items-center gap-1.5 mb-2 pb-2 border-b border-white/5 text-[10px] text-purple-400 font-bold uppercase tracking-widest">
                                    <Sparkles size={12} />
                                    Processado com Deep Thinking
                                </div>
                            )}
                            <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="flex justify-start">
                         <div className="bg-white/5 p-4 rounded-2xl rounded-bl-none border border-white/10 flex items-center gap-3">
                            <div className="flex gap-1">
                                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
                                <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                                <span className="w-1.5 h-1.5 bg-purple-300 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                            </div>
                            <span className="text-xs font-medium text-gray-500 tracking-wide uppercase">
                                {thinkingMode ? 'Analisando dados complexos...' : 'Mindy está digitando...'}
                            </span>
                         </div>
                    </div>
                )}
            </div>
            
            <div className="relative group">
                <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Pergunte sobre seus gastos, orçamentos ou estratégias..."
                    className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 pr-14 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all duration-300"
                />
                <button 
                    onClick={handleSend}
                    disabled={loading || !input.trim()}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-xl bg-purple-600 text-white hover:bg-purple-500 shadow-lg transition-all duration-300 disabled:opacity-30 disabled:grayscale disabled:cursor-not-allowed"
                >
                    <Send size={20} />
                </button>
            </div>
        </div>
    );
};

const GenerateView = () => {
    const [prompt, setPrompt] = useState('');
    const [imageSize, setImageSize] = useState<'1K' | '2K' | '4K'>('1K');
    const [image, setImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        if (!prompt) return;
        setLoading(true);
        setImage(null);

        try {
            // Mandatoy API Key selection for Veo/Pro models
            // @ts-ignore
            if (window.aistudio && !await window.aistudio.hasSelectedApiKey()) {
                 // @ts-ignore
                 await window.aistudio.openSelectKey();
            }

            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                model: AI_MODELS.generate,
                contents: { parts: [{ text: prompt }] },
                config: {
                    imageConfig: { 
                        imageSize: imageSize,
                        aspectRatio: "1:1"
                    }
                }
            });

            // Iterate through parts to find the image
            for (const part of response.candidates?.[0]?.content?.parts || []) {
                if (part.inlineData) {
                    setImage(`data:image/png;base64,${part.inlineData.data}`);
                    break;
                }
            }
        } catch (error: any) {
            console.error("Generation Error:", error);
            if (error?.message?.includes("Requested entity was not found")) {
                // @ts-ignore
                if (window.aistudio) await window.aistudio.openSelectKey();
            } else {
                alert("Erro ao gerar imagem. Certifique-se de que sua chave de API é válida e possui créditos.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row gap-8 h-[550px]">
             <div className="flex-1 flex flex-col gap-6">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                        <Bot size={14} className="text-purple-400" />
                        Prompt Criativo
                    </label>
                    <textarea 
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Ex: 'Um escritório futurista minimalista com holografia de gráficos financeiros em 3D, estilo cyberpunk limpo, iluminação roxa e ciano...'"
                        className="w-full h-40 bg-black/40 border border-white/10 rounded-2xl p-5 text-white text-sm focus:outline-none focus:border-purple-500/50 resize-none transition-all duration-300 custom-scrollbar"
                    />
                </div>
                
                <div className="space-y-3">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                        <ImageIcon size={14} className="text-purple-400" />
                        Resolução da Imagem
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                        {(['1K', '2K', '4K'] as const).map((s) => (
                            <button 
                                key={s}
                                onClick={() => setImageSize(s)}
                                className={`py-3 rounded-xl border text-xs font-bold transition-all duration-300 ${
                                    imageSize === s 
                                        ? 'bg-purple-600/30 border-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]' 
                                        : 'bg-white/5 border-white/10 text-gray-500 hover:bg-white/10 hover:text-gray-300'
                                }`}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                </div>

                <Button 
                    onClick={handleGenerate} 
                    disabled={loading || !prompt}
                    className="mt-auto py-5 rounded-2xl w-full gap-3 shadow-[0_10px_30px_rgba(168,85,247,0.3)]"
                >
                    {loading ? <Loader2 className="animate-spin" /> : <Sparkles size={18} />}
                    <span className="font-bold tracking-wide">CRIAR IMAGEM COM PRO AI</span>
                </Button>
             </div>

             <div className="flex-1 glass-card rounded-3xl border-white/10 flex items-center justify-center overflow-hidden relative group bg-black/20">
                {image ? (
                    <>
                        <img src={image} alt="Generated Asset" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-sm">
                            <a href={image} download="mindy-asset.png" className="p-4 bg-white/10 border border-white/20 rounded-full hover:bg-purple-600 text-white transition-all transform hover:scale-110 shadow-2xl">
                                <Download size={24} />
                            </a>
                        </div>
                        <div className="absolute top-4 left-4 glass-card px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-tighter border-white/20">
                            {imageSize} PRO GENERATION
                        </div>
                    </>
                ) : (
                    <div className="text-center px-10">
                        {loading ? (
                            <div className="flex flex-col items-center gap-6">
                                <div className="relative">
                                    <div className="w-16 h-16 rounded-full border-t-2 border-purple-500 animate-spin"></div>
                                    <Sparkles className="absolute inset-0 m-auto text-purple-400 animate-pulse" size={24} />
                                </div>
                                <div className="space-y-2">
                                    <span className="text-sm font-bold text-white block tracking-widest uppercase">Tecendo Pixels...</span>
                                    <span className="text-xs text-gray-500 italic">"Isso pode levar alguns segundos devido à alta resolução."</span>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-white/5 opacity-50">
                                    <ImageIcon className="w-10 h-10 text-gray-400" />
                                </div>
                                <h5 className="text-white font-medium mb-2">Seu estúdio criativo</h5>
                                <p className="text-xs text-gray-500">Descreva sua visão à esquerda e veja a Mindy dar vida à sua imagem em alta definição.</p>
                            </>
                        )}
                    </div>
                )}
             </div>
        </div>
    );
};

const EditView = () => {
    const [prompt, setPrompt] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [result, setResult] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
            setResult(null);
        }
    };

    const fileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve((reader.result as string).split(',')[1]);
            reader.onerror = error => reject(error);
        });
    };

    const handleEdit = async () => {
        if (!selectedFile || !prompt) return;
        setLoading(true);

        try {
            const base64 = await fileToBase64(selectedFile);
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            
            const response = await ai.models.generateContent({
                model: AI_MODELS.edit,
                contents: {
                    parts: [
                        { inlineData: { mimeType: selectedFile.type, data: base64 } },
                        { text: `Edite esta imagem com base no seguinte pedido: ${prompt}` }
                    ]
                }
            });

            for (const part of response.candidates?.[0]?.content?.parts || []) {
                if (part.inlineData) {
                    setResult(`data:image/png;base64,${part.inlineData.data}`);
                    break;
                }
            }
        } catch (error) {
            console.error("Editing Error:", error);
            alert("Ocorreu um erro ao editar a imagem. Tente reduzir o tamanho do arquivo ou usar outro prompt.");
        } finally {
            setLoading(false);
        }
    };

    return (
         <div className="flex flex-col lg:flex-row gap-8 h-[550px]">
             <div className="flex-1 flex flex-col gap-6">
                 <div 
                    className={`border-2 border-dashed rounded-3xl p-8 text-center transition-all duration-500 cursor-pointer relative group ${preview ? 'border-purple-500/50 bg-purple-500/5' : 'border-white/10 hover:border-white/30 bg-white/5'}`}
                    onClick={() => document.getElementById('file-upload-edit')?.click()}
                 >
                    <input type="file" id="file-upload-edit" className="hidden" accept="image/*" onChange={handleFileSelect} />
                    {preview ? (
                        <div className="relative h-44 w-full rounded-2xl overflow-hidden shadow-2xl">
                            <img src={preview} alt="Upload Preview" className="h-full w-full object-cover" />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-xs font-bold bg-white text-black px-4 py-2 rounded-full uppercase tracking-widest">Trocar Imagem</span>
                            </div>
                        </div>
                    ) : (
                        <div className="py-6 space-y-4">
                            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mx-auto border border-white/5 transition-transform group-hover:scale-110">
                                <Upload className="w-7 h-7 text-gray-400 group-hover:text-purple-400" />
                            </div>
                            <div>
                                <span className="text-sm font-bold text-gray-300 block mb-1">Upload da Imagem</span>
                                <span className="text-xs text-gray-500">Arraste ou clique para selecionar</span>
                            </div>
                        </div>
                    )}
                 </div>

                 <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                        <Wand2 size={14} className="text-purple-400" />
                        O que deseja alterar?
                    </label>
                    <textarea 
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder='Ex: "Adicione um filtro retro nostálgico", "Mude o fundo para uma cidade futurista", "Adicione um robô amigável ao lado"'
                        className="w-full h-32 bg-black/40 border border-white/10 rounded-2xl p-5 text-white text-sm focus:outline-none focus:border-purple-500/50 resize-none transition-all duration-300 custom-scrollbar"
                    />
                 </div>

                 <Button 
                    onClick={handleEdit} 
                    disabled={loading || !prompt || !selectedFile}
                    className="mt-auto py-5 rounded-2xl w-full gap-3 shadow-[0_10px_30px_rgba(168,85,247,0.3)]"
                 >
                    {loading ? <Loader2 className="animate-spin" /> : <Wand2 size={18} />}
                    <span className="font-bold tracking-wide uppercase">Aplicar Inteligência Visual</span>
                </Button>
             </div>

             <div className="flex-1 glass-card rounded-3xl border-white/10 flex items-center justify-center overflow-hidden relative group bg-black/20">
                 {result ? (
                     <>
                        <img src={result} alt="Edited Asset" className="w-full h-full object-contain transition-transform duration-1000 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-sm">
                             <a href={result} download="mindy-edited-asset.png" className="p-4 bg-white/10 border border-white/20 rounded-full hover:bg-purple-600 text-white transition-all transform hover:scale-110 shadow-2xl">
                                <Download size={24} />
                            </a>
                        </div>
                        <div className="absolute top-4 left-4 glass-card px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-tighter border-white/20 bg-green-500/20">
                            FLASH AI EDITING
                        </div>
                     </>
                 ) : (
                    <div className="text-center px-10">
                        {loading ? (
                             <div className="flex flex-col items-center gap-6">
                                <div className="relative">
                                    <div className="w-16 h-16 rounded-full border-t-2 border-purple-500 animate-spin"></div>
                                    <Wand2 className="absolute inset-0 m-auto text-purple-400 animate-pulse" size={24} />
                                </div>
                                <div className="space-y-2">
                                    <span className="text-sm font-bold text-white block tracking-widest uppercase">Processando...</span>
                                    <span className="text-xs text-gray-500 italic">"Aplicando suas edições em tempo real."</span>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-white/5 opacity-50">
                                    <Wand2 className="w-10 h-10 text-gray-400" />
                                </div>
                                <h5 className="text-white font-medium mb-2">Edição de Imagem Inteligente</h5>
                                <p className="text-xs text-gray-500">Envie uma foto e diga à Mindy o que você quer mudar. Simples assim.</p>
                            </>
                        )}
                    </div>
                 )}
             </div>
         </div>
    );
}

export const AiPlayground: React.FC = () => {
  const [activeMode, setActiveMode] = useState<Mode>('chat');

  const modes = [
    { id: 'chat', label: 'IA ChatBot', icon: <Bot size={18} />, desc: 'Análise de dados complexos com raciocínio profundo.' },
    { id: 'generate', label: 'Gerar Assets', icon: <Sparkles size={18} />, desc: 'Crie visuais em alta resolução (1K-4K) para seu branding.' },
    { id: 'edit', label: 'Editor Visual', icon: <Wand2 size={18} />, desc: 'Edição inteligente de imagens através de texto.' }
  ];

  return (
    <section id="ai-demo" className="py-24 relative overflow-hidden">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/4 -right-64 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 -left-64 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
            <FadeIn>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <span className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">Mindy Intelligence Lab</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-bold mb-6">A Potência da <span className="text-gradient-purple">IA Gemini</span></h2>
                <p className="text-gray-400 text-lg leading-relaxed">
                    Experimente as tecnologias de ponta integradas à Mindy. Do raciocínio lógico avançado à geração de imagens Pro em alta definição.
                </p>
            </FadeIn>
        </div>

        <FadeIn delay={200} className="max-w-6xl mx-auto">
            <div className="glass-panel rounded-[40px] overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.6)] border-white/10">
                <div className="flex flex-col md:flex-row h-full">
                    
                    {/* Sidebar Tabs */}
                    <div className="w-full md:w-80 border-b md:border-b-0 md:border-r border-white/10 bg-white/[0.02] p-8 flex flex-col gap-4">
                        <div className="mb-6">
                            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Selecione uma Ferramenta</h4>
                            <p className="text-[10px] text-gray-600">Explore o ecossistema Mindy</p>
                        </div>
                        {modes.map((m) => (
                            <button 
                                key={m.id}
                                onClick={() => setActiveMode(m.id as Mode)}
                                className={`flex flex-col text-left p-5 rounded-3xl transition-all duration-500 group relative ${
                                    activeMode === m.id 
                                        ? 'bg-white/10 text-white shadow-xl ring-1 ring-white/20' 
                                        : 'text-gray-500 hover:bg-white/[0.05] hover:text-gray-300'
                                }`}
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <div className={`p-2 rounded-xl transition-all duration-300 ${activeMode === m.id ? 'bg-purple-600 text-white shadow-[0_0_10px_rgba(168,85,247,0.5)]' : 'bg-white/5 group-hover:bg-white/10'}`}>
                                        {m.icon}
                                    </div>
                                    <span className="font-bold text-sm tracking-wide">{m.label}</span>
                                </div>
                                <p className="text-[10px] opacity-60 leading-tight">{m.desc}</p>
                                {activeMode === m.id && (
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-400">
                                        <ChevronRight size={16} />
                                    </div>
                                )}
                            </button>
                        ))}

                        <div className="mt-auto pt-8 border-t border-white/5 opacity-50">
                            <div className="flex items-center gap-2 text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                Gemini Engine v3.0
                            </div>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 p-8 md:p-12 bg-black/40 min-h-[500px] backdrop-blur-2xl">
                        {activeMode === 'chat' && <ChatView />}
                        {activeMode === 'generate' && <GenerateView />}
                        {activeMode === 'edit' && <EditView />}
                    </div>
                </div>
            </div>
        </FadeIn>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </section>
  );
};