export interface GuideArticle {
  id: string;
  tab: 'inicio' | 'nosso-flat' | 'condominio' | 'regras' | 'guia-local' | 'suporte';
  category: string;
  title: string;
  excerpt: string;
  content: string;
  icon: string; // Lucide icon name
  tags: string[];
}

export interface FAQItem {
  category: string;
  question: string;
  answer: string;
}

export interface ContactInfo {
  role: string;
  name: string;
  phone: string;
  email: string;
  hours: string;
}

export interface LocalGuideItem {
  id: string;
  articleId: string;
  name: string;
  description?: string;
  distance?: string;
  badge?: string;
  address?: string;
  hours?: string;
  mapsUrl: string;
  wazeUrl: string;
  orderUrl?: string;
  phone?: string;
  whatsappUrl?: string;
}

export interface WeeklyScheduleSecondaryEvent {
  details: string;
  badge?: string;
  mapsUrl?: string;
  mapsLabel?: string;
}

export interface WeeklyScheduleDay {
  dayId: 'seg' | 'ter' | 'qua' | 'qui' | 'sex' | 'sab' | 'dom';
  dayName: string;
  dayShort: string;
  title: string;
  badge?: string;
  distance?: string;
  details: string;
  extra?: string;
  notice?: string;
  mapsUrl?: string;
  mapsLabel?: string;
  secondaryEvent?: WeeklyScheduleSecondaryEvent;
}

export interface DailyVenueItem {
  id: string;
  name: string;
  category: 'Mercados' | 'Feiras' | 'Pontos Turísticos';
  badge?: string;
  distance?: string;
  address: string;
  hours: string;
  description: string;
  mapsUrl: string;
  wazeUrl: string;
}

export interface EverydaySpot {
  id: string;
  name: string;
  regionBadge: string;
  addressSchedule: string;
  highlight?: string;
  description?: string;
  mapsUrl: string;
  mapsLabel: string;
  secondaryMapsUrl?: string;
  secondaryMapsLabel?: string;
  wazeUrl?: string;
}

