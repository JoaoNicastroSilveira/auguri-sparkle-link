import ColorThief from 'colorthief';
import { Product } from '@/data/mockProducts';

export interface ImageAnalysis {
  dominantColor: [number, number, number];
  palette: Array<[number, number, number]>;
  hasGold: boolean;
  hasSilver: boolean;
  brightness: number;
  detectedType?: string;
}

export interface ProductMatch extends Product {
  matchScore: number;
}

export async function analyzeImage(imageFile: File): Promise<ImageAnalysis> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(imageFile);
    
    img.onload = () => {
      try {
        const colorThief = new ColorThief();
        const dominantColor = colorThief.getColor(img) as [number, number, number];
        const palette = colorThief.getPalette(img, 5) as Array<[number, number, number]>;
        
        const analysis: ImageAnalysis = {
          dominantColor,
          palette,
          hasGold: detectGoldTones(palette),
          hasSilver: detectSilverTones(palette),
          brightness: calculateBrightness(dominantColor),
          detectedType: detectJewelryType(img.width, img.height)
        };
        
        URL.revokeObjectURL(objectUrl);
        resolve(analysis);
      } catch (error) {
        URL.revokeObjectURL(objectUrl);
        reject(error);
      }
    };
    
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('Falha ao carregar imagem'));
    };
    
    img.crossOrigin = 'Anonymous';
    img.src = objectUrl;
  });
}

function detectGoldTones(palette: Array<[number, number, number]>): boolean {
  return palette.some(([r, g, b]) => {
    // Detecta tons dourados/amarelados
    const isGolden = r > 180 && g > 140 && b < 100;
    const isWarmYellow = r > 200 && g > 170 && b < 120 && r > g && g > b;
    return isGolden || isWarmYellow;
  });
}

function detectSilverTones(palette: Array<[number, number, number]>): boolean {
  return palette.some(([r, g, b]) => {
    // Detecta tons prateados/metálicos
    const isSilver = Math.abs(r - g) < 20 && 
                     Math.abs(g - b) < 20 && 
                     r > 150;
    return isSilver;
  });
}

function calculateBrightness([r, g, b]: [number, number, number]): number {
  // Fórmula de luminância perceptual
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}

function detectJewelryType(width: number, height: number): string {
  const ratio = width / height;
  
  // Heurísticas básicas baseadas no aspect ratio
  if (ratio > 1.5) return 'colares'; // Horizontal
  if (ratio < 0.7) return 'brincos'; // Vertical
  if (ratio > 0.8 && ratio < 1.2) return 'aneis'; // Quadrado
  if (ratio > 1.2 && ratio < 1.5) return 'pulseiras'; // Retângulo horizontal
  
  return '';
}

export function matchProducts(
  imageAnalysis: ImageAnalysis,
  allProducts: Product[]
): ProductMatch[] {
  return allProducts
    .map(product => {
      let score = 0;
      
      // Match por categoria detectada (peso: 40 pontos)
      if (imageAnalysis.detectedType && imageAnalysis.detectedType === product.categoria) {
        score += 40;
      }
      
      // Match por material (peso: 30 pontos)
      if (imageAnalysis.hasGold && product.material.includes('18k')) {
        score += 30;
      }
      
      if (imageAnalysis.hasSilver && product.material.toLowerCase().includes('prata')) {
        score += 30;
      }
      
      // Match por cor dominante (peso: 20 pontos)
      if (product.dominantColor) {
        const colorMatch = calculateColorSimilarity(
          imageAnalysis.dominantColor,
          product.dominantColor
        );
        score += colorMatch * 0.2;
      }
      
      // Boost para produtos em estoque (peso: 10 pontos)
      if (product.estoque > 0) {
        score += 10;
      }
      
      return {
        ...product,
        matchScore: Math.round(score)
      };
    })
    .filter(p => p.matchScore > 30) // Threshold mínimo
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 12); // Top 12 resultados
}

function calculateColorSimilarity(
  color1: [number, number, number],
  color2: [number, number, number]
): number {
  // Distância Euclidiana no espaço RGB (0-100)
  const distance = Math.sqrt(
    Math.pow(color1[0] - color2[0], 2) +
    Math.pow(color1[1] - color2[1], 2) +
    Math.pow(color1[2] - color2[2], 2)
  );
  
  const maxDistance = Math.sqrt(3 * Math.pow(255, 2));
  return (1 - distance / maxDistance) * 100;
}
