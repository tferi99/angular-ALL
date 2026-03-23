import { Injectable } from '@angular/core';
import { AppConfig } from './model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  public static LOC_STORE_KEY_APP_CONFIG = 'appConfig';

  constructor() {}

  // ------------------------------- JWT auth token ------------------------------------
  setAppConfig(cfg: AppConfig): void {
    this.setValue(LocalStorageService.LOC_STORE_KEY_APP_CONFIG, JSON.stringify(cfg));
  }

  getAppConfig(): AppConfig | undefined {
    const cfgStr = this.getValue(LocalStorageService.LOC_STORE_KEY_APP_CONFIG);
    return cfgStr ? JSON.parse(cfgStr) : undefined;
  }

  // ------------------------------- helpers ------------------------------------
  private getValue(key: string): string | undefined {
    const val = localStorage.getItem(key);
    return val ? val : undefined;
  }

  private setValue(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  private delete(key: string): void {
    localStorage.removeItem(key);
  }
}