export const guideArticles: GuideArticle[] = [
  {
    id: 'bem-vindo',
    tab: 'inicio',
    category: 'Boas-Vindas',
    title: 'Bem-vindo ao Sun Square 1208A!',
    excerpt: 'Dicas iniciais para uma chegada tranquila e confortável na Praça do Sol.',
    content: 'É um prazer receber você no nosso flat! Preparamos este espaço com muito carinho para que você tenha uma estadia excelente e produtiva em Goiânia.\n\n• PROPRIEDADE PARTICULAR: Este flat é uma unidade de propriedade particular privada. Não há serviço de limpeza diária ou troca periódica de roupas de cama e banho inclusos, sendo estes de uso restrito aos hóspedes geridos pelo hotel.\n• CONTROLE DE ACESSO: Para a segurança de todos, apenas pessoas devidamente registradas e cadastradas possuem autorização para acessar o flat.\n• SAUNAS SECA E A VAPOR: Estão disponíveis no condomínio mediante autorização prévia obtida diretamente na recepção.\n• MANUAL DIGITAL: Consulte este guia rápido sempre que precisar de informações sobre o flat, regras do condomínio ou recomendações locais.\n• LOCALIZAÇÃO PRIVILEGIADA: Rua 9, de frente para a Praça do Sol. O melhor da cidade se resolve a pé! Entre julho e setembro, aprecie os belos ipês-amarelos que colorem a praça.',
    icon: 'Sun',
    tags: ['bem-vindo', 'boas-vindas', 'inicio', 'propriedade particular', 'limpeza', 'acesso', 'registrado', 'sauna', '1208a', 'praça do sol']
  },
  {
    id: 'wi-fi-flat',
    tab: 'nosso-flat',
    category: 'Conectividade',
    title: 'Wi-Fi de Alta Velocidade',
    excerpt: 'Acesse a rede de internet de fibra óptica ultra rápida do apartamento.',
    content: 'O flat conta com internet banda larga de alta velocidade (fibra óptica), ideal para home office, chamadas de vídeo e streaming.\n\n• Rede: Ap 1208A\n• Senha: Sun1208\n\n💡 Dica importante: Rede com espaço e letras maiúsculas; senha sem espaço, com S maiúsculo.',
    icon: 'Wifi',
    tags: ['wi-fi', 'wifi', 'internet', 'senha', 'rede', 'fibra', 'ap 1208a', 'sun1208', '1208a']
  },
  {
    id: 'tv-stick',
    tab: 'nosso-flat',
    category: 'Entretenimento',
    title: 'Como usar a TV (TV Stick)',
    excerpt: 'Guia simples e prático para ligar, navegar e assistir aos seus aplicativos favoritos na Smart TV.',
    content: 'Guia rápido para usar o TV Stick do apartamento.',
    icon: 'Zap',
    tags: ['tv', 'televisão', 'streaming', 'controle', 'netflix', 'youtube', 'tv stick', 'entretenimento']
  },
  {
    id: 'diferenciais-condominio',
    tab: 'condominio',
    category: 'Estrutura',
    title: 'Diferenciais do Condomínio',
    excerpt: 'Aproveite as excelentes áreas comuns do Sun Square, localizadas no Mezanino, com piscina, saunas, academia, sala de jogos e manobrista.',
    content: 'O Sun Square Suites Hotel possui uma infraestrutura excelente disponível para você:\n\n• Entrada (Térreo) / Porte-cochère: Área de embarque e desembarque na entrada principal, oferecendo maior segurança e conveniência para embarcar ou desembarcar de veículos.\n• Piscina (Mezanino): Excelente piscina climatizada para seu lazer e descanso. Aberta diariamente. É terminantemente proibido levar copos ou garrafas de vidro para a área da piscina.\n• Sauna Seca e a Vapor (Mezanino): Localizadas na área comum de lazer do Mezanino. A utilização é permitida somente mediante autorização prévia na recepção.\n• Academia (Mezanino): Espaço fitness equipado com aparelhos modernos para manter seus treinos em dia.\n• Sala de Jogos (Mezanino): Área de lazer integrada para entretenimento.\n• Portaria e Recepção 24h: Equipe sempre a postos para garantir sua segurança e ajudar na identificação de visitas ou recebimento de encomendas. Lembramos que somente pessoas devidamente registradas possuem autorização de acesso ao flat.\n• Estacionamento: Rotativo com manobrista incluso (as vagas são rotativas e sujeitas a disponibilidade).',
    icon: 'Building',
    tags: ['piscina', 'academia', 'sauna', 'sauna seca', 'sauna a vapor', 'mezanino', 'sala de jogos', 'jogos', 'porte-cochere', 'porte cochere', 'embarque', 'desembarque', 'estacionamento', 'garagem', 'manobrista', 'vaga rotativa', 'portaria', 'acesso']
  },

  // --- GUIA LOCAL ARTIGOS ---
  {
    id: 'guia-local-programacao-semanal',
    tab: 'guia-local',
    category: 'A Semana',
    title: 'A semana na região',
    excerpt: 'Feiras e programação, de segunda a domingo',
    content: 'A semana na região: Feiras e programação, de segunda a domingo.\n\nSeg: Dia tranquilo: parques e mercados. Bosque dos Buritis, Lago das Rosas ou almoço no Mercado da Rua 74 (aberto até 23h).\nTer: Feira UP Marista gastronômica (Rua 144, Setor Marista · 17h–22h).\nQua: Feira do Parque Amazônia (Praça José Rodrigues de Morais Filho · 16h–23h).\nQui: Feira do Cerrado artesanato (Rua 72, Parque da Criança · 16h–22h · música ao vivo).\nSex: Abre a Feira Hippie — funciona direto até domingo 15h (Praça do Trabalhador / Região da 44 · maior feira de roupas da América Latina) e Feira gastronômica do Negrão de Lima · 17h–23h.\nSáb: Feira da Lua 3 min a pé (Praça Tamandaré · ~15h–22h · comida caseira e artesanato) e Manhã: Feira de Orgânicos no Mercado da 74 · 6h–10h.\nDom: Feira do Sol na sua porta (Praça do Sol · ~15h–22h) e Manhã: Feira do Cerrado 9h–13h · Feira Hippie até 15h. Tarde: Feira das Nuvens (Av. T-1, Setor Coimbra) 16h–22h.',
    icon: 'Calendar',
    tags: ['a semana na região', 'semana', 'feiras e programação, de segunda a domingo', 'feiras', 'feira da lua', 'feira do sol', 'feira hippie', 'feira do cerrado', 'up marista', 'feira das nuvens', 'mercado da 74', 'parque amazônia', 'negrão de lima']
  },
  {
    id: 'guia-local-todos-os-dias',
    tab: 'guia-local',
    category: 'Todos os Dias',
    title: 'Todos os dias',
    excerpt: 'Abre a semana inteira',
    content: 'Todos os dias: Abre a semana inteira.\n\n• Mercado Central\nCentro · Rua 3, 322 · seg–sex 7h–18h, sáb 7h–14h, dom 7h–12h\n\n• Mercado Popular da Rua 74\nCentro · Rua 74, 329 · seg–sáb 7h–23h · botecos à noite\n\n• Vila Cultural Cora Coralina\nCentro · Rua 23 com Rua 3 · todos os dias 9h–17h\n\n• Parques Vaca Brava e Flamboyant\n24h · Caminhada, corrida e quiosques',
    icon: 'Clock',
    tags: ['todos os dias', 'abre a semana inteira', 'mercados', 'feiras', 'pontos turísticos', 'mercado central', 'mercado popular da rua 74', 'rua 74', 'vila cultural cora coralina', 'parque vaca brava', 'parque flamboyant', 'centro', '24h']
  },
  {
    id: 'guia-local-gastronomia',
    tab: 'guia-local',
    category: 'Gastronomia',
    title: 'Restaurantes a Pé & Gastronomia',
    excerpt: 'Do japonês à culinária típica, adegas premiadas e churrasco, resolva o melhor da cidade a poucos minutos de caminhada.',
    content: 'Rua 9, de frente para a Praça do Sol. O melhor da gastronomia de Goiânia se resolve a pé!',
    icon: 'Utensils',
    tags: ['comer', 'restaurante', 'bar', 'churrascaria', 'almoço', 'jantar', 'izu', 'panela mágica', 'bartolomeu', 'pitigliano', 'celsin', 'walmor', 'bar do peixe', 'porto cave', 'el argentino', 'don will', 'yakiniku', 'acai', 'habibs']
  },
  {
    id: 'guia-local-shoppings',
    tab: 'guia-local',
    category: 'Shoppings',
    title: 'Compras & Shoppings Centers',
    excerpt: 'Bougainville na mesma rua do hotel, Goiânia Shopping em frente ao parque e Flamboyant Shopping.',
    content: 'Os melhores centros de compras e lazer da capital.\n\n⏰ Horários dos shoppings: Segunda a sábado 10h–22h | Domingo 14h–20h.',
    icon: 'ShoppingBag',
    tags: ['shopping', 'compras', 'bougainville', 'goiânia shopping', 'flamboyant', 'lojas', 'cinema']
  },
  {
    id: 'guia-local-parques-cultura',
    tab: 'guia-local',
    category: 'Lazer e Cultura',
    title: 'Pontos Turísticos & Parques',
    excerpt: 'Praça do Sol em frente, Praça Tamandaré a 3 min, Bosque dos Buritis, museus e arquitetura Art Déco.',
    content: 'Descubra os principais pontos turísticos perto do Sun Square:\n\n• Praça do Sol (Em frente): Praça arborizada, letreiro "Eu Amo Goiânia", playground infantil, espaço pet e palco da Feira do Sol aos domingos.\n• Praça Tamandaré (3 min a pé): Arborizada, com sorveterias, bares e a famosa Feira da Lua aos sábados.\n• Bosque dos Buritis e Museu de Arte de Goiânia (MAG) (~1,5 km): Av. Assis Chateaubriand · aberto 24h · pistas de caminhada, lagos e o MAG na Rua 1, Setor Oeste.\n• Lago das Rosas (~2 km): Alameda das Rosas · caminhada, pedalinho e ao lado do Zoológico de Goiânia.\n• Praça Cívica e Centro Art Déco (~2 km): Marco zero de Goiânia, acervo Art Déco tombado pelo IPHAN, Palácio das Esmeraldas e Museu Zoroastro Artiaga (entrada gratuita).\n• Beco da Codorna (~2,5 km): Av. Anhanguera, 5331 · museu e galeria de arte urbana e grafite a céu aberto.\n• Parque Vaca Brava (~2,5 km): Av. T-10, Setor Bueno · lago com pista de cooper, cafés ao redor e em frente ao Goiânia Shopping.\n• Centro Cultural Oscar Niemeyer (Acesso de carro): GO-020 · conjunto arquitetônico projetado por Niemeyer com museu contemporâneo (MAC), biblioteca e praça de patins.',
    icon: 'MapPin',
    tags: ['parque', 'lazer', 'cultura', 'turismo', 'pontos turísticos', 'praça do sol', 'praça tamandaré', 'bosque dos buritis', 'mag', 'lago das rosas', 'zoológico', 'praça cívica', 'art déco', 'beco da codorna', 'vaca brava', 'oscar niemeyer']
  },
  {
    id: 'guia-local-lavanderias',
    tab: 'guia-local',
    category: 'Lavanderias',
    title: 'Roupa & Lavanderias',
    excerpt: 'Opções self-service, lavanderias com serviço completo e entrega direta no flat.',
    content: 'Precisa cuidar das suas roupas durante a estadia? O Setor Oeste oferece opções práticas que atendem a todas as necessidades:',
    icon: 'Sparkles',
    tags: ['lavanderia', 'roupa', 'laundromat', 'self-service', 'eriká', 'minha lavanderia', 'lavanella', 'lavar', 'secar', 'passar']
  },
  {
    id: 'guia-local-servicos',
    tab: 'guia-local',
    category: 'Serviços',
    title: 'Conveniência, Saúde e Bancos',
    excerpt: 'Padarias, farmácias 24h, agências bancárias e hospitais no Setor Oeste.',
    content: 'Serviços essenciais que você encontra com facilidade nos arredores do edifício.',
    icon: 'Briefcase',
    tags: ['serviços', 'banco', 'farmácia', 'hospital', 'drogasil', 'nissei', 'padaria', 'caixa', 'bradesco', 'saúde']
  },
  {
    id: 'guia-local-veiculos-estetica',
    tab: 'guia-local',
    category: 'Saúde e Estética',
    title: 'Veículos, Recarga & Estética',
    excerpt: 'Estações de recarga para carros elétricos, barbearias, academias e salões de beleza.',
    content: 'Facilidades para o seu automóvel e cuidados de estética pessoal nos arredores.',
    icon: 'Zap',
    tags: ['recarga', 'elétrico', 'veículo', 'carro', 'academia', 'bluefit', 'barbearia', 'salão de beleza', 'cabeleireiro']
  },

  // --- REGRAS ---
  {
    id: 'regras-checkin-visitas',
    tab: 'regras',
    category: 'Normas',
    title: 'Check-in, Check-out e Visitas (Flat 1208A)',
    excerpt: 'Guia passo a passo para recepção 24h, identificação, envio de documentos e retirada do cartão do Flat 1208A.',
    content: 'Instruções passo a passo para realizar o seu check-in no Flat 1208A:\n\n1. Recepção 24h & Horário: A recepção do condomínio funciona 24 horas por dia. Nosso check-in é realizado a partir das 14h.\n2. Apresentação na Portaria: Ao chegar ao edifício, apresente-se na recepção e informe que ficará hospedado no Flat 1208A.\n3. Apresentação de Documentos: Apresente à portaria os documentos pessoais de identificação enviados previamente ao anfitrião.\n4. Retirada do Cartão Magnético: Após a conferência dos documentos, a recepção entregará o seu cartão magnético de acesso ao apartamento.\n\n• Check-out: Deve ser realizado até as 11h. Para necessidade de alteração de horário, consulte o anfitrião com antecedência.\n• Estadias de longa duração: Permitidas para períodos de 28 dias ou mais.\n• Limites de Hóspedes: A capacidade máxima de 4 hóspedes não pode ser ultrapassada em hipótese alguma.\n• Controle de Acesso e Visitas: O Flat pode receber visitas, mas devem ser previamente cadastradas pelo proprietário ou administrador.',
    icon: 'Shield',
    tags: ['check-in', 'check-out', '1208a', 'flat 1208a', 'cartão magnético', 'documentos', 'limite', 'capacidade', 'visitas', 'portaria', 'identificação', 'acesso', 'registrado']
  },
  {
    id: 'instrucoes-checkout',
    tab: 'regras',
    category: 'Check-out',
    title: 'Instruções de Check-out',
    excerpt: 'Passo a passo essencial para devolução de chaves, recolhimento de toalhas, lixo, energia e regras do imóvel.',
    content: 'Instruções Passo a Passo de Check-out:\n\n1. 🧺 Recolha as toalhas usadas: Deixe as toalhas estendidas para evitar mal cheiro e mofo.\n2. 🗑️ Tire o lixo: Separe o orgânico do reciclado e descarte nas lixeiras do condomínio, localizadas no Subsolo 1 (S1).\n3. 🔌 Desligue tudo: Com exceção do frigobar, todos os aparelhos precisam ser deixados desligados sempre que se ausentarem do flat.\n4. 🔒 Tranque tudo: Feche as janelas e a porta.\n5. 🔑 Devolva as chaves: Devolva o cartão magnético na recepção.\n\nPedidos adicionais / Regras essenciais:\n1. O acesso só é liberado após o preenchimento obrigatório do nosso WebCheckin.\n2. Visitas são estritamente proibidas, a menos que sejam cadastradas previamente conosco.\n3. Ao sair do flat, lembre-se de desligar luzes e o ar-condicionado.\n4. O lixo (orgânico e reciclável) deve ser descartado no Subsolo 1 (S1).\n\nObrigado por cuidar do espaço!',
    icon: 'LogOut',
    tags: ['checkout', 'check-out', 'toalhas', 'lixo', 'subsolo 1', 's1', 'frigobar', 'desligar', 'trancar', 'chaves', 'cartão', 'recepção', 'webcheckin', 'visitas', 'regras']
  },
  {
    id: 'regras-silencio-fumo',
    tab: 'regras',
    category: 'Convivência',
    title: 'Horário de Silêncio, Eventos e Fumo',
    excerpt: 'Regras rigorosas para manutenção da paz e da higiene coletiva no apartamento.',
    content: 'Mantenha a harmonia respeitando estas três normas fundamentais:\n\n• Horário de Silêncio: Rigoroso das 22h às 08h, em conformidade estrita com a lei do sossego e regimento interno.\n• Festas e Eventos: É estritamente proibido realizar festas, reuniões barulhentas ou eventos de qualquer natureza dentro do imóvel.\n• Fotografia: Não é permitida a realização de fotografias ou filmagens com finalidade comercial.\n• Proibido Fumar: Não é permitido fumar dentro do imóvel (incluindo banheiros, janelas ou sacadas). O fumo é restrito exclusivamente às áreas externas do condomínio designadas para este fim, mantendo o local livre de bitucas.',
    icon: 'VolumeX',
    tags: ['silêncio', 'lei do silêncio', 'festas', 'fumo', 'cigarro', 'filmagens', 'fotos', 'proibido fumar']
  },
  {
    id: 'regras-pets',
    tab: 'regras',
    category: 'Animais',
    title: 'Animais de Estimação (Pets)',
    excerpt: 'Diretrizes gerais sobre a presença de animais de estimação no apartamento.',
    content: '• Regra Geral: De modo geral, não são permitidos animais de estimação no apartamento.\n• Exceção: Animais de acompanhamento ou assistência podem ser liberados mediante autorização prévia e expressa do anfitrião. Nesses casos especiais, aplica-se uma taxa extra de limpeza no valor de R$ 120,00.',
    icon: 'Smile',
    tags: ['pets', 'animais', 'taxa', 'limpeza', 'cão guia', 'assistência']
  },
  {
    id: 'cuidados-sustentabilidade',
    tab: 'regras',
    category: 'Zelo',
    title: 'Cuidados, Sustentabilidade e Segurança',
    excerpt: 'Regras para a preservação do enxoval, voltagem 220V, descarte de lixo e segurança.',
    content: 'Pedimos atenção especial para o cuidado com o espaço e recursos do flat:\n\n• Organização: Mantenha o loft organizado durante sua estadia. A taxa de limpeza cobre a higienização para o próximo hóspede, mas não dispensa o zelo básico.\n• Móveis e Eletros: Não mova os móveis ou retire objetos do lugar. Cuide dos eletrônicos conforme as instruções. Lembre-se: nossa voltagem é 220V.\n• Roupas de Cama e Banho: Toalhas e lençóis são para uso exclusivo no flat. Evite usá-los para remover maquiagem, cosméticos, protetor solar ou para limpar superfícies. Manchas permanentes serão cobradas pelo custo de reposição. Não use as toalhas de banho na piscina.\n• Sustentabilidade: Ao sair, apague as luzes, desligue o ar-condicionado e feche bem as portas e janelas.\n• Descarte de Lixo: Todo o lixo acumulado deve ser devidamente ensacado e descartado na lixeira geral localizada no Subsolo 1, seguindo as placas de sinalização.\n• Segurança: Mantenha portas e janelas trancadas ao sair. Não compartilhe seu cartão ou código de acesso com terceiros. Nunca deixe crianças sem acompanhamento nas áreas comuns.\n• Emergências: O prédio conta com alarme de monóxido de carbono e equipamentos de segurança (extintores e saídas de emergência). Em caso de qualquer imprevisto ou dano ao imóvel, comunique o anfitrião imediatamente.',
    icon: 'Trash2',
    tags: ['lixo', 'voltagem', '220v', 'toalhas', 'limpeza', 'piscina', 'subsolo 1', 'energia', 'emergência']
  }
];

