import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {LocationStrategy} from "@angular/common";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  bgColor: string = 'white';

  constructor(
    private route: ActivatedRoute,
    private _locationStrategy: LocationStrategy
  ) {
  }

  ngOnInit(): void {
    this.dumpPathInfo();

    const extractedParams: { [key: string]: any } = {};
    this._extractAndDecodeQueryParamsForAllStrategies(this.route, extractedParams);
    console.log(']]]]] extractedParams:', extractedParams);

    if (extractedParams['color']) {
      this.bgColor = extractedParams['color'];
    }
  }

  public _extractAndDecodeQueryParamsForAllStrategies(
    route: ActivatedRoute,
    queryParams: { [key: string]: any }
  ): void {

    // 1. Extract global query params (before #)
    const url = new URL(window.location.href);
    console.log(']]] usr:', url);
    const searchParams = new URLSearchParams(url.search);

    searchParams.forEach((value, key) => {
      queryParams[key] = decodeURIComponent(value);
    });

    // 2. Extract Angular query params (after #)
    const angularParams = route.snapshot.queryParams;

    Object.keys(angularParams).forEach(key => {
      const value = angularParams[key];

      // Angular already decodes, but normalize anyway
      queryParams[key] =
        typeof value === 'string'
          ? decodeURIComponent(value)
          : value;
    });
  }

  protected _extractAndDecodeQueryParams(queryParams: { [key: string]: any }) {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);

    params.forEach((value, key) => {
      queryParams[key] = decodeURIComponent(value);
    });
  }

  extractForHash() {
    this.dumpPathInfo();

    let extractedParams = {...this.route.snapshot.queryParams} as { [key: string]: any };
    this._extractAndDecodeQueryParams(extractedParams);

    console.log('=====> extractedParams:', extractedParams);
  }

  extractForAllStrtegies() {
    this.dumpPathInfo();

    const extractedParams: { [key: string]: any } = {};
    this._extractAndDecodeQueryParamsForAllStrategies(this.route, extractedParams);

    console.log('=====> extractedParams:', extractedParams);
  }

  dumpPathInfo() {
    console.log('============================================================================');
    console.log('>>>>>>>>>>>>>>>>>>>> URL:', window.location.href);
    console.log('>>>>>>>>>>>>>>>>>>>> PATH search:', window.location.search);
    console.log('>>>>>>>>>>>>>>>>>>>> ROUTE queryParams:', this.route.snapshot.queryParams);
    console.log('============================================================================');
  }

  get locationStrategy() {
    return this._locationStrategy.constructor.name;
  }
}
