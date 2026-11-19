import heroImg from '../assets/images/hero_pet_boutique_1795091798638.jpg';
import racaoImg from '../assets/images/product_racao_natural_1795091799044.jpg';
import brinquedoImg from '../assets/images/product_brinquedo_corda_1795091798261.jpg';
import camaImg from '../assets/images/product_cama_conforto_1795091799204.jpg';
import shampooImg from '../assets/images/product_shampoo_botanico_1795091798623.jpg';
import banhoImg from '../assets/images/gallery_banho_tosa_1795091799332.jpg';

export type PastelTone = 'green' | 'rose' | 'blue' | 'yellow' | 'lavender' | 'coral';

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
  detail: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  category: string;
  duration: string;
  price: string;
  description: string;
  highlights: string[];
  tone: PastelTone;
  iconName: 'bath' | 'scissors' | 'sparkles' | 'heart' | 'car' | 'salad';
}

export type ProductCategory = 'Todos' | 'Alimentação' | 'Brinquedos' | 'Conforto' | 'Higiene';

export interface ProductItem {
  id: string;
  name: string;
  category: Exclude<ProductCategory, 'Todos'>;
  price: number;
  spec: string;
  description: string;
  image: string;
  imageAlt: string;
  tone: PastelTone;
}

export interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  petTag: string;
  image: string;
  imageAlt: string;
  spanClass: string;
}

export interface TestimonialItem {
  id: string;
  tutorName: string;
  neighborhood: string;
  petInfo: string;
  outcome: string;
  quote: string;
  tone: PastelTone;
}

export const CONTACT_INFO = {
  businessName: 'Jr Pet',
  address: 'SEU ENDEREÇO AQUI',
  phoneDisplay: '(00) 00000-0000',
  phoneDigits: '5500000000000',
  hours: 'Não informado',
};

export const HERO_IMAGE = {
  src: heroImg,
  alt: 'Golden retriever feliz e recém-tosado sentado em frente ao balcão de madeira do Jr Pet rodeado por plantas naturais',
};

export const HERO_STATS: StatItem[] = [
  {
    value: 3400,
    suffix: '+',
    label: 'Banhos e tosas feitos',
    detail: 'Atendimento sem pressa e sem gaiolas de secagem',
  },
  {
    value: 98,
    suffix: '%',
    label: 'Tutores satisfeitos',
    detail: 'Avaliação média de 4,9 estrelas em cuidado diário',
  },
  {
    value: 120,
    suffix: '+',
    label: 'Itens selecionados',
    detail: 'Rações naturais, brinquedos e acessórios testados',
  },
  {
    value: 100,
    suffix: '%',
    label: 'Fórmulas hipoalergênicas',
    detail: 'Água morna filtrada e cosmética botânica suave',
  },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'banho-botanico',
    number: '01',
    title: 'Banho Botânico & Hidratação',
    category: 'Cães e Gatos',
    duration: '60 a 90 min',
    price: 'A partir de R$ 85',
    description:
      'Banho relaxante com água filtrada na temperatura ideal, xampu de camomila e aveia e secagem silenciosa para zero estresse.',
    highlights: ['Limpeza de ouvidos', 'Corte de unhas', 'Hidratação profunda'],
    tone: 'green',
    iconName: 'bath',
  },
  {
    id: 'tosa-artistica',
    number: '02',
    title: 'Tosa Higiênica & da Raça',
    category: 'Tesoura e Máquina',
    duration: '90 a 120 min',
    price: 'A partir de R$ 110',
    description:
      'Acabamento manual na tesoura que respeita o caimento natural da pelagem, mantendo conforto térmico e proteção da pele.',
    highlights: ['Desembolo gentil', 'Padronização na tesoura', 'Perfume botânico leve'],
    tone: 'rose',
    iconName: 'scissors',
  },
  {
    id: 'spa-filhotes',
    number: '03',
    title: 'Spa Calmante Filhotes & Sênior',
    category: 'Acolhimento Especial',
    duration: '75 min',
    price: 'A partir de R$ 95',
    description:
      'Sessão individualizada com pausas para descanso, tapete antiderrapante e aromaterapia segura para cães idosos ou primeira experiência.',
    highlights: ['Atendimento individual', 'Massagem relaxante', 'Zero ruído excessivo'],
    tone: 'lavender',
    iconName: 'sparkles',
  },
  {
    id: 'creche-socializacao',
    number: '04',
    title: 'Creche & Socialização Guiada',
    category: 'Meio Período ou Integral',
    duration: '4h a 8h',
    price: 'Diária R$ 120',
    description:
      'Atividades de enriquecimento ambiental, brincadeiras monitoradas por porte e relatórios com fotos durante o dia.',
    highlights: ['Grupos por temperamento', 'Enriquecimento olfativo', 'Envio de fotos'],
    tone: 'yellow',
    iconName: 'heart',
  },
  {
    id: 'taxi-pet',
    number: '05',
    title: 'Táxi Pet Porta a Porta',
    category: 'Transporte Climatizado',
    duration: 'Horário agendado',
    price: 'Sob consulta',
    description:
      'Busca e entrega no conforto da sua casa com caixas higienizadas, cinto de segurança certificado e acompanhamento em tempo real.',
    highlights: ['Ar-condicionado suave', 'Higienização entre rotas', 'Aviso na chegada'],
    tone: 'blue',
    iconName: 'car',
  },
  {
    id: 'consultoria-nutricional',
    number: '06',
    title: 'Curadoria Nutricional Pet',
    category: 'Alimentação Natural & Seca',
    duration: '45 min',
    price: 'Incluso na loja',
    description:
      'Orientação prática para escolher a ração ou dieta natural certa de acordo com idade, digestão, pelagem e rotina do seu pet.',
    highlights: ['Leitura de rótulos', 'Plano de transição', 'Amostras selecionadas'],
    tone: 'coral',
    iconName: 'salad',
  },
];

