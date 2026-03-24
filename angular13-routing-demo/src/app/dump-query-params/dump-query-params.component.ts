import {Component, OnInit} from '@angular/core';
import {RouterHelperService} from "../services/router-helper.service";

@Component({
  selector: 'app-dump-query-params',
  templateUrl: './dump-query-params.component.html',
  styleUrls: ['./dump-query-params.component.scss']
})
export class DumpQueryParamsComponent implements OnInit {

  constructor(public routerHelperService: RouterHelperService) { }

  ngOnInit(): void {
  }

}
