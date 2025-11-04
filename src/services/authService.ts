import { StorageService } from './storageService';
import { STORAGE_KEYS } from '@/constants/storage-keys';
import { Lojista } from '@/types/Lojista';

const LOJISTAS_KEY = 'lojistas';

export class AuthService {
  static getCurrentUser(): Lojista | null {
    return StorageService.get<Lojista>(STORAGE_KEYS.CURRENT_USER);
  }

  static setCurrentUser(user: Lojista): boolean {
    return StorageService.set(STORAGE_KEYS.CURRENT_USER, user);
  }

  static clearCurrentUser(): boolean {
    return StorageService.delete(STORAGE_KEYS.CURRENT_USER);
  }

  static getAllLojistas(): Lojista[] {
    return StorageService.get<Lojista[]>(LOJISTAS_KEY) || [];
  }

  static saveLojista(lojista: Lojista): boolean {
    const lojistas = this.getAllLojistas();
    const index = lojistas.findIndex(l => l.id === lojista.id);
    
    if (index >= 0) {
      lojistas[index] = lojista;
    } else {
      lojistas.push(lojista);
    }
    
    return StorageService.set(LOJISTAS_KEY, lojistas);
  }

  static login(email: string, senha: string): Lojista | null {
    const lojistas = this.getAllLojistas();
    const lojista = lojistas.find(l => l.email === email && l.senha === senha);
    
    if (lojista) {
      this.setCurrentUser(lojista);
      return lojista;
    }
    
    return null;
  }

  static register(data: Omit<Lojista, 'id' | 'createdAt' | 'aprovado'>): Lojista {
    const newUser: Lojista = {
      ...data,
      id: crypto.randomUUID(),
      aprovado: false,
      createdAt: new Date().toISOString()
    };

    this.saveLojista(newUser);
    this.setCurrentUser(newUser);
    
    return newUser;
  }

  static logout(): void {
    this.clearCurrentUser();
  }

  static initTestUser(): Lojista {
    const testUser: Lojista = {
      id: 'test-user-001',
      email: 'teste@auguri.com',
      senha: '123456',
      nomeLoja: 'Joalheria Bella Vista',
      cnpj: '12.345.678/0001-90',
      telefone: '(11) 98765-4321',
      aprovado: true,
      createdAt: new Date().toISOString()
    };

    const existing = this.getAllLojistas().find(l => l.email === testUser.email);
    if (!existing) {
      this.saveLojista(testUser);
    }

    return testUser;
  }
}
