import {Component, OnInit} from '@angular/core';
import {ColorQueryParamComponent} from "../shared/color-query-param.component";
import {ActivatedRoute} from "@angular/router";
import {RouterHelperService} from "../services/router-helper.service";

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent extends ColorQueryParamComponent implements OnInit {

  constructor(
    public override readonly route: ActivatedRoute,
    public override routerHelperService: RouterHelperService,
  ) {
    super(route, routerHelperService);
  }
}