export const weeklyScheduleDays: WeeklyScheduleDay[] = [
  {
    dayId: 'seg',
    dayName: 'Segunda-feira',
    dayShort: 'Seg',
    title: 'Dia tranquilo: parques e mercados',
    badge: 'Parques & Mercados',
    details: 'Bosque dos Buritis, Lago das Rosas ou almoço no Mercado da Rua 74 (aberto até 23h).',
    extra: 'Dia tranquilo para passear nos bosques e almoçar comida típica goiana.',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Mercado+Rua+74+Goiania',
    mapsLabel: 'Mercado da Rua 74'
  },
  {
    dayId: 'ter',
    dayName: 'Terça-feira',
    dayShort: 'Ter',
    title: 'Feira UP Marista gastronômica',
    badge: 'Gastronômica',
    details: 'Rua 144, Setor Marista · 17h–22h',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Feira+UP+Marista+Rua+144+Setor+Marista+Goiania',
    mapsLabel: 'Feira UP Marista'
  },
  {
    dayId: 'qua',
    dayName: 'Quarta-feira',
    dayShort: 'Qua',
    title: 'Feira do Parque Amazônia',
    badge: 'Feira Noturna',
    details: 'Praça José Rodrigues de Morais Filho · 16h–23h',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Praca+Jose+Rodrigues+de+Morais+Filho+Parque+Amazonia+Goiania',
    mapsLabel: 'Praça José Rodrigues'
  },
  {
    dayId: 'qui',
    dayName: 'Quinta-feira',
    dayShort: 'Qui',
    title: 'Feira do Cerrado artesanato',
    badge: 'Artesanato & Música',
    details: 'Rua 72, Parque da Criança · 16h–22h · música ao vivo',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Feira+do+Cerrado+Parque+da+Crianca+Goiania',
    mapsLabel: 'Feira do Cerrado'
  },
  {
    dayId: 'sex',
    dayName: 'Sexta-feira',
    dayShort: 'Sex',
    title: 'Abre a Feira Hippie — funciona direto até domingo 15h',
    badge: 'Maior da América Latina',
    details: 'Praça do Trabalhador / Região da 44 · maior feira de roupas da América Latina',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Feira+Hippie+Praca+do+Trabalhador+Goiania',
    mapsLabel: 'Feira Hippie',
    secondaryEvent: {
      details: 'Feira gastronômica do Negrão de Lima · 17h–23h',
      badge: 'Gastronômica',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Feira+Gastronomica+Setor+Negrao+de+Lima+Goiania',
      mapsLabel: 'Feira Negrão de Lima'
    }
  },
  {
    dayId: 'sab',
    dayName: 'Sábado',
    dayShort: 'Sáb',
    title: 'Feira da Lua 3 min a pé',
    badge: '3 min a pé',
    distance: '3 min a pé',
    details: 'Praça Tamandaré · ~15h–22h · comida caseira e artesanato',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Feira+da+Lua+Praca+Tamandare+Goiania',
    mapsLabel: 'Feira da Lua (Praça Tamandaré)',
    secondaryEvent: {
      details: 'Manhã: Feira de Orgânicos no Mercado da 74 · 6h–10h',
      badge: 'Orgânicos',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Mercado+Rua+74+Goiania',
      mapsLabel: 'Mercado da 74'
    }
  },
  {
    dayId: 'dom',
    dayName: 'Domingo',
    dayShort: 'Dom',
    title: 'Feira do Sol na sua porta',
    badge: 'Na sua porta',
    distance: 'Na sua porta',
    details: 'Praça do Sol · ~15h–22h',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Feira+do+Sol+Praca+do+Sol+Goiania',
    mapsLabel: 'Feira do Sol (Praça do Sol)',
    secondaryEvent: {
      details: 'Manhã: Feira do Cerrado 9h–13h · Feira Hippie até 15h. Tarde: Feira das Nuvens (Av. T-1, Setor Coimbra) 16h–22h',
      badge: 'Manhã & Tarde',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Feira+das+Nuvens+Avenida+T-1+Setor+Coimbra+Goiania',
      mapsLabel: 'Feira das Nuvens'
    }
  }
];

