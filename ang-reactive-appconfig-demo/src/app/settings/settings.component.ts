import { Component, OnInit } from '@angular/core';
import { AppConfigService } from '../shared/app-config.service';
import { Observable } from 'rxjs';
import { AppConfig } from '../shared/model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(private appConfigService: AppConfigService) {}

  ngOnInit(): void {
  }

  getAppConfig(): Observable<AppConfig> {
    return this.appConfigService.getAppConfig$();
  }

  changeColor(newColor: number, origCfg: AppConfig) {
    // you should keep original config immutable, otherwise debouncer is bypassed
    this.appConfigService.changeAppConfig({
      ...origCfg,
      color: newColor
    });
  }

  changeDescription(newDesc: string, origCfg: AppConfig) {
    this.appConfigService.changeAppConfig({
      ...origCfg,
      description: newDesc
    });
  }
}
