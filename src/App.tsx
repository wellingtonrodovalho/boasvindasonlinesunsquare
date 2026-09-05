import React, { useState, useEffect, useRef } from 'react';
import { 
  Sun, MapPin, Briefcase, Truck, Wifi, Shield, Zap, VolumeX, Trash2, Smile, Car, Phone, 
  Search, Info, AlertTriangle, ArrowRight, CheckCircle2, MessageSquare, ChevronDown, ChevronUp, 
  Mail, Clock, User, HelpCircle, ExternalLink, RefreshCw, Send, Check, X, Building, Copy, 
  PhoneCall, Calendar, CheckSquare, ClipboardList, ShieldAlert, Home, Cloud, CloudSun, CloudRain,
  LogOut, Sparkles, Key, Lock, Utensils, ShoppingBag, Store, Tent, Landmark,
  ChevronLeft, ChevronRight, Waves, Heart, Tv, Wind
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  guideArticles, faqItems, contactList, GuideArticle, FAQItem, ContactInfo, localGuideItems, LocalGuideItem,
  weeklyScheduleDays, dailyVenues, everydaySpots, touristSpots
} from './data';
import {
  translationStrings,
  translatedArticles,
  translatedFaqs,
  translatedLocalGuideItems,
  translatedContacts
} from './translations';

