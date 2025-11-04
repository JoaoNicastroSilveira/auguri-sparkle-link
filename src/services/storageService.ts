export class StorageService {
  static get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      if (!item) return null;
      return JSON.parse(item) as T;
    } catch (error) {
      console.error(`Storage get error for ${key}:`, error);
      return null;
    }
  }

  static set<T>(key: string, value: T): boolean {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Storage set error for ${key}:`, error);
      return false;
    }
  }

  static delete(key: string): boolean {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Storage delete error for ${key}:`, error);
      return false;
    }
  }

  static clear(): void {
    localStorage.clear();
  }
}
