import { Component } from '@angular/core';
import { AppConfigService } from './shared/app-config.service';
import { Observable } from 'rxjs';
import { AppConfig } from './shared/model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ang-obs-test';

  constructor(private appConfigService: AppConfigService) {}

  getAppConfig(): Observable<AppConfig> {
    return this.appConfigService.getAppConfig$();
  }
}