export const PRODUCTS: ProductItem[] = [
  {
    id: 'racao-natural-cerrado',
    name: 'Ração Natural Grãos Nobres & Frango',
    category: 'Alimentação',
    price: 168.9,
    spec: 'Pacote 3 kg · Sem corantes',
    description:
      'Receita equilibrada com proteína de alta digestibilidade, abóbora, linhaça e prebióticos naturais para energia e pelagem brilhante.',
    image: racaoImg,
    imageAlt: 'Embalagem artesanal verde e kraft de ração natural ao lado de comedouro cerâmico com grãos integrais',
    tone: 'green',
  },
  {
    id: 'corda-organica-dupla',
    name: 'Corda Trançada Algodão Orgânico',
    category: 'Brinquedos',
    price: 64.0,
    spec: 'Tamanho M/G · Tinta atóxica',
    description:
      'Fibras macias trançadas à mão que ajudam na limpeza mecânica dos dentes durante as brincadeiras de cabo de guerra.',
    image: brinquedoImg,
    imageAlt: 'Brinquedo de corda trançada em algodão orgânico nos tons verde sálvia, creme e vermelho sobre pedra clara',
    tone: 'rose',
  },
  {
    id: 'cama-linho-ortopedica',
    name: 'Cama Nuvem em Linho Ortopédico',
    category: 'Conforto',
    price: 289.0,
    spec: '70 cm · Capa lavável com zíper',
    description:
      'Bordas acolchoadas para apoio da cabeça e espuma de densidade equilibrada que protege as articulações em sonecas longas.',
    image: camaImg,
    imageAlt: 'Cão dormindo confortavelmente em cama redonda de linho verde sálvia e creme dentro de sala iluminada',
    tone: 'yellow',
  },
  {
    id: 'shampoo-camomila-suave',
    name: 'Xampu Botânico Camomila & Aveia',
    category: 'Higiene',
    price: 78.5,
    spec: 'Frasco âmbar 250 ml · pH neutro',
    description:
      'Fórmula suave desenvolvida para peles sensíveis, limpa sem ressecar e deixa um aroma fresco de ervas naturais.',
    image: shampooImg,
    imageAlt: 'Frasco âmbar com válvula pump de xampu botânico pet cercado por flores de camomila e toalha de algodão',
    tone: 'lavender',
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-spa',
    title: 'Secagem silenciosa e escovação',
    subtitle: 'Ritual de spa sem pressa e com temperatura controlada',
    petTag: 'Pipoca · Bichon Frisé',
    image: banhoImg,
    imageAlt: 'Profissional secando e escovando com carinho um cão branco em mesa de madeira iluminada por luz natural',
    spanClass: 'md:col-span-7 md:row-span-2',
  },
  {
    id: 'gal-recepcao',
    title: 'Recepção aberta e sem estresse',
    subtitle: 'Ambiente amplo com plantas e ventilação natural',
    petTag: 'Bento · Golden Retriever',
    image: heroImg,
    imageAlt: 'Golden retriever sorridente sentado na recepção acolhedora do pet shop com plantas verdes',
    spanClass: 'md:col-span-5',
  },
  {
    id: 'gal-soneca',
    title: 'Cantinho do descanso na creche',
    subtitle: 'Pausas confortáveis após as atividades de socialização',
    petTag: 'Cacau · Cavalier King Charles',
    image: camaImg,
    imageAlt: 'Cachorro descansando em cama macia de linho verde sálvia sob luz natural',
    spanClass: 'md:col-span-5',
  },
  {
    id: 'gal-botanica',
    title: 'Cosmética botânica selecionada',
    subtitle: 'Ingredientes suaves escolhidos para peles sensíveis',
    petTag: 'Linha Banho & Cuidado',
    image: shampooImg,
    imageAlt: 'Frasco de xampu botânico com flores frescas de camomila sobre pedra travertino',
    spanClass: 'md:col-span-4',
  },
  {
    id: 'gal-nutricao',
    title: 'Nutrição limpa todos os dias',
    subtitle: 'Grãos selecionados e petiscos sem conservantes artificiais',
    petTag: 'Curadoria Nutricional',
    image: racaoImg,
    imageAlt: 'Pacote de ração natural e tigela de cerâmica com alimentos equilibrados',
    spanClass: 'md:col-span-4',
  },
  {
    id: 'gal-enriquecimento',
    title: 'Brinquedos seguros e duráveis',
    subtitle: 'Texturas naturais para morder, puxar e gastar energia',
    petTag: 'Enriquecimento Ambiental',
    image: brinquedoImg,
    imageAlt: 'Brinquedo de corda trançada em algodão orgânico disposto em base clara',
    spanClass: 'md:col-span-4',
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'dep-1',
    tutorName: 'Mariana Vasconcelos',
    neighborhood: 'Tutora do Thor',
    petInfo: 'Golden Retriever · 4 anos',
    outcome: 'De banho agitado para passeio favorito da semana',
    quote:
      'O Thor sempre tremia na porta de outros lugares. Aqui ele entra abanando o rabo direto para a equipe e volta cheiroso, com o pelo leve e sem nós.',
    tone: 'green',
  },
  {
    id: 'dep-2',
    tutorName: 'Rafael Nogueira',
    neighborhood: 'Tutor da Mel e do Chico',
    petInfo: 'Poodle & SRD · 2 e 7 anos',
    outcome: 'Pele sensível recuperada em três semanas',
    quote:
      'Troquei a ração e o xampu seguindo a indicação da curadoria da loja. As coceiras diminuíram já nas primeiras semanas e hoje compramos tudo aqui.',
    tone: 'rose',
  },
  {
    id: 'dep-3',
    tutorName: 'Camila Andrade',
    neighborhood: 'Tutora da Lua',
    petInfo: 'Shih-tzu · 6 anos',
    outcome: 'Tosa na tesoura impecável e entrega pontual',
    quote:
      'Uso o Táxi Pet nos dias corridos e recebo fotos da Lua durante o atendimento. O corte na tesoura fica natural e dura muito mais.',
    tone: 'lavender',
  },
];
