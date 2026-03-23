import { Injectable } from '@angular/core';
import { AppConfig } from './model';
import { BehaviorSubject, debounceTime, Observable, skip, Subject } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

export const DEFAULT_APP_CONFIG: AppConfig = {
  color: 123,
  description: 'This is a test application.'
};

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  appConfig$!: BehaviorSubject<AppConfig>;
  changeDebouncer$: Subject<AppConfig> = new Subject<AppConfig>();

  constructor(
    private localStorageService: LocalStorageService
  ) {
    this.init();
  }

  async init() {
    const cfg = this.localStorageService.getAppConfig() ?? DEFAULT_APP_CONFIG;
    this.appConfig$ = new BehaviorSubject<AppConfig>(cfg);

    // change handler -> persist changes
    this.appConfig$.pipe(
      skip(1),
    ).subscribe({
      next: cfg => {
        console.log('CHANGED: ', cfg);
        this.localStorageService.setAppConfig(cfg);
      }
    })

    // debounce changes
    this.changeDebouncer$.pipe(
      debounceTime(500)
    ).subscribe({
      next: cfg => {
        console.log('CHANGE TRIGGERED: ', cfg);
        this.appConfig$.next(cfg)
      }
    });
  }

  getAppConfig$(): Observable<AppConfig> {
    return this.appConfig$;
  }

  changeAppConfig(cfg: AppConfig) {
    this.changeDebouncer$.next(cfg);
  }
}
