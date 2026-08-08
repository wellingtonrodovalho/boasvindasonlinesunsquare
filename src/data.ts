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
  articleId: 'guia-local-gastronomia' | 'guia-local-servicos' | 'guia-local-veiculos-estetica' | 'guia-local-parques-cultura';
  name: string;
  description?: string;
  mapsUrl: string;
  wazeUrl: string;
  orderUrl?: string;
}

export const guideArticles: GuideArticle[] = [
  {
    id: 'bem-vindo',
    tab: 'inicio',
    category: 'Boas-Vindas',
    title: 'Bem-vindo ao Sun Square!',
    excerpt: 'Dicas iniciais para uma chegada tranquila e confortável.',
    content: 'É um prazer receber você no nosso flat! Preparamos este espaço com muito carinho para que você tenha uma estadia excelente e produtiva em Goiânia.\n\n• PROPRIEDADE PARTICULAR: Este flat é uma unidade de propriedade particular privada. Não há serviço de limpeza diária ou troca periódica de roupas de cama e banho inclusos, sendo estes de uso restrito aos hóspedes geridos pelo hotel.\n• CONTROLE DE ACESSO: Para a segurança de todos, apenas pessoas devidamente registradas e cadastradas possuem autorização para acessar o flat.\n• SAUNAS SECA E A VAPOR: Estão disponíveis no condomínio mediante autorização prévia obtida diretamente na recepção.\n• MANUAL DIGITAL: Consulte este guia rápido sempre que precisar de informações sobre o flat, regras do condomínio ou recomendações locais.',
    icon: 'Sun',
    tags: ['bem-vindo', 'boas-vindas', 'inicio', 'propriedade particular', 'limpeza', 'acesso', 'registrado', 'sauna']
  },
  {
    id: 'wi-fi-flat',
    tab: 'nosso-flat',
    category: 'Conectividade',
    title: 'Wi-Fi de Alta Velocidade',
    excerpt: 'Acesse a rede de internet de fibra óptica ultra rápida do apartamento.',
    content: 'O flat conta com internet banda larga de alta velocidade (fibra óptica), ideal para home office, chamadas de vídeo e streaming.\n\n• Rede: 1308a\n• Senha: lualap1308a',
    icon: 'Wifi',
    tags: ['wi-fi', 'wifi', 'internet', 'senha', 'rede', 'fibra']
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
  {
    id: 'guia-local-gastronomia',
    tab: 'guia-local',
    category: 'Gastronomia',
    title: 'Alimentação e Cafés',
    excerpt: 'Excelentes opções de bares, churrascarias e lanches rápidos nos arredores.',
    content: 'Descubra a gastronomia do Setor Oeste a poucos minutos do flat.',
    icon: 'Smile',
    tags: ['comer', 'restaurante', 'bar', 'churrascaria', 'almoço', 'jantar']
  },
  {
    id: 'guia-local-servicos',
    tab: 'guia-local',
    category: 'Serviços',
    title: 'Conveniência, Saúde e Bancos',
    excerpt: 'Padarias, farmácias, lavanderias e agências bancárias bem próximas.',
    content: 'Serviços essenciais que você encontra com facilidade nos arredores do edifício.',
    icon: 'Briefcase',
    tags: ['serviços', 'banco', 'farmácia', 'hospital', 'lavanderia', 'padaria']
  },
  {
    id: 'guia-local-veiculos-estetica',
    tab: 'guia-local',
    category: 'Saúde e Estética',
    title: 'Veículos, Recarga e Estética',
    excerpt: 'Estações de recarga para carros elétricos, barbearias e salões de beleza.',
    content: 'Facilidades para o seu automóvel e cuidados de estética pessoal nos arredores.',
    icon: 'Car',
    tags: ['recarga', 'elétrico', 'cabeleireiro', 'barbeiro', 'estética', 'academia']
  },
  {
    id: 'guia-local-parques-cultura',
    tab: 'guia-local',
    category: 'Lazer e Cultura',
    title: 'Lazer, Parques e Cultura',
    excerpt: 'Lindas praças, feiras famosas e museus para explorar a passos do apartamento.',
    content: 'Aproveite a rica vida cultural e natural do Setor Oeste:\n\n• Feira do Sol: Tradicional feira de Goiânia que acontece aos domingos na arborizada Praça do Sol, com artesanato, moda e comidas típicas a passos do seu flat.\n• Bosque dos Buritis: Lindo e extenso parque urbano arborizado, perfeito para caminhadas e contato com a natureza.\n• Parque Zoológico de Goiânia: Passeio agradável e clássico na cidade para toda a família.\n• Museu Pedro Ludovico: Museu histórico que preserva a memória da fundação de Goiânia, situado na histórica Praça Dr. Pedro Ludovico Teixeira.\n• Nota Institucional: O TJGO - Tribunal de Justiça do Estado de Goiás também fica situado nas imediações desta mesma região central.',
    icon: 'Wifi',
    tags: ['parque', 'lazer', 'cultura', 'feira', 'feira do sol', 'bosque', 'zoológico', 'museu']
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
    answer: 'Sim, o condomínio conta com saunas seca e a vapor excelentes localizadas na área comum. No entanto, para a segurança e manutenção do espaço, a utilização das saunas é permitida somente mediante autorização prévia obtida diretamente na recepção.'
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
  // --- Gastronomia e Bares ---
  {
    id: 'walmor',
    articleId: 'guia-local-gastronomia',
    name: 'Churrascaria do Walmor',
    description: 'Churrascaria animada com rodízio que também oferece saladas e sobremesas.',
    mapsUrl: 'https://maps.app.goo.gl/dXHQESCtDcbjXt8MA',
    wazeUrl: 'https://waze.com/ul?q=Churrascaria%20do%20Walmor'
  },
  {
    id: 'celsin',
    articleId: 'guia-local-gastronomia',
    name: 'Celsin Bar e Restaurante',
    description: 'Este restaurante/bar casual que tem um terraço com lugares para sentar oferece a culinária típica da região.',
    mapsUrl: 'https://maps.app.goo.gl/eeoxtZtkbwKtei1z9',
    wazeUrl: 'https://waze.com/ul?q=Celsin%20Bar%20e%20Restaurante'
  },
  {
    id: 'don-will',
    articleId: 'guia-local-gastronomia',
    name: "Don 'Will Garden",
    description: 'Bistrô e restaurante requintado localizado convenientemente nas dependências do Sun Square.',
    mapsUrl: 'https://maps.app.goo.gl/e31ZxRDVHb5MXADM9',
    wazeUrl: "https://waze.com/ul?q=Don%20'Will%20Garden"
  },
  {
    id: 'yakiniku',
    articleId: 'guia-local-gastronomia',
    name: 'S.A Yakiniku Goiânia',
    description: 'Restaurante japonês',
    mapsUrl: 'https://maps.app.goo.gl/nQGSBqkqYzNT467A8',
    wazeUrl: 'https://waze.com/ul?q=S.A%20Yakiniku%20Goi%C3%A2nia'
  },
  {
    id: 'acai-grau',
    articleId: 'guia-local-gastronomia',
    name: 'Açaí no Grau Goiânia',
    mapsUrl: 'https://maps.app.goo.gl/VGb9uCvKCVmQWNac9',
    wazeUrl: 'https://waze.com/ul?q=A%C3%A7a%C3%AD%20no%20Grau%20Goi%C3%A2nia',
    orderUrl: 'https://www.ifood.com.br/?utm_medium=share'
  },
  {
    id: 'habibs',
    articleId: 'guia-local-gastronomia',
    name: "Habib's Setor Oeste",
    description: 'Rede de fast-food árabe, popular pelas esfihas, tem um ambiente simples e informal também para grandes grupos.',
    mapsUrl: 'https://maps.app.goo.gl/kseK5gLhzLBykDoZA',
    wazeUrl: "https://waze.com/ul?q=Habib's%20Setor%20Oeste",
    orderUrl: 'https://www.habibs.com.br/?app=1'
  },
  {
    id: 'neropolis',
    articleId: 'guia-local-gastronomia',
    name: 'Doces Nerópolis - Loja Goiânia',
    description: 'Doceria',
    mapsUrl: 'https://maps.app.goo.gl/aZKznwSwZ1E8SCSU7',
    wazeUrl: 'https://waze.com/ul?q=Doces%20Ner%C3%B3polis%20-%20Loja%20Goi%C3%A2nia'
  },

  // --- Conveniência, Saúde e Serviços ---
  {
    id: 'pao-cia',
    articleId: 'guia-local-servicos',
    name: 'Padaria Pão & Companhia Setor Oeste',
    mapsUrl: 'https://maps.app.goo.gl/GFCF8JAcM3RZ18Xj6',
    wazeUrl: 'https://waze.com/ul?q=Padaria%20P%C3%A3o%20%26%20Companhia%20Setor%20Oeste'
  },
  {
    id: 'fran-makes',
    articleId: 'guia-local-servicos',
    name: 'Fran Makes l Maquiagens e Perfumes Importados em Goiânia',
    description: 'Loja de cosmético',
    mapsUrl: 'https://maps.app.goo.gl/LNgbuLDUeaG7sHuP7',
    wazeUrl: 'https://waze.com/ul?q=Fran%20Makes%20l%20Maquiagens%20e%20Perfumes%20Importados%20em%20Goi%C3%A2nia'
  },
  {
    id: 'drogasil',
    articleId: 'guia-local-servicos',
    name: 'Drogasil',
    mapsUrl: 'https://maps.app.goo.gl/2mEGXTXNpCiiVCyv5',
    wazeUrl: 'https://waze.com/ul?q=Drogasil'
  },
  {
    id: 'nissei',
    articleId: 'guia-local-servicos',
    name: 'Farmácias Nissei',
    mapsUrl: 'https://maps.app.goo.gl/pyufJihZBmBbTKoRA',
    wazeUrl: 'https://waze.com/ul?q=Farm%C3%A1cias%20Nissei'
  },
  {
    id: 'hospital-coracao',
    articleId: 'guia-local-servicos',
    name: 'Hospital do Coração de Goiás',
    mapsUrl: 'https://maps.app.goo.gl/vf8RgZEV7zeVk6hMA',
    wazeUrl: 'https://waze.com/ul?q=Hospital%20do%20Cora%C3%A7%C3%A3o%20de%20Goi%C3%A1s'
  },
  {
    id: 'caixa',
    articleId: 'guia-local-servicos',
    name: 'Caixa Econômica Federal',
    mapsUrl: 'https://maps.app.goo.gl/8kwtu9kZYdjR1Kj49',
    wazeUrl: 'https://waze.com/ul?q=Caixa%20Econ%C3%B4mica%20Federal'
  },
  {
    id: 'bradesco',
    articleId: 'guia-local-servicos',
    name: 'Bradesco',
    mapsUrl: 'https://maps.app.goo.gl/CLEPuM62154h2bDJ8',
    wazeUrl: 'https://waze.com/ul?q=Bradesco'
  },
  {
    id: 'lavanella',
    articleId: 'guia-local-servicos',
    name: 'Lavanella Lavanderia',
    mapsUrl: 'https://maps.app.goo.gl/HLXuB5VbY3ubsi1q7',
    wazeUrl: 'https://waze.com/ul?q=Lavanella%20Lavanderia'
  },

  // --- Veículos, Recarga e Estética ---
  {
    id: 'recarga-tupi',
    articleId: 'guia-local-veiculos-estetica',
    name: 'Estação de recarga da Tupi',
    description: 'Posto de abastecimento de veículos elétricos',
    mapsUrl: 'https://maps.app.goo.gl/Xvmek8WGcJqqP2sy6',
    wazeUrl: 'https://waze.com/ul?q=Est%C3%A3o%20de%20recarga%20da%20Tupi'
  },
  {
    id: 'recarga-tamandare',
    articleId: 'guia-local-veiculos-estetica',
    name: 'Estação de recarga - Praça Tamandaré',
    description: 'Posto de abastecimento de veículos elétricos',
    mapsUrl: 'https://maps.app.goo.gl/eCLqytpqGtcqDCCd8',
    wazeUrl: 'https://waze.com/ul?q=Est%C3%A3o%20de%20recarga%20-%20Pra%C3%A7a%20Tamandar%C3%A9'
  },
  {
    id: 'bluefit',
    articleId: 'guia-local-veiculos-estetica',
    name: 'Academia BlueFit Praça do Sol',
    mapsUrl: 'https://maps.app.goo.gl/7ymv2C5ukRrqttSn6',
    wazeUrl: 'https://waze.com/ul?q=Academia%20BlueFit%20Pra%C3%A7a%20do%20Sol'
  },
  {
    id: 'jane-hair',
    articleId: 'guia-local-veiculos-estetica',
    name: 'Jane Cabeleireira',
    description: 'Salão de Beleza',
    mapsUrl: 'https://maps.app.goo.gl/MHahoiRovc6vWLrc8',
    wazeUrl: 'https://waze.com/ul?q=Jane%20Cabeleireira'
  },
  {
    id: 'eliseu-hair',
    articleId: 'guia-local-veiculos-estetica',
    name: 'Eliseu Florêncio - Salão de Beleza',
    description: 'Salão de Beleza',
    mapsUrl: 'https://maps.app.goo.gl/8wjwjjFHa9bFMUpW7',
    wazeUrl: 'https://waze.com/ul?q=Eliseu%20Flor%C3%AAncio%20-%20Sal%C3%A3o%20de%20Beleza'
  },
  {
    id: 'barbearia-colombo',
    articleId: 'guia-local-veiculos-estetica',
    name: 'Barbearia Colombo',
    mapsUrl: 'https://maps.app.goo.gl/DMG4LJqAhnrLf3u99',
    wazeUrl: 'https://waze.com/ul?q=Barbearia%20Colombo'
  },

  // --- Lazer, Parques e Cultura ---
  {
    id: 'feira-sol',
    articleId: 'guia-local-parques-cultura',
    name: 'Feira do Sol',
    mapsUrl: 'https://maps.app.goo.gl/7x6AeoGhnoFDbx6K8',
    wazeUrl: 'https://waze.com/ul?q=Feira%20do%20Sol'
  },
  {
    id: 'bosque-buritis',
    articleId: 'guia-local-parques-cultura',
    name: 'Bosque dos Buritis',
    description: 'Parque',
    mapsUrl: 'https://maps.app.goo.gl/jFp75hQMEsstTup8A',
    wazeUrl: 'https://waze.com/ul?q=Bosque%20dos%20Buritis'
  },
  {
    id: 'zoo',
    articleId: 'guia-local-parques-cultura',
    name: 'Parque Zoológico de Goiânia',
    mapsUrl: 'https://maps.app.goo.gl/NB5JqodnmTdv3gs1A',
    wazeUrl: 'https://waze.com/ul?q=Parque%20Zool%C3%B3gico%20de%20Goi%C3%A2nia'
  },
  {
    id: 'museu-pedro',
    articleId: 'guia-local-parques-cultura',
    name: 'Museu Pedro Ludovico',
    description: 'Museu histórico',
    mapsUrl: 'https://maps.app.goo.gl/AaFTp4RbPcwWdtb36',
    wazeUrl: 'https://waze.com/ul?q=Museu%20Pedro%20Ludovico'
  },
  {
    id: 'tjgo',
    articleId: 'guia-local-parques-cultura',
    name: 'TJGO - Tribunal de Justiça do Estado de Goiás',
    mapsUrl: 'https://maps.app.goo.gl/HBdz7BRNXpiCZC5f9',
    wazeUrl: 'https://waze.com/ul?q=TJGO%20-%20Tribunal%20de%20Justi%C3%A7a%20do%20Estado%20de%20Goi%C3%A1s'
  },
  {
    id: 'praca-pedro',
    articleId: 'guia-local-parques-cultura',
    name: 'Praça Dr. Pedro Ludovico Teixeira',
    mapsUrl: 'https://maps.app.goo.gl/DdHo1HkysM9zi2Mu9',
    wazeUrl: 'https://waze.com/ul?q=Pra%C3%A7a%20Dr.%20Pedro%20Ludovico%20Teixeira'
  }
];