export default function App() {
  // Language State ('pt' | 'en' | 'es')
  const [lang, setLang] = useState<'pt' | 'en' | 'es'>('pt');

  // Active Data lists based on language
  const activeArticles = lang === 'pt' ? guideArticles : (translatedArticles[lang] || guideArticles);
  const activeFaqs = lang === 'pt' ? faqItems : (translatedFaqs[lang] || faqItems);
  const activeLocalGuideItems = lang === 'pt' ? localGuideItems : (translatedLocalGuideItems[lang] || localGuideItems);
  const activeContacts = lang === 'pt' ? contactList : (translatedContacts[lang] || contactList);
  
  // Active Translation Strings
  const t = translationStrings[lang] || translationStrings.pt;

  // Category normalization matchers for Local Guide and Rules
  const isCategoryMatched = (artCategory: string, filter: string) => {
    if (filter === 'Todos' || filter === 'All') return true;
    const ptToOther: { [key: string]: string[] } = {
      'A Semana': ['A Semana', 'Weekly Schedule', 'La Semana', 'Semana'],
      'Todos os Dias': ['Todos os Dias', 'Every Day', 'Todos los Días', 'A Semana', 'Weekly Schedule', 'La Semana', 'Lazer e Cultura', 'Leisure & Culture', 'Ocio y Cultura', 'Pontos Turísticos', 'Mercados', 'Feiras'],
      'Gastronomia': ['Gastronomia', 'Gastronomy', 'Gastronomía'],
      'Shoppings': ['Shoppings', 'Shopping', 'Shopping Centers', 'Compras'],
      'Lavanderias': ['Lavanderias', 'Laundry', 'Laundromats', 'Lavandería'],
      'Serviços': ['Serviços', 'Services', 'Servicios'],
      'Saúde e Estética': ['Saúde e Estética', 'Estética & Veículos', 'Health & Beauty', 'Salud y Belleza', 'Aesthetics', 'Vehicles, Charging & Aesthetics', 'Vehículos, Recarga y Estética'],
      'Pontos Turísticos': ['Pontos Turísticos', 'Pontos turísticos', 'Tourist Sights', 'Puntos Turísticos', 'Lazer e Cultura', 'Lazer & Parques', 'Leisure & Culture', 'Ocio y Cultura'],
      'Lazer e Cultura': ['Lazer e Cultura', 'Lazer & Cultura', 'Leisure & Culture', 'Ocio y Cultura', 'Pontos Turísticos', 'Pontos turísticos', 'Tourist Sights', 'Puntos Turísticos']
    };
    const list = ptToOther[filter];
    if (!list) return artCategory.toLowerCase() === filter.toLowerCase();
    return list.some(item => item.toLowerCase() === artCategory.toLowerCase());
  };

  const getRulesCategoryLabel = (cat: string) => {
    if (lang === 'pt') return cat;
    if (lang === 'en') {
      switch (cat) {
        case 'Todas': return 'All';
        case 'Normas': return 'Rules';
        case 'Convivência': return 'Coexistence';
        case 'Animais': return 'Animals';
        case 'Zelo': return 'Care';
        default: return cat;
      }
    } else {
      switch (cat) {
        case 'Todas': return 'Todas';
        case 'Normas': return 'Normas';
        case 'Convivência': return 'Convivencia';
        case 'Animais': return 'Mascotas';
        case 'Zelo': return 'Cuidado';
        default: return cat;
      }
    }
  };

  const isRulesCategoryMatched = (artCategory: string, filter: string) => {
    if (filter === 'Todas' || filter === 'All') return true;
    const ptToOther: { [key: string]: string[] } = {
      'Normas': ['Normas', 'Rules'],
      'Convivência': ['Convivência', 'Coexistence', 'Convivencia'],
      'Animais': ['Animais', 'Animals', 'Mascotas'],
      'Zelo': ['Zelo', 'Care', 'Cuidado']
    };
    const list = ptToOther[filter];
    if (!list) return artCategory.toLowerCase() === filter.toLowerCase();
    return list.some(item => item.toLowerCase() === artCategory.toLowerCase());
  };

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

  // Checkout Checklist State (Exit Checklist)
  const [checkoutChecklist, setCheckoutChecklist] = useState<{ [key: string]: boolean }>(() => {
    try {
      const saved = localStorage.getItem('sunsquare_checkout_checklist');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
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

  // Daily Venues Subcategory Filter (Mercados, Feiras, Pontos Turísticos)
  const [dailySubCategory, setDailySubCategory] = useState<'Todos' | 'Mercados' | 'Feiras' | 'Pontos Turísticos'>('Todos');

  // Nosso Flat Sub-section filter & quick navigation
  const [flatSubSection, setFlatSubSection] = useState<string>('todos');

  // Suporte Sub-section filter & quick navigation
  const [supportSubSection, setSupportSubSection] = useState<string>('todos');

  // Logo Error State for Fallback
  const [logoError, setLogoError] = useState(false);

  // TV Stick interactive states
  const [activeRemoteButton, setActiveRemoteButton] = useState<string | null>(null);
  const [activeTvApp, setActiveTvApp] = useState<string | null>(null);

  // Greetings based on local hour
  const [currentTime, setCurrentTime] = useState('');
  const [currentDateStr, setCurrentDateStr] = useState('');

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      return t.greetingMorning;
    } else if (hour >= 12 && hour < 18) {
      return t.greetingAfternoon;
    } else {
      return t.greetingNight;
    }
  };

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }));
      
      const day = now.getDate();
      const monthNames: { [key: string]: string[] } = {
        pt: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        es: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
      };
      
      const dayOfWeekNames: { [key: string]: string[] } = {
        pt: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
        en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        es: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
      };
      
      const activeMonths = monthNames[lang] || monthNames.pt;
      const activeDays = dayOfWeekNames[lang] || dayOfWeekNames.pt;
      
      const month = activeMonths[now.getMonth()];
      const dayOfWeek = activeDays[now.getDay()];
      
      if (lang === 'en') {
        setCurrentDateStr(`${dayOfWeek}, ${month} ${day}`);
      } else {
        setCurrentDateStr(`${dayOfWeek}, ${day} de ${month}`);
      }
    };
    updateDateTime();
    const interval = setInterval(updateDateTime, 15000);
    return () => clearInterval(interval);
  }, [lang]);

  // --- NAVEGAÇÃO MOBILE & DESK: REFS E CONTROLE DE SCROLL ---
  // Main Navigation Tabs
  const navContainerRef = useRef<HTMLDivElement | null>(null);
  const tabButtonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const [navCanScrollLeft, setNavCanScrollLeft] = useState(false);
  const [navCanScrollRight, setNavCanScrollRight] = useState(false);

  // Guide Categories
  const guideNavRef = useRef<HTMLDivElement | null>(null);
  const guideCategoryRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const [guideCanScrollLeft, setGuideCanScrollLeft] = useState(false);
  const [guideCanScrollRight, setGuideCanScrollRight] = useState(false);

  // Rules Categories
  const rulesNavRef = useRef<HTMLDivElement | null>(null);
  const rulesCategoryRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const [rulesCanScrollLeft, setRulesCanScrollLeft] = useState(false);
  const [rulesCanScrollRight, setRulesCanScrollRight] = useState(false);

  // Daily Venues Subcategories (Mercados, Feiras, Pontos Turísticos)
  const dailySubNavRef = useRef<HTMLDivElement | null>(null);
  const dailySubRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const [dailyCanScrollLeft, setDailyCanScrollLeft] = useState(false);
  const [dailyCanScrollRight, setDailyCanScrollRight] = useState(false);

  // Nosso Flat Sub-navigation Refs & States
  const flatSubNavRef = useRef<HTMLDivElement | null>(null);
  const flatSubRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const [flatCanScrollLeft, setFlatCanScrollLeft] = useState(false);
  const [flatCanScrollRight, setFlatCanScrollRight] = useState(false);

  // Suporte Sub-navigation Refs & States
  const supportSubNavRef = useRef<HTMLDivElement | null>(null);
  const supportSubRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const [supportCanScrollLeft, setSupportCanScrollLeft] = useState(false);
  const [supportCanScrollRight, setSupportCanScrollRight] = useState(false);

  // Helper para verificar rolagem de contêineres horizontais
  const checkScrollState = (el: HTMLElement | null, setLeft: (v: boolean) => void, setRight: (v: boolean) => void) => {
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setLeft(scrollLeft > 6);
    setRight(scrollLeft < scrollWidth - clientWidth - 6);
  };

  const scrollContainer = (el: HTMLElement | null, direction: 'left' | 'right', distance = 180) => {
    if (!el) return;
    el.scrollBy({
      left: direction === 'left' ? -distance : distance,
      behavior: 'smooth'
    });
  };

  // Atualizar indicadores de rolagem após renderização ou resize
  const refreshAllScrollStates = () => {
    checkScrollState(navContainerRef.current, setNavCanScrollLeft, setNavCanScrollRight);
    checkScrollState(guideNavRef.current, setGuideCanScrollLeft, setGuideCanScrollRight);
    checkScrollState(rulesNavRef.current, setRulesCanScrollLeft, setRulesCanScrollRight);
    checkScrollState(dailySubNavRef.current, setDailyCanScrollLeft, setDailyCanScrollRight);
    checkScrollState(flatSubNavRef.current, setFlatCanScrollLeft, setFlatCanScrollRight);
    checkScrollState(supportSubNavRef.current, setSupportCanScrollLeft, setSupportCanScrollRight);
  };

  useEffect(() => {
    refreshAllScrollStates();
    const handleResize = () => refreshAllScrollStates();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeTab, guideFilter, rulesFilter, dailySubCategory, flatSubSection, supportSubSection]);

  // Auto-scroll para centralizar a aba ativa no topo
  useEffect(() => {
    const timer = setTimeout(() => {
      const btn = tabButtonRefs.current[activeTab];
      if (btn && navContainerRef.current) {
        btn.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
      checkScrollState(navContainerRef.current, setNavCanScrollLeft, setNavCanScrollRight);
    }, 60);
    return () => clearTimeout(timer);
  }, [activeTab]);

  // Auto-scroll para centralizar sub-categoria ativa do Guia Local
  useEffect(() => {
    const timer = setTimeout(() => {
      const btn = guideCategoryRefs.current[guideFilter];
      if (btn && guideNavRef.current) {
        btn.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
      checkScrollState(guideNavRef.current, setGuideCanScrollLeft, setGuideCanScrollRight);
    }, 60);
    return () => clearTimeout(timer);
  }, [guideFilter, activeTab]);

  // Auto-scroll para centralizar sub-categoria ativa de Regras
  useEffect(() => {
    const timer = setTimeout(() => {
      const btn = rulesCategoryRefs.current[rulesFilter];
      if (btn && rulesNavRef.current) {
        btn.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
      checkScrollState(rulesNavRef.current, setRulesCanScrollLeft, setRulesCanScrollRight);
    }, 60);
    return () => clearTimeout(timer);
  }, [rulesFilter, activeTab]);

  // Auto-scroll para centralizar sub-categoria ativa de Todos os Dias
  useEffect(() => {
    const timer = setTimeout(() => {
      const btn = dailySubRefs.current[dailySubCategory];
      if (btn && dailySubNavRef.current) {
        btn.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
      checkScrollState(dailySubNavRef.current, setDailyCanScrollLeft, setDailyCanScrollRight);
    }, 60);
    return () => clearTimeout(timer);
  }, [dailySubCategory, activeTab]);

  // Auto-scroll para centralizar sub-aba de Nosso Flat
  useEffect(() => {
    const timer = setTimeout(() => {
      const btn = flatSubRefs.current[flatSubSection];
      if (btn && flatSubNavRef.current) {
        btn.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
      checkScrollState(flatSubNavRef.current, setFlatCanScrollLeft, setFlatCanScrollRight);
    }, 60);
    return () => clearTimeout(timer);
  }, [flatSubSection, activeTab]);

  // Auto-scroll para centralizar sub-aba de Suporte
  useEffect(() => {
    const timer = setTimeout(() => {
      const btn = supportSubRefs.current[supportSubSection];
      if (btn && supportSubNavRef.current) {
        btn.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
      checkScrollState(supportSubNavRef.current, setSupportCanScrollLeft, setSupportCanScrollRight);
    }, 60);
    return () => clearTimeout(timer);
  }, [supportSubSection, activeTab]);

  const handleFlatSubSectionClick = (id: string, targetId?: string) => {
    setFlatSubSection(id);
    if (targetId) {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSupportSubSectionClick = (id: string, targetId?: string) => {
    setSupportSubSection(id);
    if (targetId) {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToArticle = (articleId: string) => {
    setHighlightedArticleId(articleId);
    const element = document.getElementById(articleId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Save checklist progress to localStorage
  useEffect(() => {
    localStorage.setItem('sunsquare_checklist', JSON.stringify(checklist));
  }, [checklist]);

  // Save checkout checklist progress to localStorage
  useEffect(() => {
    localStorage.setItem('sunsquare_checkout_checklist', JSON.stringify(checkoutChecklist));
  }, [checkoutChecklist]);

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
      case 'LogOut': return <LogOut className={className} />;
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

  // Toggle checkout checklist task
  const toggleCheckoutChecklist = (taskKey: string) => {
    setCheckoutChecklist(prev => ({
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

    const filteredArticles = activeArticles.filter(art => 
      art.title.toLowerCase().includes(query) ||
      art.excerpt.toLowerCase().includes(query) ||
      art.content.toLowerCase().includes(query) ||
      art.category.toLowerCase().includes(query) ||
      (art.tags && art.tags.some((tag: string) => tag.toLowerCase().includes(query)))
    );

    const filteredFaqs = activeFaqs.filter(faq => 
      faq.question.toLowerCase().includes(query) ||
      faq.answer.toLowerCase().includes(query) ||
      faq.category.toLowerCase().includes(query)
    );

    const filteredContacts = activeContacts.filter(c => 
      c.name.toLowerCase().includes(query) ||
      c.role.toLowerCase().includes(query) ||
      (c.email && c.email.toLowerCase().includes(query)) ||
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
      const art = activeArticles.find(a => a.id === articleId);
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
      const art = activeArticles.find(a => a.id === articleId);
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
    <div className="min-h-screen bg-slate-50/50 flex flex-col font-sans selection:bg-brand-100 selection:text-brand-700 pb-20 sm:pb-0">
      
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
                  {t.headerTitle}
                </h1>
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">{t.headerSubtitle}</p>
              </div>
            </div>
            
            {/* Language Switcher and Action Badges */}
            <div className="flex items-center gap-1.5 md:gap-2">
              <div className="flex items-center bg-slate-100 p-0.5 rounded-full border border-slate-200">
                <button
                  onClick={() => setLang('pt')}
                  className={`px-1.5 py-1 md:px-2 rounded-full text-[10px] font-extrabold transition-all cursor-pointer select-none ${
                    lang === 'pt'
                      ? 'bg-white text-blue-600 shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                  title="Português"
                >
                  🇧🇷 PT
                </button>
                <button
                  onClick={() => setLang('en')}
                  className={`px-1.5 py-1 md:px-2 rounded-full text-[10px] font-extrabold transition-all cursor-pointer select-none ${
                    lang === 'en'
                      ? 'bg-white text-blue-600 shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                  title="English"
                >
                  🇺🇸 EN
                </button>
                <button
                  onClick={() => setLang('es')}
                  className={`px-1.5 py-1 md:px-2 rounded-full text-[10px] font-extrabold transition-all cursor-pointer select-none ${
                    lang === 'es'
                      ? 'bg-white text-blue-600 shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                  title="Español"
                >
                  🇪🇸 ES
                </button>
              </div>

              <button
                onClick={() => triggerQuickAction('suporte', 'contatos-uteis')}
                className="animate-police-strobe flex items-center gap-1 px-2.5 py-1.5 bg-red-600 hover:bg-red-700 text-white font-extrabold text-[10px] md:text-xs rounded-full shadow-lg active:scale-95 hover:scale-102 cursor-pointer transition-all duration-150 uppercase tracking-wider"
                title={t.emergencyTitle}
              >
                <ShieldAlert className="w-3.5 h-3.5 text-white animate-pulse shrink-0" />
                <span>{t.emergencyBtn}</span>
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
              placeholder={t.searchPlaceholder}
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

          {/* Abas de Navegação Fixas e Visíveis com Suporte Superior a Celular */}
          <div className="relative -mx-4 px-4 sm:mx-0 sm:px-0">
            {/* Indicador / Botão Scroll Esquerda no Celular */}
            {navCanScrollLeft && (
              <>
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
                <button
                  type="button"
                  onClick={() => scrollContainer(navContainerRef.current, 'left', 160)}
                  aria-label="Rolar abas para a esquerda"
                  className="absolute left-1 top-1/2 -translate-y-1/2 z-20 w-7 h-7 bg-white/95 backdrop-blur-xs text-slate-700 hover:text-blue-600 rounded-full shadow-md border border-slate-200/80 flex items-center justify-center transition-all cursor-pointer active:scale-90"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </>
            )}

            {/* Indicador / Botão Scroll Direita no Celular */}
            {navCanScrollRight && (
              <>
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />
                <button
                  type="button"
                  onClick={() => scrollContainer(navContainerRef.current, 'right', 160)}
                  aria-label="Rolar abas para a direita"
                  className="absolute right-1 top-1/2 -translate-y-1/2 z-20 w-7 h-7 bg-white/95 backdrop-blur-xs text-slate-700 hover:text-blue-600 rounded-full shadow-md border border-slate-200/80 flex items-center justify-center transition-all cursor-pointer active:scale-90"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>
            )}

            <nav 
              ref={navContainerRef}
              onScroll={() => checkScrollState(navContainerRef.current, setNavCanScrollLeft, setNavCanScrollRight)}
              className="flex border-b border-slate-100 overflow-x-auto scrollbar-none scroll-smooth touch-pan-x gap-1 sm:gap-2 px-1 py-0.5" 
              id="tabs-navigation"
            >
              {[
                { id: 'inicio', label: lang === 'pt' ? 'Início' : lang === 'en' ? 'Home' : 'Inicio', icon: Sun },
                { id: 'nosso-flat', label: lang === 'pt' ? 'Nosso Flat' : lang === 'en' ? 'Our Flat' : 'Nuestro Flat', icon: Home },
                { id: 'condominio', label: lang === 'pt' ? 'O Condomínio' : lang === 'en' ? 'The Condominium' : 'El Condominio', icon: Building },
                { id: 'guia-local', label: lang === 'pt' ? 'Guia Local' : lang === 'en' ? 'Local Guide' : 'Guía Local', icon: MapPin },
                { id: 'regras', label: lang === 'pt' ? 'Regras' : lang === 'en' ? 'Rules' : 'Reglas', icon: ClipboardList },
                { id: 'suporte', label: lang === 'pt' ? 'Suporte' : lang === 'en' ? 'Support' : 'Soporte', icon: Phone }
              ].map((tab) => {
                const IconComponent = tab.icon;
                const isActive = activeTab === tab.id && !hasSearchResults;
                return (
                  <button
                    key={tab.id}
                    ref={(el) => { tabButtonRefs.current[tab.id] = el; }}
                    onClick={() => {
                      setActiveTab(tab.id as any);
                      setSearchQuery(''); // Clear search on explicit tab change to return to normal view
                    }}
                    className={`relative shrink-0 flex items-center justify-center gap-1.5 py-3 px-3.5 sm:px-5 text-xs sm:text-sm font-semibold transition-all duration-200 outline-none select-none text-center border-b-2 whitespace-nowrap cursor-pointer min-h-[44px] ${
                      isActive 
                        ? 'text-blue-600 border-blue-600 font-bold bg-blue-50/40 sm:bg-transparent rounded-t-xl sm:rounded-none' 
                        : 'text-slate-500 border-transparent hover:text-slate-700 hover:border-slate-200'
                    }`}
                    id={`tab-button-${tab.id}`}
                  >
                    <IconComponent className={`w-4 h-4 shrink-0 transition-transform ${isActive ? 'text-blue-600 scale-110' : 'text-slate-400'}`} />
                    <span>{tab.label}</span>
                    {isActive && (
                      <motion.div 
                        layoutId="activeTabIndicator" 
                        className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full" 
                      />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Categorias do Guia Local fixas no topo (quando a aba ativa for guia-local) */}
          {activeTab === 'guia-local' && !hasSearchResults && (
            <div className="relative -mx-4 px-4 sm:mx-0 sm:px-0 py-2 border-t border-slate-100/70" id="guide-categories-sticky">
              {/* Botão/Gradiente Esquerda */}
              {guideCanScrollLeft && (
                <>
                  <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
                  <button
                    type="button"
                    onClick={() => scrollContainer(guideNavRef.current, 'left', 160)}
                    aria-label="Rolar categorias para a esquerda"
                    className="absolute left-1 top-1/2 -translate-y-1/2 z-20 w-6 h-6 bg-white/95 backdrop-blur-xs text-slate-700 hover:text-blue-600 rounded-full shadow-md border border-slate-200/80 flex items-center justify-center transition-all cursor-pointer active:scale-90"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                </>
              )}

              {/* Botão/Gradiente Direita */}
              {guideCanScrollRight && (
                <>
                  <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />
                  <button
                    type="button"
                    onClick={() => scrollContainer(guideNavRef.current, 'right', 160)}
                    aria-label="Rolar categorias para a direita"
                    className="absolute right-1 top-1/2 -translate-y-1/2 z-20 w-6 h-6 bg-white/95 backdrop-blur-xs text-slate-700 hover:text-blue-600 rounded-full shadow-md border border-slate-200/80 flex items-center justify-center transition-all cursor-pointer active:scale-90"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </>
              )}

              <div 
                ref={guideNavRef}
                onScroll={() => checkScrollState(guideNavRef.current, setGuideCanScrollLeft, setGuideCanScrollRight)}
                className="flex gap-1.5 overflow-x-auto scrollbar-none scroll-smooth touch-pan-x px-1 py-0.5 justify-start"
              >
                {[
                  { id: 'Todos', label: lang === 'pt' ? 'Todos' : lang === 'en' ? 'All' : 'Todos', icon: MapPin },
                  { id: 'Pontos Turísticos', label: lang === 'pt' ? 'Pontos Turísticos' : lang === 'en' ? 'Tourist Sights' : 'Puntos Turísticos', icon: Landmark },
                  { id: 'A Semana', label: lang === 'pt' ? 'A Semana (Feiras)' : lang === 'en' ? 'Weekly Fairs' : 'La Semana (Ferias)', icon: Calendar },
                  { id: 'Todos os Dias', label: lang === 'pt' ? 'Todos os Dias (Abre a semana)' : lang === 'en' ? 'Every Day (Open all week)' : 'Todos los Días (Abre la semana)', icon: Clock },
                  { id: 'Gastronomia', label: lang === 'pt' ? 'Gastronomia' : lang === 'en' ? 'Gastronomy' : 'Gastronomía', icon: Utensils },
                  { id: 'Shoppings', label: lang === 'pt' ? 'Shoppings' : lang === 'en' ? 'Malls' : 'Centros Comerciales', icon: ShoppingBag },
                  { id: 'Lazer e Cultura', label: lang === 'pt' ? 'Lazer & Parques' : lang === 'en' ? 'Leisure & Parks' : 'Ocio y Parques', icon: Sun },
                  { id: 'Lavanderias', label: lang === 'pt' ? 'Lavanderias' : lang === 'en' ? 'Laundry' : 'Lavanderías', icon: Sparkles },
                  { id: 'Serviços', label: lang === 'pt' ? 'Serviços' : lang === 'en' ? 'Services' : 'Servicios', icon: Briefcase },
                  { id: 'Saúde e Estética', label: lang === 'pt' ? 'Estética & Veículos' : lang === 'en' ? 'Beauty & Vehicles' : 'Estética y Vehículos', icon: Zap }
                ].map((cat) => {
                  const IconComponent = cat.icon;
                  const isSelected = guideFilter === cat.id;
                  return (
                    <button
                      key={cat.id}
                      ref={(el) => { guideCategoryRefs.current[cat.id] = el; }}
                      onClick={() => setGuideFilter(cat.id)}
                      className={`shrink-0 py-1.5 px-3 rounded-full text-xs font-bold whitespace-nowrap outline-none transition-all duration-200 flex items-center gap-1.5 cursor-pointer min-h-[38px] ${
                        isSelected 
                          ? 'bg-blue-600 text-white shadow-xs' 
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
                      }`}
                    >
                      <IconComponent className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                      <span>{cat.label}</span>
                    </button>
                  );
                })}
              </div>
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
                    <div className="md:col-span-2 bg-gradient-to-br from-amber-600 via-amber-700 to-amber-800 rounded-3xl p-6 md:p-8 text-white shadow-md relative overflow-hidden flex flex-col justify-between min-h-[240px]">
                      <div className="absolute right-[-20px] top-[-20px] w-56 h-56 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />
                      <div className="absolute left-[-30px] bottom-[-30px] w-40 h-40 bg-orange-400/20 rounded-full blur-2xl pointer-events-none" />
                      
                      <div className="relative z-10 flex flex-col gap-3">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/25 text-amber-100 text-xs font-semibold w-fit">
                          <Home className="w-3.5 h-3.5 text-amber-200" />
                          <span>{lang === 'pt' ? 'Hospedagem Acolhedora' : lang === 'en' ? 'Cozy Stay' : 'Hospedaje Acogedor'}</span>
                        </div>

                        <h2 className="text-2xl md:text-3xl font-display font-bold leading-tight text-white">
                          {getGreeting()}! {t.welcomeCardTitle}
                        </h2>
                        
                        <div className="p-3.5 rounded-2xl bg-black/15 backdrop-blur-sm border border-white/15 max-w-xl my-1">
                          <p className="text-xs md:text-sm font-medium text-amber-100 leading-relaxed italic flex items-center gap-2">
                            <span className="text-lg leading-none select-none text-amber-200">“</span>
                            <span>
                              {lang === 'pt' 
                                ? 'Minha casa, sua casa. Cuide como se fosse sua!' 
                                : lang === 'en' 
                                  ? 'My house, your house. Take care of it as if it were yours!' 
                                  : 'Mi casa, su casa. ¡Cuídela como si fuera suya!'}
                            </span>
                            <span className="text-lg leading-none select-none text-amber-200">”</span>
                          </p>
                        </div>
                      </div>

                      <div className="relative z-10 mt-2">
                        <div className="h-[1px] bg-white/20 my-3" />
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-amber-100/90 font-medium">
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-amber-200" /> {t.welcomeCardLocation}
                          </span>
                          <span className="hidden sm:inline opacity-50">&bull;</span>
                          <span className="flex items-center gap-1.5">
                            <Building className="w-3.5 h-3.5 text-amber-200" /> {t.welcomeCardUnit}
                          </span>
                          <span className="hidden sm:inline opacity-50">&bull;</span>
                          <span className="flex items-center gap-1.5 text-amber-100">
                            <Smile className="w-3.5 h-3.5 text-amber-200" /> 
                            {lang === 'pt' ? 'Sinta-se muito bem-vindo!' : lang === 'en' ? 'Warmest Welcome!' : '¡Muy bienvenido!'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Widget Tempo e Hora */}
                    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between gap-4 min-h-[320px]">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-slate-500 font-medium text-xs uppercase tracking-wider">
                          <Clock className="w-4 h-4 text-blue-500" />
                          <span>{lang === 'pt' ? 'Hora & Clima' : lang === 'en' ? 'Time & Weather' : 'Hora y Clima'}</span>
                        </div>
                        <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-bold">{t.liveBadge}</span>
                      </div>
                      
                      <div className="flex flex-col">
                        <span className="text-3xl font-mono font-bold text-slate-800 tracking-tight leading-none">{currentTime || '--:--'}</span>
                        <span className="text-xs text-slate-400 font-medium mt-1.5 capitalize">{currentDateStr || (lang === 'pt' ? 'Carregando...' : lang === 'en' ? 'Loading...' : 'Cargando...')}</span>
                      </div>

                      <div className="h-[1px] bg-slate-100" />

                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-slate-700">{t.locationLabel}</span>
                          <span className="text-[11px] text-slate-500 mt-0.5">{t.weatherDetails}</span>
                        </div>
                        <div className="p-2 bg-amber-50 rounded-xl text-amber-500">
                          <Sun className="w-5 h-5 animate-[spin_15s_linear_infinite]" />
                        </div>
                      </div>

                      <div className="h-[1px] bg-slate-100" />

                      {/* Previsão de 5 Dias */}
                      <div className="flex flex-col gap-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{t.forecastTitle}</span>
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
                    {activeArticles.filter(art => art.id === 'bem-vindo').map(art => (
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
                  
                  {/* Barra de Sub-abas de "Nosso Flat" com navegação fluida e auto-scroll no Celular */}
                  <div className="relative -mx-4 px-4 sm:mx-0 sm:px-0 py-1" id="flat-subtabs-bar">
                    {/* Botão Scroll Esquerda */}
                    {flatCanScrollLeft && (
                      <>
                        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent z-10 pointer-events-none" />
                        <button
                          type="button"
                          onClick={() => scrollContainer(flatSubNavRef.current, 'left', 160)}
                          aria-label="Rolar seções para a esquerda"
                          className="absolute left-1 top-1/2 -translate-y-1/2 z-20 w-6 h-6 bg-white/95 backdrop-blur-xs text-slate-700 hover:text-blue-600 rounded-full shadow-md border border-slate-200/80 flex items-center justify-center transition-all cursor-pointer active:scale-90"
                        >
                          <ChevronLeft className="w-3.5 h-3.5" />
                        </button>
                      </>
                    )}

                    {/* Botão Scroll Direita */}
                    {flatCanScrollRight && (
                      <>
                        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-slate-50 via-slate-50/80 to-transparent z-10 pointer-events-none" />
                        <button
                          type="button"
                          onClick={() => scrollContainer(flatSubNavRef.current, 'right', 160)}
                          aria-label="Rolar seções para a direita"
                          className="absolute right-1 top-1/2 -translate-y-1/2 z-20 w-6 h-6 bg-white/95 backdrop-blur-xs text-slate-700 hover:text-blue-600 rounded-full shadow-md border border-slate-200/80 flex items-center justify-center transition-all cursor-pointer active:scale-90"
                        >
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </>
                    )}

                    <div 
                      ref={flatSubNavRef}
                      onScroll={() => checkScrollState(flatSubNavRef.current, setFlatCanScrollLeft, setFlatCanScrollRight)}
                      className="flex gap-1.5 overflow-x-auto scrollbar-none scroll-smooth touch-pan-x px-1 py-1"
                    >
                      {[
                        { id: 'todos', label: lang === 'pt' ? 'Tudo do Flat' : lang === 'en' ? 'All in Flat' : 'Todo del Flat', icon: Home, target: undefined },
                        { id: 'wifi', label: lang === 'pt' ? 'Wi-Fi 1208A' : lang === 'en' ? 'Wi-Fi 1208A' : 'Wi-Fi 1208A', icon: Wifi, target: 'wi-fi-flat' },
                        { id: 'tv', label: lang === 'pt' ? 'TV Stick & Canais' : lang === 'en' ? 'TV Stick & Channels' : 'TV Stick y Canales', icon: Tv, target: 'tv-stick' },
                        { id: 'boas-vindas', label: lang === 'pt' ? 'Voltagem & Dicas' : lang === 'en' ? 'Voltage & Tips' : 'Voltaje y Consejos', icon: Info, target: 'flat-welcome-card' },
                        { id: 'atalhos', label: lang === 'pt' ? 'Acesso Rápido' : lang === 'en' ? 'Quick Access' : 'Acceso Rápido', icon: Zap, target: 'flat-quick-actions' }
                      ].map((item) => {
                        const IconComp = item.icon;
                        const isSelected = flatSubSection === item.id;
                        return (
                          <button
                            key={item.id}
                            ref={(el) => { flatSubRefs.current[item.id] = el; }}
                            onClick={() => handleFlatSubSectionClick(item.id, item.target)}
                            className={`shrink-0 py-2 px-3.5 rounded-xl text-xs font-bold whitespace-nowrap outline-none transition-all duration-150 flex items-center gap-1.5 cursor-pointer min-h-[40px] active:scale-95 ${
                              isSelected
                                ? 'bg-blue-600 text-white shadow-xs'
                                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/70 shadow-2xs'
                            }`}
                          >
                            <IconComp className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                            <span>{item.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Instruções de Boas-Vindas (Informações Essenciais de Entrada) */}
                  <div className="bg-white rounded-3xl p-5 md:p-6 border border-slate-100 shadow-sm scroll-mt-36" id="flat-welcome-card">
                    <div className="mb-5">
                      <h3 className="font-display font-bold text-slate-800 text-sm md:text-base flex items-center gap-2">
                        <Info className="w-4 h-4 text-blue-600" /> {lang === 'pt' ? 'Instruções de Boas-Vindas' : lang === 'en' ? 'Welcome Instructions' : 'Instrucciones de Bienvenida'}
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">{lang === 'pt' ? 'Pontos importantes para garantir uma estadia agradável e sem imprevistos.' : lang === 'en' ? 'Important details to ensure a pleasant stay without any unexpected issues.' : 'Detalles importantes para garantizar una estancia agradable y sin imprevistos.'}</p>
                    </div>

                    {/* Informational Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { 
                          key: 'checkin', 
                          title: lang === 'pt' ? 'Check-in & Acesso (Flat 1208A)' : lang === 'en' ? 'Check-in & Access (Flat 1208A)' : 'Check-in y Acceso (Flat 1208A)', 
                          desc: lang === 'pt' ? 'Recepção 24h. Check-in a partir das 14h. Apresente-se na recepção, informe o Flat 1208A, mostre os documentos enviados e retire seu cartão magnético.' : lang === 'en' ? '24h reception. Check-in from 2 PM. Present yourself at reception, mention Flat 1208A, present your documents, and receive the magnetic access card.' : 'Recepción 24h. Check-in a partir de las 14:00. Preséntese en recepción, indique Flat 1208A, presente sus documentos y retire la tarjeta magnética.',
                          tab: 'regras',
                          target: 'regras-checkin-visitas',
                          icon: <Clock className="w-5 h-5 text-blue-600" />,
                          bg: 'bg-blue-50/50'
                        },
                        { 
                          key: 'voltagem', 
                          title: lang === 'pt' ? 'Atenção à Voltagem (220V)' : lang === 'en' ? 'Voltage Alert (220V)' : 'Atención al Voltaje (220V)', 
                          desc: lang === 'pt' ? 'Todas as tomadas do flat são 220V. Cuidado para não danificar seus aparelhos.' : lang === 'en' ? 'All power outlets in the flat are 220V. Please be careful not to damage your appliances.' : 'Todos los enchufes del apartamento son de 220V. Cuidado de no dañar sus electrodomésticos.',
                          tab: 'nosso-flat',
                          target: 'cuidados-sustentabilidade',
                          icon: <Zap className="w-5 h-5 text-amber-600" />,
                          bg: 'bg-amber-50/50'
                        },
                        { 
                          key: 'piscina', 
                          title: lang === 'pt' ? 'Uso da Piscina' : lang === 'en' ? 'Pool Usage' : 'Uso de la Piscina', 
                          desc: lang === 'pt' ? 'Localizada no Mezanino. É terminantemente proibido copos ou garrafas de vidro na área.' : lang === 'en' ? 'Located on the Mezzanine floor. Glass cups or bottles are strictly prohibited in the pool area.' : 'Ubicada en el Entrepiso. Queda terminantemente prohibido llevar vasos o botellas de vidrio al área.',
                          tab: 'condominio',
                          target: 'diferenciais-condominio',
                          icon: <Smile className="w-5 h-5 text-emerald-600" />,
                          bg: 'bg-emerald-50/50'
                        },
                        { 
                          key: 'lixo', 
                          title: lang === 'pt' ? 'Descarte de Lixo' : lang === 'en' ? 'Trash Disposal' : 'Desecho de Basura', 
                          desc: lang === 'pt' ? 'Todo o lixo ensacado deve ser levado e depositado nas lixeiras do Subsolo 1.' : lang === 'en' ? 'All bagged waste must be taken and deposited in the trash bins located on Basement 1 (Subsolo 1).' : 'Toda la basura en bolsas debe ser llevada y depositada en los botes de basura del Sótano 1 (Subsolo 1).',
                          tab: 'nosso-flat',
                          target: 'cuidados-sustentabilidade',
                          icon: <Trash2 className="w-5 h-5 text-rose-600" />,
                          bg: 'bg-rose-50/50'
                        },
                        { 
                          key: 'checkout', 
                          title: lang === 'pt' ? 'Instruções de Check-out' : lang === 'en' ? 'Check-out Instructions' : 'Instrucciones de Check-out', 
                          desc: lang === 'pt' ? 'Check-out até 11h. Recolha toalhas, tire o lixo no S1, desligue tudo, tranque e devolva as chaves na recepção.' : lang === 'en' ? 'Check-out until 11 AM. Collect towels, take out trash to B1, turn off appliances, lock and return keys at reception.' : 'Check-out hasta las 11:00. Recoja toallas, saque la basura en S1, apague todo, cierre y devuelva las llaves.',
                          tab: 'regras',
                          target: 'instrucoes-checkout',
                          icon: <LogOut className="w-5 h-5 text-indigo-600" />,
                          bg: 'bg-indigo-50/50'
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
                  <div className="flex flex-col gap-3 scroll-mt-36" id="flat-quick-actions">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-blue-500" /> {t.quickActionsTitle}
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      
                      <button 
                        onClick={() => triggerQuickAction('nosso-flat', 'wi-fi-flat')}
                        className="bg-white p-4 rounded-2xl border border-slate-100 hover:border-blue-200 text-left hover:shadow-sm hover:shadow-md transition-all duration-200 group active:scale-95"
                      >
                        <div className="p-2 bg-blue-50 rounded-xl text-blue-600 w-10 h-10 flex items-center justify-center mb-3 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                          <Wifi className="w-5 h-5" />
                        </div>
                        <span className="block text-xs font-semibold text-slate-400 mb-1">{lang === 'pt' ? 'Acesso à Rede' : lang === 'en' ? 'Network Access' : 'Acceso de Red'}</span>
                        <span className="block text-sm font-bold text-slate-700 leading-snug">{lang === 'pt' ? 'Senha Wi-Fi' : lang === 'en' ? 'Wi-Fi Password' : 'Contraseña Wi-Fi'}</span>
                      </button>

                      <button 
                        onClick={() => triggerQuickAction('regras', 'regras-silencio-fumo')}
                        className="bg-white p-4 rounded-2xl border border-slate-100 hover:border-blue-200 text-left hover:shadow-sm hover:shadow-md transition-all duration-200 group active:scale-95"
                      >
                        <div className="p-2 bg-blue-50 rounded-xl text-blue-600 w-10 h-10 flex items-center justify-center mb-3 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                          <VolumeX className="w-5 h-5" />
                        </div>
                        <span className="block text-xs font-semibold text-slate-400 mb-1">{lang === 'pt' ? 'Convivência' : lang === 'en' ? 'Coexistence' : 'Convivencia'}</span>
                        <span className="block text-sm font-bold text-slate-700 leading-snug">{lang === 'pt' ? 'Lei do Silêncio' : lang === 'en' ? 'Silence Rules' : 'Reglas de Silencio'}</span>
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
                        <span className="block text-xs font-semibold text-red-500 mb-1">{lang === 'pt' ? 'Canais Oficiais' : lang === 'en' ? 'Official Channels' : 'Canales Oficiales'}</span>
                        <span className="block text-sm font-bold text-slate-800 leading-snug">{lang === 'pt' ? 'Emergências' : lang === 'en' ? 'Emergencies' : 'Emergencias'}</span>
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
                        <span className="block text-xs font-semibold text-slate-400 mb-1">{lang === 'pt' ? 'Suporte Admin' : lang === 'en' ? 'Admin Support' : 'Soporte Admin'}</span>
                        <span className="block text-sm font-bold text-slate-700 leading-snug">{lang === 'pt' ? 'Fale Conosco' : lang === 'en' ? 'Contact Us' : 'Contáctenos'}</span>
                      </button>

                    </div>
                  </div>

                  {/* Artigos Dinâmicos de "Nosso Flat" */}
                  <div className="flex flex-col gap-4">
                    {activeArticles.filter(art => art.tab === 'nosso-flat').map((art) => {
                      const isHighlighted = highlightedArticleId === art.id;
                      return (
                        <div 
                          key={art.id} 
                          id={art.id}
                          className={`bg-white rounded-2xl p-5 md:p-6 border transition-all duration-300 scroll-mt-36 ${
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
                            {art.id === 'wi-fi-flat' ? (
                              <div className="flex flex-col md:flex-row items-center gap-6 p-4 rounded-2xl bg-blue-50/20 border border-blue-100/50 mt-2 w-full text-left">
                                <div className="flex-1 space-y-3 w-full">
                                  <div className="space-y-1">
                                    <span className="text-[10px] uppercase font-bold text-slate-400 block">{lang === 'pt' ? 'Nome da Rede (SSID)' : lang === 'en' ? 'Network Name (SSID)' : 'Nombre de Red (SSID)'}</span>
                                    <div className="flex items-center gap-2">
                                      <span className="font-mono text-sm font-bold text-slate-800 bg-white px-2.5 py-1 rounded-lg border border-slate-200">Ap 1208A</span>
                                      <button 
                                        onClick={() => copyToClipboard('Ap 1208A', 'Rede Wi-Fi')} 
                                        className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-blue-600 transition-colors cursor-pointer"
                                        title={lang === 'pt' ? 'Copiar Rede' : 'Copy Network'}
                                      >
                                        <Copy className="w-4 h-4" />
                                      </button>
                                    </div>
                                  </div>
                                  <div className="space-y-1">
                                    <span className="text-[10px] uppercase font-bold text-slate-400 block">{lang === 'pt' ? 'Senha' : lang === 'en' ? 'Password' : 'Contraseña'}</span>
                                    <div className="flex items-center gap-2">
                                      <span className="font-mono text-sm font-bold text-slate-800 bg-white px-2.5 py-1 rounded-lg border border-slate-200">Sun1208</span>
                                      <button 
                                        onClick={() => copyToClipboard('Sun1208', 'Senha Wi-Fi')} 
                                        className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-blue-600 transition-colors cursor-pointer"
                                        title={lang === 'pt' ? 'Copiar Senha' : 'Copy Password'}
                                      >
                                        <Copy className="w-4 h-4" />
                                      </button>
                                    </div>
                                  </div>

                                  <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200/60 text-[11px] text-amber-800 flex items-start gap-2">
                                    <Info className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                                    <span>
                                      {lang === 'pt' 
                                        ? 'Dica: Nome da rede com espaço e letras maiúsculas ("Ap 1208A"); senha sem espaço, com "S" maiúsculo ("Sun1208").' 
                                        : lang === 'en'
                                          ? 'Tip: Network name with space and uppercase letters ("Ap 1208A"); password without space, starting with capital "S" ("Sun1208").'
                                          : 'Consejo: Nombre de red con espacio y mayúsculas ("Ap 1208A"); contraseña sin espacio, con "S" mayúscula ("Sun1208").'}
                                    </span>
                                  </div>

                                  <div className="pt-1">
                                    <a 
                                      href="wifi:S:Ap%201208A;T:WPA;P:Sun1208;;" 
                                      className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm shadow-blue-100 hover:shadow-md cursor-pointer active:scale-95 animate-pulse hover:animate-none"
                                      onClick={() => {
                                        copyToClipboard('Sun1208', 'Senha Wi-Fi');
                                      }}
                                    >
                                      <Wifi className="w-4 h-4" />
                                      {lang === 'pt' ? 'Conectar ao Wi-Fi' : lang === 'en' ? 'Connect to Wi-Fi' : 'Conectarse al Wi-Fi'}
                                    </a>
                                    <p className="text-[10px] text-slate-400 mt-1.5 leading-relaxed">
                                      {lang === 'pt' ? '*Em alguns aparelhos compatíveis, clicar acima inicia a conexão automática. Caso não inicie, copie as credenciais acima e conecte manualmente.' : lang === 'en' ? '*On supported devices, clicking above starts the automatic connection. Otherwise, copy the credentials above and connect manually.' : '*En dispositivos compatibles, hacer clic arriba inicia la conexión automática. De lo contrario, copie las credenciales arriba y conéctese manualmente.'}
                                    </p>
                                  </div>
                                </div>

                                <div className="flex flex-col items-center gap-2 bg-white p-3.5 rounded-2xl border border-slate-100 shadow-2xs shrink-0">
                                  <img 
                                    src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=WIFI:S:Ap%201208A;T:WPA;P:Sun1208;;" 
                                    alt="Wi-Fi QR Code" 
                                    className="w-28 h-28"
                                    referrerPolicy="no-referrer"
                                  />
                                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                                    {lang === 'pt' ? 'Escaneie para Conectar' : lang === 'en' ? 'Scan to Connect' : 'Escanee para Conectar'}
                                  </span>
                                </div>
                              </div>
                            ) : art.id === 'tv-stick' ? (
                              <div className="space-y-6 mt-2">
                                {/* Passo 1: Entendendo o Controle Remoto */}
                                <div className="p-4 rounded-2xl bg-slate-50/50 border border-slate-100 flex flex-col md:flex-row gap-6 items-start">
                                  <div className="flex-1 space-y-4">
                                    <div className="flex items-center gap-2">
                                      <span className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-600 text-white text-[11px] font-bold">1</span>
                                      <h4 className="font-display font-bold text-slate-800 text-sm">{lang === 'pt' ? 'Entendendo o Controle Remoto' : lang === 'en' ? 'Understanding the Remote Control' : 'Entendiendo el Control Remoto'}</h4>
                                    </div>
                                    <p className="text-xs text-slate-500 leading-relaxed">
                                      {lang === 'pt' 
                                        ? 'O controle do TV Stick é super simples. Conheça e clique ou passe o cursor sobre os botões do controle ao lado para destacar o que cada um faz:' 
                                        : lang === 'en' 
                                          ? 'The TV Stick remote is super simple. Learn about the buttons by clicking or hovering over the remote control on the right:' 
                                          : 'El control del TV Stick es súper simple. Conozca y haga clic o pase el cursor sobre los botones del control al lado para ver qué hace cada uno:'}
                                    </p>

                                    <div className="space-y-2.5">
                                      {/* Setas */}
                                      <div 
                                        className={`p-2.5 rounded-xl border transition-all cursor-pointer ${activeRemoteButton === 'arrows' ? 'bg-blue-50/60 border-blue-200 shadow-2xs' : 'bg-white border-slate-200/60 hover:bg-slate-50'}`}
                                        onMouseEnter={() => setActiveRemoteButton('arrows')}
                                        onMouseLeave={() => setActiveRemoteButton(null)}
                                        onClick={() => setActiveRemoteButton(activeRemoteButton === 'arrows' ? null : 'arrows')}
                                      >
                                        <p className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                          {lang === 'pt' ? 'Setas (Círculo):' : lang === 'en' ? 'Arrows (Circle):' : 'Flechas (Círculo):'}
                                        </p>
                                        <p className="text-[11px] text-slate-500 mt-0.5 ml-3">
                                          {lang === 'pt' ? 'Serve para você andar para cima, baixo, esquerda e direita na tela da TV.' : lang === 'en' ? 'Use to move up, down, left, and right on the TV screen.' : 'Sirve para moverse hacia arriba, abajo, izquierda y derecha en la pantalla del televisor.'}
                                        </p>
                                      </div>

                                      {/* Botão OK */}
                                      <div 
                                        className={`p-2.5 rounded-xl border transition-all cursor-pointer ${activeRemoteButton === 'ok' ? 'bg-blue-50/60 border-blue-200 shadow-2xs' : 'bg-white border-slate-200/60 hover:bg-slate-50'}`}
                                        onMouseEnter={() => setActiveRemoteButton('ok')}
                                        onMouseLeave={() => setActiveRemoteButton(null)}
                                        onClick={() => setActiveRemoteButton(activeRemoteButton === 'ok' ? null : 'ok')}
                                      >
                                        <p className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                          {lang === 'pt' ? 'Botão OK (Centro do círculo):' : lang === 'en' ? 'OK Button (Center of circle):' : 'Botón OK (Centro del círculo):'}
                                        </p>
                                        <p className="text-[11px] text-slate-500 mt-0.5 ml-3">
                                          {lang === 'pt' ? 'É o botão de "Confirmar". Você aperta ele para entrar em um aplicativo ou para dar Play e Pause em um filme.' : lang === 'en' ? 'The "Confirm" button. Press to open an app or to Play and Pause a video.' : 'Es el botón de "Confirmar". Presione para entrar en una aplicación o para dar Reproducir y Pausar en un video.'}
                                        </p>
                                      </div>

                                      {/* Botão Casinha */}
                                      <div 
                                        className={`p-2.5 rounded-xl border transition-all cursor-pointer ${activeRemoteButton === 'home' ? 'bg-blue-50/60 border-blue-200 shadow-2xs' : 'bg-white border-slate-200/60 hover:bg-slate-50'}`}
                                        onMouseEnter={() => setActiveRemoteButton('home')}
                                        onMouseLeave={() => setActiveRemoteButton(null)}
                                        onClick={() => setActiveRemoteButton(activeRemoteButton === 'home' ? null : 'home')}
                                      >
                                        <p className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                          {lang === 'pt' ? 'Botão Casinha (Home):' : lang === 'en' ? 'Home Button (House):' : 'Botón Casita (Home):'}
                                        </p>
                                        <p className="text-[11px] text-slate-500 mt-0.5 ml-3">
                                          {lang === 'pt' ? 'O botão de salvamento. Se você se perder ou quiser trocar de aplicativo, aperta ele para ir direto para a tela inicial.' : lang === 'en' ? 'The safety button. If you get lost or want to switch apps, press this to return directly to the main screen.' : 'El botón de guardado. Si se pierde o quiere cambiar de aplicación, presiónelo para ir directo a la pantalla de inicio.'}
                                        </p>
                                      </div>

                                      {/* Botão Voltar */}
                                      <div 
                                        className={`p-2.5 rounded-xl border transition-all cursor-pointer ${activeRemoteButton === 'back' ? 'bg-blue-50/60 border-blue-200 shadow-2xs' : 'bg-white border-slate-200/60 hover:bg-slate-50'}`}
                                        onMouseEnter={() => setActiveRemoteButton('back')}
                                        onMouseLeave={() => setActiveRemoteButton(null)}
                                        onClick={() => setActiveRemoteButton(activeRemoteButton === 'back' ? null : 'back')}
                                      >
                                        <p className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                          {lang === 'pt' ? 'Seta Curva (Voltar):' : lang === 'en' ? 'Curved Arrow (Back):' : 'Flecha Curva (Volver):'}
                                        </p>
                                        <p className="text-[11px] text-slate-500 mt-0.5 ml-3">
                                          {lang === 'pt' ? 'Dá um passo para trás. Serve para sair de um filme ou voltar ao menu anterior.' : lang === 'en' ? 'Goes back one step. Used to exit a movie or return to the previous menu.' : 'Da un paso atrás. Sirve para salir de una película o volver al menú anterior.'}
                                        </p>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Desenho do Controle Interativo em CSS */}
                                  <div className="w-full md:w-auto flex justify-center items-center shrink-0 self-center">
                                    <div className="relative w-36 h-80 bg-slate-900 rounded-[36px] border border-slate-800 shadow-2xl flex flex-col items-center p-4">
                                      {/* LED indicador */}
                                      <div className="w-2 h-2 rounded-full bg-red-500/80 mb-6 animate-pulse" />

                                      {/* Botão Power */}
                                      <div className="w-7 h-7 rounded-full bg-red-600 border border-red-700 flex items-center justify-center cursor-pointer mb-6 hover:bg-red-500 transition-colors shadow-sm">
                                        <span className="text-[9px] text-white font-bold font-mono">I/O</span>
                                      </div>

                                      {/* Círculo Direcional (Setas) */}
                                      <div 
                                        className={`relative w-24 h-24 rounded-full bg-slate-800 border-2 transition-colors flex items-center justify-center ${activeRemoteButton === 'arrows' ? 'border-blue-500 shadow-xs' : 'border-slate-700'}`}
                                        onMouseEnter={() => setActiveRemoteButton('arrows')}
                                        onMouseLeave={() => setActiveRemoteButton(null)}
                                      >
                                        {/* Botão Cima */}
                                        <button className="absolute top-1 text-slate-400 hover:text-white transition-colors cursor-pointer text-xs" onClick={() => setActiveRemoteButton('arrows')}>▲</button>
                                        {/* Botão Baixo */}
                                        <button className="absolute bottom-1 text-slate-400 hover:text-white transition-colors cursor-pointer text-xs" onClick={() => setActiveRemoteButton('arrows')}>▼</button>
                                        {/* Botão Esquerda */}
                                        <button className="absolute left-1 text-slate-400 hover:text-white transition-colors cursor-pointer text-xs" onClick={() => setActiveRemoteButton('arrows')}>◀</button>
                                        {/* Botão Direita */}
                                        <button className="absolute right-1 text-slate-400 hover:text-white transition-colors cursor-pointer text-xs" onClick={() => setActiveRemoteButton('arrows')}>▶</button>

                                        {/* Botão OK (Centro) */}
                                        <div 
                                          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all cursor-pointer active:scale-95 z-10 ${activeRemoteButton === 'ok' ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-700 text-slate-200 hover:bg-slate-600'}`}
                                          onMouseEnter={(e) => {
                                            e.stopPropagation();
                                            setActiveRemoteButton('ok');
                                          }}
                                          onMouseLeave={() => setActiveRemoteButton(null)}
                                          onClick={() => setActiveRemoteButton('ok')}
                                        >
                                          OK
                                        </div>
                                      </div>

                                      {/* Botões do Meio (Voltar & Home) */}
                                      <div className="flex gap-4 mt-6">
                                        {/* Botão Voltar */}
                                        <div 
                                          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer border ${activeRemoteButton === 'back' ? 'bg-blue-600 border-blue-500 text-white shadow-xs' : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700 hover:text-white'}`}
                                          onMouseEnter={() => setActiveRemoteButton('back')}
                                          onMouseLeave={() => setActiveRemoteButton(null)}
                                          onClick={() => setActiveRemoteButton('back')}
                                        >
                                          <RefreshCw className="w-4 h-4 -scale-x-100" />
                                        </div>

                                        {/* Botão Home */}
                                        <div 
                                          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer border ${activeRemoteButton === 'home' ? 'bg-blue-600 border-blue-500 text-white shadow-xs' : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700 hover:text-white'}`}
                                          onMouseEnter={() => setActiveRemoteButton('home')}
                                          onMouseLeave={() => setActiveRemoteButton(null)}
                                          onClick={() => setActiveRemoteButton('home')}
                                        >
                                          <Home className="w-4 h-4" />
                                        </div>
                                      </div>

                                      {/* Logo / Marca fictícia */}
                                      <span className="text-[8px] text-slate-600 font-bold uppercase tracking-widest mt-6">TV Stick</span>
                                    </div>
                                  </div>
                                </div>

                                {/* Passo 2: Escolhendo o que Assistir (Tela Inicial) */}
                                <div className="p-4 rounded-2xl bg-slate-50/50 border border-slate-100 flex flex-col md:flex-row gap-6 items-start">
                                  <div className="flex-1 space-y-3">
                                    <div className="flex items-center gap-2">
                                      <span className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-600 text-white text-[11px] font-bold">2</span>
                                      <h4 className="font-display font-bold text-slate-800 text-sm">{lang === 'pt' ? 'Escolhendo o que Assistir (Tela Inicial)' : lang === 'en' ? 'Choosing What to Watch (Home Screen)' : 'Elegir qué Ver (Pantalla de Inicio)'}</h4>
                                    </div>
                                    <p className="text-xs text-slate-500 leading-relaxed">
                                      {lang === 'pt' 
                                        ? 'Ao ligar a TV, você verá a tela principal (representação abaixo). Use as Setas do controle para navegar e selecione com OK:' 
                                        : lang === 'en' 
                                          ? 'When you turn on the TV, you will see the home screen (representation below). Use the arrows on the remote to navigate and OK to select:' 
                                          : 'Al encender el televisor, verá la pantalla principal (representación abajo). Use las flechas para navegar y presione OK para seleccionar:'}
                                    </p>

                                    <div className="text-[11px] text-slate-500 space-y-1 ml-1 font-medium">
                                      <p>1. {lang === 'pt' ? 'Use as Setas do controle para navegar pela tela.' : lang === 'en' ? 'Use the Arrows on the remote to navigate.' : 'Use las Flechas del control para navegar.'}</p>
                                      <p>2. {lang === 'pt' ? 'Vá até a fileira com os blocos de aplicativos (Netflix, YouTube, Prime Video).' : lang === 'en' ? 'Go to the row where the app blocks are located.' : 'Vaya a la fila donde están los bloques de aplicaciones.'}</p>
                                      <p>3. {lang === 'pt' ? 'Quando o aplicativo desejado estiver destacado, aperte OK para entrar.' : lang === 'en' ? 'When the desired app is highlighted, press OK to enter.' : 'Cuando la aplicación que quiera esté destacada, presione OK para entrar.'}</p>
                                    </div>
                                  </div>

                                  {/* Desenho de uma TV / Tela em CSS */}
                                  <div className="w-full md:w-auto flex flex-col items-center shrink-0 self-center">
                                    <div className="relative w-64 h-36 bg-slate-950 rounded-lg border-4 border-slate-800 shadow-xl overflow-hidden flex flex-col p-2.5 justify-between">
                                      {/* Header da TV */}
                                      <div className="flex justify-between items-center text-[7px] text-slate-500 border-b border-slate-900 pb-1">
                                        <span className="font-bold text-blue-400">TV STICK HOME</span>
                                        <span className="font-mono">20:45</span>
                                      </div>

                                      {/* Grid de Apps */}
                                      <div className="grid grid-cols-4 gap-1.5 py-2">
                                        {[
                                          { name: 'YouTube', color: 'bg-red-600', icon: 'YT' },
                                          { name: 'Netflix', color: 'bg-red-700', icon: 'N' },
                                          { name: 'Prime Video', color: 'bg-sky-500', icon: 'PV' },
                                          { name: 'Disney+', color: 'bg-blue-900', icon: 'D+' }
                                        ].map((app) => (
                                          <div 
                                            key={app.name}
                                            className={`rounded-md p-1 flex flex-col items-center justify-center transition-all cursor-pointer h-10 border ${activeTvApp === app.name ? 'scale-110 border-blue-400 bg-slate-800 shadow-xs' : 'border-slate-900 bg-slate-900 hover:bg-slate-800/80'}`}
                                            onMouseEnter={() => setActiveTvApp(app.name)}
                                            onMouseLeave={() => setActiveTvApp(null)}
                                          >
                                            <div className={`w-5 h-5 rounded-md flex items-center justify-center text-[8px] font-bold text-white ${app.color}`}>
                                              {app.icon}
                                            </div>
                                            <span className="text-[6px] text-slate-400 font-semibold mt-1 truncate max-w-full text-center">{app.name}</span>
                                          </div>
                                        ))}
                                      </div>

                                      {/* Legenda inferior */}
                                      <div className="text-[6px] text-center text-slate-400 truncate">
                                        {activeTvApp ? (
                                          <span className="text-blue-400 font-bold">{lang === 'pt' ? 'Entrar no ' : lang === 'en' ? 'Open ' : 'Entrar en '}{activeTvApp}</span>
                                        ) : (
                                          <span>{lang === 'pt' ? 'Use o controle para selecionar' : 'Use the remote to select'}</span>
                                        )}
                                      </div>
                                    </div>
                                    <div className="w-12 h-3 bg-slate-800" />
                                    <div className="w-20 h-1 bg-slate-700 rounded-full" />
                                  </div>
                                </div>

                                {/* Passo 3: Assistindo na Prática */}
                                <div className="p-4 rounded-2xl bg-slate-50/50 border border-slate-100 space-y-3">
                                  <div className="flex items-center gap-2">
                                    <span className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-600 text-white text-[11px] font-bold">3</span>
                                    <h4 className="font-display font-bold text-slate-800 text-sm">{lang === 'pt' ? 'Assistindo na Prática (Passo a Passo)' : lang === 'en' ? 'Watching in Practice (Step-by-Step)' : 'Ver en la Práctica (Paso a Paso)'}</h4>
                                  </div>

                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                                    {[
                                      {
                                        step: "1",
                                        pt: "Ligue a TV no controle original dela e selecione a entrada HDMI correspondente.",
                                        en: "Turn on the TV with its original remote control and select the correct HDMI input.",
                                        es: "Encienda el televisor con su control original y seleccione la entrada HDMI correspondiente."
                                      },
                                      {
                                        step: "2",
                                        pt: "A tela do TV Stick vai aparecer. Use as Setas do controle do TV Stick para ir até o aplicativo desejado.",
                                        en: "The TV Stick screen will appear. Use the remote arrows to navigate to your desired app.",
                                        es: "Aparecerá la pantalla del TV Stick. Use las flechas del control para ir al aplicativo deseado."
                                      },
                                      {
                                        step: "3",
                                        pt: "Aperte o botão central OK para entrar no aplicativo selecionado.",
                                        en: "Press the central OK button to open the selected app.",
                                        es: "Presione el botón central OK para ingresar al aplicativo seleccionado."
                                      },
                                      {
                                        step: "4",
                                        pt: "Dentro do aplicativo, use as Setas para escolher o vídeo, série ou filme que quer assistir.",
                                        en: "Inside the app, use the arrows to select the video, show, or movie you want to watch.",
                                        es: "Dentro de la aplicación, use las flechas para elegir el video, serie o película que desea ver."
                                      },
                                      {
                                        step: "5",
                                        pt: "Aperte OK em cima da capa do conteúdo escolhido para começar a reprodução.",
                                        en: "Press OK on the poster/cover of the selected video to start playing.",
                                        es: "Presione OK sobre la portada del contenido elegido para comenzar la reproducción."
                                      },
                                      {
                                        step: "6",
                                        pt: "Para pausar o vídeo a qualquer momento, aperte OK. Para continuar assistindo, aperte OK de novo.",
                                        en: "To pause the video at any time, press OK. To resume watching, press OK again.",
                                        es: "Para pausar el video en cualquier momento, presione OK. Para continuar viendo, presione OK de nuevo."
                                      }
                                    ].map((s) => (
                                      <div key={s.step} className="p-3 bg-white rounded-xl border border-slate-200/60 flex gap-3 items-start hover:border-blue-200 hover:shadow-2xs transition-all">
                                        <span className="w-5 h-5 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 font-bold text-[10px] shrink-0 mt-0.5">{s.step}</span>
                                        <p className="text-[11px] text-slate-600 leading-relaxed font-medium">{lang === 'pt' ? s.pt : lang === 'en' ? s.en : s.es}</p>
                                      </div>
                                    ))}
                                  </div>

                                  <div className="p-3 bg-blue-50/30 border border-blue-100/50 rounded-xl text-[11px] text-slate-500 flex gap-2.5 items-center mt-2 font-medium">
                                    <Home className="w-4 h-4 text-blue-600 shrink-0 animate-bounce" />
                                    <p>
                                      {lang === 'pt' 
                                        ? 'DICA DE OURO: Se perder ou quiser ver outro app, aperte o botão CASINHA (Home) no controle para voltar imediatamente ao início!' 
                                        : lang === 'en'
                                          ? 'PRO TIP: If you get lost or want to open another app, press the HOUSE button (Home) on the remote to go back instantly!'
                                          : 'CONSEJO DE ORO: Si se pierde o quiere ver otra app, presione el botón CASITA (Home) en el control para regresar de inmediato.'}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ) : art.id === 'regras-checkin-visitas' ? (
                              <div className="space-y-6 mt-2">
                                {/* Header Card / Flat Identification */}
                                <div className="p-4 rounded-2xl bg-blue-50/40 border border-blue-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                  <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                      <span className="px-2.5 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider">
                                        {lang === 'pt' ? 'Check-in Passo a Passo' : lang === 'en' ? 'Step-by-Step Check-in' : 'Check-in Paso a Paso'}
                                      </span>
                                      <span className="text-xs font-bold text-slate-700 font-mono bg-white px-2 py-0.5 rounded border border-slate-200">
                                        Flat 1208A
                                      </span>
                                    </div>
                                    <p className="text-xs text-slate-500">
                                      {lang === 'pt' 
                                        ? 'Siga as instruções abaixo para realizar o seu check-in com total facilidade e tranquilidade:' 
                                        : lang === 'en' 
                                          ? 'Follow the instructions below to complete your check-in smoothly and easily:' 
                                          : 'Siga las instrucciones a continuación para realizar su check-in con total facilidad:'}
                                    </p>
                                  </div>

                                  <div className="px-3.5 py-2 bg-white rounded-xl border border-blue-100 shadow-2xs flex items-center gap-2.5 shrink-0">
                                    <Clock className="w-4 h-4 text-blue-600" />
                                    <div>
                                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                        {lang === 'pt' ? 'Horário Oficial' : lang === 'en' ? 'Official Schedule' : 'Horario Oficial'}
                                      </p>
                                      <p className="text-xs font-bold text-slate-800">
                                        {lang === 'pt' ? 'A partir das 14h (Recepção 24h)' : lang === 'en' ? 'From 2:00 PM (24h Reception)' : 'A partir de las 14:00 (Recepción 24h)'}
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* 4 Steps Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                  {/* Passo 1 */}
                                  <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:border-blue-200 hover:shadow-xs transition-all space-y-2">
                                    <div className="flex items-center justify-between">
                                      <span className="w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">1</span>
                                      <Clock className="w-4 h-4 text-blue-500" />
                                    </div>
                                    <h4 className="font-bold text-slate-800 text-xs">
                                      {lang === 'pt' ? 'Recepção 24h & Horário de Entrada' : lang === 'en' ? '24h Reception & Entry Schedule' : 'Recepción 24h y Horario de Entrada'}
                                    </h4>
                                    <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                                      {lang === 'pt' 
                                        ? 'A recepção do condomínio funciona 24 horas por dia. O nosso horário oficial de check-in é liberado a partir das 14:00.' 
                                        : lang === 'en' 
                                          ? 'The reception operates 24 hours a day. Official check-in time starts from 2:00 PM.' 
                                          : 'La recepción funciona las 24 horas. El horario oficial de check-in es a partir de las 14:00.'}
                                    </p>
                                  </div>

                                  {/* Passo 2 */}
                                  <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:border-blue-200 hover:shadow-xs transition-all space-y-2">
                                    <div className="flex items-center justify-between">
                                      <span className="w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">2</span>
                                      <Building className="w-4 h-4 text-blue-500" />
                                    </div>
                                    <h4 className="font-bold text-slate-800 text-xs">
                                      {lang === 'pt' ? 'Apresentação na Recepção' : lang === 'en' ? 'Present Yourself at Reception' : 'Identificación en Recepción'}
                                    </h4>
                                    <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                                      {lang === 'pt' 
                                        ? 'Ao chegar ao condomínio, dirija-se à recepção e informe aos atendentes que você ficará hospedado no Flat 1208A.' 
                                        : lang === 'en' 
                                          ? 'Upon arrival at the building, go to the reception and inform them that you are staying in Flat 1208A.' 
                                          : 'Al llegar al edificio, diríjase a la recepción e informe que se hospedará en el Flat 1208A.'}
                                    </p>
                                  </div>

                                  {/* Passo 3 */}
                                  <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:border-blue-200 hover:shadow-xs transition-all space-y-2">
                                    <div className="flex items-center justify-between">
                                      <span className="w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">3</span>
                                      <Shield className="w-4 h-4 text-blue-500" />
                                    </div>
                                    <h4 className="font-bold text-slate-800 text-xs">
                                      {lang === 'pt' ? 'Apresentação de Documentos' : lang === 'en' ? 'Present Identification Documents' : 'Presentación de Documentos'}
                                    </h4>
                                    <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                                      {lang === 'pt' 
                                        ? 'Apresente os seus documentos pessoais de identificação previamente enviados ao anfitrião para liberação na portaria.' 
                                        : lang === 'en' 
                                          ? 'Present your personal identification documents sent previously to the host for building clearance.' 
                                          : 'Presente sus documentos personales de identificación previamente enviados al anfitrión para la autorización.'}
                                    </p>
                                  </div>

                                  {/* Passo 4 */}
                                  <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:border-blue-200 hover:shadow-xs transition-all space-y-2">
                                    <div className="flex items-center justify-between">
                                      <span className="w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">4</span>
                                      <Zap className="w-4 h-4 text-emerald-500" />
                                    </div>
                                    <h4 className="font-bold text-slate-800 text-xs">
                                      {lang === 'pt' ? 'Retirada do Cartão Magnético' : lang === 'en' ? 'Retrieve Magnetic Access Card' : 'Retiro de Tarjeta Magnética'}
                                    </h4>
                                    <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                                      {lang === 'pt' 
                                        ? 'Após a validação rápida pela portaria, você receberá o cartão magnético de acesso ao Flat 1208A e elevadores.' 
                                        : lang === 'en' 
                                          ? 'Following quick verification by reception, you will receive the magnetic access card to Flat 1208A and elevators.' 
                                          : 'Tras la verificación rápida en recepción, le entregarán la tarjeta magnética de acceso al Flat 1208A y elevadores.'}
                                    </p>
                                  </div>
                                </div>

                                 {/* Informações Complementares (Check-out, Capacidade e Visitas) */}
                                <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-3">
                                  <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider flex items-center gap-1.5">
                                    <Info className="w-3.5 h-3.5 text-blue-600" />
                                    {lang === 'pt' ? 'Informações Importantes sobre a Estadia' : lang === 'en' ? 'Important Stay Information' : 'Información Importante sobre la Estancia'}
                                  </h4>
                                  
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[11px] text-slate-600">
                                    <div className="bg-white p-3 rounded-xl border border-slate-200/60">
                                      <span className="font-bold text-slate-800 block mb-0.5">• Check-out:</span>
                                      {lang === 'pt' ? 'Até as 11:00. Se precisar ajustar o horário, consulte o anfitrião com antecedência.' : lang === 'en' ? 'Until 11:00 AM. If you need an extension, inform the host in advance.' : 'Hasta las 11:00. Si necesita ajustar el horario, consulte al anfitrión con anticipación.'}
                                    </div>
                                    <div className="bg-white p-3 rounded-xl border border-slate-200/60">
                                      <span className="font-bold text-slate-800 block mb-0.5">• Capacidade Máxima:</span>
                                      {lang === 'pt' ? 'O limite máximo de 4 hóspedes não pode ser ultrapassado sob nenhuma hipótese.' : lang === 'en' ? 'Maximum capacity of 4 guests cannot be exceeded under any circumstances.' : 'El límite máximo de 4 huéspedes no se puede superar bajo ninguna circunstancia.'}
                                    </div>
                                    <div className="bg-white p-3 rounded-xl border border-slate-200/60">
                                      <span className="font-bold text-slate-800 block mb-0.5">• Visitas & Acesso:</span>
                                      {lang === 'pt' ? 'O Flat pode receber visitas, mas devem ser previamente cadastradas pelo proprietário ou administrador.' : lang === 'en' ? 'The Flat can receive visitors, but they must be registered in advance by the owner or manager.' : 'El Flat puede recibir visitas, pero deben ser previamente registradas por el propietario o administrador.'}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ) : art.id === 'instrucoes-checkout' ? (
                              <div className="space-y-6 mt-2">
                                {/* Header Card / Flat Identification */}
                                <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                  <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                      <span className="px-2.5 py-0.5 rounded-full bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-wider">
                                        {lang === 'pt' ? 'Check-out & Instruções de Saída' : lang === 'en' ? 'Check-out & Exit Instructions' : 'Check-out e Instrucciones de Salida'}
                                      </span>
                                      <span className="text-xs font-bold text-slate-700 font-mono bg-white px-2 py-0.5 rounded border border-slate-200">
                                        Flat 1208A
                                      </span>
                                    </div>
                                    <p className="text-xs text-slate-600">
                                      {lang === 'pt' 
                                        ? 'Confira o passo a passo obrigatório para encerrar sua estadia com tranquilidade:' 
                                        : lang === 'en' 
                                          ? 'Check the mandatory step-by-step guide to complete your checkout smoothly:' 
                                          : 'Consulte el paso a paso obligatorio para finalizar su estancia con tranquilidad:'}
                                    </p>
                                  </div>

                                  <div className="px-3.5 py-2 bg-white rounded-xl border border-indigo-100 shadow-2xs flex items-center gap-2.5 shrink-0">
                                    <Clock className="w-4 h-4 text-indigo-600" />
                                    <div>
                                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                        {lang === 'pt' ? 'Horário Limite' : lang === 'en' ? 'Deadline' : 'Horario Límite'}
                                      </p>
                                      <p className="text-xs font-bold text-slate-800">
                                        {lang === 'pt' ? 'Até as 11:00 AM' : lang === 'en' ? 'Until 11:00 AM' : 'Hasta las 11:00 AM'}
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* 5 Main Checkout Steps */}
                                <div className="space-y-3">
                                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 pl-1">
                                    <CheckSquare className="w-4 h-4 text-indigo-600" />
                                    {lang === 'pt' ? 'Passo a Passo de Saída' : lang === 'en' ? 'Step-by-Step Exit Guide' : 'Paso a Paso de Salida'}
                                  </h4>

                                  {[
                                    {
                                      key: 'toalhas',
                                      num: 1,
                                      title: lang === 'pt' ? '🧺 Recolha as toalhas usadas' : lang === 'en' ? '🧺 Collect used towels' : '🧺 Recoja las toallas usadas',
                                      desc: lang === 'pt' ? 'Deixe as toalhas estendidas para evitar mal cheiro e mofo.' : lang === 'en' ? 'Leave towels hanging to prevent bad odor and mold.' : 'Deje las toallas colgadas para evitar mal olor y moho.',
                                      icon: <Sparkles className="w-4 h-4 text-blue-600" />
                                    },
                                    {
                                      key: 'lixo',
                                      num: 2,
                                      title: lang === 'pt' ? '🗑️ Tire o lixo' : lang === 'en' ? '🗑️ Take out the trash' : '🗑️ Saque la basura',
                                      desc: lang === 'pt' ? 'Separe o orgânico do reciclado e descarte nas lixeiras do condomínio, localizadas no Subsolo 1 (S1).' : lang === 'en' ? 'Separate organic from recyclable waste and dispose of it in the condominium trash bins located in Basement 1 (S1).' : 'Separe lo orgánico de lo reciclable y deséchelo en los contenedores del condominio, ubicados en el Sótano 1 (S1).',
                                      icon: <Trash2 className="w-4 h-4 text-rose-600" />
                                    },
                                    {
                                      key: 'desligue',
                                      num: 3,
                                      title: lang === 'pt' ? '🔌 Desligue tudo' : lang === 'en' ? '🔌 Turn off everything' : '🔌 Apague todo',
                                      desc: lang === 'pt' ? 'Com exceção do frigobar, todos os aparelhos precisam ser deixados desligados sempre que se ausentarem do flat.' : lang === 'en' ? 'With the exception of the minibar, all appliances must be left turned off whenever leaving the flat.' : 'Con excepción del frigobar, todos los electrodomésticos deben dejarse apagados siempre que se ausenten del apartamento.',
                                      icon: <Zap className="w-4 h-4 text-amber-600" />
                                    },
                                    {
                                      key: 'tranque',
                                      num: 4,
                                      title: lang === 'pt' ? '🔒 Tranque tudo' : lang === 'en' ? '🔒 Lock everything' : '🔒 Cierre todo',
                                      desc: lang === 'pt' ? 'Feche as janelas e a porta.' : lang === 'en' ? 'Close windows and lock the door.' : 'Cierre las ventanas y la puerta.',
                                      icon: <Lock className="w-4 h-4 text-indigo-600" />
                                    },
                                    {
                                      key: 'chaves',
                                      num: 5,
                                      title: lang === 'pt' ? '🔑 Devolva as chaves' : lang === 'en' ? '🔑 Return the keys' : '🔑 Devuelva las llaves',
                                      desc: lang === 'pt' ? 'Devolva o cartão magnético na recepção.' : lang === 'en' ? 'Return the magnetic access card at reception.' : 'Devuelva la tarjeta magnética en la recepción.',
                                      icon: <Key className="w-4 h-4 text-emerald-600" />
                                    }
                                  ].map((item) => (
                                    <div 
                                      key={item.key} 
                                      onClick={() => toggleCheckoutChecklist(item.key)}
                                      className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex items-start gap-3.5 ${
                                        checkoutChecklist[item.key] 
                                          ? 'bg-emerald-50/60 border-emerald-300' 
                                          : 'bg-white border-slate-200/80 hover:border-indigo-200 shadow-2xs'
                                      }`}
                                    >
                                      <div className="pt-0.5">
                                        <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                                          checkoutChecklist[item.key] 
                                            ? 'bg-emerald-600 border-emerald-600 text-white' 
                                            : 'border-slate-300 bg-slate-50'
                                        }`}>
                                          {checkoutChecklist[item.key] && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                                        </div>
                                      </div>

                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                          <span className="w-5 h-5 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-bold flex items-center justify-center shrink-0">
                                            {item.num}
                                          </span>
                                          <h5 className={`text-xs font-bold ${checkoutChecklist[item.key] ? 'text-emerald-900 line-through opacity-80' : 'text-slate-800'}`}>
                                            {item.title}
                                          </h5>
                                        </div>
                                        <p className={`text-[11px] leading-relaxed ${checkoutChecklist[item.key] ? 'text-emerald-700' : 'text-slate-500'}`}>
                                          {item.desc}
                                        </p>
                                      </div>
                                    </div>
                                  ))}
                                </div>

                                {/* Regras Essenciais & Pedidos Adicionais */}
                                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-3">
                                  <div className="flex items-center gap-2">
                                    <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
                                    <h4 className="font-bold text-amber-900 text-xs uppercase tracking-wider">
                                      {lang === 'pt' ? 'Pedidos Adicionais & Regras Essenciais' : lang === 'en' ? 'Additional Requests & Essential Rules' : 'Pedidos Adicionales y Reglas Esenciales'}
                                    </h4>
                                  </div>

                                  <div className="space-y-2 text-[11px] text-amber-900/90 font-medium leading-relaxed">
                                    <div className="flex items-start gap-2">
                                      <span className="font-bold text-amber-700">1.</span>
                                      <p>{lang === 'pt' ? 'O acesso só é liberado após o preenchimento obrigatório do nosso WebCheckin.' : lang === 'en' ? 'Access is only granted after mandatory WebCheckin completion.' : 'El acceso solo se libera tras el llenado obligatorio de nuestro WebCheckin.'}</p>
                                    </div>
                                    <div className="flex items-start gap-2">
                                      <span className="font-bold text-amber-700">2.</span>
                                      <p>{lang === 'pt' ? 'Visitas são estritamente proibidas, a menos que sejam cadastradas previamente conosco.' : lang === 'en' ? 'Visitors are strictly prohibited unless previously registered with us.' : 'Las visitas están estrictamente prohibidas, a menos que se hayan registrado previamente con nosotros.'}</p>
                                    </div>
                                    <div className="flex items-start gap-2">
                                      <span className="font-bold text-amber-700">3.</span>
                                      <p>{lang === 'pt' ? 'Ao sair do flat, lembre-se de desligar luzes e o ar-condicionado.' : lang === 'en' ? 'When leaving the flat, remember to turn off lights and air conditioning.' : 'Al salir del flat, recuerde apagar las luces y el aire acondicionado.'}</p>
                                    </div>
                                    <div className="flex items-start gap-2">
                                      <span className="font-bold text-amber-700">4.</span>
                                      <p>{lang === 'pt' ? 'O lixo (orgânico e reciclável) deve ser descartado no Subsolo 1 (S1).' : lang === 'en' ? 'Trash (organic and recyclable) must be disposed of in Basement 1 (S1).' : 'La basura (orgánica y reciclable) debe desecharse en el Sótano 1 (S1).'}</p>
                                    </div>
                                  </div>

                                  <div className="pt-2 border-t border-amber-200/60 text-center">
                                    <p className="text-xs font-bold text-amber-800 italic">
                                      {lang === 'pt' ? 'Obrigado por cuidar do espaço!' : lang === 'en' ? 'Thank you for taking care of our space!' : '¡Gracias por cuidar el espacio!'}
                                    </p>
                                  </div>
                                </div>
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
                        <MapPin className="w-4 h-4 text-blue-600" /> {t.floorMapTitle}
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">{t.floorMapSubtitle}</p>
                    </div>

                    {/* Floor Buttons com Design Otimizado para Toque */}
                    <div className="grid grid-cols-3 gap-1.5 bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200/60">
                      {[
                        { id: 'mezanino', label: lang === 'pt' ? 'Mezanino' : lang === 'en' ? 'Mezzanine' : 'Entrepiso', info: lang === 'pt' ? 'Lazer & Piscina' : lang === 'en' ? 'Leisure & Pool' : 'Ocio y Piscina', icon: Waves },
                        { id: 'terreo', label: lang === 'pt' ? 'Térreo' : lang === 'en' ? 'Ground Floor' : 'Planta Baja', info: lang === 'pt' ? 'Recepção 24h' : lang === 'en' ? 'Reception 24h' : 'Recepción 24h', icon: Key },
                        { id: 'subsolo', label: lang === 'pt' ? 'Subsolos' : lang === 'en' ? 'Basement' : 'Sótano', info: lang === 'pt' ? 'Garagem & Lixo' : lang === 'en' ? 'Valet & Trash' : 'Garaje y Basura', icon: Car }
                      ].map((floor) => {
                        const IconComp = floor.icon;
                        const isSelected = activeFloor === floor.id;
                        return (
                          <button
                            key={floor.id}
                            type="button"
                            onClick={() => setActiveFloor(floor.id as any)}
                            className={`relative py-2.5 px-2 rounded-xl text-xs font-bold transition-all text-center flex flex-col items-center justify-center outline-none select-none cursor-pointer min-h-[54px] active:scale-95 ${
                              isSelected 
                                ? 'text-blue-600 font-extrabold' 
                                : 'text-slate-500 hover:text-slate-800'
                            }`}
                          >
                            {isSelected && (
                              <motion.div
                                layoutId="activeFloorPill"
                                className="absolute inset-0 bg-white rounded-xl shadow-xs border border-slate-200/60"
                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                              />
                            )}
                            <div className="relative z-10 flex flex-col items-center gap-0.5">
                              <div className="flex items-center gap-1.5">
                                <IconComp className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-blue-600' : 'text-slate-400'}`} />
                                <span className="leading-tight text-xs">{floor.label}</span>
                              </div>
                              <span className={`text-[9px] font-medium leading-tight ${isSelected ? 'text-blue-500' : 'text-slate-400 opacity-85'}`}>
                                {floor.info}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Floor Detail Content */}
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 transition-all">
                      {activeFloor === 'mezanino' && (
                        <div className="flex flex-col gap-2.5">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="p-1.5 bg-blue-50 text-blue-600 rounded-lg"><Smile className="w-4 h-4" /></span>
                            <h4 className="text-sm font-bold text-slate-800">{t.floorMapMezanino}</h4>
                          </div>
                          <div className="text-xs text-slate-600 leading-relaxed space-y-1.5">
                            <p>{t.floorMapMezaninoDesc}</p>
                            {lang === 'pt' ? (
                              <>
                                <p>• <strong>Piscina Climatizada:</strong> Espaço ideal para relaxar e nadar com toda a segurança.</p>
                                <p>• <strong>Saunas Seca e a Vapor:</strong> Disponíveis para o bem-estar dos moradores (solicite liberação prévia na recepção).</p>
                                <p>• <strong>Academia (Fitness Centre):</strong> Espaço moderno equipado para seus treinos.</p>
                                <p>• <strong>Sala de Jogos:</strong> Ambiente divertido e equipado para momentos de lazer.</p>
                                <p>• <strong>Espaço de Trabalho:</strong> Infraestrutura corporativa com mesas ergonômicas, internet fibra ultra rápida e salas de reunião.</p>
                              </>
                            ) : lang === 'en' ? (
                              <>
                                <p>• <strong>Climatized Pool:</strong> Ideal space to relax and swim safely.</p>
                                <p>• <strong>Dry & Steam Saunas:</strong> Available for guest wellness (request activation at the front desk).</p>
                                <p>• <strong>Gym (Fitness Centre):</strong> Modern gym fully equipped for your workouts.</p>
                                <p>• <strong>Games Room:</strong> Fun environment equipped for leisure moments.</p>
                                <p>• <strong>Coworking Space:</strong> Corporate infrastructure with ergonomic tables, ultra-fast fiber internet, and meeting rooms.</p>
                              </>
                            ) : (
                              <>
                                <p>• <strong>Piscina Climatizada:</strong> Espacio ideal para relajarse y nadar con total seguridad.</p>
                                <p>• <strong>Saunas Seca y de Vapor:</strong> Disponibles para el bienestar de los huéspedes (solicite activación en recepción).</p>
                                <p>• <strong>Gimnasio (Fitness Centre):</strong> Espacio moderno equipado para sus entrenamientos.</p>
                                <p>• <strong>Sala de Juegos:</strong> Ambiente divertido y equipado para momentos de ocio.</p>
                                <p>• <strong>Espacio de Trabajo:</strong> Infraestructura corporativa con mesas ergonómicas, internet de fibra ultra rápido y salas de reuniones.</p>
                              </>
                            )}
                          </div>
                          <div className="grid grid-cols-2 gap-3 mt-1.5 text-[11px] bg-white p-2.5 rounded-lg border border-slate-100">
                            <div>
                              <p className="text-slate-400 font-medium">{lang === 'pt' ? 'Horários' : lang === 'en' ? 'Hours' : 'Horarios'}</p>
                              <p className="font-bold text-slate-700">{lang === 'pt' ? 'Piscina & Saunas: Ter-Dom (07h-22h) | Academia: 24h' : lang === 'en' ? 'Pool & Saunas: Tue-Sun (7am-10pm) | Gym: 24h' : 'Piscina y Saunas: Mar-Dom (07h-22h) | Gimnasio: 24h'}</p>
                            </div>
                            <div>
                              <p className="text-slate-400 font-medium">{lang === 'pt' ? 'Regras' : lang === 'en' ? 'Rules' : 'Reglas'}</p>
                              <p className="font-bold text-slate-700">{lang === 'pt' ? 'Proibido garrafas/copos de vidro nas áreas úmidas' : lang === 'en' ? 'No glass cups/bottles in the pool area' : 'Prohibido llevar vasos/botellas de vidrio al área de piscina'}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {activeFloor === 'terreo' && (
                        <div className="flex flex-col gap-2.5">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="p-1.5 bg-blue-50 text-blue-600 rounded-lg"><Home className="w-4 h-4" /></span>
                            <h4 className="text-sm font-bold text-slate-800">{t.floorMapTerreo}</h4>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            {t.floorMapTerreoDesc}
                          </p>
                          <div className="grid grid-cols-2 gap-3 mt-1.5 text-[11px] bg-white p-2.5 rounded-lg border border-slate-100">
                            <div>
                              <p className="text-slate-400 font-medium">{lang === 'pt' ? 'Segurança' : lang === 'en' ? 'Security' : 'Seguridad'}</p>
                              <p className="font-bold text-slate-700">{lang === 'pt' ? 'Monitoramento e Portaria 24h' : lang === 'en' ? 'CCTV & 24h Front Desk' : 'Monitoreo y Recepción 24h'}</p>
                            </div>
                            <div>
                              <p className="text-slate-400 font-medium">Porte-cochère</p>
                              <p className="font-bold text-slate-700">{lang === 'pt' ? 'Apenas paradas rápidas (embarque/desembarque)' : lang === 'en' ? 'Quick drop-offs and pick-ups only' : 'Solo paradas rápidas (embarque y desembarque)'}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {activeFloor === 'subsolo' && (
                        <div className="flex flex-col gap-2.5">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="p-1.5 bg-blue-50 text-blue-600 rounded-lg"><Car className="w-4 h-4" /></span>
                            <h4 className="text-sm font-bold text-slate-800">{t.floorMapSubsolo}</h4>
                          </div>
                          <div className="text-xs text-slate-600 leading-relaxed space-y-1">
                            <p>{t.floorMapSubsoloDesc}</p>
                            {lang === 'pt' ? (
                              <>
                                <p>• <strong>Vagas Rotativas:</strong> O condomínio possui vagas de garagem rotativas (sujeitas a disponibilidade).</p>
                                <p>• <strong>Serviço de Manobrista:</strong> Manobrista profissional incluso na garagem para maior comodidade e organização ao estacionar o veículo.</p>
                                <p>• <strong>Bicicletário & Recarga:</strong> Bicicletário seguro e carregadores elétricos rápidos no Subsolo 1.</p>
                                <p>• <strong>Centro de Reciclagem:</strong> Localizado no Subsolo 1 para o descarte correto do lixo reciclável.</p>
                              </>
                            ) : lang === 'en' ? (
                              <>
                                <p>• <strong>Rotative Parking Spaces:</strong> The condominium has rotative parking spaces (subject to availability).</p>
                                <p>• <strong>Valet Parking:</strong> Professional valet service included in the parking lot for extra convenience and order.</p>
                                <p>• <strong>Bicycle Parking & EV Charging:</strong> Secure bicycle rack and rapid EV chargers on Basement 1.</p>
                                <p>• <strong>Recycling Centre:</strong> Located on Basement 1 for eco-friendly trash disposal.</p>
                              </>
                            ) : (
                              <>
                                <p>• <strong>Estacionamiento Rotativo:</strong> El condominio dispone de plazas de garaje rotativas (sujetas a disponibilidad).</p>
                                <p>• <strong>Servicio de Acomodador:</strong> Acomodador profesional incluido en el garaje para mayor comodidad y organización.</p>
                                <p>• <strong>Bicicletero y Carga Eléctrica:</strong> Bicicletero seguro y cargadores rápidos para vehículos eléctricos en el Sótano 1.</p>
                                <p>• <strong>Centro de Reciclaje:</strong> Ubicado en el Sótano 1 para la correcta disposición de residuos.</p>
                              </>
                            )}
                          </div>
                          <div className="grid grid-cols-2 gap-3 mt-1.5 text-[11px] bg-white p-2.5 rounded-lg border border-slate-100">
                            <div>
                              <p className="text-slate-400 font-medium">{lang === 'pt' ? 'Estacionamento' : lang === 'en' ? 'Parking' : 'Estacionamiento'}</p>
                              <p className="font-bold text-slate-700">{lang === 'pt' ? 'Rotativo com Manobrista' : lang === 'en' ? 'Rotative with Valet Service' : 'Rotativo con Acomodador'}</p>
                            </div>
                            <div>
                              <p className="text-slate-400 font-medium">{lang === 'pt' ? 'Coleta de Lixo' : lang === 'en' ? 'Waste Disposal' : 'Recolección de Basura'}</p>
                              <p className="font-bold text-slate-700">{lang === 'pt' ? 'Entregues no Subsolo 1' : lang === 'en' ? 'Delivered on Basement 1' : 'Depositar en Sótano 1'}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Artigos Dinâmicos do Condomínio */}
                  <div className="flex flex-col gap-4">
                    {activeArticles.filter(art => art.tab === 'condominio').map((art) => {
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
                    <h3 className="font-display font-bold text-slate-800 text-sm md:text-base">
                      {lang === 'pt' ? 'Guia de Localização e Arredores' : lang === 'en' ? 'Location & Surroundings' : 'Guía de Ubicación y Alrededores'}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {lang === 'pt' ? 'Descubra as melhores atrações, gastronomia e serviços perto do Sun Square.' : lang === 'en' ? 'Discover the best attractions, restaurants, and services near Sun Square.' : 'Descubre las mejores atracciones, restaurantes y servicios cerca de Sun Square.'}
                    </p>
                  </div>

                  {/* Artigos Dinâmicos de "Guia Local" */}
                  <div className="flex flex-col gap-4">
                    {activeArticles
                      .filter(art => art.tab === 'guia-local' && isCategoryMatched(art.category, guideFilter))
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
                                {lang === 'pt' ? 'Buscado' : lang === 'en' ? 'Found' : 'Encontrado'}
                              </span>
                            )}
                          </div>
                          
                          <p className="text-xs text-slate-500 mb-4 leading-relaxed font-medium bg-slate-50/50 p-2.5 rounded-xl border border-slate-100">
                            {art.excerpt}
                          </p>

                          <div className="text-xs text-slate-600 space-y-3 leading-relaxed whitespace-pre-line">
                            {art.id === 'guia-local-programacao-semanal' ? (
                              <div className="space-y-4 mt-2">
                                {/* Informational Banner */}
                                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-50/90 via-orange-50/60 to-amber-50/90 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-2.5 shadow-2xs">
                                  <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                                  <div className="space-y-1">
                                    <span className="font-bold block text-amber-950 text-xs">
                                      {lang === 'pt' ? 'Feiras e programação, de segunda a domingo' : lang === 'en' ? 'Street markets and schedule, Monday to Sunday' : 'Ferias y programación, de lunes a domingo'}
                                    </span>
                                    <p className="text-[11px] text-amber-800 leading-relaxed">
                                      {lang === 'pt' 
                                        ? '⚠️ Horários de feiras podem sofrer alterações conforme o clima ou feriados. Recomendamos sempre confirmar antes de sair.' 
                                        : lang === 'en'
                                          ? '⚠️ Street market hours may vary with weather or holidays. Always check beforehand.'
                                          : '⚠️ Los horarios de las ferias pueden variar según el clima o días festivos. Recomendamos verificar antes de salir.'}
                                    </p>
                                  </div>
                                </div>

                                {/* Weekly Schedule Cards */}
                                <div className="grid grid-cols-1 gap-3.5">
                                  {weeklyScheduleDays.map((sched) => (
                                    <div 
                                      key={sched.dayId} 
                                      className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-xs hover:border-blue-200 transition-all space-y-3"
                                    >
                                      {/* Header with Day Pill and Badges */}
                                      <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-100 flex-wrap">
                                        <div className="flex items-center gap-2.5">
                                          <span className="px-2.5 py-1 rounded-lg bg-blue-600 text-white text-xs font-black tracking-wide uppercase shadow-2xs">
                                            {sched.dayShort}
                                          </span>
                                          <span className="text-xs font-bold text-slate-700">
                                            {sched.dayName}
                                          </span>
                                        </div>
                                        {sched.badge && (
                                          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                                            sched.distance === '3 min a pé' || sched.distance === 'Na sua porta'
                                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                              : 'bg-blue-50 text-blue-700 border border-blue-100'
                                          }`}>
                                            {sched.badge}
                                          </span>
                                        )}
                                      </div>

                                      {/* Main Event */}
                                      <div className="space-y-1.5">
                                        <h4 className="text-xs sm:text-sm font-bold text-slate-800 leading-snug">
                                          {sched.title}
                                        </h4>
                                        <p className="text-xs text-slate-600 leading-relaxed font-medium">
                                          {sched.details}
                                        </p>
                                        {sched.mapsUrl && (
                                          <div className="pt-1.5 flex flex-wrap gap-2">
                                            <a
                                              href={sched.mapsUrl}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              referrerPolicy="no-referrer"
                                              className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 py-1.5 px-3 rounded-xl border border-emerald-200 active:scale-95 transition-all shadow-2xs"
                                            >
                                              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                                              <span>{sched.mapsLabel || 'Google Maps'}</span>
                                            </a>
                                          </div>
                                        )}
                                      </div>

                                      {/* Secondary Event (e.g. Negrão de Lima, Orgânicos 74, Feira das Nuvens) */}
                                      {sched.secondaryEvent && (
                                        <div className="mt-2.5 pt-2.5 border-t border-slate-100 bg-slate-50/70 p-3 rounded-xl border border-slate-200/60 space-y-1.5">
                                          <div className="flex items-center justify-between gap-2 flex-wrap">
                                            <span className="text-[11px] font-bold text-slate-800">
                                              {sched.secondaryEvent.details}
                                            </span>
                                            {sched.secondaryEvent.badge && (
                                              <span className="text-[9px] font-bold bg-amber-100/90 text-amber-800 px-2 py-0.5 rounded-full border border-amber-200/60">
                                                {sched.secondaryEvent.badge}
                                              </span>
                                            )}
                                          </div>
                                          {sched.secondaryEvent.mapsUrl && (
                                            <div className="pt-0.5">
                                              <a
                                                href={sched.secondaryEvent.mapsUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                referrerPolicy="no-referrer"
                                                className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 py-1 px-2.5 rounded-lg border border-blue-200 active:scale-95 transition-all"
                                              >
                                                <MapPin className="w-3 h-3 text-blue-600" />
                                                <span>{sched.secondaryEvent.mapsLabel || 'Google Maps'}</span>
                                              </a>
                                            </div>
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ) : art.id === 'guia-local-todos-os-dias' ? (
                              <div className="space-y-5 mt-2">
                                {/* Destaque Especial: Todos os dias · Abre a semana inteira */}
                                <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-br from-blue-50/90 via-slate-50 to-indigo-50/80 border border-blue-100 shadow-2xs space-y-4">
                                  <div className="flex items-center justify-between gap-3 flex-wrap">
                                    <div>
                                      <div className="flex items-center gap-2">
                                        <span className="p-1.5 bg-blue-600 text-white rounded-xl shadow-2xs">
                                          <Clock className="w-4 h-4" />
                                        </span>
                                        <span className="text-xs font-black uppercase text-blue-700 tracking-wider">
                                          {lang === 'pt' ? 'Todos os dias' : lang === 'en' ? 'Every Day' : 'Todos los días'}
                                        </span>
                                      </div>
                                      <h4 className="text-sm sm:text-base font-display font-extrabold text-slate-800 mt-1">
                                        {lang === 'pt' ? 'Abre a semana inteira' : lang === 'en' ? 'Open all week long' : 'Abre toda la semana'}
                                      </h4>
                                    </div>
                                    <span className="text-[11px] font-bold text-blue-700 bg-white/95 border border-blue-200/80 px-3 py-1 rounded-full shadow-2xs">
                                      {everydaySpots.length} {lang === 'pt' ? 'destinos fixos' : lang === 'en' ? 'daily spots' : 'destinos fijos'}
                                    </span>
                                  </div>

                                  {/* Grid dos 4 locais solicitados */}
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                                    {everydaySpots.map((spot) => (
                                      <div 
                                        key={spot.id}
                                        className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-xs hover:border-blue-200 transition-all flex flex-col justify-between gap-3"
                                      >
                                        <div className="space-y-1.5">
                                          <div className="flex items-center justify-between gap-2 flex-wrap">
                                            <h5 className="font-display font-bold text-slate-800 text-xs sm:text-sm">
                                              {spot.name}
                                            </h5>
                                            <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wide ${
                                              spot.regionBadge === '24h'
                                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                                : 'bg-blue-100 text-blue-800 border border-blue-200'
                                            }`}>
                                              {spot.regionBadge}
                                            </span>
                                          </div>
                                          
                                          <p className="text-xs text-slate-700 font-semibold leading-relaxed">
                                            {spot.addressSchedule}
                                          </p>

                                          {spot.highlight && (
                                            <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                                              {spot.highlight}
                                            </p>
                                          )}
                                        </div>

                                        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2">
                                          <a
                                            href={spot.mapsUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            referrerPolicy="no-referrer"
                                            className="inline-flex items-center gap-1.5 text-[11px] font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 py-1.5 px-3 rounded-xl border border-blue-200 active:scale-95 transition-all shadow-2xs"
                                          >
                                            <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                                            <span>{spot.mapsLabel}</span>
                                          </a>

                                          {spot.secondaryMapsUrl && (
                                            <a
                                              href={spot.secondaryMapsUrl}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              referrerPolicy="no-referrer"
                                              className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 py-1.5 px-3 rounded-xl border border-emerald-200 active:scale-95 transition-all shadow-2xs"
                                            >
                                              <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                              <span>{spot.secondaryMapsLabel}</span>
                                            </a>
                                          )}

                                          {spot.wazeUrl && (
                                            <a
                                              href={spot.wazeUrl}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              referrerPolicy="no-referrer"
                                              className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-600 bg-slate-100 hover:bg-slate-200/80 py-1.5 px-2.5 rounded-xl active:scale-95 transition-all"
                                              title="Abrir no Waze"
                                            >
                                              <ExternalLink className="w-3 h-3 text-slate-500" />
                                              <span>Waze</span>
                                            </a>
                                          )}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {/* Informational Header Banner & Filtros de Exploração Completa */}
                                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                    <div>
                                      <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                                        <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                                        {lang === 'pt' 
                                          ? 'Explorar todos os mercados, feiras e atrativos' 
                                          : lang === 'en' 
                                            ? 'Explore all markets, street fairs & sights' 
                                            : 'Explorar todos los mercados, ferias y atracciones'}
                                      </h4>
                                      <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                                        {lang === 'pt' 
                                          ? 'Consulte o catálogo completo com horários, distâncias a partir do flat e rotas rápidas pelo mapa.' 
                                          : lang === 'en'
                                            ? 'Browse the complete catalog with hours, distance from the flat, and fast map routes.'
                                            : 'Consulte el catálogo completo con horarios, distancia desde el flat y rutas en el mapa.'}
                                      </p>
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px] font-semibold text-slate-600 shrink-0 bg-white px-3 py-1.5 rounded-xl border border-slate-200/60 shadow-2xs">
                                      <Clock className="w-3.5 h-3.5 text-blue-600" />
                                      <span>{dailyVenues.length} {lang === 'pt' ? 'locais mapeados' : lang === 'en' ? 'mapped spots' : 'lugares mapeados'}</span>
                                    </div>
                                  </div>

                                  {/* Subcategory Filter Tabs com Rolagem Horizontal no Mobile */}
                                  <div className="relative mt-3 pt-3 border-t border-slate-200/60">
                                    {dailyCanScrollLeft && (
                                      <div className="absolute left-0 top-3 bottom-0 w-6 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent z-10 pointer-events-none" />
                                    )}
                                    {dailyCanScrollRight && (
                                      <div className="absolute right-0 top-3 bottom-0 w-6 bg-gradient-to-l from-slate-50 via-slate-50/80 to-transparent z-10 pointer-events-none" />
                                    )}
                                    <div 
                                      ref={dailySubNavRef}
                                      onScroll={() => checkScrollState(dailySubNavRef.current, setDailyCanScrollLeft, setDailyCanScrollRight)}
                                      className="flex items-center gap-2 overflow-x-auto scrollbar-none scroll-smooth touch-pan-x py-1"
                                    >
                                      {[
                                        { id: 'Todos', label: lang === 'pt' ? 'Todos' : lang === 'en' ? 'All' : 'Todos', count: dailyVenues.length, icon: MapPin },
                                        { id: 'Mercados', label: lang === 'pt' ? 'Mercados' : lang === 'en' ? 'Markets' : 'Mercados', count: dailyVenues.filter(v => v.category === 'Mercados').length, icon: Store },
                                        { id: 'Feiras', label: lang === 'pt' ? 'Feiras' : lang === 'en' ? 'Fairs' : 'Ferias', count: dailyVenues.filter(v => v.category === 'Feiras').length, icon: Tent },
                                        { id: 'Pontos Turísticos', label: lang === 'pt' ? 'Pontos Turísticos' : lang === 'en' ? 'Sights' : 'Turismo', count: dailyVenues.filter(v => v.category === 'Pontos Turísticos').length, icon: Landmark }
                                      ].map((sub) => {
                                        const IconComp = sub.icon;
                                        const isCurrent = dailySubCategory === sub.id;
                                        return (
                                          <button
                                            key={sub.id}
                                            ref={(el) => { dailySubRefs.current[sub.id] = el; }}
                                            type="button"
                                            onClick={() => setDailySubCategory(sub.id as any)}
                                            className={`shrink-0 px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs whitespace-nowrap cursor-pointer min-h-[40px] active:scale-95 ${
                                              isCurrent
                                                ? 'bg-slate-900 text-white shadow-xs'
                                                : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/80'
                                            }`}
                                          >
                                            <IconComp className={`w-3.5 h-3.5 ${isCurrent ? 'text-white' : 'text-slate-500'}`} />
                                            <span>{sub.label}</span>
                                            <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                                              isCurrent ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                                            }`}>
                                              {sub.count}
                                            </span>
                                          </button>
                                        );
                                      })}
                                    </div>
                                  </div>
                                </div>

                                {/* Venue Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {dailyVenues
                                    .filter(venue => dailySubCategory === 'Todos' || venue.category === dailySubCategory)
                                    .map((venue) => {
                                      const isMarket = venue.category === 'Mercados';
                                      const isFair = venue.category === 'Feiras';
                                      const isSight = venue.category === 'Pontos Turísticos';

                                      return (
                                        <div 
                                          key={venue.id} 
                                          className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between"
                                        >
                                          <div className="space-y-2.5">
                                            {/* Badges & Header */}
                                            <div className="flex items-start justify-between gap-2 flex-wrap">
                                              <div className="flex items-center gap-1.5 flex-wrap">
                                                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md border flex items-center gap-1 ${
                                                  isMarket 
                                                    ? 'bg-amber-50 text-amber-800 border-amber-200' 
                                                    : isFair 
                                                      ? 'bg-purple-50 text-purple-800 border-purple-200' 
                                                      : 'bg-blue-50 text-blue-800 border-blue-200'
                                                }`}>
                                                  {isMarket && <Store className="w-2.5 h-2.5" />}
                                                  {isFair && <Tent className="w-2.5 h-2.5" />}
                                                  {isSight && <Landmark className="w-2.5 h-2.5" />}
                                                  {venue.category}
                                                </span>

                                                {venue.badge && (
                                                  <span className="text-[9px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100 px-2 py-0.5 rounded-md">
                                                    {venue.badge}
                                                  </span>
                                                )}
                                              </div>

                                              {venue.distance && (
                                                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 flex items-center gap-1">
                                                  <MapPin className="w-2.5 h-2.5 text-emerald-600" />
                                                  {venue.distance}
                                                </span>
                                              )}
                                            </div>

                                            {/* Venue Name */}
                                            <h4 className="text-xs font-bold text-slate-800 leading-snug">
                                              {venue.name}
                                            </h4>

                                            {/* Description */}
                                            <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                                              {venue.description}
                                            </p>

                                            {/* Info rows: Hours & Address */}
                                            <div className="space-y-1.5 text-[10px] text-slate-500 pt-1">
                                              <p className="flex items-start gap-1.5 font-semibold text-slate-700">
                                                <Clock className="w-3 h-3 text-slate-400 mt-0.5 shrink-0" />
                                                <span>{venue.hours}</span>
                                              </p>
                                              <p className="flex items-start gap-1.5 text-slate-500">
                                                <MapPin className="w-3 h-3 text-slate-400 mt-0.5 shrink-0" />
                                                <span>{venue.address}</span>
                                              </p>
                                            </div>
                                          </div>

                                          {/* Action Buttons: Google Maps & Waze */}
                                          <div className="mt-4 pt-3 border-t border-slate-100 flex gap-2">
                                            <a
                                              href={venue.mapsUrl}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              referrerPolicy="no-referrer"
                                              className="flex-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 py-2 px-2.5 rounded-xl border border-emerald-200/70 flex items-center justify-center gap-1.5 transition-all shadow-2xs"
                                            >
                                              <MapPin className="w-3 h-3 text-emerald-600" /> Google Maps
                                            </a>
                                            <a
                                              href={venue.wazeUrl}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              referrerPolicy="no-referrer"
                                              className="flex-1 text-[10px] font-bold text-sky-700 bg-sky-50 hover:bg-sky-100 py-2 px-2.5 rounded-xl border border-sky-200/70 flex items-center justify-center gap-1.5 transition-all shadow-2xs"
                                            >
                                              <Car className="w-3 h-3 text-sky-500" /> Waze
                                            </a>
                                          </div>
                                        </div>
                                      );
                                    })}
                                </div>
                              </div>
                            ) : art.id === 'guia-local-parques-cultura' ? (
                              <div className="space-y-4 mt-2">
                                {/* Header Card */}
                                <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-br from-emerald-50/80 via-slate-50 to-teal-50/70 border border-emerald-100/90 shadow-2xs space-y-3">
                                  <div className="flex items-center justify-between gap-3 flex-wrap">
                                    <div>
                                      <div className="flex items-center gap-2">
                                        <span className="p-1.5 bg-emerald-600 text-white rounded-xl shadow-2xs">
                                          <Landmark className="w-4 h-4" />
                                        </span>
                                        <span className="text-xs font-black uppercase text-emerald-800 tracking-wider">
                                          {lang === 'pt' ? 'Goiânia & Setor Oeste' : lang === 'en' ? 'Goiânia & Setor Oeste' : 'Goiânia y Setor Oeste'}
                                        </span>
                                      </div>
                                      <h4 className="text-sm sm:text-base font-display font-extrabold text-slate-800 mt-1">
                                        {lang === 'pt' ? 'Pontos turísticos' : lang === 'en' ? 'Tourist Sights' : 'Puntos turísticos'}
                                      </h4>
                                    </div>
                                    <span className="text-[11px] font-bold text-emerald-800 bg-white/95 border border-emerald-200/80 px-3 py-1 rounded-full shadow-2xs">
                                      {touristSpots.length} {lang === 'pt' ? 'locais mapeados' : lang === 'en' ? 'mapped spots' : 'lugares mapeados'}
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-slate-600 leading-relaxed max-w-2xl">
                                    {lang === 'pt' 
                                      ? 'Praças arborizadas a pé, centros culturais, arte urbana, o marco histórico Art Déco e os principais parques da capital organizados por proximidade.' 
                                      : lang === 'en'
                                        ? 'Leafy squares within walking distance, cultural centers, street art, Art Déco heritage, and top parks organized by proximity.'
                                        : 'Plazas arboladas a pie, centros culturales, arte urbano, patrimonio Art Déco y los principales parques organizados por proximidad.'}
                                  </p>
                                </div>

                                {/* Grid dos 8 Pontos Turísticos */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                                  {touristSpots.map((spot) => {
                                    const isImmediate = spot.distanceBadge === 'em frente';
                                    const isWalk = spot.distanceBadge === '3 min a pé';
                                    const isCar = spot.distanceBadge === 'carro';

                                    return (
                                      <div 
                                        key={spot.id}
                                        className={`p-4 rounded-2xl border transition-all flex flex-col justify-between gap-3 shadow-2xs hover:shadow-xs ${
                                          isImmediate 
                                            ? 'bg-emerald-50/40 border-emerald-200 hover:border-emerald-300' 
                                            : isWalk
                                              ? 'bg-sky-50/30 border-sky-200 hover:border-sky-300'
                                              : 'bg-white border-slate-200/90 hover:border-blue-200'
                                        }`}
                                      >
                                        <div className="space-y-1.5">
                                          <div className="flex items-center justify-between gap-2 flex-wrap">
                                            <h5 className="font-display font-bold text-slate-800 text-xs sm:text-sm flex items-center gap-1.5">
                                              <MapPin className={`w-3.5 h-3.5 ${
                                                isImmediate ? 'text-emerald-600' : isWalk ? 'text-sky-600' : isCar ? 'text-amber-600' : 'text-slate-500'
                                              }`} />
                                              <span>{spot.name}</span>
                                            </h5>
                                            <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wide border shadow-2xs ${
                                              isImmediate
                                                ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                                                : isWalk
                                                  ? 'bg-sky-100 text-sky-800 border-sky-300'
                                                  : isCar
                                                    ? 'bg-amber-100 text-amber-800 border-amber-300'
                                                    : 'bg-slate-100 text-slate-700 border-slate-200'
                                            }`}>
                                              {spot.distanceBadge}
                                            </span>
                                          </div>

                                          <p className="text-xs text-slate-700 font-semibold leading-relaxed">
                                            {spot.details}
                                          </p>

                                          {spot.address && (
                                            <p className="text-[11px] text-slate-400 font-medium">
                                              {spot.address}
                                            </p>
                                          )}
                                        </div>

                                        <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                                          <a
                                            href={spot.mapsUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            referrerPolicy="no-referrer"
                                            className="flex-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 py-2 px-3 rounded-xl border border-emerald-200 flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-2xs"
                                          >
                                            <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                            <span>Google Maps</span>
                                          </a>

                                          {spot.wazeUrl && (
                                            <a
                                              href={spot.wazeUrl}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              referrerPolicy="no-referrer"
                                              className="text-[11px] font-bold text-sky-800 bg-sky-50 hover:bg-sky-100 py-2 px-3 rounded-xl border border-sky-200 flex items-center justify-center gap-1 active:scale-95 transition-all shadow-2xs"
                                              title="Abrir no Waze"
                                            >
                                              <Car className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                                              <span>Waze</span>
                                            </a>
                                          )}
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            ) : art.id === 'guia-local-gastronomia' ? (
                              <div className="space-y-4 mt-2">
                                <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-br from-amber-50/80 via-slate-50 to-orange-50/70 border border-amber-100/90 shadow-2xs space-y-2">
                                  <div className="flex items-center justify-between gap-3 flex-wrap">
                                    <div className="flex items-center gap-2">
                                      <span className="p-1.5 bg-amber-600 text-white rounded-xl shadow-2xs">
                                        <Utensils className="w-4 h-4" />
                                      </span>
                                      <span className="text-xs font-black uppercase text-amber-800 tracking-wider">
                                        {lang === 'pt' ? 'Setor Oeste & Marista' : lang === 'en' ? 'Setor Oeste & Marista' : 'Setor Oeste y Marista'}
                                      </span>
                                    </div>
                                    <span className="text-[11px] font-bold text-amber-800 bg-white/95 border border-amber-200/80 px-3 py-1 rounded-full shadow-2xs">
                                      {lang === 'pt' ? 'Restaurantes a pé & táxi' : lang === 'en' ? 'On foot & taxi' : 'A pie y taxi'}
                                    </span>
                                  </div>
                                  <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                                    {lang === 'pt'
                                      ? 'Do japonês mais bem avaliado da vizinhança aos premiados pelo circuito gastronômico 2026, parrilla, adegas e churrascarias tradicionais a poucos minutos da Praça do Sol.'
                                      : lang === 'en'
                                        ? 'From the neighborhood’s top-rated Japanese to 2026 award winners, parrilla, cellars and traditional steakhouses minutes away from Praça do Sol.'
                                        : 'Desde el japonés mejor valorado del barrio hasta los premiados del circuito gastronómico 2026, parrilla, bodegas y churrasquerías a minutos de Praça do Sol.'}
                                  </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {activeLocalGuideItems
                                    .filter((item) => item.articleId === art.id)
                                    .map((item) => (
                                      <div 
                                        key={item.id} 
                                        className={`p-4 rounded-2xl border transition-all flex flex-col justify-between shadow-2xs hover:shadow-xs ${
                                          item.id === 'don-will'
                                            ? 'bg-blue-50/40 border-blue-200/80 hover:border-blue-300'
                                            : 'bg-slate-50 hover:bg-slate-100/50 border-slate-200/80 hover:border-amber-200'
                                        }`}
                                      >
                                        <div>
                                          <div className="flex items-start justify-between gap-2 mb-1.5 flex-wrap">
                                            <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                                              {item.name}
                                            </h4>
                                            <div className="flex items-center gap-1.5 shrink-0 flex-wrap">
                                              {item.distance && (
                                                <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wide border shadow-2xs ${
                                                  item.distance.toLowerCase().includes('táxi') || item.distance.toLowerCase().includes('taxi')
                                                    ? 'bg-amber-100 text-amber-800 border-amber-300'
                                                    : item.distance.toLowerCase().includes('edifício')
                                                      ? 'bg-blue-100 text-blue-800 border-blue-300'
                                                      : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                                                }`}>
                                                  {item.distance}
                                                </span>
                                              )}
                                              {item.badge && item.id !== 'don-will' && (
                                                <span className="text-[9px] font-semibold text-slate-600 bg-white/90 border border-slate-200 px-2 py-0.5 rounded-full shadow-2xs">
                                                  {item.badge}
                                                </span>
                                              )}
                                              {item.id === 'don-will' && (
                                                <span className="text-[9px] font-extrabold uppercase bg-blue-100 text-blue-700 px-2.5 py-0.5 rounded-full tracking-wide shrink-0 border border-blue-200">
                                                  {lang === 'pt' ? 'No Sun Square' : lang === 'en' ? 'At Sun Square' : 'En el Sun Square'}
                                                </span>
                                              )}
                                            </div>
                                          </div>
                                          {item.description && (
                                            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
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
                                              <ExternalLink className="w-3 h-3 text-rose-500" /> {lang === 'pt' ? 'Pedir Online' : lang === 'en' ? 'Order Online' : 'Pedir en Línea'}
                                            </a>
                                          )}
                                        </div>
                                      </div>
                                    ))}
                                </div>
                              </div>
                            ) : art.id.startsWith('guia-local-') ? (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                                {activeLocalGuideItems
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
                                          <div className="flex items-center gap-1.5 shrink-0 flex-wrap">
                                            {item.distance && (
                                              <span className="text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wide bg-slate-100 text-slate-700 border border-slate-200">
                                                {item.distance}
                                              </span>
                                            )}
                                            {item.badge && item.id !== 'don-will' && (
                                              <span className="text-[9px] font-semibold text-slate-500 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full">
                                                {item.badge}
                                              </span>
                                            )}
                                            {item.id === 'don-will' && (
                                              <span className="text-[9px] font-extrabold uppercase bg-blue-100 text-blue-700 px-2.5 py-0.5 rounded-full tracking-wide shrink-0">
                                                {lang === 'pt' ? 'No Sun Square' : lang === 'en' ? 'At Sun Square' : 'En el Sun Square'}
                                              </span>
                                            )}
                                          </div>
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
                                            <ExternalLink className="w-3 h-3 text-rose-500" /> {lang === 'pt' ? 'Pedir Online' : lang === 'en' ? 'Order Online' : 'Pedir en Línea'}
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
                  
                  {/* Seletor de Categorias de Regras com Rolagem Suave no Mobile */}
                  <div className="relative bg-white rounded-2xl p-2.5 border border-slate-100 shadow-sm">
                    {/* Indicador / Botão Scroll Esquerda */}
                    {rulesCanScrollLeft && (
                      <>
                        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none rounded-l-2xl" />
                        <button
                          type="button"
                          onClick={() => scrollContainer(rulesNavRef.current, 'left', 140)}
                          aria-label="Rolar categorias para esquerda"
                          className="absolute left-1 top-1/2 -translate-y-1/2 z-20 w-6 h-6 bg-white/95 backdrop-blur-xs text-slate-700 hover:text-blue-600 rounded-full shadow-md border border-slate-200/80 flex items-center justify-center transition-all cursor-pointer active:scale-90"
                        >
                          <ChevronLeft className="w-3.5 h-3.5" />
                        </button>
                      </>
                    )}

                    {/* Indicador / Botão Scroll Direita */}
                    {rulesCanScrollRight && (
                      <>
                        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none rounded-r-2xl" />
                        <button
                          type="button"
                          onClick={() => scrollContainer(rulesNavRef.current, 'right', 140)}
                          aria-label="Rolar categorias para direita"
                          className="absolute right-1 top-1/2 -translate-y-1/2 z-20 w-6 h-6 bg-white/95 backdrop-blur-xs text-slate-700 hover:text-blue-600 rounded-full shadow-md border border-slate-200/80 flex items-center justify-center transition-all cursor-pointer active:scale-90"
                        >
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </>
                    )}

                    <div 
                      ref={rulesNavRef}
                      onScroll={() => checkScrollState(rulesNavRef.current, setRulesCanScrollLeft, setRulesCanScrollRight)}
                      className="flex gap-2 overflow-x-auto scrollbar-none scroll-smooth touch-pan-x px-1 py-0.5"
                    >
                      {[
                        { id: 'Todas', icon: Sparkles },
                        { id: 'Normas', icon: ShieldAlert },
                        { id: 'Convivência', icon: Heart },
                        { id: 'Animais', icon: Smile },
                        { id: 'Zelo', icon: CheckSquare }
                      ].map(({ id: cat, icon: IconComp }) => {
                        const isSelected = rulesFilter === cat;
                        return (
                          <button
                            key={cat}
                            ref={(el) => { rulesCategoryRefs.current[cat] = el; }}
                            onClick={() => setRulesFilter(cat)}
                            className={`shrink-0 py-2 px-3.5 rounded-xl text-xs font-bold whitespace-nowrap outline-none transition-all flex items-center gap-1.5 cursor-pointer min-h-[40px] active:scale-95 ${
                              isSelected 
                                ? 'bg-blue-600 text-white shadow-xs' 
                                : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/60'
                            }`}
                          >
                            <IconComp className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                            <span>{getRulesCategoryLabel(cat)}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Informação sobre Notificações de Infrações */}
                  <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-blue-900 text-xs flex gap-3 shadow-2xs">
                    <ShieldAlert className="w-5 h-5 text-blue-600 shrink-0 mt-0.5 animate-pulse" />
                    <div>
                      <p className="font-bold">{lang === 'pt' ? 'Aviso sobre Infrações e Multas' : lang === 'en' ? 'Warning on Violations & Fines' : 'Aviso sobre Infracciones y Multas'}</p>
                      <p className="opacity-90 mt-0.5 leading-relaxed">
                        {lang === 'pt' 
                          ? 'Conforme deliberado na última Convenção do Sun Square, infrações sistemáticas ao silêncio ou descarte inadequado de lixo geram uma advertência inicial. Na reincidência, a multa equivale a 50% de uma taxa condominial ordinária.' 
                          : lang === 'en' 
                          ? 'As decided in the last Sun Square Assembly, systematic silence or trash disposal violations result in an initial warning. In case of relapse, the fine equals 50% of a regular condominium fee.' 
                          : 'De acuerdo con lo decidido en la última Asamblea de Sun Square, las violaciones sistemáticas al silencio o desecho incorrecto de basura generan una advertencia inicial. En caso de reincidencia, la multa equivale al 50% de una cuota ordinaria de condominio.'}
                      </p>
                    </div>
                  </div>

                  {/* Lista de Regras (Filtrada) */}
                  <div className="flex flex-col gap-4">
                    {activeArticles
                      .filter(art => art.tab === 'regras')
                      .filter(art => isRulesCategoryMatched(art.category, rulesFilter))
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
                  
                  {/* Barra de Sub-abas de "Suporte" com navegação fluida e auto-scroll no Celular */}
                  <div className="relative -mx-4 px-4 sm:mx-0 sm:px-0 py-1" id="support-subtabs-bar">
                    {/* Botão Scroll Esquerda */}
                    {supportCanScrollLeft && (
                      <>
                        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent z-10 pointer-events-none" />
                        <button
                          type="button"
                          onClick={() => scrollContainer(supportSubNavRef.current, 'left', 160)}
                          aria-label="Rolar canais para a esquerda"
                          className="absolute left-1 top-1/2 -translate-y-1/2 z-20 w-6 h-6 bg-white/95 backdrop-blur-xs text-slate-700 hover:text-blue-600 rounded-full shadow-md border border-slate-200/80 flex items-center justify-center transition-all cursor-pointer active:scale-90"
                        >
                          <ChevronLeft className="w-3.5 h-3.5" />
                        </button>
                      </>
                    )}

                    {/* Botão Scroll Direita */}
                    {supportCanScrollRight && (
                      <>
                        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-slate-50 via-slate-50/80 to-transparent z-10 pointer-events-none" />
                        <button
                          type="button"
                          onClick={() => scrollContainer(supportSubNavRef.current, 'right', 160)}
                          aria-label="Rolar canais para a direita"
                          className="absolute right-1 top-1/2 -translate-y-1/2 z-20 w-6 h-6 bg-white/95 backdrop-blur-xs text-slate-700 hover:text-blue-600 rounded-full shadow-md border border-slate-200/80 flex items-center justify-center transition-all cursor-pointer active:scale-90"
                        >
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </>
                    )}

                    <div 
                      ref={supportSubNavRef}
                      onScroll={() => checkScrollState(supportSubNavRef.current, setSupportCanScrollLeft, setSupportCanScrollRight)}
                      className="flex gap-1.5 overflow-x-auto scrollbar-none scroll-smooth touch-pan-x px-1 py-1"
                    >
                      {[
                        { id: 'todos', label: lang === 'pt' ? 'Todos os Canais' : lang === 'en' ? 'All Channels' : 'Todos los Canales', icon: Phone, target: undefined },
                        { id: 'emergencia', label: lang === 'pt' ? 'Emergência (190/192/193)' : lang === 'en' ? 'Emergency' : 'Emergencia', icon: ShieldAlert, target: 'contatos-uteis' },
                        { id: 'anfitriao', label: lang === 'pt' ? 'Anfitrião & WhatsApp' : lang === 'en' ? 'Host & WhatsApp' : 'Anfitrión y WhatsApp', icon: User, target: 'staff-contacts' },
                        { id: 'chamado', label: lang === 'pt' ? 'Abrir Chamado' : lang === 'en' ? 'Open Ticket' : 'Abrir Ticket', icon: MessageSquare, target: 'ticket-form-section' },
                        { id: 'faq', label: lang === 'pt' ? 'Dúvidas (FAQ)' : lang === 'en' ? 'FAQ' : 'Preguntas Frecuentes', icon: HelpCircle, target: 'faq-section' }
                      ].map((item) => {
                        const IconComp = item.icon;
                        const isSelected = supportSubSection === item.id;
                        return (
                          <button
                            key={item.id}
                            ref={(el) => { supportSubRefs.current[item.id] = el; }}
                            onClick={() => handleSupportSubSectionClick(item.id, item.target)}
                            className={`shrink-0 py-2 px-3.5 rounded-xl text-xs font-bold whitespace-nowrap outline-none transition-all duration-150 flex items-center gap-1.5 cursor-pointer min-h-[40px] active:scale-95 ${
                              isSelected
                                ? 'bg-blue-600 text-white shadow-xs'
                                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/70 shadow-2xs'
                            }`}
                          >
                            <IconComp className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                            <span>{item.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Canais Públicos de Emergência */}
                  <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm scroll-mt-36" id="contatos-uteis">
                    <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-50">
                      <div className="flex items-center gap-2.5">
                        <span className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                          <Phone className="w-5 h-5" />
                        </span>
                        <h3 className="font-display font-bold text-slate-800 text-sm md:text-base">
                          {lang === 'pt' ? 'Telefones Úteis e Emergência' : lang === 'en' ? 'Useful & Emergency Numbers' : 'Teléfonos Útiles y Emergencias'}
                        </h3>
                      </div>
                    </div>

                    <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                      {lang === 'pt' ? 'Em situações críticas, entre em contato imediatamente com os órgãos públicos de emergência da cidade:' : lang === 'en' ? 'In critical situations, immediately contact the city emergency public services:' : 'En situaciones críticas, póngase en contacto de inmediato con los servicios de emergencia de la ciudad:'}
                    </p>

                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 text-[11px] text-slate-600">
                      <div className="grid grid-cols-3 gap-2.5 text-center font-bold">
                        <div className="p-2.5 bg-white border border-slate-200 rounded-lg text-slate-800">
                          <p className="text-[10px] text-slate-400 font-semibold mb-0.5">{lang === 'pt' ? 'Polícia Militar' : lang === 'en' ? 'Military Police' : 'Policía Militar'}</p>
                          <span className="text-sm font-bold text-slate-800">190</span>
                        </div>
                        <div className="p-2.5 bg-white border border-slate-200 rounded-lg text-slate-800">
                          <p className="text-[10px] text-slate-400 font-semibold mb-0.5">SAMU</p>
                          <span className="text-sm font-bold text-slate-800">192</span>
                        </div>
                        <div className="p-2.5 bg-white border border-slate-200 rounded-lg text-slate-800">
                          <p className="text-[10px] text-slate-400 font-semibold mb-0.5">{lang === 'pt' ? 'Bombeiros' : lang === 'en' ? 'Fire Department' : 'Bomberos'}</p>
                          <span className="text-sm font-bold text-slate-800">193</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Lista Completa da Equipe (Staff) */}
                  <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm scroll-mt-36" id="staff-contacts">
                    <h3 className="font-display font-bold text-slate-800 text-sm md:text-base mb-3 flex items-center gap-2">
                      <User className="w-4 h-4 text-blue-600" /> {lang === 'pt' ? 'Contato do Anfitrião' : lang === 'en' ? 'Host Contact' : 'Contacto del Anfitrión'}
                    </h3>
                    <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                      {lang === 'pt' ? 'Fale diretamente com o anfitrião Wellington para tirar dúvidas ou solicitar suporte durante sua estadia.' : lang === 'en' ? 'Speak directly with host Wellington to clear up doubts or request support during your stay.' : 'Hable directamente con el anfitrión Wellington para resolver dudas o solicitar asistencia durante su estadía.'}
                    </p>

                    <div className="flex flex-col gap-3">
                      {activeContacts.map((contact, idx) => (
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
                              className="text-[10px] font-bold text-white bg-emerald-600 hover:bg-emerald-700 py-1.5 px-3 rounded-lg flex items-center gap-1.5 active:scale-95 transition-all shadow-xs cursor-pointer"
                            >
                              <MessageSquare className="w-3.5 h-3.5 text-white" /> WhatsApp
                            </a>
                            <button
                              onClick={() => copyToClipboard(contact.phone, contact.name)}
                              className="text-[10px] font-bold text-slate-700 bg-white hover:bg-slate-100 py-1.5 px-3 rounded-lg border border-slate-200 flex items-center gap-1 active:scale-95 transition-all cursor-pointer"
                            >
                              <Phone className="w-3.5 h-3.5 text-slate-500" /> {contact.phone}
                            </button>
                            <button
                              onClick={() => copyToClipboard(contact.email, contact.name)}
                              className="text-[10px] font-bold text-slate-700 bg-white hover:bg-slate-100 py-1.5 px-3 rounded-lg border border-slate-200 flex items-center gap-1 active:scale-95 transition-all cursor-pointer animate-none"
                            >
                              <Mail className="w-3.5 h-3.5 text-slate-500" /> E-mail
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                   {/* Canal Fale Conosco / Enviar Solicitação (FORMULÁRIO ATIVO) */}
                  <div className="bg-white rounded-3xl p-5 md:p-6 border border-slate-100 shadow-sm scroll-mt-36" id="ticket-form-section">
                    <h3 className="font-display font-bold text-slate-800 text-sm md:text-base mb-1 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-blue-600" /> {lang === 'pt' ? 'Fale com o Anfitrião!' : lang === 'en' ? 'Message the Host!' : '¡Hable con el Anfitrión!'}
                    </h3>
                    <p className="text-xs text-slate-400 mb-5">
                      {lang === 'pt' ? 'Envie uma dúvida, solicitação de manutenção ou sugestão diretamente para o anfitrião.' : lang === 'en' ? 'Send a question, maintenance request, or suggestion directly to the host.' : 'Envíe una duda, solicitud de mantenimiento o sugerencia directamente al anfitrión.'}
                    </p>

                    <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
                      
                      {/* Dados fixos do usuário autenticado */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">{lang === 'pt' ? 'Remetente' : lang === 'en' ? 'Sender' : 'Remitente'}</label>
                          <input 
                            type="text" 
                            disabled 
                            value="Wellington Rodovalho" 
                            className="w-full bg-slate-50 text-slate-500 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold cursor-not-allowed"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">{lang === 'pt' ? 'E-mail Cadastrado' : lang === 'en' ? 'Registered Email' : 'Correo Registrado'}</label>
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
                        <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">{lang === 'pt' ? 'Categoria do Chamado' : lang === 'en' ? 'Category of Request' : 'Categoría del Ticket'}</label>
                        <div className="grid grid-cols-4 gap-2">
                          {['Dúvida', 'Manutenção', 'Sugestão', 'Outro'].map((cat) => {
                            const label = lang === 'pt' ? cat : lang === 'en' ? (cat === 'Dúvida' ? 'Question' : cat === 'Manutenção' ? 'Maintenance' : cat === 'Sugestão' ? 'Suggestion' : 'Other') : (cat === 'Dúvida' ? 'Duda' : cat === 'Manutenção' ? 'Mantenimiento' : cat === 'Sugestão' ? 'Sugerencia' : 'Otro');
                            return (
                              <button
                                key={cat}
                                type="button"
                                onClick={() => setFormCategory(cat as any)}
                                className={`py-2 px-1 text-center rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                                  formCategory === cat 
                                    ? 'bg-blue-50 border-blue-300 text-blue-600 shadow-2xs' 
                                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                                }`}
                              >
                                {label}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Assunto */}
                      <div>
                        <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">{lang === 'pt' ? 'Assunto' : lang === 'en' ? 'Subject' : 'Asunto'}</label>
                        <input
                          type="text"
                          required
                          placeholder={lang === 'pt' ? "Ex: Reserva do Gourmet, barulho no 13º andar, lâmpada queimada..." : lang === 'en' ? "e.g., Gourmet reservation, noise on the 13th floor, burnt lightbulb..." : "Ej: Reserva de Gourmet, ruido en el piso 13, bombilla quemada..."}
                          value={formSubject}
                          onChange={(e) => setFormSubject(e.target.value)}
                          className="w-full bg-slate-50 hover:bg-slate-100/50 focus:bg-white border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl px-3.5 py-2.5 text-xs outline-none transition-all"
                        />
                      </div>

                      {/* Mensagem */}
                      <div>
                        <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">{lang === 'pt' ? 'Mensagem Detalhada' : lang === 'en' ? 'Detailed Message' : 'Mensaje Detallado'}</label>
                        <textarea
                          required
                          rows={4}
                          placeholder={lang === 'pt' ? "Descreva seu problema ou solicitação de maneira clara para agilizarmos o atendimento..." : lang === 'en' ? "Describe your issue or request clearly so we can process it quickly..." : "Describa su problema o solicitud claramente para agilizar la atención..."}
                          value={formMessage}
                          onChange={(e) => setFormMessage(e.target.value)}
                          className="w-full bg-slate-50 hover:bg-slate-100/50 focus:bg-white border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl px-3.5 py-2.5 text-xs outline-none transition-all resize-none"
                        />
                      </div>

                      {/* Botão de Envio */}
                      <button
                        type="submit"
                        disabled={submitting || !formSubject.trim() || !formMessage.trim()}
                        className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {submitting ? (
                          <>
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" /> {lang === 'pt' ? 'Enviando...' : lang === 'en' ? 'Sending...' : 'Enviando...'}
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" /> {lang === 'pt' ? 'Enviar Mensagem ao Anfitrião' : lang === 'en' ? 'Send Message to Host' : 'Enviar Mensaje al Anfitrión'}
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
                              <p className="font-bold">{lang === 'pt' ? 'Solicitação registrada!' : lang === 'en' ? 'Request registered!' : '¡Solicitud registrada!'}</p>
                              <p className="opacity-95 text-[11px]">{lang === 'pt' ? 'Sua mensagem foi enviada ao anfitrião do Sun Square. Retornamos em breve.' : lang === 'en' ? 'Your message has been sent to the Sun Square host. We will reply shortly.' : 'Su mensaje ha sido enviado al anfitrión de Sun Square. Responderemos pronto.'}</p>
                            </div>
                          </div>
                          <button 
                            onClick={() => setFormSuccess(false)}
                            className="text-emerald-700 hover:text-emerald-900 font-bold ml-4 cursor-pointer"
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
                          <ClipboardList className="w-4 h-4 text-blue-600" /> {lang === 'pt' ? 'Meus Chamados Registrados' : lang === 'en' ? 'My Logged Tickets' : 'Mis Tickets Registrados'} ({tickets.length})
                        </h3>
                        <button 
                          onClick={() => {
                            if (confirm(lang === 'pt' ? 'Deseja limpar o histórico local de chamados?' : lang === 'en' ? 'Clear local ticket history?' : '¿Borrar historial local de tickets?')) {
                              setTickets([]);
                            }
                          }}
                          className="text-[10px] text-slate-400 hover:text-red-500 font-bold cursor-pointer"
                        >
                          {lang === 'pt' ? 'Limpar Histórico' : lang === 'en' ? 'Clear History' : 'Limpiar Historial'}
                        </button>
                      </div>

                      <div className="flex flex-col gap-3">
                        {tickets.map((t) => (
                          <div key={t.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1.5">
                                <span className="text-[10px] font-bold text-slate-800 font-mono">{t.id}</span>
                                <span className="text-[9px] font-bold uppercase bg-blue-50 text-blue-600 px-1.5 py-0.2 rounded">
                                  {lang === 'pt' ? t.category : lang === 'en' ? (t.category === 'Dúvida' ? 'Question' : t.category === 'Manutenção' ? 'Maintenance' : t.category === 'Sugestão' ? 'Suggestion' : 'Other') : (t.category === 'Dúvida' ? 'Duda' : t.category === 'Manutenção' ? 'Mantenimiento' : t.category === 'Sugestão' ? 'Sugerencia' : 'Otro')}
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <span className="inline-block w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                                <span className="text-[10px] text-blue-700 font-semibold">
                                  {lang === 'pt' ? t.status : lang === 'en' ? 'Pendente' : 'Pendiente'}
                                </span>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="text-xs font-bold text-slate-800">{t.subject}</h4>
                              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{t.message}</p>
                            </div>
                            
                            <div className="pt-2 border-t border-slate-200/50 flex items-center justify-between text-[9px] text-slate-400">
                              <span>{lang === 'pt' ? 'Enviado em:' : lang === 'en' ? 'Sent on:' : 'Enviado el:'} {t.date}</span>
                              <span>{lang === 'pt' ? 'Canal: Digital' : lang === 'en' ? 'Channel: Digital' : 'Canal: Digital'}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Perguntas Frequentes Accordion (FAQ) */}
                  <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm scroll-mt-36" id="faq-section">
                    <h3 className="font-display font-bold text-slate-800 text-sm md:text-base mb-1.5 flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-blue-600" /> {lang === 'pt' ? 'Perguntas Frequentes (FAQ)' : lang === 'en' ? 'Frequently Asked Questions (FAQ)' : 'Preguntas Frecuentes (FAQ)'}
                    </h3>
                    <p className="text-xs text-slate-400 mb-4">
                      {lang === 'pt' ? 'Esclareça dúvidas comuns sobre as normas e funcionamento geral do condomínio.' : lang === 'en' ? 'Clear up common questions about condominium rules and general operations.' : 'Aclare dudas comunes sobre las normas y el funcionamiento general del condominio.'}
                    </p>

                    <div className="flex flex-col gap-2">
                      {activeFaqs.map((faq, index) => {
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

      {/* RODAPÉ AO FINAL DA PÁGINA */}
      <footer className="w-full mt-auto bg-slate-950 text-slate-100 border-t border-slate-800 py-6 px-4 shadow-xl">
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
                href="https://maps.app.goo.gl/c2XQVsG32S27UmpV7" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[10px] text-slate-400 hover:text-blue-400 hover:underline transition-colors flex items-center gap-1"
              >
                R. 9, 1053 - St. Oeste, Goiânia - GO, 74120-010 • Frente à Praça do Sol
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
        className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center justify-center bg-emerald-500 hover:bg-emerald-600 text-white p-3.5 rounded-full shadow-xl hover:shadow-2xl active:scale-95 transition-all duration-200 animate-bounce hover:animate-none"
        style={{ animationDuration: '3s' }}
        id="floating-whatsapp-btn"
        title="Fale Conosco no WhatsApp"
      >
        <MessageSquare className="w-6 h-6 text-white" />
      </a>

      {/* BARRA DE NAVEGAÇÃO INFERIOR PARA CELULAR (MOBILE BOTTOM NAV) */}
      <nav 
        className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-slate-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-1 py-1 pb-[max(env(safe-area-inset-bottom),0.5rem)] flex items-center justify-around"
        id="mobile-bottom-navigation"
      >
        {[
          { id: 'inicio', label: lang === 'pt' ? 'Início' : lang === 'en' ? 'Home' : 'Inicio', icon: Sun },
          { id: 'nosso-flat', label: lang === 'pt' ? 'Flat' : lang === 'en' ? 'Flat' : 'Flat', icon: Home },
          { id: 'condominio', label: lang === 'pt' ? 'Condomínio' : lang === 'en' ? 'Condo' : 'Condominio', icon: Building },
          { id: 'guia-local', label: lang === 'pt' ? 'Guia' : lang === 'en' ? 'Guide' : 'Guía', icon: MapPin },
          { id: 'regras', label: lang === 'pt' ? 'Regras' : lang === 'en' ? 'Rules' : 'Reglas', icon: ClipboardList },
          { id: 'suporte', label: lang === 'pt' ? 'Suporte' : lang === 'en' ? 'Support' : 'Soporte', icon: Phone }
        ].map((item) => {
          const IconComp = item.icon;
          const isActive = activeTab === item.id && !hasSearchResults;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id as any);
                setSearchQuery('');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`relative flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all duration-200 select-none cursor-pointer flex-1 min-w-0 ${
                isActive ? 'text-blue-600 font-bold' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="mobileBottomActiveBg"
                  className="absolute inset-0 bg-blue-50/90 rounded-xl"
                  transition={{ type: "spring", stiffness: 450, damping: 35 }}
                />
              )}
              <div className="relative z-10 flex flex-col items-center">
                <IconComp className={`w-5 h-5 transition-transform ${isActive ? 'scale-110 text-blue-600' : ''}`} />
                <span className="text-[10px] tracking-tight truncate mt-0.5">{item.label}</span>
              </div>
            </button>
          );
        })}
      </nav>

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