export const everydaySpots: EverydaySpot[] = [
  {
    id: 'mercado-central',
    name: 'Mercado Central',
    regionBadge: 'Centro',
    addressSchedule: 'Rua 3, 322 · seg–sex 7h–18h, sáb 7h–14h, dom 7h–12h',
    highlight: 'Empadão goiano tradicional, doces cristalizados e queijos',
    description: 'Inaugurado na década de 50, tradicional comércio popular com gastronomia e artesanato autêntico goiano.',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Mercado+Central+Rua+3+322+Goiania',
    mapsLabel: 'Mercado Central (Rua 3, 322)',
    wazeUrl: 'https://waze.com/ul?q=Mercado%20Central%20Goi%C3%A2nia'
  },
  {
    id: 'mercado-74',
    name: 'Mercado Popular da Rua 74',
    regionBadge: 'Centro',
    addressSchedule: 'Rua 74, 329 · seg–sáb 7h–23h · botecos à noite',
    highlight: 'Almoço caseiro e botecos à noite com música ao vivo e chopp gelado',
    description: 'Ponto de encontro vibrante no Centro. Almoço com comida típica de dia e botecos animados à noite.',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Mercado+Popular+da+Rua+74+Goiania',
    mapsLabel: 'Mercado da Rua 74 (Rua 74, 329)',
    wazeUrl: 'https://waze.com/ul?q=Mercado%20Popular%20da%20Rua%2074%20Goi%C3%A2nia'
  },
  {
    id: 'vila-cultural',
    name: 'Vila Cultural Cora Coralina',
    regionBadge: 'Centro',
    addressSchedule: 'Rua 23 com Rua 3 · todos os dias 9h–17h',
    highlight: 'Complexo de arte, exposições visuais e feiras criativas',
    description: 'Espaço cultural subterrâneo atrás do Teatro Goiânia com galerias de arte, exposições e eventos ao ar livre.',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Vila+Cultural+Cora+Coralina+Goiania',
    mapsLabel: 'Vila Cultural (Rua 23 com Rua 3)',
    wazeUrl: 'https://waze.com/ul?q=Vila%20Cultural%20Cora%20Coralina%20Goi%C3%A2nia'
  },
  {
    id: 'parques-vaca-brava-flamboyant',
    name: 'Parques Vaca Brava e Flamboyant',
    regionBadge: '24h',
    addressSchedule: 'Caminhada, corrida e quiosques',
    highlight: 'Abertos 24h todos os dias · Pistas arborizadas e lagos',
    description: 'Dois dos parques urbanos mais nobres e procurados de Goiânia para exercícios, passeios e relaxamento ao ar livre.',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Parque+Vaca+Brava+Goiania',
    mapsLabel: 'Parque Vaca Brava (Av. T-10)',
    secondaryMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Parque+Flamboyant+Goiania',
    secondaryMapsLabel: 'Parque Flamboyant (Jardim Goiás)',
    wazeUrl: 'https://waze.com/ul?q=Parque%20Vaca%20Brava%20Goi%C3%A2nia'
  }
];

export const dailyVenues: DailyVenueItem[] = [
  // --- MERCADOS ---
  {
    id: 'mercado-central',
    name: 'Mercado Central',
    category: 'Mercados',
    badge: 'Centro',
    distance: '~2,5 km',
    address: 'Rua 3, 322 · Centro',
    hours: 'seg–sex 7h–18h, sáb 7h–14h, dom 7h–12h',
    description: 'Inaugurado na década de 50, famoso pelo empadão goiano original, doces caseiros cristalizados, pimentas, queijos da serra e artesanato.',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Mercado+Central+Rua+3+322+Goiania',
    wazeUrl: 'https://waze.com/ul?q=Mercado%20Central%20Goi%C3%A2nia'
  },
  {
    id: 'mercado-74',
    name: 'Mercado Popular da Rua 74',
    category: 'Mercados',
    badge: 'Centro',
    distance: '~2 km',
    address: 'Rua 74, 329 · Centro',
    hours: 'seg–sáb 7h–23h · botecos à noite',
    description: 'Ambiente acolhedor e ponto de encontro tradicional. De dia serve comida goiana e à noite ganha vida com música ao vivo, chopp gelado e petiscos.',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Mercado+Popular+da+Rua+74+Goiania',
    wazeUrl: 'https://waze.com/ul?q=Mercado%20Popular%20da%20Rua%2074%20Goi%C3%A2nia'
  },
  {
    id: 'vila-cultural',
    name: 'Vila Cultural Cora Coralina',
    category: 'Mercados',
    badge: 'Centro',
    distance: '~2 km',
    address: 'Rua 23 com Rua 3 · Centro (Atrás do Teatro Goiânia)',
    hours: 'todos os dias 9h–17h',
    description: 'Complexo cultural subterrâneo com galerias de arte, exposições visuais, feiras criativas e bela arquitetura no Centro da capital.',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Vila+Cultural+Cora+Coralina+Goiania',
    wazeUrl: 'https://waze.com/ul?q=Vila%20Cultural%20Cora%20Coralina%20Goi%C3%A2nia'
  },
  {
    id: 'feira-organicos-74',
    name: 'Feira de Orgânicos no Mercado da 74',
    category: 'Mercados',
    badge: 'Produtos Frescos',
    distance: '~2 km',
    address: 'Rua 74, 329 — Centro',
    hours: 'Sábados pela manhã das 6h às 10h',
    description: 'Frutas, verduras e produtos orgânicos frescos trazidos diretamente por pequenos produtores rurais de Goiás.',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Mercado+Popular+da+Rua+74+Goiania',
    wazeUrl: 'https://waze.com/ul?q=Mercado%20Popular%20da%20Rua%2074%20Goi%C3%A2nia'
  },

  // --- FEIRAS ---
  {
    id: 'feira-do-sol',
    name: 'Feira do Sol',
    category: 'Feiras',
    badge: 'Na sua porta',
    distance: 'Em frente ao flat',
    address: 'Praça do Sol — Setor Oeste',
    hours: 'Domingos das ~15h às 22h',
    description: 'Artesanato variado, roupas, comidas típicas goianas, doces, plantas ornamentais e espaço pet amigável.',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Feira+do+Sol+Praca+do+Sol+Goiania',
    wazeUrl: 'https://waze.com/ul?q=Pra%C3%A7a%20do%20Sol%20Goi%C3%A2nia'
  },
  {
    id: 'feira-da-lua',
    name: 'Feira da Lua',
    category: 'Feiras',
    badge: '3 min a pé',
    distance: '3 min a pé',
    address: 'Praça Tamandaré — Setor Oeste',
    hours: 'Sábados das ~15h às 22h',
    description: 'Uma das mais famosas feiras de Goiânia, com bancas de moda, calçados, artesanato e enorme praça gastronômica de comida caseira.',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Feira+da+Lua+Praca+Tamandare+Goiania',
    wazeUrl: 'https://waze.com/ul?q=Pra%C3%A7a%20Tamandar%C3%A9%20Goi%C3%A2nia'
  },
  {
    id: 'feira-hippie',
    name: 'Feira Hippie de Goiânia',
    category: 'Feiras',
    badge: 'Maior da América Latina',
    distance: '~4 km',
    address: 'Praça do Trabalhador / Região da 44',
    hours: 'Abre sexta e funciona direto até domingo 15h',
    description: 'A maior feira de roupas da América Latina. Milhares de bancas de confecção, artigos de couro, moda e acessórios a preços de atacado e varejo.',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Feira+Hippie+Praca+do+Trabalhador+Goiania',
    wazeUrl: 'https://waze.com/ul?q=Feira%20Hippie%20Goi%C3%A2nia'
  },
  {
    id: 'feira-do-cerrado',
    name: 'Feira do Cerrado',
    category: 'Feiras',
    badge: 'Artesanato & Música',
    distance: '~4 km',
    address: 'Rua 72, Parque da Criança — Jardim Goiás',
    hours: 'Quintas 16h–22h (música ao vivo) | Domingos 9h–13h',
    description: 'Artesanato genuíno do Centro-Oeste, peças de madeira, cerâmica, bordados e apresentações culturais com música ao vivo.',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Feira+do+Cerrado+Parque+da+Crianca+Goiania',
    wazeUrl: 'https://waze.com/ul?q=Feira%20do%20Cerrado%20Goi%C3%A2nia'
  },
  {
    id: 'feira-up-marista',
    name: 'Feira UP Marista',
    category: 'Feiras',
    badge: 'Gastronômica',
    distance: '~2 km',
    address: 'Rua 144 — Setor Marista',
    hours: 'Terças-feiras das 17h às 22h',
    description: 'Feira gastronômica com comidas de rua gourmet, pastéis artesanais, espetinhos, cervejas artesanais e ambiente descontraído.',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Feira+UP+Marista+Rua+144+Setor+Marista+Goiania',
    wazeUrl: 'https://waze.com/ul?q=Rua%20144%20Setor%20Marista%20Goi%C3%A2nia'
  },
  {
    id: 'feira-parque-amazonia',
    name: 'Feira do Parque Amazônia',
    category: 'Feiras',
    badge: 'Gastronomia & Família',
    distance: '~6 km',
    address: 'Praça José Rodrigues de Morais Filho',
    hours: 'Quartas-feiras das 16h às 23h',
    description: 'Diversidade gastronômica com pastéis tradicionais, caldos quentes, lanches e bancas variadas de produtos locais.',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Praca+Jose+Rodrigues+de+Morais+Filho+Parque+Amazonia+Goiania',
    wazeUrl: 'https://waze.com/ul?q=Parque%20Amaz%C3%B4nia%20Goi%C3%A2nia'
  },
  {
    id: 'feira-negrao-lima',
    name: 'Feira Gastronômica do Negrão de Lima',
    category: 'Feiras',
    badge: 'Comida de Rua',
    distance: '~4 km',
    address: 'Setor Negrão de Lima',
    hours: 'Sextas-feiras das 17h às 23h',
    description: 'Opções gastronômicas saborosas com comidas típicas, sobremesas e bebidas em ambiente amigável.',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Feira+Negrao+de+Lima+Goiania',
    wazeUrl: 'https://waze.com/ul?q=Negr%C3%A3o%20de%20Lima%20Goi%C3%A2nia'
  },
  {
    id: 'feira-das-nuvens',
    name: 'Feira das Nuvens',
    category: 'Feiras',
    badge: 'Tarde de Domingo',
    distance: '~3 km',
    address: 'Av. T-1 — Setor Coimbra',
    hours: 'Domingos das 16h às 22h',
    description: 'Feira ao ar livre aos domingos no Setor Coimbra, com lanches, pastéis, artesanato e opções para o jantar.',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Feira+das+Nuvens+Av+T1+Setor+Coimbra+Goiania',
    wazeUrl: 'https://waze.com/ul?q=Setor%20Coimbra%20Goi%C3%A2nia'
  },

  // --- PONTOS TURÍSTICOS ---
  {
    id: 'praca-do-sol-spot',
    name: 'Praça do Sol',
    category: 'Pontos Turísticos',
    badge: 'Na sua porta',
    distance: 'Em frente ao flat',
    address: 'Praça do Sol — Setor Oeste',
    hours: 'Aberto 24h todos os dias',
    description: 'Praça arborizada com playground infantil, espaço pet cercado, letreiro oficial "Eu Amo Goiânia" e sede da Feira do Sol aos domingos.',
    mapsUrl: 'https://maps.app.goo.gl/7x6AeoGhnoFDbx6K8',
    wazeUrl: 'https://waze.com/ul?q=Pra%C3%A7a%20do%20Sol%20Goi%C3%A2nia'
  },
  {
    id: 'praca-tamandare-spot',
    name: 'Praça Tamandaré',
    category: 'Pontos Turísticos',
    badge: '3 min a pé',
    distance: '3 min a pé',
    address: 'Praça Tamandaré — Setor Oeste',
    hours: 'Aberto 24h todos os dias',
    description: 'Bares, sorveterias, bancos e a concorrida Feira da Lua aos sábados. Um dos pontos de convivência mais tradicionais do Setor Oeste.',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Praca+Tamandare+Setor+Oeste+Goiania',
    wazeUrl: 'https://waze.com/ul?q=Pra%C3%A7a%20Tamandar%C3%A9%20Goi%C3%A2nia'
  },
  {
    id: 'bosque-buritis-spot',
    name: 'Bosque dos Buritis e Museu de Arte (MAG)',
    category: 'Pontos Turísticos',
    badge: 'Parque 24h',
    distance: '~1,5 km',
    address: 'Av. Assis Chateaubriand com Rua 1 — Setor Oeste',
    hours: 'Parque aberto 24h | MAG Ter–Sex 9h–17h, Sáb–Dom 10h–16h',
    description: 'Área verde preservada de 140 mil m² com lagos, pistas de caminhada, pontes e o Museu de Arte de Goiânia (MAG) na Rua 1.',
    mapsUrl: 'https://maps.app.goo.gl/jFp75hQMEsstTup8A',
    wazeUrl: 'https://waze.com/ul?q=Bosque%20dos%20Buritis'
  },
  {
    id: 'lago-das-rosas-spot',
    name: 'Lago das Rosas & Zoológico',
    category: 'Pontos Turísticos',
    badge: 'Parque Histórico',
    distance: '~2 km',
    address: 'Alameda das Rosas — Setor Oeste',
    hours: 'Parque aberto diariamente | Zoo Qua–Dom 8h30–16h',
    description: 'O parque mais antigo da capital, ideal para caminhada, pedalinho no lago e o Zoológico de Goiânia ao lado.',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Lago+das+Rosas+Goiania',
    wazeUrl: 'https://waze.com/ul?q=Lago%20das%20Rosas%20Goi%C3%A2nia'
  },
  {
    id: 'praca-civica-spot',
    name: 'Praça Cívica & Centro Art Déco',
    category: 'Pontos Turísticos',
    badge: 'Patrimônio Nacional',
    distance: '~2 km',
    address: 'Praça Dr. Pedro Ludovico Teixeira — Centro',
    hours: 'Aberta 24h | Museu Zoroastro Ter–Sex 9h–17h, Sáb–Dom 9h–15h (Grátis)',
    description: 'Marco zero de Goiânia, Palácio das Esmeraldas, acervo de arquitetura Art Déco dos anos 30 e 40 e Museu Zoroastro Artiaga.',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Praca+Civica+Goiania',
    wazeUrl: 'https://waze.com/ul?q=Pra%C3%A7a%20C%C3%ADvica%20Goi%C3%A2nia'
  },
  {
    id: 'beco-da-codorna-spot',
    name: 'Beco da Codorna',
    category: 'Pontos Turísticos',
    badge: 'Arte Urbana & Grafite',
    distance: '~2,5 km',
    address: 'Av. Anhanguera, 5331 — Centro',
    hours: 'Aberto 24h todos os dias',
    description: 'Galeria de arte urbana e museu de grafite a céu aberto no Centro, ponto turístico e fotográfico vibrante.',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Beco+da+Codorna+Av+Anhanguera+5331+Goiania',
    wazeUrl: 'https://waze.com/ul?q=Beco%20da%20Codorna%20Goi%C3%A2nia'
  },
  {
    id: 'parque-vaca-brava-spot',
    name: 'Parque Vaca Brava & Goiânia Shopping',
    category: 'Pontos Turísticos',
    badge: 'Setor Bueno · 24h',
    distance: '~2,5 km',
    address: 'Av. T-10 — Setor Bueno',
    hours: 'Aberto 24 horas todos os dias',
    description: 'Lindo parque com lago, pista de cooper arborizada e quiosques, localizado bem em frente ao Goiânia Shopping.',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Parque+Vaca+Brava+Goiania',
    wazeUrl: 'https://waze.com/ul?q=Parque%20Vaca%20Brava%20Goi%C3%A2nia'
  },
  {
    id: 'parque-flamboyant-spot',
    name: 'Parque Flamboyant',
    category: 'Pontos Turísticos',
    badge: 'Jardim Goiás · 24h',
    distance: '~5 km',
    address: 'Rua 15 com Rua 46 — Jardim Goiás',
    hours: 'Aberto 24 horas todos os dias',
    description: 'Parque de 125 mil m² com dois lagos, mirante, pontes japonesas e ciclovia, a minutos do Flamboyant Shopping.',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Parque+Flamboyant+Goiania',
    wazeUrl: 'https://waze.com/ul?q=Parque%20Flamboyant%20Goi%C3%A2nia'
  },
  {
    id: 'centro-oscar-niemeyer-spot',
    name: 'Centro Cultural Oscar Niemeyer',
    category: 'Pontos Turísticos',
    badge: 'Complexo Cultural',
    distance: 'Acesso de carro (~10 min)',
    address: 'GO-020, Km 01 — Jardim Goiás',
    hours: 'Esplanada aberta diariamente | Museu MAC Ter–Dom 9h–18h',
    description: 'Conjunto monumental de museu contemporâneo (MAC), biblioteca e teatro projetados por Oscar Niemeyer, ideal para o pôr do sol e patins.',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Centro+Cultural+Oscar+Niemeyer+Goiania',
    wazeUrl: 'https://waze.com/ul?q=Centro%20Cultural%20Oscar%20Niemeyer%20Goi%C3%A2nia'
  }
];

