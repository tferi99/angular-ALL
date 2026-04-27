import { Component, OnInit } from '@angular/core';
import {DataFetchService, DataPage} from "../services/data-fetch.service";

@Component({
  selector: 'ntw-with-ngx',
  templateUrl: './with-ngx.component.html',
  styleUrls: ['./with-ngx.component.scss']
})
export class WithNgxComponent implements OnInit {
  data: number[] = [];
  lastPageIdx = 0;
  loading = false;
  hasMore = true;
  throttle = 300;
  scrollDistance = 2;

  constructor(private readonly dataFetchService: DataFetchService) { }

  ngOnInit(): void {
    this.loadNextPage();
  }

  loadNextPage(): void {
    if (this.loading || !this.hasMore) {
      return;
    }

    this.loading = true;

    this.dataFetchService.fetchDataPage(this.lastPageIdx).subscribe({
      next: (page: DataPage) => {
        this.data = [...this.data, ...page.data];
        this.hasMore = page.hasMore;
        this.lastPageIdx++;
      },
      error: () => {
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  onScroll(): void {
    this.loadNextPage();
  }

  get statusMessage(): string {
    if (this.loading) {
      return 'Loading more...';
    }

    if (!this.hasMore) {
      return 'No more data';
    }

    return 'More data available';
  }

  trackByValue(_: number, item: number): number {
    return item;
  }
}
