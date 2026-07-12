import React, { useState, useEffect, useRef } from 'react';
import { 
  Sun, MapPin, Briefcase, Truck, Wifi, Shield, Zap, VolumeX, Trash2, Smile, Car, Phone, 
  Search, Info, AlertTriangle, ArrowRight, CheckCircle2, MessageSquare, ChevronDown, ChevronUp, 
  Mail, Clock, User, HelpCircle, ExternalLink, RefreshCw, Send, Check, X, Building, 
  PhoneCall, Calendar, CheckSquare, ClipboardList, ShieldAlert, Home, Cloud, CloudSun, CloudRain
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  guideArticles, faqItems, contactList, GuideArticle, FAQItem, ContactInfo, localGuideItems, LocalGuideItem 
} from './data';

export default function App() {
  // Navigation & Tabs State
  const [activeTab, setActiveTab] = useState<'inicio' | 'nosso-flat' | 'condominio' | 'guia-local' | 'regras' | 'suporte'>('inicio');
  
  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  
  // Highlighted Article (when clicked from search)
  const [highlightedArticleId, setHighlightedArticleId] = useState<string | null>(null);

  // Checklist State (Arrival & Stay Checklist)
  const [checklist, setChecklist] = useState<{ [key: string]: boolean }>(() => {
    try {
      const saved = localStorage.getItem('sunsquare_checklist');
      return saved ? JSON.parse(saved) : {
        'checkin': false,
        'voltagem': false,
        'piscina': false,
        'lixo': false
      };
    } catch {
      return {
        'checkin': false,
        'voltagem': false,
        'piscina': false,
        'lixo': false
      };
    }
  });

  // Submitted Tickets State (Support tab)
  const [tickets, setTickets] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('sunsquare_tickets');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Support Form State
  const [formCategory, setFormCategory] = useState<'Dúvida' | 'Manutenção' | 'Sugestão' | 'Outro'>('Dúvida');
  const [formSubject, setFormSubject] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // FAQ Accordion Active Index State
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null);
  
  // Interactive Map State (Floor info on Home)
  const [activeFloor, setActiveFloor] = useState<'mezanino' | 'terreo' | 'subsolo'>('mezanino');

  // Rules Tab Filter
  const [rulesFilter, setRulesFilter] = useState<string>('Todas');

  // Local Guide Category Filter
  const [guideFilter, setGuideFilter] = useState<string>('Todos');

  // Logo Error State for Fallback
  const [logoError, setLogoError] = useState(false);

  // Greetings based on local hour
  const [greeting, setGreeting] = useState('Olá');
  const [currentTime, setCurrentTime] = useState('');
  const [currentDateStr, setCurrentDateStr] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setGreeting('Bom dia');
    } else if (hour >= 12 && hour < 18) {
      setGreeting('Boa tarde');
    } else {
      setGreeting('Boa noite');
    }

    const updateDateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }));
      
      const day = now.getDate();
      const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
      const month = monthNames[now.getMonth()];
      const dayOfWeekNames = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
      const dayOfWeek = dayOfWeekNames[now.getDay()];
      
      setCurrentDateStr(`${dayOfWeek}, ${day} de ${month}`);
    };
    updateDateTime();
    const interval = setInterval(updateDateTime, 15000);
    return () => clearInterval(interval);
  }, []);

  // Save checklist progress to localStorage
  useEffect(() => {
    localStorage.setItem('sunsquare_checklist', JSON.stringify(checklist));
  }, [checklist]);

  // Save tickets to localStorage
  useEffect(() => {
    localStorage.setItem('sunsquare_tickets', JSON.stringify(tickets));
  }, [tickets]);

  // Clear highlighted article timer
  useEffect(() => {
    if (highlightedArticleId) {
      const timer = setTimeout(() => {
        setHighlightedArticleId(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [highlightedArticleId]);

  // Dynamic 5-day weather forecast generator for Goiânia
  const getNext5DaysForecast = () => {
    const daysOfWeekShort = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const now = new Date();
    const forecastData = [
      { tempMax: 31, tempMin: 19, desc: 'Ensolarado', icon: 'sun' },
      { tempMax: 32, tempMin: 20, desc: 'Ensolarado', icon: 'sun' },
      { tempMax: 29, tempMin: 18, desc: 'Parcialmente Nublado', icon: 'cloud-sun' },
      { tempMax: 28, tempMin: 18, desc: 'Nublado', icon: 'cloud' },
      { tempMax: 30, tempMin: 19, desc: 'Pancadas de Chuva', icon: 'cloud-rain' }
    ];
    
    return Array.from({ length: 5 }).map((_, i) => {
      const targetDate = new Date();
      targetDate.setDate(now.getDate() + i + 1);
      const dayLabel = daysOfWeekShort[targetDate.getDay()];
      const forecast = forecastData[i % forecastData.length];
      return {
        day: dayLabel,
        ...forecast
      };
    });
  };

  // Helper to map icon name to component
  const renderArticleIcon = (iconName: string, className = "w-6 h-6") => {
    switch (iconName) {
      case 'Sun': return <Sun className={className} />;
      case 'MapPin': return <MapPin className={className} />;
      case 'Briefcase': return <Briefcase className={className} />;
      case 'Truck': return <Truck className={className} />;
      case 'Wifi': return <Wifi className={className} />;
      case 'Shield': return <Shield className={className} />;
      case 'Zap': return <Zap className={className} />;
      case 'VolumeX': return <VolumeX className={className} />;
      case 'Trash2': return <Trash2 className={className} />;
      case 'Smile': return <Smile className={className} />;
      case 'Car': return <Car className={className} />;
      case 'Phone': return <Phone className={className} />;
      default: return <HelpCircle className={className} />;
    }
  };

  // Toggle checklist task
  const toggleChecklist = (taskKey: string) => {
    setChecklist(prev => ({
      ...prev,
      [taskKey]: !prev[taskKey]
    }));
  };

  // Calculate integration journey progress
  const completedCount = Object.values(checklist).filter(Boolean).length;
  const totalChecklistCount = Object.keys(checklist).length;
  const checklistProgressPercent = Math.round((completedCount / totalChecklistCount) * 100);

  // Handle support form submission
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formSubject.trim() || !formMessage.trim()) return;

    setSubmitting(true);
    setTimeout(() => {
      const newTicket = {
        id: `SQ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
        category: formCategory,
        subject: formSubject,
        message: formMessage,
        date: new Date().toLocaleDateString('pt-BR'),
        status: 'Em análise'
      };
      setTickets(prev => [newTicket, ...prev]);
      setFormSubject('');
      setFormMessage('');
      setSubmitting(false);
      setFormSuccess(true);
    }, 1000);
  };

  // Perform multi-field search across articles, FAQs, and contacts
  const getSearchResults = () => {
    if (!searchQuery.trim()) return { articles: [], faqs: [], contacts: [] };
    const query = searchQuery.toLowerCase().trim();

    const filteredArticles = guideArticles.filter(art => 
      art.title.toLowerCase().includes(query) ||
      art.excerpt.toLowerCase().includes(query) ||
      art.content.toLowerCase().includes(query) ||
      art.category.toLowerCase().includes(query) ||
      art.tags.some(t => t.toLowerCase().includes(query))
    );

    const filteredFaqs = faqItems.filter(faq => 
      faq.question.toLowerCase().includes(query) ||
      faq.answer.toLowerCase().includes(query) ||
      faq.category.toLowerCase().includes(query)
    );

    const filteredContacts = contactList.filter(c => 
      c.name.toLowerCase().includes(query) ||
      c.role.toLowerCase().includes(query) ||
      c.email.toLowerCase().includes(query) ||
      c.phone.includes(query)
    );

    return {
      articles: filteredArticles,
      faqs: filteredFaqs,
      contacts: filteredContacts
    };
  };

  const searchResults = getSearchResults();
  const hasSearchResults = searchQuery.trim().length > 0;
  const totalResultsCount = searchResults.articles.length + searchResults.faqs.length + searchResults.contacts.length;

  // Jump from Search Results to active section
  const handleSearchResultClick = (tab: 'inicio' | 'nosso-flat' | 'condominio' | 'guia-local' | 'regras' | 'suporte', articleId: string) => {
    setActiveTab(tab);
    setSearchQuery('');
    setHighlightedArticleId(articleId);
    if (tab === 'guia-local') {
      const art = guideArticles.find(a => a.id === articleId);
      if (art) {
        setGuideFilter(art.category);
      } else {
        setGuideFilter('Todos');
      }
    }
    
    // Smooth scroll to the article after tab change render
    setTimeout(() => {
      const el = document.getElementById(articleId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  // Direct quick action navigation
  const triggerQuickAction = (tab: 'inicio' | 'nosso-flat' | 'condominio' | 'guia-local' | 'regras' | 'suporte', articleId: string) => {
    setActiveTab(tab);
    setHighlightedArticleId(articleId);
    if (tab === 'guia-local') {
      const art = guideArticles.find(a => a.id === articleId);
      if (art) {
        setGuideFilter(art.category);
      } else {
        setGuideFilter('Todos');
      }
    }
    setTimeout(() => {
      const el = document.getElementById(articleId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 150);
  };

  // Copy to clipboard helper with alert feedback
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col font-sans selection:bg-brand-100 selection:text-brand-700 pb-24 md:pb-28">
      
      {/* HEADER FIXO E ATIVO COM BARRA DE PESQUISA E ABAS */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all duration-300">
        <div className="max-w-4xl mx-auto px-4 pt-3 pb-0">
          
          {/* Logo e Titulação */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              {!logoError ? (
                <div className="relative w-10 h-10 shrink-0">
                  <img
                    src="https://lh3.googleusercontent.com/d/1edOUDJqfcW_d_drNk7wOv8aIQk5zwVs6"
                    alt="Sun Square Logo"
                    className="w-10 h-10 object-cover rounded-xl shadow-md border border-slate-100 bg-white"
                    referrerPolicy="no-referrer"
                    onError={() => setLogoError(true)}
                  />
                </div>
              ) : (
                <div className="p-1.5 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg text-white shadow-md shadow-blue-100">
                  <Sun className="w-5 h-5" />
                </div>
              )}
              <div>
                <h1 className="text-lg md:text-xl font-display font-bold tracking-tight text-slate-800 flex items-center gap-1.5">
                  Sun Square
                </h1>
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Guia de Boas Vindas</p>
              </div>
            </div>
            
            {/* Action Badges */}
            <div className="flex items-center gap-1.5 md:gap-2">
              <button
                onClick={() => triggerQuickAction('suporte', 'contatos-uteis')}
                className="animate-police-strobe flex items-center gap-1 px-2.5 py-1.5 bg-red-600 hover:bg-red-700 text-white font-extrabold text-[10px] md:text-xs rounded-full shadow-lg active:scale-95 hover:scale-102 cursor-pointer transition-all duration-150 uppercase tracking-wider"
                title="Canais de Emergência"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-white animate-pulse shrink-0" />
                <span>Emergência</span>
              </button>
            </div>
          </div>

          {/* Barra de Pesquisa Ativa (Visível em todas as abas) */}
          <div className="relative mb-3.5">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar regras, wi-fi, contatos, churrasqueira..."
              className="w-full pl-10 pr-10 py-2.5 bg-slate-100/80 hover:bg-slate-100 focus:bg-white text-sm text-slate-800 placeholder-slate-400 rounded-full border-none focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200 shadow-inner"
              id="global-search-bar"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                title="Limpar busca"
              >
                <X className="w-4 h-4 bg-slate-200 rounded-full p-0.5" />
              </button>
            )}
          </div>

          {/* Abas de Navegação Fixas e Visíveis */}
          <nav className="flex border-b border-slate-100 justify-between sm:justify-start sm:gap-4 overflow-x-auto scrollbar-none" id="tabs-navigation">
            {[
              { id: 'inicio', label: 'Início', icon: Sun },
              { id: 'nosso-flat', label: 'Nosso Flat', icon: Home },
              { id: 'condominio', label: 'O Condomínio', icon: Building },
              { id: 'guia-local', label: 'Guia Local', icon: MapPin },
              { id: 'regras', label: 'Regras', icon: ClipboardList },
              { id: 'suporte', label: 'Suporte', icon: Phone }
            ].map((tab) => {
              const IconComponent = tab.icon;
              const isActive = activeTab === tab.id && !hasSearchResults;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    setSearchQuery(''); // Clear search on explicit tab change to return to normal view
                  }}
                  className={`relative flex items-center justify-center gap-1.5 py-3 px-3.5 md:px-5 text-xs md:text-sm font-semibold transition-all duration-300 outline-none select-none flex-1 sm:flex-initial text-center border-b-2 whitespace-nowrap ${
                    isActive 
                      ? 'text-blue-600 border-blue-600' 
                      : 'text-slate-500 border-transparent hover:text-slate-700 hover:border-slate-200'
                  }`}
                  id={`tab-button-${tab.id}`}
                >
                  <IconComponent className={`w-3.5 h-3.5 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                  {tab.label}
                  {isActive && (
                    <motion.div 
                      layoutId="activeTabIndicator" 
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 to-indigo-600" 
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Categorias do Guia Local fixas no topo (quando a aba ativa for guia-local) */}
          {activeTab === 'guia-local' && !hasSearchResults && (
            <div className="flex gap-1.5 overflow-x-auto scrollbar-none py-2.5 border-t border-slate-100/60 justify-start" id="guide-categories-sticky">
              {[
                { id: 'Todos', label: 'Todos', icon: MapPin },
                { id: 'Gastronomia', label: 'Gastronomia', icon: Smile },
                { id: 'Serviços', label: 'Serviços', icon: Briefcase },
                { id: 'Saúde e Estética', label: 'Estética & Veículos', icon: Zap },
                { id: 'Lazer e Cultura', label: 'Lazer & Cultura', icon: Sun }
              ].map((cat) => {
                const IconComponent = cat.icon;
                const isSelected = guideFilter === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setGuideFilter(cat.id)}
                    className={`py-1.5 px-3 rounded-full text-[11px] font-bold whitespace-nowrap outline-none transition-all duration-200 flex items-center gap-1 cursor-pointer transition-colors ${
                      isSelected 
                        ? 'bg-blue-600 text-white shadow-xs' 
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
                    }`}
                  >
                    <IconComponent className={`w-3 h-3 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                    {cat.label}
                  </button>
                );
              })}
            </div>
          )}

        </div>
      </header>

      {/* ÁREA DE NOTIFICAÇÃO TEMPORÁRIA */}
      <AnimatePresence>
        {copiedText && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-xs px-4 py-2 rounded-full shadow-lg flex items-center gap-2 border border-slate-800"
          >
            <Check className="w-3.5 h-3.5 text-green-400" />
            <span>Copiado: <span className="font-semibold text-blue-300">{copiedText}</span></span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CONTEÚDO PRINCIPAL (COM TRANSIÇÃO E FILTROS) */}
      <main className="flex-grow max-w-4xl w-full mx-auto px-4 py-6 md:py-8 flex flex-col gap-6">
        
        {/* VIEW 1: SE PESQUISA ATIVA, EXIBE RESULTADOS DA BUSCA EM TODAS AS ABAS */}
        <AnimatePresence mode="wait">
          {hasSearchResults ? (
            <motion.div
              key="search-results-pane"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="flex flex-col gap-5"
            >
              {/* Header de Busca */}
              <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-center justify-between">
                <div>
                  <h2 className="text-base font-display font-bold text-slate-800">Resultados da Pesquisa</h2>
                  <p className="text-xs text-slate-500">Encontramos <span className="font-semibold text-blue-600">{totalResultsCount}</span> correspondências para &ldquo;<span className="italic font-medium text-slate-700">{searchQuery}</span>&rdquo;</p>
                </div>
                <button 
                  onClick={() => setSearchQuery('')}
                  className="text-xs text-blue-600 hover:text-blue-700 font-semibold bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors"
                >
                  Limpar Busca
                </button>
              </div>

              {totalResultsCount === 0 ? (
                /* Estado Vazio de Busca */
                <div className="bg-white rounded-2xl p-10 border border-slate-100 shadow-sm text-center flex flex-col items-center justify-center">
                  <div className="p-4 bg-slate-50 rounded-full text-slate-400 mb-4">
                    <Search className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-slate-700 mb-1">Nenhum resultado encontrado</h3>
                  <p className="text-xs text-slate-500 max-w-sm mb-4">Certifique-se de que as palavras estão digitadas corretamente ou tente buscar por termos comuns do condomínio.</p>
                  <div className="flex flex-wrap gap-2 justify-center max-w-md">
                    {['wi-fi', 'lixo', 'silêncio', 'pet', 'mudança', 'contato', 'piscina', 'garagem'].map(term => (
                      <button
                        key={term}
                        onClick={() => setSearchQuery(term)}
                        className="text-xs bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-600 font-medium px-3 py-1.5 rounded-full transition-colors border border-slate-200/50"
                      >
                        &ldquo;{term}&rdquo;
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                /* Lista de Resultados Encontrados */
                <div className="flex flex-col gap-4">
                  {/* Artigos Correspondentes */}
                  {searchResults.articles.length > 0 && (
                    <div className="flex flex-col gap-3">
                      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">Guias e Regramentos</h3>
                      <div className="grid gap-3">
                        {searchResults.articles.map(art => (
                          <div 
                            key={art.id}
                            onClick={() => handleSearchResultClick(art.tab, art.id)}
                            className="bg-white rounded-xl p-4 border border-slate-100 hover:border-blue-200 shadow-xs hover:shadow-md cursor-pointer transition-all duration-200 flex gap-4 text-left"
                          >
                            <div className="p-2.5 bg-blue-50 rounded-lg text-blue-600 self-start">
                              {renderArticleIcon(art.icon, "w-5 h-5")}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-[10px] font-semibold uppercase bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md">
                                  {art.tab === 'inicio' ? 'Início' : art.tab === 'nosso-flat' ? 'Nosso Flat' : art.tab === 'condominio' ? 'O Condomínio' : art.tab === 'guia-local' ? 'Guia Local' : art.tab === 'regras' ? 'Regras' : 'Suporte'}
                                </span>
                                <span className="text-[10px] font-medium text-slate-400">&bull; {art.category}</span>
                              </div>
                              <h4 className="text-sm font-bold text-slate-800 hover:text-blue-600 transition-colors mb-1">{art.title}</h4>
                              <p className="text-xs text-slate-500 line-clamp-2">{art.excerpt}</p>
                            </div>
                            <ArrowRight className="w-4 h-4 text-slate-400 self-center" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* FAQs Correspondentes */}
                  {searchResults.faqs.length > 0 && (
                    <div className="flex flex-col gap-3 mt-2">
                      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">Perguntas Frequentes (FAQ)</h3>
                      <div className="grid gap-3">
                        {searchResults.faqs.map((faq, idx) => (
                          <div 
                            key={idx}
                            onClick={() => {
                              setActiveTab('suporte');
                              setSearchQuery('');
                              // Scroll to FAQ section
                              setTimeout(() => {
                                setFaqOpenIndex(idx);
                                document.getElementById('faq-section')?.scrollIntoView({ behavior: 'smooth' });
                              }, 150);
                            }}
                            className="bg-white rounded-xl p-4 border border-slate-100 hover:border-blue-200 shadow-xs cursor-pointer transition-all duration-200"
                          >
                            <div className="flex items-center gap-2 mb-1.5">
                              <span className="text-[10px] font-semibold uppercase bg-blue-50 text-blue-600 px-2 py-0.5 rounded-md">FAQ</span>
                              <span className="text-[10px] font-medium text-slate-400">{faq.category}</span>
                            </div>
                            <h4 className="text-sm font-bold text-slate-800 mb-1">{faq.question}</h4>
                            <p className="text-xs text-slate-500 line-clamp-2 italic">&ldquo;{faq.answer}&rdquo;</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Contatos Correspondentes */}
                  {searchResults.contacts.length > 0 && (
                    <div className="flex flex-col gap-3 mt-2">
                      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">Equipe de Suporte</h3>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {searchResults.contacts.map((c, idx) => (
                          <div 
                            key={idx}
                            onClick={() => {
                              setActiveTab('suporte');
                              setSearchQuery('');
                              setTimeout(() => {
                                document.getElementById('staff-contacts')?.scrollIntoView({ behavior: 'smooth' });
                              }, 150);
                            }}
                            className="bg-white rounded-xl p-4 border border-slate-100 hover:border-blue-200 shadow-xs cursor-pointer transition-all duration-200 flex items-center gap-3"
                          >
                            <div className="p-2 bg-slate-50 rounded-full text-slate-600">
                              <User className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-slate-400">{c.role}</p>
                              <h4 className="text-sm font-bold text-slate-800">{c.name}</h4>
                              <p className="text-xs text-slate-500">{c.phone}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          ) : (
            /* CONTEÚDO DAS ABAS SEGUNDO A SELEÇÃO */
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-6"
            >
              
              {/* --- ABA 1: INÍCIO --- */}
              {activeTab === 'inicio' && (
                <div className="flex flex-col gap-6">
                  {/* Card Boas-Vindas & Widget de Clima/Hora */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 md:p-8 text-white shadow-lg relative overflow-hidden flex flex-col justify-between min-h-[220px]">
                      <div className="absolute right-[-20px] top-[-20px] w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                      <div className="absolute left-[-30px] bottom-[-30px] w-36 h-36 bg-blue-300/10 rounded-full blur-xl pointer-events-none" />
                      
                      <div className="relative z-10 flex flex-col gap-3">
                        <h2 className="text-2xl md:text-3xl font-display font-bold leading-tight">
                          {greeting}! Seja bem-vindo(a)
                        </h2>
                        
                        <p className="text-sm text-white/90 max-w-xl leading-relaxed">
                          Seja muito bem-vindo(a) à Unidade 1208A! Queremos que sua estadia seja extremamente agradável. Tratamos nosso flat com muito carinho e pedimos que cuide do espaço como se fosse seu.
                        </p>
                      </div>

                      <div className="relative z-10">
                        <div className="h-[1px] bg-white/20 my-3" />
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-white/80">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" /> Setor Oeste, Goiânia - GO (Frente à Praça do Sol)
                          </span>
                          <span className="hidden sm:inline">&bull;</span>
                          <span className="flex items-center gap-1">
                            <Building className="w-3.5 h-3.5" /> Unidade 1208A
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Widget Tempo e Hora */}
                    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between gap-4 min-h-[320px]">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-slate-500 font-medium text-xs uppercase tracking-wider">
                          <Clock className="w-4 h-4 text-blue-500" />
                          <span>Hora &amp; Clima</span>
                        </div>
                        <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-bold">Ao Vivo</span>
                      </div>
                      
                      <div className="flex flex-col">
                        <span className="text-3xl font-mono font-bold text-slate-800 tracking-tight leading-none">{currentTime || '--:--'}</span>
                        <span className="text-xs text-slate-400 font-medium mt-1.5 capitalize">{currentDateStr || 'Carregando...'}</span>
                      </div>

                      <div className="h-[1px] bg-slate-100" />

                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-slate-700">Goiânia, GO</span>
                          <span className="text-[11px] text-slate-500 mt-0.5">Ensolarado &bull; 28°C</span>
                        </div>
                        <div className="p-2 bg-amber-50 rounded-xl text-amber-500">
                          <Sun className="w-5 h-5 animate-[spin_15s_linear_infinite]" />
                        </div>
                      </div>

                      <div className="h-[1px] bg-slate-100" />

                      {/* Previsão de 5 Dias */}
                      <div className="flex flex-col gap-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Previsão para 5 dias</span>
                        <div className="grid grid-cols-5 gap-1.5">
                          {getNext5DaysForecast().map((f, idx) => (
                            <div key={idx} className="flex flex-col items-center bg-slate-50/70 py-1.5 px-0.5 rounded-xl border border-slate-100/50 hover:border-blue-100 transition-all">
                              <span className="text-[9px] font-extrabold text-slate-500 uppercase tracking-wider">{f.day}</span>
                              <div className="my-1 shrink-0">
                                {f.icon === 'sun' && <Sun className="w-4 h-4 text-amber-500" />}
                                {f.icon === 'cloud-sun' && <CloudSun className="w-4 h-4 text-sky-400" />}
                                {f.icon === 'cloud' && <Cloud className="w-4 h-4 text-slate-400" />}
                                {f.icon === 'cloud-rain' && <CloudRain className="w-4 h-4 text-blue-500" />}
                              </div>
                              <span className="text-[9px] font-bold text-slate-700">{f.tempMax}°</span>
                              <span className="text-[8px] font-medium text-slate-400">{f.tempMin}°</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Introdução e Informação Complementar */}
                  <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                    {guideArticles.filter(art => art.id === 'bem-vindo').map(art => (
                      <div key={art.id} id={art.id} className="scroll-mt-28">
                        <div className="flex items-center gap-2.5 mb-2">
                          <span className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                            {renderArticleIcon(art.icon, "w-5 h-5")}
                          </span>
                          <h3 className="font-display font-bold text-slate-800 text-base">{art.title}</h3>
                        </div>
                        <div className="text-xs text-slate-600 space-y-3 leading-relaxed whitespace-pre-line mt-3">
                          {art.content}
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              )}

              {/* --- ABA 2: NOSSO FLAT --- */}
              {activeTab === 'nosso-flat' && (
                <div className="flex flex-col gap-6">
                  
                  {/* Instruções de Boas-Vindas (Informações Essenciais de Entrada) */}
                  <div className="bg-white rounded-3xl p-5 md:p-6 border border-slate-100 shadow-sm">
                    <div className="mb-5">
                      <h3 className="font-display font-bold text-slate-800 text-sm md:text-base flex items-center gap-2">
                        <Info className="w-4 h-4 text-blue-600" /> Instruções de Boas-Vindas
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">Pontos importantes para garantir uma estadia agradável e sem imprevistos.</p>
                    </div>

                    {/* Informational Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { 
                          key: 'checkin', 
                          title: 'Horário de Check-in', 
                          desc: 'A recepção funciona 24h, mas o check-in é a partir das 14h. Lembre-se de informar o horário de sua chegada ao anfitrião.',
                          tab: 'regras',
                          target: 'regras-checkin-visitas',
                          icon: <Clock className="w-5 h-5 text-blue-600" />,
                          bg: 'bg-blue-50/50'
                        },
                        { 
                          key: 'voltagem', 
                          title: 'Atenção à Voltagem (220V)', 
                          desc: 'Todas as tomadas do flat são 220V. Cuidado para não danificar seus aparelhos.',
                          tab: 'nosso-flat',
                          target: 'cuidados-sustentabilidade',
                          icon: <Zap className="w-5 h-5 text-amber-600" />,
                          bg: 'bg-amber-50/50'
                        },
                        { 
                          key: 'piscina', 
                          title: 'Uso da Piscina', 
                          desc: 'Localizada no Mezanino. É terminantemente proibido copos ou garrafas de vidro na área.',
                          tab: 'condominio',
                          target: 'diferenciais-condominio',
                          icon: <Smile className="w-5 h-5 text-emerald-600" />,
                          bg: 'bg-emerald-50/50'
                        },
                        { 
                          key: 'lixo', 
                          title: 'Descarte de Lixo', 
                          desc: 'Todo o lixo ensacado deve ser levado e depositado nas lixeiras do Subsolo 1.',
                          tab: 'nosso-flat',
                          target: 'cuidados-sustentabilidade',
                          icon: <Trash2 className="w-5 h-5 text-rose-600" />,
                          bg: 'bg-rose-50/50'
                        }
                      ].map((item) => (
                        <button 
                          key={item.key} 
                          onClick={() => triggerQuickAction(item.tab as any, item.target)}
                          className="bg-slate-50/40 p-4 rounded-2xl border border-slate-100 flex flex-col text-left hover:bg-slate-50 hover:border-blue-200 hover:shadow-xs cursor-pointer transition-all duration-200 active:scale-98 w-full outline-none"
                        >
                          <div className="flex gap-3">
                            <div className={`p-2 rounded-xl h-10 w-10 flex items-center justify-center flex-shrink-0 ${item.bg}`}>
                              {item.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-xs font-bold text-slate-800 leading-none mb-1.5">{item.title}</h4>
                              <p className="text-[11px] text-slate-500 leading-relaxed">{item.desc}</p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Acesso Rápido - Touch Cards */}
                  <div className="flex flex-col gap-3">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-blue-500" /> Atalhos Úteis
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      
                      <button 
                        onClick={() => triggerQuickAction('nosso-flat', 'wi-fi-flat')}
                        className="bg-white p-4 rounded-2xl border border-slate-100 hover:border-blue-200 text-left hover:shadow-sm hover:shadow-md transition-all duration-200 group active:scale-95"
                      >
                        <div className="p-2 bg-blue-50 rounded-xl text-blue-600 w-10 h-10 flex items-center justify-center mb-3 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                          <Wifi className="w-5 h-5" />
                        </div>
                        <span className="block text-xs font-semibold text-slate-400 mb-1">Acesso à Rede</span>
                        <span className="block text-sm font-bold text-slate-700 leading-snug">Senha Wi-Fi</span>
                      </button>

                      <button 
                        onClick={() => triggerQuickAction('regras', 'regras-silencio-fumo')}
                        className="bg-white p-4 rounded-2xl border border-slate-100 hover:border-blue-200 text-left hover:shadow-sm hover:shadow-md transition-all duration-200 group active:scale-95"
                      >
                        <div className="p-2 bg-blue-50 rounded-xl text-blue-600 w-10 h-10 flex items-center justify-center mb-3 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                          <VolumeX className="w-5 h-5" />
                        </div>
                        <span className="block text-xs font-semibold text-slate-400 mb-1">Convivência</span>
                        <span className="block text-sm font-bold text-slate-700 leading-snug">Lei do Silêncio</span>
                      </button>

                      <button 
                        onClick={() => triggerQuickAction('suporte', 'contatos-uteis')}
                        className="bg-red-50/50 p-4 rounded-2xl border border-red-200 hover:border-red-300 text-left hover:shadow-md transition-all duration-200 group active:scale-95 relative overflow-hidden"
                      >
                        <div className="absolute top-0 right-0 w-12 h-12 bg-red-100/40 rounded-bl-full pointer-events-none flex items-center justify-center">
                          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping absolute" />
                        </div>
                        <div className="p-2 bg-red-100 text-red-600 w-10 h-10 flex items-center justify-center mb-3 group-hover:bg-red-600 group-hover:text-white transition-all duration-300 rounded-xl">
                          <ShieldAlert className="w-5 h-5" />
                        </div>
                        <span className="block text-xs font-semibold text-red-500 mb-1">Canais Oficiais</span>
                        <span className="block text-sm font-bold text-slate-800 leading-snug">Emergências</span>
                      </button>

                      <button 
                        onClick={() => {
                          setActiveTab('suporte');
                          setTimeout(() => {
                            document.getElementById('ticket-form-section')?.scrollIntoView({ behavior: 'smooth' });
                          }, 100);
                        }}
                        className="bg-white p-4 rounded-2xl border border-slate-100 hover:border-blue-200 text-left hover:shadow-sm hover:shadow-md transition-all duration-200 group active:scale-95"
                      >
                        <div className="p-2 bg-blue-50 rounded-xl text-blue-600 w-10 h-10 flex items-center justify-center mb-3 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                          <MessageSquare className="w-5 h-5" />
                        </div>
                        <span className="block text-xs font-semibold text-slate-400 mb-1">Suporte Admin</span>
                        <span className="block text-sm font-bold text-slate-700 leading-snug">Fale Conosco</span>
                      </button>

                    </div>
                  </div>

                  {/* Artigos Dinâmicos de "Nosso Flat" */}
                  <div className="flex flex-col gap-4">
                    {guideArticles.filter(art => art.tab === 'nosso-flat').map((art) => {
                      const isHighlighted = highlightedArticleId === art.id;
                      return (
                        <div 
                          key={art.id} 
                          id={art.id}
                          className={`bg-white rounded-2xl p-5 md:p-6 border transition-all duration-300 scroll-mt-28 ${
                            isHighlighted 
                              ? 'border-blue-400 ring-4 ring-blue-100 shadow-md scale-[1.01]' 
                              : 'border-slate-100 shadow-sm hover:shadow-md'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-50">
                            <div className="flex items-center gap-2.5">
                              <span className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                                {renderArticleIcon(art.icon, "w-5 h-5")}
                              </span>
                              <div>
                                <span className="text-[10px] font-bold uppercase text-blue-600 tracking-wider block">{art.category}</span>
                                <h3 className="font-display font-bold text-slate-800 text-sm md:text-base">{art.title}</h3>
                              </div>
                            </div>
                            
                            {isHighlighted && (
                              <span className="text-[9px] font-bold uppercase bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full animate-bounce">
                                Buscado
                              </span>
                            )}
                          </div>
                          
                          <p className="text-xs text-slate-500 mb-4 leading-relaxed font-medium bg-slate-50/50 p-2.5 rounded-xl border border-slate-100">
                            {art.excerpt}
                          </p>

                          <div className="text-xs text-slate-600 space-y-3 leading-relaxed whitespace-pre-line">
                            {art.id.startsWith('guia-local-') ? (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                                {localGuideItems
                                  .filter((item) => item.articleId === art.id)
                                  .map((item) => (
                                    <div 
                                      key={item.id} 
                                      className={`p-4 rounded-2xl border transition-all flex flex-col justify-between shadow-2xs hover:shadow-xs ${
                                        item.id === 'don-will'
                                          ? 'bg-blue-50/40 border-blue-200/80 hover:border-blue-300'
                                          : 'bg-slate-50 hover:bg-slate-100/50 border-slate-200/80 hover:border-blue-200'
                                      }`}
                                    >
                                      <div>
                                        <div className="flex items-start justify-between gap-2 mb-1 flex-wrap">
                                          <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                                            {item.name}
                                          </h4>
                                          {item.id === 'don-will' && (
                                            <span className="text-[9px] font-extrabold uppercase bg-blue-100 text-blue-700 px-2.5 py-0.5 rounded-full tracking-wide shrink-0">
                                              No Sun Square
                                            </span>
                                          )}
                                        </div>
                                        {item.description && (
                                          <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                                            {item.description}
                                          </p>
                                        )}
                                      </div>
                                      
                                      <div className="mt-4 pt-3 border-t border-slate-200/60 flex flex-wrap gap-2">
                                        <a
                                          href={item.mapsUrl}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          referrerPolicy="no-referrer"
                                          className="flex-1 min-w-[85px] text-[10px] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 py-1.5 px-2 rounded-lg border border-emerald-200 flex items-center justify-center gap-1 active:scale-95 transition-all"
                                        >
                                          <MapPin className="w-3 h-3 text-emerald-600" /> Google Maps
                                        </a>

                                        <a
                                          href={item.wazeUrl}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          referrerPolicy="no-referrer"
                                          className="flex-1 min-w-[85px] text-[10px] font-bold text-sky-700 bg-sky-50 hover:bg-sky-100 py-1.5 px-2 rounded-lg border border-sky-200 flex items-center justify-center gap-1 active:scale-95 transition-all"
                                        >
                                          <Car className="w-3 h-3 text-sky-500" /> Waze
                                        </a>

                                        {item.orderUrl && (
                                          <a
                                            href={item.orderUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            referrerPolicy="no-referrer"
                                            className="w-full text-[10px] font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 py-1.5 px-2 rounded-lg border border-rose-200 flex items-center justify-center gap-1.5 active:scale-95 transition-all mt-1"
                                          >
                                            <ExternalLink className="w-3 h-3 text-rose-500" /> Pedir Online
                                          </a>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                              </div>
                            ) : (
                              art.content
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                </div>
              )}

              {/* --- ABA 3: O CONDOMÍNIO --- */}
              {activeTab === 'condominio' && (
                <div className="flex flex-col gap-6">
                  
                  {/* Guia de Infraestrutura Interativo do Condomínio */}
                  <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex flex-col gap-4">
                    <div>
                      <h3 className="font-display font-bold text-slate-800 text-sm md:text-base flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-blue-600" /> Mapa de Infraestrutura Interativo
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">Explore as instalações por andar e seus horários de funcionamento.</p>
                    </div>

                    {/* Floor Buttons */}
                    <div className="grid grid-cols-3 gap-1.5 bg-slate-100 p-1 rounded-xl">
                      {[
                        { id: 'mezanino', label: 'Mezanino', info: 'Lazer Completo' },
                        { id: 'terreo', label: 'Térreo', info: 'Porte-Cochère' },
                        { id: 'subsolo', label: 'Subsolos', info: 'Manobrista' }
                      ].map((floor) => (
                        <button
                          key={floor.id}
                          onClick={() => setActiveFloor(floor.id as any)}
                          className={`py-2 px-1 rounded-lg text-[11px] font-bold transition-all text-center flex flex-col items-center justify-center outline-none select-none ${
                            activeFloor === floor.id 
                              ? 'bg-white text-blue-600 shadow-sm' 
                              : 'text-slate-500 hover:text-slate-800'
                          }`}
                        >
                          <span>{floor.label}</span>
                          <span className="text-[8px] font-medium opacity-70 hidden sm:inline">{floor.info}</span>
                        </button>
                      ))}
                    </div>

                    {/* Floor Detail Content */}
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 transition-all">
                      {activeFloor === 'mezanino' && (
                        <div className="flex flex-col gap-2.5">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="p-1.5 bg-blue-50 text-blue-600 rounded-lg"><Smile className="w-4 h-4" /></span>
                            <h4 className="text-sm font-bold text-slate-800">Mezanino (Lazer Completo)</h4>
                          </div>
                          <div className="text-xs text-slate-600 leading-relaxed space-y-1.5">
                            <p>O andar central de lazer do condomínio, concentrando as seguintes comodidades:</p>
                            <p>• <strong>Piscina Climatizada:</strong> Espaço ideal para relaxar e nadar com toda a segurança.</p>
                            <p>• <strong>Saunas Seca e a Vapor:</strong> Disponíveis para o bem-estar dos moradores (solicite liberação prévia na recepção).</p>
                            <p>• <strong>Academia (Fitness Centre):</strong> Espaço moderno equipado para seus treinos.</p>
                            <p>• <strong>Sala de Jogos:</strong> Ambiente divertido e equipado para momentos de lazer.</p>
                            <p>• <strong>Espaço de Trabalho:</strong> Infraestrutura corporativa com mesas ergonômicas, internet fibra ultra rápida e salas de reunião.</p>
                          </div>
                          <div className="grid grid-cols-2 gap-3 mt-1.5 text-[11px] bg-white p-2.5 rounded-lg border border-slate-100">
                            <div>
                              <p className="text-slate-400 font-medium">Horários</p>
                              <p className="font-bold text-slate-700">Piscina & Saunas: Ter-Dom (07h-22h) | Academia: 24h</p>
                            </div>
                            <div>
                              <p className="text-slate-400 font-medium">Regras</p>
                              <p className="font-bold text-slate-700">Proibido garrafas/copos de vidro nas áreas úmidas</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {activeFloor === 'terreo' && (
                        <div className="flex flex-col gap-2.5">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="p-1.5 bg-blue-50 text-blue-600 rounded-lg"><Home className="w-4 h-4" /></span>
                            <h4 className="text-sm font-bold text-slate-800">Térreo (Entrada Principal & Recepção)</h4>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            O acesso oficial do edifício. Conta com portaria e recepção 24h prontas para receber correspondências, encomendas e identificar visitas de forma segura. 
                            <br /><br />
                            Na entrada, você conta com o exclusivo <strong>Porte-cochère (área de embarque e desembarque)</strong>, ideal para paradas rápidas com total conforto, segurança e proteção contra chuva/sol ao chamar Uber, táxi ou ao descarregar bagagens.
                          </p>
                          <div className="grid grid-cols-2 gap-3 mt-1.5 text-[11px] bg-white p-2.5 rounded-lg border border-slate-100">
                            <div>
                              <p className="text-slate-400 font-medium">Segurança</p>
                              <p className="font-bold text-slate-700">Monitoramento e Portaria 24h</p>
                            </div>
                            <div>
                              <p className="text-slate-400 font-medium">Porte-cochère</p>
                              <p className="font-bold text-slate-700">Apenas paradas rápidas (embarque/desembarque)</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {activeFloor === 'subsolo' && (
                        <div className="flex flex-col gap-2.5">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="p-1.5 bg-blue-50 text-blue-600 rounded-lg"><Car className="w-4 h-4" /></span>
                            <h4 className="text-sm font-bold text-slate-800">Subsolos (Estacionamento Rotativo & Reciclagem)</h4>
                          </div>
                          <div className="text-xs text-slate-600 leading-relaxed space-y-1">
                            <p>• <strong>Vagas Rotativas:</strong> O condomínio possui vagas de garagem rotativas (sujeitas a disponibilidade).</p>
                            <p>• <strong>Serviço de Manobrista:</strong> Manobrista profissional incluso na garagem para maior comodidade e organização ao estacionar o veículo.</p>
                            <p>• <strong>Bicicletário & Recarga:</strong> Bicicletário seguro e carregadores elétricos rápidos no Subsolo 1.</p>
                            <p>• <strong>Centro de Reciclagem:</strong> Localizado no Subsolo 1 para o descarte correto do lixo reciclável.</p>
                          </div>
                          <div className="grid grid-cols-2 gap-3 mt-1.5 text-[11px] bg-white p-2.5 rounded-lg border border-slate-100">
                            <div>
                              <p className="text-slate-400 font-medium">Estacionamento</p>
                              <p className="font-bold text-slate-700">Rotativo com Manobrista</p>
                            </div>
                            <div>
                              <p className="text-slate-400 font-medium">Coleta de Lixo</p>
                              <p className="font-bold text-slate-700">Entregues no Subsolo 1</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Artigos Dinâmicos do Condomínio */}
                  <div className="flex flex-col gap-4">
                    {guideArticles.filter(art => art.tab === 'condominio').map((art) => {
                      const isHighlighted = highlightedArticleId === art.id;
                      return (
                        <div 
                          key={art.id} 
                          id={art.id}
                          className={`bg-white rounded-2xl p-5 md:p-6 border transition-all duration-300 scroll-mt-28 ${
                            isHighlighted 
                              ? 'border-blue-400 ring-4 ring-blue-100 shadow-md scale-[1.01]' 
                              : 'border-slate-100 shadow-sm hover:shadow-md'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-50">
                            <div className="flex items-center gap-2.5">
                              <span className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                                {renderArticleIcon(art.icon, "w-5 h-5")}
                              </span>
                              <div>
                                <span className="text-[10px] font-bold uppercase text-blue-600 tracking-wider block">{art.category}</span>
                                <h3 className="font-display font-bold text-slate-800 text-sm md:text-base">{art.title}</h3>
                              </div>
                            </div>
                            
                            {isHighlighted && (
                              <span className="text-[9px] font-bold uppercase bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                                Buscado
                              </span>
                            )}
                          </div>
                          
                          <p className="text-xs text-slate-500 mb-4 leading-relaxed font-medium bg-slate-50/50 p-2.5 rounded-xl border border-slate-100">
                            {art.excerpt}
                          </p>

                          <div className="text-xs text-slate-600 space-y-3 leading-relaxed whitespace-pre-line">
                            {art.content}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                </div>
              )}

              {/* --- ABA 4: GUIA LOCAL --- */}
              {activeTab === 'guia-local' && (
                <div className="flex flex-col gap-6">
                  
                  {/* Introdução ao Guia Local */}
                  <div className="flex flex-col gap-1 pl-1">
                    <h3 className="font-display font-bold text-slate-800 text-sm md:text-base">Guia de Localização e Arredores</h3>
                    <p className="text-xs text-slate-400">Descubra as melhores atrações, gastronomia e serviços perto do Sun Square.</p>
                  </div>

                  {/* Artigos Dinâmicos de "Guia Local" */}
                  <div className="flex flex-col gap-4">
                    {guideArticles
                      .filter(art => art.tab === 'guia-local' && (guideFilter === 'Todos' || art.category === guideFilter))
                      .map((art) => {
                      const isHighlighted = highlightedArticleId === art.id;
                      return (
                        <div 
                          key={art.id} 
                          id={art.id}
                          className={`bg-white rounded-2xl p-5 md:p-6 border transition-all duration-300 scroll-mt-28 ${
                            isHighlighted 
                              ? 'border-blue-400 ring-4 ring-blue-100 shadow-md scale-[1.01]' 
                              : 'border-slate-100 shadow-sm hover:shadow-md'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-50">
                            <div className="flex items-center gap-2.5">
                              <span className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                                {renderArticleIcon(art.icon, "w-5 h-5")}
                              </span>
                              <div>
                                <span className="text-[10px] font-bold uppercase text-blue-600 tracking-wider block">{art.category}</span>
                                <h3 className="font-display font-bold text-slate-800 text-sm md:text-base">{art.title}</h3>
                              </div>
                            </div>
                            
                            {isHighlighted && (
                              <span className="text-[9px] font-bold uppercase bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                                Buscado
                              </span>
                            )}
                          </div>
                          
                          <p className="text-xs text-slate-500 mb-4 leading-relaxed font-medium bg-slate-50/50 p-2.5 rounded-xl border border-slate-100">
                            {art.excerpt}
                          </p>

                          <div className="text-xs text-slate-600 space-y-3 leading-relaxed whitespace-pre-line">
                            {art.id.startsWith('guia-local-') ? (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                                {localGuideItems
                                  .filter((item) => item.articleId === art.id)
                                  .map((item) => (
                                    <div 
                                      key={item.id} 
                                      className={`p-4 rounded-2xl border transition-all flex flex-col justify-between shadow-2xs hover:shadow-xs ${
                                        item.id === 'don-will'
                                          ? 'bg-blue-50/40 border-blue-200/80 hover:border-blue-300'
                                          : 'bg-slate-50 hover:bg-slate-100/50 border-slate-200/80 hover:border-blue-200'
                                      }`}
                                    >
                                      <div>
                                        <div className="flex items-start justify-between gap-2 mb-1 flex-wrap">
                                          <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                                            {item.name}
                                          </h4>
                                          {item.id === 'don-will' && (
                                            <span className="text-[9px] font-extrabold uppercase bg-blue-100 text-blue-700 px-2.5 py-0.5 rounded-full tracking-wide shrink-0">
                                              No Sun Square
                                            </span>
                                          )}
                                        </div>
                                        {item.description && (
                                          <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                                            {item.description}
                                          </p>
                                        )}
                                      </div>
                                      
                                      <div className="mt-4 pt-3 border-t border-slate-200/60 flex flex-wrap gap-2">
                                        <a
                                          href={item.mapsUrl}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          referrerPolicy="no-referrer"
                                          className="flex-1 min-w-[85px] text-[10px] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 py-1.5 px-2 rounded-lg border border-emerald-200 flex items-center justify-center gap-1 active:scale-95 transition-all"
                                        >
                                          <MapPin className="w-3 h-3 text-emerald-600" /> Google Maps
                                        </a>

                                        <a
                                          href={item.wazeUrl}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          referrerPolicy="no-referrer"
                                          className="flex-1 min-w-[85px] text-[10px] font-bold text-sky-700 bg-sky-50 hover:bg-sky-100 py-1.5 px-2 rounded-lg border border-sky-200 flex items-center justify-center gap-1 active:scale-95 transition-all"
                                        >
                                          <Car className="w-3 h-3 text-sky-500" /> Waze
                                        </a>

                                        {item.orderUrl && (
                                          <a
                                            href={item.orderUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            referrerPolicy="no-referrer"
                                            className="w-full text-[10px] font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 py-1.5 px-2 rounded-lg border border-rose-200 flex items-center justify-center gap-1.5 active:scale-95 transition-all mt-1"
                                          >
                                            <ExternalLink className="w-3 h-3 text-rose-500" /> Pedir Online
                                          </a>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                              </div>
                            ) : (
                              art.content
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                </div>
              )}

              {/* --- ABA 4: REGRAS --- */}
              {activeTab === 'regras' && (
                <div className="flex flex-col gap-6">
                  
                  {/* Seletor de Categorias de Regras */}
                  <div className="bg-white rounded-2xl p-3 border border-slate-100 shadow-sm flex gap-1.5 overflow-x-auto scrollbar-none">
                    {['Todas', 'Normas', 'Convivência', 'Animais', 'Zelo'].map((cat) => {
                      const isSelected = rulesFilter === cat;
                      return (
                        <button
                          key={cat}
                          onClick={() => setRulesFilter(cat)}
                          className={`py-1.5 px-3 rounded-xl text-xs font-semibold whitespace-nowrap outline-none transition-all ${
                            isSelected 
                              ? 'bg-blue-600 text-white shadow-xs' 
                              : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          {cat}
                        </button>
                      );
                    })}
                  </div>

                  {/* Informação sobre Notificações de Infrações */}
                  <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-blue-900 text-xs flex gap-3 shadow-2xs">
                    <ShieldAlert className="w-5 h-5 text-blue-600 shrink-0 mt-0.5 animate-pulse" />
                    <div>
                      <p className="font-bold">Aviso sobre Infrações e Multas</p>
                      <p className="opacity-90 mt-0.5 leading-relaxed">Conforme deliberado na última Convenção do Sun Square, infrações sistemáticas ao silêncio ou descarte inadequado de lixo geram uma advertência inicial. Na reincidência, a multa equivale a 50% de uma taxa condominial ordinária.</p>
                    </div>
                  </div>

                  {/* Lista de Regras (Filtrada) */}
                  <div className="flex flex-col gap-4">
                    {guideArticles
                      .filter(art => art.tab === 'regras')
                      .filter(art => rulesFilter === 'Todas' || art.category === rulesFilter)
                      .map((art) => {
                        const isHighlighted = highlightedArticleId === art.id;
                        return (
                          <div 
                            key={art.id} 
                            id={art.id}
                            className={`bg-white rounded-2xl p-5 md:p-6 border transition-all duration-300 scroll-mt-28 ${
                              isHighlighted 
                                ? 'border-blue-400 ring-4 ring-blue-100 shadow-md scale-[1.01]' 
                                : 'border-slate-100 shadow-sm hover:shadow-md'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-50">
                              <div className="flex items-center gap-2.5">
                                <span className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                                  {renderArticleIcon(art.icon, "w-5 h-5")}
                                </span>
                                <div>
                                  <span className="text-[10px] font-bold uppercase text-blue-600 tracking-wider block">{art.category}</span>
                                  <h3 className="font-display font-bold text-slate-800 text-sm md:text-base">{art.title}</h3>
                                </div>
                              </div>
                              
                              {isHighlighted && (
                                <span className="text-[9px] font-bold uppercase bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                                  Buscado
                                </span>
                              )}
                            </div>

                            <p className="text-xs text-slate-500 mb-4 leading-relaxed font-medium bg-slate-50/50 p-2.5 rounded-xl border border-slate-100">
                              {art.excerpt}
                            </p>

                            <div className="text-xs text-slate-600 space-y-3 leading-relaxed whitespace-pre-line">
                              {art.content}
                            </div>
                          </div>
                        );
                      })}
                  </div>

                </div>
              )}

              {/* --- ABA 4: SUPORTE --- */}
              {activeTab === 'suporte' && (
                <div className="flex flex-col gap-6">
                  
                  {/* Canais Públicos de Emergência */}
                  <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm" id="contatos-uteis">
                    <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-50">
                      <div className="flex items-center gap-2.5">
                        <span className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                          <Phone className="w-5 h-5" />
                        </span>
                        <h3 className="font-display font-bold text-slate-800 text-sm md:text-base">Telefones Úteis e Emergência</h3>
                      </div>
                    </div>

                    <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                      Em situações críticas, entre em contato imediatamente com os órgãos públicos de emergência da cidade:
                    </p>

                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 text-[11px] text-slate-600">
                      <div className="grid grid-cols-3 gap-2.5 text-center font-bold">
                        <div className="p-2.5 bg-white border border-slate-200 rounded-lg text-slate-800">
                          <p className="text-xs text-slate-400 font-semibold mb-0.5">Polícia Militar</p>
                          <span className="text-sm font-bold text-slate-800">190</span>
                        </div>
                        <div className="p-2.5 bg-white border border-slate-200 rounded-lg text-slate-800">
                          <p className="text-xs text-slate-400 font-semibold mb-0.5">SAMU</p>
                          <span className="text-sm font-bold text-slate-800">192</span>
                        </div>
                        <div className="p-2.5 bg-white border border-slate-200 rounded-lg text-slate-800">
                          <p className="text-xs text-slate-400 font-semibold mb-0.5">Bombeiros</p>
                          <span className="text-sm font-bold text-slate-800">193</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Lista Completa da Equipe (Staff) */}
                  <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm" id="staff-contacts">
                    <h3 className="font-display font-bold text-slate-800 text-sm md:text-base mb-3 flex items-center gap-2">
                      <User className="w-4 h-4 text-blue-600" /> Contato do Anfitrião
                    </h3>
                    <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                      Fale diretamente com o anfitrião Wellington para tirar dúvidas ou solicitar suporte durante sua estadia.
                    </p>

                    <div className="flex flex-col gap-3">
                      {contactList.map((contact, idx) => (
                        <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                          <div>
                            <span className="text-[9px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md inline-block mb-1">
                              {contact.role}
                            </span>
                            <h4 className="text-xs font-bold text-slate-800">{contact.name}</h4>
                            <p className="text-[10px] text-slate-400 mt-0.5">{contact.hours}</p>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 shrink-0">
                            {/* WhatsApp Shortcut */}
                            <a
                              href="https://wa.me/5562991514568?text=Ol%C3%A1!%20Sou%20inquilino%20no%20Sun%20Square."
                              target="_blank"
                              rel="noopener noreferrer"
                              referrerPolicy="no-referrer"
                              className="text-[10px] font-bold text-white bg-emerald-600 hover:bg-emerald-700 py-1.5 px-3 rounded-lg flex items-center gap-1.5 active:scale-95 transition-all shadow-xs"
                            >
                              <MessageSquare className="w-3.5 h-3.5 text-white" /> WhatsApp
                            </a>
                            <button
                              onClick={() => copyToClipboard(contact.phone, contact.name)}
                              className="text-[10px] font-bold text-slate-700 bg-white hover:bg-slate-100 py-1.5 px-3 rounded-lg border border-slate-200 flex items-center gap-1 active:scale-95 transition-all"
                            >
                              <Phone className="w-3.5 h-3.5 text-slate-500" /> {contact.phone}
                            </button>
                            <button
                              onClick={() => copyToClipboard(contact.email, contact.name)}
                              className="text-[10px] font-bold text-slate-700 bg-white hover:bg-slate-100 py-1.5 px-3 rounded-lg border border-slate-200 flex items-center gap-1 active:scale-95 transition-all animate-none"
                            >
                              <Mail className="w-3.5 h-3.5 text-slate-500" /> E-mail
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                   {/* Canal Fale Conosco / Enviar Solicitação (FORMULÁRIO ATIVO) */}
                  <div className="bg-white rounded-3xl p-5 md:p-6 border border-slate-100 shadow-sm" id="ticket-form-section">
                    <h3 className="font-display font-bold text-slate-800 text-sm md:text-base mb-1 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-blue-600" /> Fale com o Anfitrião!
                    </h3>
                    <p className="text-xs text-slate-400 mb-5">Envie uma dúvida, solicitação de manutenção ou sugestão diretamente para o anfitrião.</p>

                    <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
                      
                      {/* Dados fixos do usuário autenticado */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Remetente</label>
                          <input 
                            type="text" 
                            disabled 
                            value="Wellington Rodovalho" 
                            className="w-full bg-slate-50 text-slate-500 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold cursor-not-allowed"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">E-mail Cadastrado</label>
                          <input 
                            type="email" 
                            disabled 
                            value="contato@alugagoias.com.br" 
                            className="w-full bg-slate-50 text-slate-500 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold cursor-not-allowed"
                          />
                        </div>
                      </div>

                      {/* Categoria do chamado */}
                      <div>
                        <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Categoria do Chamado</label>
                        <div className="grid grid-cols-4 gap-2">
                          {['Dúvida', 'Manutenção', 'Sugestão', 'Outro'].map((cat) => (
                            <button
                              key={cat}
                              type="button"
                              onClick={() => setFormCategory(cat as any)}
                              className={`py-2 px-1 text-center rounded-xl text-xs font-semibold border transition-all ${
                                formCategory === cat 
                                  ? 'bg-blue-50 border-blue-300 text-blue-600 shadow-2xs' 
                                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                              }`}
                            >
                              {cat}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Assunto */}
                      <div>
                        <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Assunto</label>
                        <input
                          type="text"
                          required
                          placeholder="Ex: Reserva do Gourmet, barulho no 13º andar, lâmpada queimada..."
                          value={formSubject}
                          onChange={(e) => setFormSubject(e.target.value)}
                          className="w-full bg-slate-50 hover:bg-slate-100/50 focus:bg-white border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl px-3.5 py-2.5 text-xs outline-none transition-all"
                        />
                      </div>

                      {/* Mensagem */}
                      <div>
                        <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Mensagem Detalhada</label>
                        <textarea
                          required
                          rows={4}
                          placeholder="Descreva seu problem ou solicitação de maneira clara para agilizarmos o atendimento..."
                          value={formMessage}
                          onChange={(e) => setFormMessage(e.target.value)}
                          className="w-full bg-slate-50 hover:bg-slate-100/50 focus:bg-white border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl px-3.5 py-2.5 text-xs outline-none transition-all resize-none"
                        />
                      </div>

                      {/* Botão de Envio */}
                      <button
                        type="submit"
                        disabled={submitting || !formSubject.trim() || !formMessage.trim()}
                        className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {submitting ? (
                          <>
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Enviando...
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" /> Enviar Mensagem à Administração
                          </>
                        )}
                      </button>

                    </form>

                    {/* Alerta de Sucesso */}
                    <AnimatePresence>
                      {formSuccess && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="mt-4 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                            <div>
                              <p className="font-bold">Solicitação registrada!</p>
                              <p className="opacity-95 text-[11px]">Sua mensagem foi enviada à gerência do Sun Square. Retornamos em até 24h.</p>
                            </div>
                          </div>
                          <button 
                            onClick={() => setFormSuccess(false)}
                            className="text-emerald-700 hover:text-emerald-900 font-bold ml-4"
                          >
                            OK
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Seção Minhas Solicitações (DOUBLY PERSISTED IN MEMORY AND STORAGE) */}
                  {tickets.length > 0 && (
                    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                      <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-50">
                        <h3 className="font-display font-bold text-slate-800 text-xs md:text-sm flex items-center gap-2">
                          <ClipboardList className="w-4 h-4 text-blue-600" /> Meus Chamados Registrados ({tickets.length})
                        </h3>
                        <button 
                          onClick={() => {
                            if (confirm('Deseja limpar o histórico local de chamados?')) {
                              setTickets([]);
                            }
                          }}
                          className="text-[10px] text-slate-400 hover:text-red-500 font-bold"
                        >
                          Limpar Histórico
                        </button>
                      </div>

                      <div className="flex flex-col gap-3">
                        {tickets.map((t) => (
                          <div key={t.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1.5">
                                <span className="text-[10px] font-bold text-slate-800 font-mono">{t.id}</span>
                                <span className="text-[9px] font-bold uppercase bg-blue-50 text-blue-600 px-1.5 py-0.2 rounded">{t.category}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <span className="inline-block w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                                <span className="text-[10px] text-blue-700 font-semibold">{t.status}</span>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="text-xs font-bold text-slate-800">{t.subject}</h4>
                              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{t.message}</p>
                            </div>
                            
                            <div className="pt-2 border-t border-slate-200/50 flex items-center justify-between text-[9px] text-slate-400">
                              <span>Enviado em: {t.date}</span>
                              <span>Canal: Digital</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Perguntas Frequentes Accordion (FAQ) */}
                  <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm" id="faq-section">
                    <h3 className="font-display font-bold text-slate-800 text-sm md:text-base mb-1.5 flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-blue-600" /> Perguntas Frequentes (FAQ)
                    </h3>
                    <p className="text-xs text-slate-400 mb-4">Esclareça dúvidas comuns sobre as normas e funcionamento geral do condomínio.</p>

                    <div className="flex flex-col gap-2">
                      {faqItems.map((faq, index) => {
                        const isOpen = faqOpenIndex === index;
                        return (
                          <div 
                            key={index}
                            className={`border rounded-xl transition-all ${
                              isOpen 
                                ? 'bg-slate-50/70 border-blue-300 shadow-xs' 
                                : 'bg-white border-slate-200/80 hover:bg-slate-50/30'
                            }`}
                          >
                            <button
                              onClick={() => setFaqOpenIndex(isOpen ? null : index)}
                              className="w-full text-left p-3.5 flex justify-between items-center outline-none"
                            >
                              <div className="pr-4">
                                <span className="text-[9px] font-bold uppercase bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded mr-2 inline-block mb-1.5">
                                  {faq.category}
                                </span>
                                <h4 className="text-xs md:text-sm font-bold text-slate-800 leading-snug">
                                  {faq.question}
                                </h4>
                              </div>
                              <span className="text-slate-400 shrink-0">
                                {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                              </span>
                            </button>
                            
                            <AnimatePresence>
                              {isOpen && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden"
                                >
                                  <div className="p-3.5 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-white rounded-b-xl">
                                    {faq.answer}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>
              )}

            </motion.div>
          )}
        </AnimatePresence>

      </main>

      {/* RODAPÉ FIXO COMPLETO E VISÍVEL EM TODAS AS SEÇÕES */}
      <footer className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 text-slate-100 border-t border-slate-800 py-3 px-4 shadow-2xl backdrop-blur-md">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
          
          {/* Dados da Sun Square */}
          <div className="flex items-center gap-2.5">
            {!logoError ? (
              <img
                src="https://lh3.googleusercontent.com/d/1edOUDJqfcW_d_drNk7wOv8aIQk5zwVs6"
                alt="Logo"
                className="w-8 h-8 object-cover rounded-lg bg-white border border-slate-800 shrink-0"
                referrerPolicy="no-referrer"
                onError={() => setLogoError(true)}
              />
            ) : (
              <div className="p-1.5 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg text-white shadow-sm shrink-0">
                <Sun className="w-4 h-4" />
              </div>
            )}
            <div className="text-left">
              <p className="font-display font-bold text-white tracking-tight text-xs sm:text-sm">Sun Square – Unidade 1208A</p>
              <a 
                href="https://maps.app.goo.gl/yH81sR7RntbgCLRw5" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[10px] text-slate-400 hover:text-blue-400 hover:underline transition-colors flex items-center gap-1"
              >
                Setor Oeste, Goiânia - GO • Frente à Praça do Sol
                <ExternalLink className="w-2.5 h-2.5 shrink-0 text-slate-500" />
              </a>
            </div>
          </div>

          {/* Dados de Contato e Informações */}
          <div className="flex flex-col sm:flex-row items-center gap-x-4 gap-y-1.5 bg-slate-900/60 border border-slate-800/80 px-4 py-2 rounded-2xl w-full md:w-auto text-center md:text-right">
            <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 text-[11px] text-slate-300">
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                <span className="font-semibold text-slate-400">Anfitrião:</span>
                <span className="font-bold text-white tracking-wider">WELLINGTON RODOVALHO</span>
              </div>
              <span className="text-slate-600">•</span>
              <span className="text-[10px] text-slate-400 font-mono">CRECI-GO 42695</span>
              <span className="text-slate-600">|</span>
              <span className="text-[10px] text-slate-400 font-mono">CNAI 54826</span>
            </div>
            
            <span className="hidden sm:inline text-slate-700">|</span>
            
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-0.5 text-[11px]">
              <div className="flex items-center gap-1 text-[11px]">
                <Phone className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <a href="https://wa.me/5562991514568" target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-400 hover:text-blue-300 hover:underline transition-colors">
                  (62) 99151-4568
                </a>
              </div>
              <span className="text-slate-600">•</span>
              <div className="flex items-center gap-1 text-[11px]">
                <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <a href="mailto:contato@alugagoias.com.br" className="font-semibold text-blue-400 hover:text-blue-300 hover:underline transition-colors">
                  contato@alugagoias.com.br
                </a>
              </div>
              <span className="text-slate-600">•</span>
              <div className="flex items-center gap-1 text-[11px]">
                <ExternalLink className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <a href="https://www.alugagoias.com.br" target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-400 hover:text-blue-300 hover:underline transition-colors">
                  www.alugagoias.com.br
                </a>
              </div>
            </div>
          </div>

        </div>
      </footer>

      {/* Botão do WhatsApp Flutuante */}
      <a
        href="https://wa.me/5562991514568?text=Ol%C3%A1!%20Sou%20inquilino%20no%20Sun%20Square."
        target="_blank"
        rel="noopener noreferrer"
        referrerPolicy="no-referrer"
        className="fixed bottom-20 right-6 z-50 flex items-center justify-center bg-emerald-500 hover:bg-emerald-600 text-white p-3.5 rounded-full shadow-xl hover:shadow-2xl active:scale-95 transition-all duration-200 animate-bounce hover:animate-none"
        style={{ animationDuration: '3s' }}
        id="floating-whatsapp-btn"
        title="Fale Conosco no WhatsApp"
      >
        <MessageSquare className="w-6 h-6 text-white" />
      </a>

    </div>
  );
}

// Minimal Simple Icon replacement to avoid import bugs
function ChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
