import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

const MAX_PAGES = 20;
const PAGE_SIZE = 15;
const NETWORK_DELAY_MS = 500;

export interface DataPage {
  data: number[];
  hasMore: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DataFetchService {

  readonly MAX_PAGES = MAX_PAGES;
  readonly PAGE_SIZE = PAGE_SIZE;
  readonly NETWORK_DELAY_MS = NETWORK_DELAY_MS;

  constructor() { }

  fetchDataPage(page: number): Observable<DataPage> {
    const data = Array.from(
      { length: this.PAGE_SIZE },
      (_, i) => page * this.PAGE_SIZE + i
    );
    const hasMore = page < this.MAX_PAGES - 1;
    return of({ data, hasMore }).pipe(delay(this.NETWORK_DELAY_MS));
  }

  dumpFetchServiceParams(logPrefix?: string) {
    const pr = logPrefix ? logPrefix : '';
    console.log(pr + '********** DataFetchService **********');
    console.log(pr + `MAX_PAGES: ${this.MAX_PAGES}`);
    console.log(pr + `PAGE_SIZE: ${this.PAGE_SIZE}`);
    console.log(pr + `NETWORK_DELAY_MS: ${this.NETWORK_DELAY_MS}`);
    console.log(pr + '**************************************');
  }
}