export const faqItems: FAQItem[] = [
  {
    category: 'Check-in e Check-out',
    question: 'Qual é o horário de check-in e check-out?',
    answer: 'A recepção funciona 24 horas, mas o check-in é sempre a partir das 14h. É necessário informar o seu horário previsto de chegada ao anfitrião previamente. O check-out é até as 11h.'
  },
  {
    category: 'Limpeza e Enxoval',
    question: 'O flat oferece serviço de limpeza diária ou troca de toalhas/lençóis?',
    answer: 'Não. Este flat é uma propriedade particular. Ao contrário dos hóspedes contratados diretamente com o hotel, as estadias de temporada neste flat privado não dispõem de serviço de limpeza diária ou troca periódica de roupas de cama e banho. O hóspede recebe o flat limpo e com enxoval completo de entrada.'
  },
  {
    category: 'Saunas',
    question: 'O condomínio possui sauna?',
    answer: 'Sim, o condomínio conta com saunas seca e a vapor excelentes localizadas na área comum do Mezanino. No entanto, para a segurança e manutenção do espaço, a utilização das saunas é permitida somente mediante autorização prévia obtida diretamente na recepção.'
  },
  {
    category: 'Controle de Acesso',
    question: 'Quem pode acessar o flat?',
    answer: 'Por rígidos protocolos de segurança do Sun Square, somente pessoas devidamente cadastradas possuem autorização para acessar o flat. O Flat pode receber visitas, mas devem ser previamente cadastradas pelo proprietário ou administrador.'
  },
  {
    category: 'Visitas',
    question: 'Posso receber visitas no apartamento?',
    answer: 'O Flat pode receber visitas, mas devem ser previamente cadastradas pelo proprietário ou administrador.'
  },
  {
    category: 'Capacidade',
    question: 'Qual o limite de pessoas que podem dormir no flat?',
    answer: 'A capacidade máxima é de até 4 pessoas de forma confortável (Dormitório com Cama Queen Box + Sala com Sofá-cama de dois lugares). Este limite não pode ser ultrapassado.'
  },
  {
    category: 'Voltagem',
    question: 'Qual é a voltagem das tomadas no flat?',
    answer: 'A voltagem em Goiânia e em todo o condomínio Sun Square é de 220V. Tenha cuidado ao ligar seus aparelhos eletrônicos pessoais.'
  },
  {
    category: 'Piscina',
    question: 'Posso levar toalhas de banho do flat para a piscina?',
    answer: 'Não. As roupas de cama e de banho fornecidas são de uso exclusivo dentro do flat. Além disso, lembre-se de que é proibido usar copos ou recipientes de vidro na área da piscina.'
  },
  {
    category: 'Descarte de Lixo',
    question: 'Onde devo descartar o meu lixo durante a estadia?',
    answer: 'Todo o lixo acumulado deve ser ensacado e depositado na lixeira geral localizada no Subsolo 1 do condomínio, seguindo as placas de sinalização.'
  }
];

