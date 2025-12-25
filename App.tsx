import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { 
  Bot, 
  Settings, 
  Send, 
  PlusCircle, 
  Loader2, 
  BrainCircuit, 
  Sparkles, 
  Wand2, 
  Image as ImageIcon,
  Download,
  Upload,
  ArrowUpRight,
  User,
  LayoutDashboard,
  MessageSquare,
  FlaskConical
} from 'lucide-react';

// --- Types ---
type View = 'dashboard' | 'chat' | 'lab' | 'settings';

// --- Models ---
const AI_MODELS = {
    chat: 'gemini-3-pro-preview',
    generate: 'gemini-3-pro-image-preview',
    edit: 'gemini-2.5-flash-image'
};

const App: React.FC = () => {
    const [currentView, setCurrentView] = useState<View>('dashboard');
    const [messages, setMessages] = useState<{role: 'user' | 'model', text: string, isThinking?: boolean}[]>([
        { role: 'model', text: "Saudações, Usuário. MINDy ELITE V2.0 está online. Analisei seus padrões de gastos e sua taxa de economia subiu 12.4% esta semana. Deseja um detalhamento?" }
    ]);
    const [chatInput, setChatInput] = useState('');
    const [isThinking, setIsThinking] = useState(false);
    const [loading, setLoading] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    // Image Gen State
    const [genPrompt, setGenPrompt] = useState('');
    const [imageSize, setImageSize] = useState<'1K' | '2K' | '4K'>('1K');
    const [genResult, setGenResult] = useState<string | null>(null);

    // Image Edit State
    const [editPrompt, setEditPrompt] = useState('');
    const [editFile, setEditFile] = useState<File | null>(null);
    const [editResult, setEditResult] = useState<string | null>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleChatSend = async () => {
        if (!chatInput.trim() || loading) return;
        const msg = chatInput;
        setChatInput('');
        setMessages(prev => [...prev, { role: 'user', text: msg }]);
        setLoading(true);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const config: any = {};
            if (isThinking) {
                config.thinkingConfig = { thinkingBudget: 32768 };
            }

            const response = await ai.models.generateContent({
                model: AI_MODELS.chat,
                contents: [{ role: 'user', parts: [{ text: msg }] }],
                config: config
            });

            setMessages(prev => [...prev, { 
                role: 'model', 
                text: response.text || "Erro no processamento.",
                isThinking: isThinking 
            }]);
        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, { role: 'model', text: "Falha na conexão neural. Tente novamente." }]);
        } finally {
            setLoading(false);
        }
    };

    const handleGenerate = async () => {
        if (!genPrompt || loading) return;
        setLoading(true);
        try {
            // @ts-ignore
            if (window.aistudio && !await window.aistudio.hasSelectedApiKey()) {
                // @ts-ignore
                await window.aistudio.openSelectKey();
            }
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                model: AI_MODELS.generate,
                contents: { parts: [{ text: genPrompt }] },
                config: { imageConfig: { imageSize, aspectRatio: "1:1" } }
            });
            for (const part of response.candidates?.[0]?.content?.parts || []) {
                if (part.inlineData) {
                    setGenResult(`data:image/png;base64,${part.inlineData.data}`);
                    break;
                }
            }
        } catch (error) {
            console.error(error);
            alert("Erro na síntese de imagem.");
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = async () => {
        if (!editFile || !editPrompt || loading) return;
        setLoading(true);
        try {
            const reader = new FileReader();
            const base64Promise = new Promise<string>((resolve) => {
                reader.onload = () => resolve((reader.result as string).split(',')[1]);
                reader.readAsDataURL(editFile);
            });
            const base64 = await base64Promise;
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                model: AI_MODELS.edit,
                contents: {
                    parts: [
                        { inlineData: { mimeType: editFile.type, data: base64 } },
                        { text: editPrompt }
                    ]
                }
            });
            for (const part of response.candidates?.[0]?.content?.parts || []) {
                if (part.inlineData) {
                    setEditResult(`data:image/png;base64,${part.inlineData.data}`);
                    break;
                }
            }
        } catch (error) {
            console.error(error);
            alert("Erro na edição neural.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen bg-black font-body text-white">
            {/* Background Orbs */}
            <div className="bg-gradient-orb w-96 h-96 bg-primary top-[-100px] left-[-100px] animate-pulse"></div>
            <div className="bg-gradient-orb w-80 h-80 bg-neon-cyan bottom-[-50px] right-[-50px] opacity-40"></div>
            <div className="bg-gradient-orb w-64 h-64 bg-neon-magenta top-[40%] left-[30%] opacity-30"></div>

            {/* Main Container (Mobile style) */}
            <div className="relative z-10 flex flex-col h-screen max-w-md mx-auto glass-panel border-x border-glass-border shadow-2xl overflow-hidden">
                
                {/* Header */}
                <header className="flex justify-between items-center px-6 py-4 border-b border-glass-border bg-black/40 backdrop-blur-md sticky top-0 z-50">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full border border-neon-cyan/50 p-0.5 relative shadow-[0_0_15px_rgba(6,182,212,0.4)] overflow-hidden">
                            <img alt="MINDy AI" className="w-full h-full object-cover grayscale contrast-125" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMpk_iNPWWsMfa1aAb2oITURak-uQGpfIw2UzV-_Dow_I01p4DivFKEcgCK7EStSCQHXfhQMWU9qXgiEwWMpbPzyY1-itw3uxBYFjQtAKZoIIkGy05P7cs90upK6qFxt8-a2dMbd-Q1lI7yHoP_dC--ZYgDqkSLOFfXxLIMWrfJgulYmMX5062at1Sdbs60ftA1wLCwowuc35t_BNlFNR5fIricD_uc848Vt2KWo0PBa1TgRTAEUe8YxiJiY5xfSIEwC--60sJIME"/>
                            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border border-black shadow-[0_0_8px_#22c55e]"></div>
                        </div>
                        <div>
                            <h1 className="font-display font-bold text-lg tracking-wider text-white">MINDy <span className="text-xs font-mono text-neon-cyan align-top opacity-80">v2.0</span></h1>
                            <div className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                <span className="text-[10px] font-mono text-gray-400 tracking-widest uppercase">Elite Core Live</span>
                            </div>
                        </div>
                    </div>
                    <button onClick={() => setCurrentView('settings')} className="p-2 rounded-full hover:bg-white/5 transition-colors group">
                        <Settings className="w-5 h-5 text-gray-400 group-hover:text-neon-cyan transition-colors" />
                    </button>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto no-scrollbar relative custom-scrollbar">
                    
                    {/* View: Dashboard */}
                    {currentView === 'dashboard' && (
                        <div className="p-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="text-center">
                                <div className="inline-block px-3 py-1 mb-4 rounded-full border border-neon-magenta/30 bg-neon-magenta/10 backdrop-blur-sm">
                                    <p className="text-[10px] font-mono text-neon-magenta tracking-[0.2em] uppercase">MIND_CORE_STATUS: OPTIMAL</p>
                                </div>
                                <h2 className="font-display text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-gray-400 mb-2 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                                    DASHBOARD <br/> <span className="text-primary neon-text-pulse tracking-tighter">ELITE ANALYTICS</span>
                                </h2>
                            </div>

                            {/* Balance Card */}
                            <div className="relative p-6 rounded-2xl glass-panel group overflow-hidden border border-white/10 shadow-glass">
                                <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary/20 blur-[50px] rounded-full"></div>
                                <div className="relative z-10">
                                    <div className="flex justify-between items-start mb-2">
                                        <h2 className="text-xs font-mono text-gray-400 uppercase tracking-widest">Saldo Atual</h2>
                                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-500/20 text-green-400 border border-green-500/30">+12.4% ESTE MÊS</span>
                                    </div>
                                    <div className="flex items-baseline gap-1 mt-1">
                                        <span className="text-3xl font-display font-bold text-white tracking-wide">R$ 142.850,00</span>
                                    </div>
                                    <div className="mt-4 flex gap-3">
                                        <button onClick={() => setCurrentView('chat')} className="flex-1 py-2.5 px-4 rounded-lg bg-gradient-to-r from-primary to-purple-800 text-white text-xs font-bold font-display uppercase tracking-wider shadow-neon hover:scale-105 transition-all border border-white/10 flex items-center justify-center gap-2">
                                            <MessageSquare className="w-4 h-4" /> Analisar
                                        </button>
                                        <button onClick={() => setCurrentView('lab')} className="flex-1 py-2.5 px-4 rounded-lg glass-panel hover:bg-white/5 text-neon-cyan text-xs font-bold font-display uppercase tracking-wider border border-cyan-500/30 transition-all flex items-center justify-center gap-2">
                                            <FlaskConical className="w-4 h-4" /> Laboratório
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Subscriptions Widget */}
                            <div className="glass-panel rounded-xl border border-white/10 overflow-hidden relative group p-5">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-cyan via-primary to-neon-magenta"></div>
                                <div className="flex justify-between items-end mb-2">
                                    <h3 className="font-display text-sm font-bold text-gray-200 uppercase tracking-tighter">Assinaturas_Matrix</h3>
                                    <span className="font-mono text-xs text-neon-magenta">-$142.00</span>
                                </div>
                                <div className="space-y-3 mt-4">
                                    {[
                                        { label: 'SaaS / Dev', val: 45, color: 'bg-neon-cyan' },
                                        { label: 'Streaming', val: 30, color: 'bg-neon-magenta' }
                                    ].map(item => (
                                        <div key={item.label} className="relative pt-1">
                                            <div className="flex mb-1 items-center justify-between">
                                                <span className="text-[10px] font-mono uppercase text-gray-400">{item.label}</span>
                                                <span className="text-[10px] font-mono font-bold text-white">{item.val}%</span>
                                            </div>
                                            <div className="overflow-hidden h-1.5 flex rounded bg-gray-800">
                                                <div className={`h-full ${item.color}`} style={{ width: `${item.val}%` }}></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Quick Stats Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 glass-panel rounded-xl border-l-2 border-neon-cyan">
                                    <span className="text-[10px] font-mono text-gray-500 uppercase">Latência</span>
                                    <div className="text-xl font-display font-bold mt-1">24ms</div>
                                </div>
                                <div className="p-4 glass-panel rounded-xl border-l-2 border-neon-magenta">
                                    <span className="text-[10px] font-mono text-gray-500 uppercase">Acurácia IA</span>
                                    <div className="text-xl font-display font-bold mt-1">99.8%</div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* View: Chat (Conversational Interface) */}
                    {currentView === 'chat' && (
                        <div className="flex flex-col h-full p-4 space-y-4 animate-in fade-in duration-300">
                            <div className="flex-1 space-y-4 pb-24 overflow-y-auto no-scrollbar custom-scrollbar">
                                {messages.map((msg, i) => (
                                    <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                        <div className="flex-shrink-0 mt-1">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold font-display shadow-lg ${msg.role === 'model' ? 'bg-gradient-to-br from-primary to-blue-600 shadow-primary/40' : 'bg-gray-800'}`}>
                                                {msg.role === 'model' ? 'AI' : <User className="w-4 h-4" />}
                                            </div>
                                        </div>
                                        <div className={`max-w-[85%] rounded-2xl px-4 py-3 border shadow-lg ${
                                            msg.role === 'model' 
                                                ? 'glass-panel rounded-tl-sm border-white/5 text-gray-200' 
                                                : 'bg-primary/20 backdrop-blur-xl rounded-tr-sm border-primary/30 text-white'
                                        }`}>
                                            {msg.isThinking && <div className="flex items-center gap-1.5 mb-1 text-[8px] font-mono text-primary uppercase animate-pulse"><BrainCircuit size={10} /> Deep Thinking Mode</div>}
                                            <p className="text-sm leading-relaxed font-light">{msg.text}</p>
                                        </div>
                                    </div>
                                ))}
                                {loading && (
                                    <div className="flex gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-[10px] font-bold font-display animate-pulse">AI</div>
                                        <div className="glass-panel rounded-2xl rounded-tl-sm px-4 py-3 border border-white/5 flex space-x-1">
                                            <div className="w-1.5 h-1.5 bg-neon-cyan rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                                            <div className="w-1.5 h-1.5 bg-neon-magenta rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                            <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                                        </div>
                                    </div>
                                )}
                                <div ref={chatEndRef}></div>
                            </div>
                        </div>
                    )}

                    {/* View: Laboratory (Image Gen/Edit) */}
                    {currentView === 'lab' && (
                        <div className="p-6 space-y-8 animate-in slide-in-from-right-4 duration-500">
                             <div className="flex items-center gap-2 mb-2">
                                <FlaskConical className="text-neon-cyan w-5 h-5" />
                                <h2 className="font-display font-bold text-xl uppercase tracking-widest text-white">Synthesizer_LAB</h2>
                             </div>
                             
                             {/* Image Gen */}
                             <div className="space-y-4 glass-panel p-5 rounded-2xl border-white/10">
                                <div className="flex items-center justify-between">
                                    <label className="text-[10px] font-mono text-gray-500 uppercase">Geração PRO (Gemini 3)</label>
                                    <div className="flex gap-1">
                                        {['1K', '2K', '4K'].map(s => (
                                            <button 
                                                key={s} 
                                                onClick={() => setImageSize(s as any)}
                                                className={`px-2 py-0.5 rounded text-[8px] font-bold border transition-all ${imageSize === s ? 'bg-primary border-primary text-white' : 'border-white/10 text-gray-500'}`}
                                            >
                                                {s}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <textarea 
                                    value={genPrompt}
                                    onChange={e => setGenPrompt(e.target.value)}
                                    placeholder="Descreva o asset financeiro..."
                                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-sm focus:ring-primary/50 focus:border-primary resize-none h-20"
                                />
                                <button 
                                    onClick={handleGenerate}
                                    disabled={loading || !genPrompt}
                                    className="w-full py-2.5 bg-primary rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-neon hover:scale-105 transition-all disabled:opacity-50"
                                >
                                    {loading ? <Loader2 className="animate-spin w-4 h-4" /> : <Sparkles className="w-4 h-4" />} Sintetizar Asset
                                </button>
                                {genResult && (
                                    <div className="relative mt-4 rounded-xl overflow-hidden border border-white/20 group">
                                        <img src={genResult} className="w-full aspect-square object-cover" />
                                        <a href={genResult} download="mindy_asset.png" className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                                            <Download className="text-white w-8 h-8" />
                                        </a>
                                    </div>
                                )}
                             </div>

                             {/* Image Edit */}
                             <div className="space-y-4 glass-panel p-5 rounded-2xl border-white/10">
                                <label className="text-[10px] font-mono text-gray-500 uppercase block">Edição Neural (Flash AI)</label>
                                <div className="flex items-center gap-4">
                                    <input type="file" id="edit-file" className="hidden" onChange={e => setEditFile(e.target.files?.[0] || null)} />
                                    <button onClick={() => document.getElementById('edit-file')?.click()} className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all flex flex-col items-center gap-1 min-w-24">
                                        <Upload className="w-5 h-5 text-neon-magenta" />
                                        <span className="text-[10px] font-mono text-gray-400">{editFile ? 'Trocar' : 'Upload'}</span>
                                    </button>
                                    <div className="flex-1">
                                        <input 
                                            value={editPrompt}
                                            onChange={e => setEditPrompt(e.target.value)}
                                            placeholder="Ex: 'Adicione filtro neon'"
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-sm focus:ring-neon-magenta/50 focus:border-neon-magenta"
                                        />
                                        <button 
                                            onClick={handleEdit}
                                            disabled={loading || !editFile || !editPrompt}
                                            className="w-full mt-2 py-2 border border-neon-magenta text-neon-magenta rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-neon-magenta hover:text-white transition-all disabled:opacity-30"
                                        >
                                            {loading ? <Loader2 className="animate-spin w-3 h-3 mx-auto" /> : 'Aplicar Modificação'}
                                        </button>
                                    </div>
                                </div>
                                {editResult && (
                                    <div className="mt-4 rounded-xl overflow-hidden border border-neon-magenta/30">
                                        <img src={editResult} className="w-full object-cover" />
                                    </div>
                                )}
                             </div>
                        </div>
                    )}

                    {/* View: Settings */}
                    {currentView === 'settings' && (
                        <div className="p-8 space-y-8 animate-in fade-in duration-300">
                             <div className="space-y-2">
                                <h2 className="font-display text-2xl font-bold text-white tracking-tight">SYSTEM_CFG</h2>
                                <div className="h-0.5 w-12 bg-primary rounded-full shadow-[0_0_10px_rgba(168,85,247,1)]"></div>
                             </div>

                             <div className="glass-panel rounded-2xl p-5 border-white/10 space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-xl overflow-hidden border border-neon-cyan/50 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                                        <img src="https://picsum.photos/100/100" className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">Unit_Elite_X9</h3>
                                        <p className="font-mono text-xs text-gray-500 tracking-tighter">SEC_ID: #882-99-PRO</p>
                                    </div>
                                </div>
                                
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center p-3 glass-panel rounded-xl border-white/5">
                                        <span className="text-sm font-medium">Auto-Categorização</span>
                                        <div className="w-10 h-5 bg-primary rounded-full relative"><div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5"></div></div>
                                    </div>
                                    <div className="flex justify-between items-center p-3 glass-panel rounded-xl border-white/5">
                                        <span className="text-sm font-medium">Thinking Budget (Max)</span>
                                        <span className="text-[10px] font-mono text-primary font-bold">32.768 tkn</span>
                                    </div>
                                </div>
                             </div>
                             
                             <button onClick={() => setCurrentView('dashboard')} className="w-full py-4 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors">
                                Voltar ao Core
                             </button>
                        </div>
                    )}

                    <div className="h-24"></div>
                </main>

                {/* Bottom Input Area (Always available in chat mode) */}
                {(currentView === 'chat' || currentView === 'dashboard') && (
                    <div className="absolute bottom-[60px] left-0 right-0 px-4 pb-2 z-40 bg-gradient-to-t from-black via-black/80 to-transparent pt-10">
                        <div className="relative flex flex-col gap-2">
                            {/* Thinking Toggle */}
                            {currentView === 'chat' && (
                                <button 
                                    onClick={() => setIsThinking(!isThinking)}
                                    className={`self-end flex items-center gap-1.5 px-3 py-1 rounded-full text-[8px] font-bold uppercase tracking-widest border transition-all duration-300 ${isThinking ? 'bg-primary/20 border-primary text-primary shadow-[0_0_10px_rgba(168,85,247,0.3)]' : 'bg-black/40 border-white/10 text-gray-500'}`}
                                >
                                    <BrainCircuit size={10} className={isThinking ? 'animate-pulse' : ''} />
                                    Deep Thinking {isThinking ? 'ON' : 'OFF'}
                                </button>
                            )}
                            <div className="relative flex items-center glass-panel rounded-full border border-white/20 shadow-neon group focus-within:border-neon-cyan/60 transition-all duration-300">
                                <button onClick={() => setCurrentView('lab')} className="p-3 text-neon-cyan/70 hover:text-neon-cyan transition-colors">
                                    <PlusCircle className="w-5 h-5" />
                                </button>
                                <input 
                                    value={chatInput}
                                    onChange={e => setChatInput(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && handleChatSend()}
                                    className="w-full bg-transparent border-none text-white placeholder-gray-500 focus:ring-0 text-sm font-light py-3 px-1" 
                                    placeholder="Pergunte à MINDy..." 
                                    type="text"
                                />
                                <button onClick={handleChatSend} disabled={loading || !chatInput.trim()} className="p-3 pr-4 text-neon-magenta hover:text-white transition-colors disabled:opacity-20">
                                    <Send className="w-5 h-5 transform -rotate-45" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Tab Navigation Footer */}
                <footer className="absolute bottom-0 w-full glass-panel border-t border-glass-border py-3 px-8 z-50 bg-black/60 backdrop-blur-xl flex justify-between">
                    {[
                        { id: 'dashboard', icon: <LayoutDashboard size={20} /> },
                        { id: 'chat', icon: <MessageSquare size={20} /> },
                        { id: 'lab', icon: <FlaskConical size={20} /> },
                        { id: 'settings', icon: <Settings size={20} /> }
                    ].map(tab => (
                        <button 
                            key={tab.id}
                            onClick={() => setCurrentView(tab.id as View)}
                            className={`p-2 rounded-xl transition-all duration-300 ${currentView === tab.id ? 'text-primary scale-125 shadow-[0_0_15px_rgba(168,85,247,0.3)] bg-white/5' : 'text-gray-500 hover:text-gray-300'}`}
                        >
                            {tab.icon}
                        </button>
                    ))}
                </footer>
            </div>
        </div>
    );
};

export default App;