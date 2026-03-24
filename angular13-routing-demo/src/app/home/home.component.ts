import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ColorQueryParamComponent} from '../shared/color-query-param.component';
import {RouterHelperService} from "../services/router-helper.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends ColorQueryParamComponent {

  constructor(
    public override readonly route: ActivatedRoute,
    public override routerHelperService: RouterHelperService,
  ) {
    super(route, routerHelperService);
  }
}