export const contactList: ContactInfo[] = [
  {
    role: 'Anfitrião',
    name: 'Wellington Rodovalho',
    phone: '(62) 99151-4568',
    email: 'contato@alugagoias.com.br',
    hours: 'Sempre disponível para suporte e dúvidas'
  }
];

export const localGuideItems: LocalGuideItem[] = [
  // --- GASTRONOMIA A PÉ & RESTAURANTES ---
  {
    id: 'izu',
    articleId: 'guia-local-gastronomia',
    name: 'Izu Japanese Food',
    badge: 'Japonês Premiado',
    distance: '2 min a pé',
    description: 'Japonês requintado e moderno · o mais bem avaliado de toda a vizinhança da Praça do Sol.',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Izu+Japanese+Food+Goiania',
    wazeUrl: 'https://waze.com/ul?q=Izu%20Japanese%20Food%20Goi%C3%A2nia'
  },
  {
    id: 'panela-magica',
    articleId: 'guia-local-gastronomia',
    name: 'Panela Mágica',
    badge: 'Top 10 de 2026',
    distance: '5 min a pé',
    description: 'Comida caseira, saudável e refinada com ingredientes frescos · eleito um dos 10 melhores de Goiânia em 2026.',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Panela+Magica+Setor+Oeste+Goiania',
    wazeUrl: 'https://waze.com/ul?q=Panela%20M%C3%A1gica%20Goi%C3%A2nia'
  },
  {
    id: 'bartolomeu',
    articleId: 'guia-local-gastronomia',
    name: 'Bartolomeu Restaurante e Adega',
    badge: 'Top 10 de 2026',
    distance: '5 min a pé',
    description: 'Rua 22 · cozinha contemporânea, cortes nobres na brasa e adega premiada com mais de 600 rótulos.',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Bartolomeu+Restaurante+Adega+Rua+22+Goiania',
    wazeUrl: 'https://waze.com/ul?q=Bartolomeu%20Restaurante%20e%20Adega%20Goi%C3%A2nia'
  },
  {
    id: 'pitigliano',
    articleId: 'guia-local-gastronomia',
    name: 'Pizzaria Pitigliano',
    badge: 'Pizza Italiana',
    distance: '6 min a pé',
    description: 'Tradicionais pizzas italianas assadas em forno a lenha, em um ambiente rústico envolto por belos jardins.',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Pizzaria+Pitigliano+Setor+Oeste+Goiania',
    wazeUrl: 'https://waze.com/ul?q=Pizzaria%20Pitigliano%20Goi%C3%A2nia'
  },
  {
    id: 'celsin',
    articleId: 'guia-local-gastronomia',
    name: 'Celsin & Cia Bar e Restaurante',
    badge: 'Boteco & Petiscos',
    distance: '5 min a pé',
    description: 'Rua 22 · tradicional boteco com terraço agradável, chopp geladíssimo e culinária típica goiana.',
    mapsUrl: 'https://maps.app.goo.gl/eeoxtZtkbwKtei1z9',
    wazeUrl: 'https://waze.com/ul?q=Celsin%20Bar%20e%20Restaurante'
  },
  {
    id: 'walmor',
    articleId: 'guia-local-gastronomia',
    name: 'Churrascaria do Walmor',
    badge: 'Rodízio Tradicional',
    distance: '5 min a pé',
    description: 'Rua 3 · churrascaria clássica com rodízio de carnes nobres, farto buffet de saladas e sobremesas.',
    mapsUrl: 'https://maps.app.goo.gl/dXHQESCtDcbjXt8MA',
    wazeUrl: 'https://waze.com/ul?q=Churrascaria%20do%20Walmor'
  },
  {
    id: 'bar-do-peixe',
    articleId: 'guia-local-gastronomia',
    name: 'Bar do Peixe',
    badge: 'Frutos do Mar',
    distance: '6 min a pé',
    description: 'Peixes frescos de água doce e frutos do mar, com destaque para a moqueca e porções crocantes de peixe.',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Bar+do+Peixe+Setor+Oeste+Goiania',
    wazeUrl: 'https://waze.com/ul?q=Bar%20do%20Peixe%20Goi%C3%A2nia'
  },
  {
    id: 'porto-cave',
    articleId: 'guia-local-gastronomia',
    name: 'Porto Cave',
    badge: 'Cozinha Portuguesa',
    distance: '6 min a pé',
    description: 'Rua 28 · autêntica gastronomia portuguesa, receitas com bacalhau de alta qualidade e carta de vinhos finos.',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Porto+Cave+Setor+Oeste+Goiania',
    wazeUrl: 'https://waze.com/ul?q=Porto%20Cave%20Goi%C3%A2nia'
  },
  {
    id: 'el-argentino',
    articleId: 'guia-local-gastronomia',
    name: 'El Argentino',
    badge: 'Parrilla Argentina',
    distance: '10 min a pé',
    description: 'Rua 4, Setor Oeste · autêntica parrilla argentina com cortes especiais de angus grelhados no ponto certo.',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=El+Argentino+Setor+Oeste+Goiania',
    wazeUrl: 'https://waze.com/ul?q=El%20Argentino%20Goi%C3%A2nia'
  },
  {
    id: 'alta-gastronomia',
    articleId: 'guia-local-gastronomia',
    name: 'Circuito Alta Gastronomia: Íz · 1929 Trattoria · Botelli · Fãmu',
    badge: 'Íz: Nº 1 da Cidade em 2026',
    distance: 'Poucos min de táxi',
    description: 'Setor Marista · alta gastronomia assinada por grandes chefs premiados (Íz eleito o restaurante nº 1 da cidade).',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Iz+Restaurante+Setor+Marista+Goiania',
    wazeUrl: 'https://waze.com/ul?q=%C3%8Dz%20Restaurante%20Goi%C3%A2nia'
  },
  {
    id: 'don-will',
    articleId: 'guia-local-gastronomia',
    name: "Don 'Will Garden",
    badge: 'No Sun Square',
    distance: 'No edifício',
    description: 'Bistrô e restaurante requintado convenientemente localizado no térreo do Sun Square.',
    mapsUrl: 'https://maps.app.goo.gl/e31ZxRDVHb5MXADM9',
    wazeUrl: "https://waze.com/ul?q=Don%20'Will%20Garden"
  },
  {
    id: 'yakiniku',
    articleId: 'guia-local-gastronomia',
    name: 'S.A Yakiniku Goiânia',
    badge: 'Japonês',
    distance: '3 min a pé',
    description: 'Churrasco japonês na mesa e pratos tradicionais.',
    mapsUrl: 'https://maps.app.goo.gl/nQGSBqkqYzNT467A8',
    wazeUrl: 'https://waze.com/ul?q=S.A%20Yakiniku%20Goi%C3%A2nia'
  },
  {
    id: 'acai-grau',
    articleId: 'guia-local-gastronomia',
    name: 'Açaí no Grau Goiânia',
    badge: 'Açaí & Sucos',
    distance: '2 min a pé',
    description: 'Açaí na tigela com acompanhamentos variados e smoothies refrescantes.',
    mapsUrl: 'https://maps.app.goo.gl/VGb9uCvKCVmQWNac9',
    wazeUrl: 'https://waze.com/ul?q=A%C3%A7a%C3%AD%20no%20Grau%20Goi%C3%A2nia',
    orderUrl: 'https://www.ifood.com.br/?utm_medium=share'
  },
  {
    id: 'habibs',
    articleId: 'guia-local-gastronomia',
    name: "Habib's Setor Oeste",
    badge: 'Fast-Food Árabe',
    distance: '4 min a pé',
    description: 'Rede de culinária árabe rápida com esfihas, kibes e pratos prontos.',
    mapsUrl: 'https://maps.app.goo.gl/kseK5gLhzLBykDoZA',
    wazeUrl: "https://waze.com/ul?q=Habib's%20Setor%20Oeste",
    orderUrl: 'https://www.habibs.com.br/?app=1'
  },
  {
    id: 'neropolis',
    articleId: 'guia-local-gastronomia',
    name: 'Doces Nerópolis - Loja Goiânia',
    badge: 'Doceria Tradicional',
    distance: '4 min a pé',
    description: 'Doces tradicionais em calda, compotas e quitutes típicos goianos.',
    mapsUrl: 'https://maps.app.goo.gl/aZKznwSwZ1E8SCSU7',
    wazeUrl: 'https://waze.com/ul?q=Doces%20Ner%C3%B3polis%20-%20Loja%20Goi%C3%A2nia'
  },

  // --- SHOPPINGS & COMPRAS ---
  {
    id: 'shopping-bougainville',
    articleId: 'guia-local-shoppings',
    name: 'Shopping Bougainville',
    badge: 'Na mesma rua do hotel',
    distance: '~1,5 km',
    address: 'Rua 9, 1855 — Setor Marista',
    hours: 'Seg–Sáb 10h–22h | Dom 14h–20h',
    description: 'Shopping elegante na mesma rua do flat (Rua 9), com cinema cult, praça de alimentação agradável e lojas de moda.',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Shopping+Bougainville+Rua+9+1855+Goiania',
    wazeUrl: 'https://waze.com/ul?q=Shopping%20Bougainville%20Goi%C3%A2nia'
  },
  {
    id: 'goiania-shopping',
    articleId: 'guia-local-shoppings',
    name: 'Goiânia Shopping',
    badge: 'Frente ao Parque Vaca Brava',
    distance: '~2,5 km',
    address: 'Av. T-10, 1300 — Setor Bueno',
    hours: 'Seg–Sáb 10h–22h | Dom 14h–20h',
    description: 'Grande centro comercial integrado à bela vista do Parque Vaca Brava, com salas de cinema, praça de alimentação e marcas consagradas.',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Goiania+Shopping+Av+T10+1300+Goiania',
    wazeUrl: 'https://waze.com/ul?q=Goi%C3%A2nia%20Shopping'
  },
  {
    id: 'flamboyant-shopping',
    articleId: 'guia-local-shoppings',
    name: 'Flamboyant Shopping Center',
    badge: 'Maior de Goiás',
    distance: '~5 km',
    address: 'Av. Jamel Cecílio, 3300 — Jardim Goiás',
    hours: 'Seg–Sáb 10h–22h | Dom 14h–20h',
    description: 'O maior da cidade: grifes internacionais, cinema IMAX e um renomado polo gastronômico com Pobre Juan, Coco Bambu, Outback e Juá.',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Flamboyant+Shopping+Center+Goiania',
    wazeUrl: 'https://waze.com/ul?q=Flamboyant%20Shopping%20Center%20Goi%C3%A2nia'
  },

  // --- PONTOS TURÍSTICOS, LAZER E CULTURA ---
  {
    id: 'praca-sol',
    articleId: 'guia-local-parques-cultura',
    name: 'Praça do Sol',
    badge: 'Na sua porta',
    distance: 'Em frente',
    description: 'Praça arborizada com playground infantil, espaço pet, o famoso letreiro "Eu Amo Goiânia" e sede da Feira do Sol aos domingos.',
    mapsUrl: 'https://maps.app.goo.gl/7x6AeoGhnoFDbx6K8',
    wazeUrl: 'https://waze.com/ul?q=Pra%C3%A7a%20do%20Sol%20Goi%C3%A2nia'
  },
  {
    id: 'praca-tamandare',
    articleId: 'guia-local-parques-cultura',
    name: 'Praça Tamandaré',
    badge: '3 min a pé',
    distance: '3 min a pé',
    description: 'Uma das praças mais tradicionais do Setor Oeste, com sorveterias, bares, bancos e a concorrida Feira da Lua aos sábados à tarde.',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Praca+Tamandare+Setor+Oeste+Goiania',
    wazeUrl: 'https://waze.com/ul?q=Pra%C3%A7a%20Tamandar%C3%A9%20Goi%C3%A2nia'
  },
  {
    id: 'bosque-buritis',
    articleId: 'guia-local-parques-cultura',
    name: 'Bosque dos Buritis & MAG',
    badge: 'Aberto 24h',
    distance: '~1,5 km',
    description: 'Av. Assis Chateaubriand · parque verde de 140 mil m² com lagos, pistas de cooper e o Museu de Arte de Goiânia (MAG) na Rua 1.',
    mapsUrl: 'https://maps.app.goo.gl/jFp75hQMEsstTup8A',
    wazeUrl: 'https://waze.com/ul?q=Bosque%20dos%20Buritis'
  },
  {
    id: 'lago-das-rosas',
    articleId: 'guia-local-parques-cultura',
    name: 'Lago das Rosas & Zoológico',
    badge: 'Parque Histórico',
    distance: '~2 km',
    description: 'Alameda das Rosas · o parque mais antigo da capital, ideal para caminhada, com lago, pedalinho e o Parque Zoológico de Goiânia ao lado.',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Lago+das+Rosas+Goiania',
    wazeUrl: 'https://waze.com/ul?q=Lago%20das%20Rosas%20Goi%C3%A2nia'
  },
  {
    id: 'praca-civica',
    articleId: 'guia-local-parques-cultura',
    name: 'Praça Cívica & Centro Art Déco',
    badge: 'Patrimônio Nacional',
    distance: '~2 km',
    description: 'Marco zero de Goiânia, Palácio das Esmeraldas, acervo de arquitetura Art Déco dos anos 30 e 40 e Museu Zoroastro Artiaga (entrada gratuita).',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Praca+Civica+Goiania',
    wazeUrl: 'https://waze.com/ul?q=Pra%C3%A7a%20C%C3%ADvica%20Goi%C3%A2nia'
  },
  {
    id: 'beco-codorna',
    articleId: 'guia-local-parques-cultura',
    name: 'Beco da Codorna (Galeria de Arte Urbana)',
    badge: 'Arte & Grafite',
    distance: '~2,5 km',
    description: 'Av. Anhanguera, 5331 · galeria de arte urbana e museu de grafite a céu aberto no Centro, ponto turístico imperdível para fotos.',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Beco+da+Codorna+Av+Anhanguera+5331+Goiania',
    wazeUrl: 'https://waze.com/ul?q=Beco%20da%20Codorna%20Goi%C3%A2nia'
  },
  {
    id: 'parque-vaca-brava',
    articleId: 'guia-local-parques-cultura',
    name: 'Parque Vaca Brava',
    badge: 'Setor Bueno',
    distance: '~2,5 km',
    description: 'Av. T-10 · parque com lago, pista de cooper arborizada e cercado pelos melhores cafés e pelo Goiânia Shopping.',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Parque+Vaca+Brava+Goiania',
    wazeUrl: 'https://waze.com/ul?q=Parque%20Vaca%20Brava%20Goi%C3%A2nia'
  },
  {
    id: 'centro-oscar-niemeyer',
    articleId: 'guia-local-parques-cultura',
    name: 'Centro Cultural Oscar Niemeyer',
    badge: 'Complexo Cultural',
    distance: 'Acesso de carro',
    description: 'GO-020 · conjunto de museu (MAC), biblioteca e teatro projetados por Oscar Niemeyer, com ampla esplanada de convivência e patins.',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Centro+Cultural+Oscar+Niemeyer+Goiania',
    wazeUrl: 'https://waze.com/ul?q=Centro%20Cultural%20Oscar%20Niemeyer%20Goi%C3%A2nia'
  },
  {
    id: 'zoo',
    articleId: 'guia-local-parques-cultura',
    name: 'Parque Zoológico de Goiânia',
    badge: 'Passeio Familiar',
    distance: '~2 km',
    description: 'Parque zoológico tradicional com animais da fauna brasileira e internacional em ampla área arborizada.',
    mapsUrl: 'https://maps.app.goo.gl/NB5JqodnmTdv3gs1A',
    wazeUrl: 'https://waze.com/ul?q=Parque%20Zool%C3%B3gico%20de%20Goi%C3%A2nia'
  },
  {
    id: 'museu-pedro',
    articleId: 'guia-local-parques-cultura',
    name: 'Museu Pedro Ludovico',
    badge: 'Histórico',
    distance: '~2 km',
    description: 'Residência histórica do fundador de Goiânia, preservando o mobiliário original e documentos da época da construção da capital.',
    mapsUrl: 'https://maps.app.goo.gl/AaFTp4RbPcwWdtb36',
    wazeUrl: 'https://waze.com/ul?q=Museu%20Pedro%20Ludovico'
  },
  {
    id: 'tjgo',
    articleId: 'guia-local-parques-cultura',
    name: 'TJGO - Tribunal de Justiça do Estado de Goiás',
    badge: 'Institucional',
    distance: '~2 km',
    description: 'Sede estadual do Poder Judiciário em Goiânia.',
    mapsUrl: 'https://maps.app.goo.gl/HBdz7BRNXpiCZC5f9',
    wazeUrl: 'https://waze.com/ul?q=TJGO%20-%20Tribunal%20de%20Justi%C3%A7a%20do%20Estado%20de%20Goi%C3%A1s'
  },

  // --- ROUPA & LAVANDERIAS ---
  {
    id: 'laundromat',
    articleId: 'guia-local-lavanderias',
    name: 'Laundromat Self-Service',
    badge: 'Você mesmo lava e seca',
    distance: '~1 km',
    address: 'Av. Assis Chateaubriand, 439 — Setor Oeste',
    description: 'Você mesmo lava e seca suas roupas em máquinas industriais modernas e rápidas. Excelente custo-benefício.',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Laundromat+Av+Assis+Chateaubriand+439+Setor+Oeste+Goiania',
    wazeUrl: 'https://waze.com/ul?q=Laundromat%20Assis%20Chateaubriand%20Goi%C3%A2nia'
  },
  {
    id: 'erika-lavanderia',
    articleId: 'guia-local-lavanderias',
    name: 'Eriká Lavanderia',
    badge: 'Lava, seca e passa',
    distance: 'Setor Oeste',
    address: 'Rua R-12, 60 — Setor Oeste',
    phone: '(62) 99923-0087',
    whatsappUrl: 'https://wa.me/5562999230087',
    description: 'Serviço completo: lava, seca e passa com atendimento atencioso. Contato direto pelo WhatsApp.',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Erika+Lavanderia+Rua+R12+60+Setor+Oeste+Goiania',
    wazeUrl: 'https://waze.com/ul?q=Erika%20Lavanderia%20Setor%20Oeste%20Goi%C3%A2nia'
  },
  {
    id: 'minha-lavanderia',
    articleId: 'guia-local-lavanderias',
    name: 'Minha Lavanderia — Setor Oeste',
    badge: 'Busca e entrega',
    distance: 'Setor Oeste',
    description: 'Lavanderia profissional completa com serviço de busca e entrega (delivery) no flat.',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Minha+Lavanderia+Setor+Oeste+Goiania',
    wazeUrl: 'https://waze.com/ul?q=Minha%20Lavanderia%20Setor%20Oeste%20Goi%C3%A2nia'
  },
  {
    id: 'lavanella',
    articleId: 'guia-local-lavanderias',
    name: 'Lavanella Lavanderia',
    badge: 'Tradicional',
    distance: 'Setor Oeste',
    description: 'Lavanderia tradicional e tinturaria para roupas sociais e do dia a dia.',
    mapsUrl: 'https://maps.app.goo.gl/HLXuB5VbY3ubsi1q7',
    wazeUrl: 'https://waze.com/ul?q=Lavanella%20Lavanderia'
  },

  // --- CONVENIÊNCIA, SAÚDE E SERVIÇOS ---
  {
    id: 'pao-cia',
    articleId: 'guia-local-servicos',
    name: 'Padaria Pão & Companhia Setor Oeste',
    badge: 'Padaria & Café',
    distance: '3 min a pé',
    description: 'Pães frescos, salgados, bolos, café da manhã e lanches finos.',
    mapsUrl: 'https://maps.app.goo.gl/GFCF8JAcM3RZ18Xj6',
    wazeUrl: 'https://waze.com/ul?q=Padaria%20P%C3%A3o%20%26%20Companhia%20Setor%20Oeste'
  },
  {
    id: 'fran-makes',
    articleId: 'guia-local-servicos',
    name: 'Fran Makes l Perfumes & Cosméticos',
    badge: 'Cosméticos',
    distance: '3 min a pé',
    description: 'Maquiagens e perfumes importados em Goiânia.',
    mapsUrl: 'https://maps.app.goo.gl/LNgbuLDUeaG7sHuP7',
    wazeUrl: 'https://waze.com/ul?q=Fran%20Makes%20l%20Maquiagens%20e%20Perfumes%20Importados%20em%20Goi%C3%A2nia'
  },
  {
    id: 'drogasil',
    articleId: 'guia-local-servicos',
    name: 'Drogasil 24 Horas',
    badge: 'Farmácia 24h',
    distance: '2 min a pé',
    description: 'Medicamentos, conveniência e cuidados de saúde abertos 24 horas por dia.',
    mapsUrl: 'https://maps.app.goo.gl/2mEGXTXNpCiiVCyv5',
    wazeUrl: 'https://waze.com/ul?q=Drogasil'
  },
  {
    id: 'nissei',
    articleId: 'guia-local-servicos',
    name: 'Farmácias Nissei',
    badge: 'Drogaria',
    distance: '3 min a pé',
    description: 'Medicamentos, higiene e dermocosméticos.',
    mapsUrl: 'https://maps.app.goo.gl/pyufJihZBmBbTKoRA',
    wazeUrl: 'https://waze.com/ul?q=Farm%C3%A1cias%20Nissei'
  },
  {
    id: 'hospital-coracao',
    articleId: 'guia-local-servicos',
    name: 'Hospital do Coração de Goiás',
    badge: 'Hospital & Emergência',
    distance: '5 min a pé',
    description: 'Referência em cardiologia, urgências e pronto-atendimento hospitalar.',
    mapsUrl: 'https://maps.app.goo.gl/vf8RgZEV7zeVk6hMA',
    wazeUrl: 'https://waze.com/ul?q=Hospital%20do%20Cora%C3%A7%C3%A3o%20de%20Goi%C3%A1s'
  },
  {
    id: 'caixa',
    articleId: 'guia-local-servicos',
    name: 'Caixa Econômica Federal',
    badge: 'Banco & Caixas',
    distance: '3 min a pé',
    description: 'Agência bancária e caixas eletrônicos para saques.',
    mapsUrl: 'https://maps.app.goo.gl/8kwtu9kZYdjR1Kj49',
    wazeUrl: 'https://waze.com/ul?q=Caixa%20Econ%C3%B4mica%20Federal'
  },
  {
    id: 'bradesco',
    articleId: 'guia-local-servicos',
    name: 'Bradesco',
    badge: 'Banco & Caixas',
    distance: '3 min a pé',
    description: 'Agência bancária e caixas eletrônicos.',
    mapsUrl: 'https://maps.app.goo.gl/CLEPuM62154h2bDJ8',
    wazeUrl: 'https://waze.com/ul?q=Bradesco'
  },

  // --- VEÍCULOS, RECARGA E ESTÉTICA ---
  {
    id: 'recarga-tupi',
    articleId: 'guia-local-veiculos-estetica',
    name: 'Estação de Recarga Elétrica Tupi',
    badge: 'Eletroposto',
    distance: 'Setor Oeste',
    description: 'Posto de recarga rápida para veículos elétricos e híbridos plug-in.',
    mapsUrl: 'https://maps.app.goo.gl/Xvmek8WGcJqqP2sy6',
    wazeUrl: 'https://waze.com/ul?q=Est%C3%A3o%20de%20recarga%20da%20Tupi'
  },
  {
    id: 'recarga-tamandare',
    articleId: 'guia-local-veiculos-estetica',
    name: 'Estação de Recarga - Praça Tamandaré',
    badge: 'Eletroposto',
    distance: '3 min a pé',
    description: 'Ponto de abastecimento para carros elétricos na Praça Tamandaré.',
    mapsUrl: 'https://maps.app.goo.gl/eCLqytpqGtcqDCCd8',
    wazeUrl: 'https://waze.com/ul?q=Est%C3%A3o%20de%20recarga%20-%20Pra%C3%A7a%20Tamandar%C3%A9'
  },
  {
    id: 'bluefit',
    articleId: 'guia-local-veiculos-estetica',
    name: 'Academia BlueFit Praça do Sol',
    badge: 'Academia Moderna',
    distance: '1 min a pé',
    description: 'Academia moderna e completa com musculação, esteiras e aulas a passos do flat.',
    mapsUrl: 'https://maps.app.goo.gl/7ymv2C5ukRrqttSn6',
    wazeUrl: 'https://waze.com/ul?q=Academia%20BlueFit%20Pra%C3%A7a%20do%20Sol'
  },
  {
    id: 'jane-hair',
    articleId: 'guia-local-veiculos-estetica',
    name: 'Jane Cabeleireira',
    badge: 'Salão de Beleza',
    distance: 'Setor Oeste',
    description: 'Salão de beleza completo, cortes, escova e tratamentos capilares.',
    mapsUrl: 'https://maps.app.goo.gl/MHahoiRovc6vWLrc8',
    wazeUrl: 'https://waze.com/ul?q=Jane%20Cabeleireira'
  },
  {
    id: 'eliseu-hair',
    articleId: 'guia-local-veiculos-estetica',
    name: 'Eliseu Florêncio - Salão de Beleza',
    badge: 'Salão de Beleza',
    distance: 'Setor Oeste',
    description: 'Salão de beleza, maquiagem e cuidados pessoais.',
    mapsUrl: 'https://maps.app.goo.gl/8wjwjjFHa9bFMUpW7',
    wazeUrl: 'https://waze.com/ul?q=Eliseu%20Flor%C3%AAncio%20-%20Sal%C3%A3o%20de%20Beleza'
  },
  {
    id: 'barbearia-colombo',
    articleId: 'guia-local-veiculos-estetica',
    name: 'Barbearia Colombo',
    badge: 'Barbearia',
    distance: 'Setor Oeste',
    description: 'Barbearia tradicional com corte de cabelo masculino e barba na toalha quente.',
    mapsUrl: 'https://maps.app.goo.gl/DMG4LJqAhnrLf3u99',
    wazeUrl: 'https://waze.com/ul?q=Barbearia%20Colombo'
  }
];
