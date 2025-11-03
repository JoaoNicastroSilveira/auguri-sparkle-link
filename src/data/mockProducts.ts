export interface Product {
  id: string;
  nome: string;
  referencia: string;
  categoria: 'gargantilhas' | 'aneis' | 'brincos' | 'pulseiras' | 'piercings' | 'colares' | 'pingentes';
  descricao: string;
  material: string;
  peso: number;
  dimensoes?: string;
  acabamento: string;
  imagens: string[];
  estoque: number;
  temAR: boolean;
  created_at: string;
  // Visual Search fields
  dominantColor?: [number, number, number];
  colorPalette?: Array<[number, number, number]>;
  tags?: string[];
  metalTone?: 'gold' | 'silver' | 'rose-gold';
  style?: 'classico' | 'moderno' | 'vintage' | 'delicado';
}

export const mockProducts: Product[] = [
  // GARGANTILHAS - 6 items
  {
    id: 'prod_001',
    nome: 'Gargantilha Veneziana',
    referencia: 'GAR-VEN-001',
    categoria: 'gargantilhas',
    descricao: 'Gargantilha veneziana em ouro 18k com acabamento polido. Design clássico e elegante, perfeita para uso diário.',
    material: 'Ouro 18k/750',
    peso: 3.5,
    dimensoes: '45cm',
    acabamento: 'Polido',
    imagens: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=800&fit=crop'],
    estoque: 15,
    temAR: true,
    created_at: '2025-01-15',
    dominantColor: [212, 175, 55],
    colorPalette: [[212, 175, 55], [240, 230, 140], [184, 134, 11]],
    tags: ['delicada', 'classica', 'elegante', 'fina'],
    metalTone: 'gold',
    style: 'classico'
  },
  {
    id: 'prod_002',
    nome: 'Gargantilha Cartier',
    referencia: 'GAR-CAR-002',
    categoria: 'gargantilhas',
    descricao: 'Gargantilha modelo cartier em ouro 18k. Elegância e sofisticação em uma peça atemporal.',
    material: 'Ouro 18k/750',
    peso: 4.2,
    dimensoes: '42cm',
    acabamento: 'Polido',
    imagens: ['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&h=800&fit=crop'],
    estoque: 8,
    temAR: true,
    created_at: '2025-01-14'
  },
  {
    id: 'prod_003',
    nome: 'Gargantilha Cingapura',
    referencia: 'GAR-CIN-003',
    categoria: 'gargantilhas',
    descricao: 'Gargantilha cingapura diamantada em ouro 18k. Brilho intenso e design moderno.',
    material: 'Ouro 18k/750',
    peso: 3.8,
    dimensoes: '45cm',
    acabamento: 'Diamantado',
    imagens: ['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=800&fit=crop'],
    estoque: 2,
    temAR: true,
    created_at: '2025-01-13'
  },
  {
    id: 'prod_004',
    nome: 'Gargantilha Grumet',
    referencia: 'GAR-GRU-004',
    categoria: 'gargantilhas',
    descricao: 'Gargantilha grumet em ouro 18k. Modelo clássico e resistente.',
    material: 'Ouro 18k/750',
    peso: 5.0,
    dimensoes: '45cm',
    acabamento: 'Polido',
    imagens: ['https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=800&h=800&fit=crop'],
    estoque: 12,
    temAR: true,
    created_at: '2025-01-12'
  },
  {
    id: 'prod_005',
    nome: 'Gargantilha Piastrini',
    referencia: 'GAR-PIA-005',
    categoria: 'gargantilhas',
    descricao: 'Gargantilha piastrini em ouro 18k com acabamento liso. Elegante e versátil.',
    material: 'Ouro 18k/750',
    peso: 4.5,
    dimensoes: '42cm',
    acabamento: 'Liso',
    imagens: ['https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=800&h=800&fit=crop'],
    estoque: 0,
    temAR: true,
    created_at: '2025-01-11'
  },
  {
    id: 'prod_006',
    nome: 'Gargantilha Elo Português',
    referencia: 'GAR-ELO-006',
    categoria: 'gargantilhas',
    descricao: 'Gargantilha elo português em ouro 18k. Design diferenciado e sofisticado.',
    material: 'Ouro 18k/750',
    peso: 6.2,
    dimensoes: '45cm',
    acabamento: 'Polido',
    imagens: ['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop'],
    estoque: 18,
    temAR: true,
    created_at: '2025-01-10'
  },

  // ANÉIS - 6 items
  {
    id: 'prod_007',
    nome: 'Anel Solitário',
    referencia: 'ANE-SOL-007',
    categoria: 'aneis',
    descricao: 'Anel solitário em ouro 18k com zircônia de 5mm. Clássico e elegante.',
    material: 'Ouro 18k/750',
    peso: 2.8,
    dimensoes: 'Diversos tamanhos',
    acabamento: 'Polido',
    imagens: ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=800&fit=crop'],
    estoque: 20,
    temAR: true,
    created_at: '2025-01-09'
  },
  {
    id: 'prod_008',
    nome: 'Anel Meia Aliança',
    referencia: 'ANE-MEI-008',
    categoria: 'aneis',
    descricao: 'Anel meia aliança em ouro 18k com zircônias cravadas. Sofisticação garantida.',
    material: 'Ouro 18k/750',
    peso: 3.2,
    dimensoes: 'Diversos tamanhos',
    acabamento: 'Polido',
    imagens: ['https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&h=800&fit=crop'],
    estoque: 7,
    temAR: true,
    created_at: '2025-01-08'
  },
  {
    id: 'prod_009',
    nome: 'Anel Formatura',
    referencia: 'ANE-FOR-009',
    categoria: 'aneis',
    descricao: 'Anel de formatura personalizado em ouro 18k. Acabamento impecável.',
    material: 'Ouro 18k/750',
    peso: 15.0,
    dimensoes: 'Sob medida',
    acabamento: 'Polido',
    imagens: ['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&h=800&fit=crop'],
    estoque: 0,
    temAR: true,
    created_at: '2025-01-07'
  },
  {
    id: 'prod_010',
    nome: 'Anel Aparador',
    referencia: 'ANE-APA-010',
    categoria: 'aneis',
    descricao: 'Anel aparador em ouro 18k com design delicado. Perfeito para combinar.',
    material: 'Ouro 18k/750',
    peso: 1.8,
    dimensoes: 'Diversos tamanhos',
    acabamento: 'Polido',
    imagens: ['https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=800&h=800&fit=crop'],
    estoque: 25,
    temAR: true,
    created_at: '2025-01-06'
  },
  {
    id: 'prod_011',
    nome: 'Anel Aro Largo',
    referencia: 'ANE-ARO-011',
    categoria: 'aneis',
    descricao: 'Anel de aro largo em ouro 18k. Design moderno e marcante.',
    material: 'Ouro 18k/750',
    peso: 4.5,
    dimensoes: 'Diversos tamanhos',
    acabamento: 'Fosco',
    imagens: ['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=800&fit=crop'],
    estoque: 10,
    temAR: true,
    created_at: '2025-01-05'
  },
  {
    id: 'prod_012',
    nome: 'Anel Trilogia',
    referencia: 'ANE-TRI-012',
    categoria: 'aneis',
    descricao: 'Anel trilogia em ouro 18k com três zircônias. Simboliza passado, presente e futuro.',
    material: 'Ouro 18k/750',
    peso: 3.5,
    dimensoes: 'Diversos tamanhos',
    acabamento: 'Polido',
    imagens: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=800&fit=crop'],
    estoque: 1,
    temAR: true,
    created_at: '2025-01-04'
  },

  // BRINCOS - 6 items
  {
    id: 'prod_013',
    nome: 'Brinco Argola Média',
    referencia: 'BRI-ARG-013',
    categoria: 'brincos',
    descricao: 'Brinco argola média em ouro 18k. Clássico e versátil para o dia a dia.',
    material: 'Ouro 18k/750',
    peso: 2.0,
    dimensoes: '2.5cm diâmetro',
    acabamento: 'Polido',
    imagens: ['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=800&fit=crop'],
    estoque: 30,
    temAR: true,
    created_at: '2025-01-03',
    dominantColor: [212, 175, 55],
    colorPalette: [[212, 175, 55], [255, 215, 0], [218, 165, 32]],
    tags: ['argola', 'classica', 'versatil', 'diaria'],
    metalTone: 'gold',
    style: 'classico'
  },
  {
    id: 'prod_014',
    nome: 'Brinco Ponto de Luz',
    referencia: 'BRI-PON-014',
    categoria: 'brincos',
    descricao: 'Brinco ponto de luz em ouro 18k com zircônia de 4mm. Elegância discreta.',
    material: 'Ouro 18k/750',
    peso: 0.8,
    dimensoes: '4mm',
    acabamento: 'Polido',
    imagens: ['https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=800&h=800&fit=crop'],
    estoque: 45,
    temAR: true,
    created_at: '2025-01-02'
  },
  {
    id: 'prod_015',
    nome: 'Brinco Gota',
    referencia: 'BRI-GOT-015',
    categoria: 'brincos',
    descricao: 'Brinco em formato de gota em ouro 18k. Design delicado e sofisticado.',
    material: 'Ouro 18k/750',
    peso: 2.5,
    dimensoes: '3cm comprimento',
    acabamento: 'Polido',
    imagens: ['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop'],
    estoque: 6,
    temAR: true,
    created_at: '2025-01-01'
  },
  {
    id: 'prod_016',
    nome: 'Brinco Ear Cuff',
    referencia: 'BRI-EAR-016',
    categoria: 'brincos',
    descricao: 'Brinco ear cuff em ouro 18k. Tendência moderna e estilosa.',
    material: 'Ouro 18k/750',
    peso: 1.2,
    dimensoes: 'Ajustável',
    acabamento: 'Polido',
    imagens: ['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&h=800&fit=crop'],
    estoque: 0,
    temAR: true,
    created_at: '2024-12-30'
  },
  {
    id: 'prod_017',
    nome: 'Brinco Borboleta',
    referencia: 'BRI-BOR-017',
    categoria: 'brincos',
    descricao: 'Brinco em formato de borboleta em ouro 18k com zircônias. Design lúdico e elegante.',
    material: 'Ouro 18k/750',
    peso: 1.8,
    dimensoes: '1.5cm',
    acabamento: 'Polido',
    imagens: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=800&fit=crop'],
    estoque: 14,
    temAR: true,
    created_at: '2024-12-29'
  },
  {
    id: 'prod_018',
    nome: 'Brinco Argola Grande',
    referencia: 'BRI-ARG-018',
    categoria: 'brincos',
    descricao: 'Brinco argola grande em ouro 18k. Statement piece para ocasiões especiais.',
    material: 'Ouro 18k/750',
    peso: 3.5,
    dimensoes: '5cm diâmetro',
    acabamento: 'Polido',
    imagens: ['https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=800&h=800&fit=crop'],
    estoque: 8,
    temAR: true,
    created_at: '2024-12-28'
  },

  // PULSEIRAS - 4 items
  {
    id: 'prod_019',
    nome: 'Pulseira Cartier',
    referencia: 'PUL-CAR-019',
    categoria: 'pulseiras',
    descricao: 'Pulseira modelo cartier em ouro 18k. Clássica e atemporal.',
    material: 'Ouro 18k/750',
    peso: 8.5,
    dimensoes: '19cm',
    acabamento: 'Polido',
    imagens: ['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&h=800&fit=crop'],
    estoque: 5,
    temAR: true,
    created_at: '2024-12-27'
  },
  {
    id: 'prod_020',
    nome: 'Pulseira Elos',
    referencia: 'PUL-ELO-020',
    categoria: 'pulseiras',
    descricao: 'Pulseira de elos em ouro 18k. Design robusto e elegante.',
    material: 'Ouro 18k/750',
    peso: 12.0,
    dimensoes: '20cm',
    acabamento: 'Polido',
    imagens: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=800&fit=crop'],
    estoque: 3,
    temAR: true,
    created_at: '2024-12-26'
  },
  {
    id: 'prod_021',
    nome: 'Pulseira Berloque',
    referencia: 'PUL-BER-021',
    categoria: 'pulseiras',
    descricao: 'Pulseira para berloques em ouro 18k. Personalize com seus pingentes favoritos.',
    material: 'Ouro 18k/750',
    peso: 6.5,
    dimensoes: '18cm',
    acabamento: 'Polido',
    imagens: ['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=800&fit=crop'],
    estoque: 11,
    temAR: true,
    created_at: '2024-12-25'
  },
  {
    id: 'prod_022',
    nome: 'Pulseira Tenis',
    referencia: 'PUL-TEN-022',
    categoria: 'pulseiras',
    descricao: 'Pulseira tipo tênis em ouro 18k com zircônias. Luxo e brilho garantidos.',
    material: 'Ouro 18k/750',
    peso: 7.8,
    dimensoes: '18cm',
    acabamento: 'Polido',
    imagens: ['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop'],
    estoque: 0,
    temAR: true,
    created_at: '2024-12-24'
  },

  // PIERCINGS - 2 items
  {
    id: 'prod_023',
    nome: 'Piercing Argola Pequena',
    referencia: 'PIE-ARG-023',
    categoria: 'piercings',
    descricao: 'Piercing argola pequena em ouro 18k. Delicado e versátil.',
    material: 'Ouro 18k/750',
    peso: 0.3,
    dimensoes: '8mm',
    acabamento: 'Polido',
    imagens: ['https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=800&h=800&fit=crop'],
    estoque: 50,
    temAR: true,
    created_at: '2024-12-23'
  },
  {
    id: 'prod_024',
    nome: 'Piercing Cartilagem',
    referencia: 'PIE-CAR-024',
    categoria: 'piercings',
    descricao: 'Piercing para cartilagem em ouro 18k com zircônia. Moderno e elegante.',
    material: 'Ouro 18k/750',
    peso: 0.5,
    dimensoes: '6mm',
    acabamento: 'Polido',
    imagens: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=800&fit=crop'],
    estoque: 22,
    temAR: true,
    created_at: '2024-12-22'
  },

  // COLARES - 2 items
  {
    id: 'prod_025',
    nome: 'Colar Veneziano',
    referencia: 'COL-VEN-025',
    categoria: 'colares',
    descricao: 'Colar veneziano em ouro 18k. Versátil para uso com pingentes.',
    material: 'Ouro 18k/750',
    peso: 5.0,
    dimensoes: '60cm',
    acabamento: 'Polido',
    imagens: ['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&h=800&fit=crop'],
    estoque: 9,
    temAR: true,
    created_at: '2024-12-21'
  },
  {
    id: 'prod_026',
    nome: 'Colar Cartier',
    referencia: 'COL-CAR-026',
    categoria: 'colares',
    descricao: 'Colar cartier em ouro 18k. Design clássico e sofisticado.',
    material: 'Ouro 18k/750',
    peso: 6.5,
    dimensoes: '50cm',
    acabamento: 'Polido',
    imagens: ['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=800&fit=crop'],
    estoque: 1,
    temAR: true,
    created_at: '2024-12-20'
  },

  // PINGENTES - 4 items
  {
    id: 'prod_027',
    nome: 'Pingente Coração',
    referencia: 'PIN-COR-027',
    categoria: 'pingentes',
    descricao: 'Pingente em formato de coração em ouro 18k. Símbolo de amor e carinho.',
    material: 'Ouro 18k/750',
    peso: 2.2,
    dimensoes: '2cm',
    acabamento: 'Polido',
    imagens: ['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop'],
    estoque: 16,
    temAR: false,
    created_at: '2024-12-19'
  },
  {
    id: 'prod_028',
    nome: 'Pingente Cruz',
    referencia: 'PIN-CRU-028',
    categoria: 'pingentes',
    descricao: 'Pingente de cruz em ouro 18k. Fé e proteção em uma joia delicada.',
    material: 'Ouro 18k/750',
    peso: 1.5,
    dimensoes: '2.5cm',
    acabamento: 'Polido',
    imagens: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=800&fit=crop'],
    estoque: 28,
    temAR: false,
    created_at: '2024-12-18'
  },
  {
    id: 'prod_029',
    nome: 'Pingente Letra',
    referencia: 'PIN-LET-029',
    categoria: 'pingentes',
    descricao: 'Pingente de letra personalizada em ouro 18k. Adicione iniciais especiais.',
    material: 'Ouro 18k/750',
    peso: 1.8,
    dimensoes: '1.5cm',
    acabamento: 'Polido',
    imagens: ['https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=800&h=800&fit=crop'],
    estoque: 40,
    temAR: false,
    created_at: '2024-12-17'
  },
  {
    id: 'prod_030',
    nome: 'Pingente Infinito',
    referencia: 'PIN-INF-030',
    categoria: 'pingentes',
    descricao: 'Pingente símbolo do infinito em ouro 18k com zircônias. Representa amor eterno.',
    material: 'Ouro 18k/750',
    peso: 2.0,
    dimensoes: '2cm',
    acabamento: 'Polido',
    imagens: ['https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=800&h=800&fit=crop'],
    estoque: 0,
    temAR: false,
    created_at: '2024-12-16'
  }
];

export const categorias = [
  { id: 'todos', nome: 'Todos', icon: '✨' },
  { id: 'gargantilhas', nome: 'Gargantilhas', icon: '📿' },
  { id: 'aneis', nome: 'Anéis', icon: '💍' },
  { id: 'brincos', nome: 'Brincos', icon: '👂' },
  { id: 'pulseiras', nome: 'Pulseiras', icon: '⌚' },
  { id: 'piercings', nome: 'Piercings', icon: '💎' },
  { id: 'colares', nome: 'Colares', icon: '🔗' },
  { id: 'pingentes', nome: 'Pingentes', icon: '🏷️' },
];
