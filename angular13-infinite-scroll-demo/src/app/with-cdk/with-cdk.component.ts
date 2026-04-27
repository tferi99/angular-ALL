import {Component, OnInit, ViewChild} from '@angular/core';
import {CdkVirtualScrollViewport} from "@angular/cdk/scrolling";
import {DataFetchService} from "../services/data-fetch.service";

@Component({
  selector: 'app-with-cdk',
  templateUrl: './with-cdk.component.html',
  styleUrls: ['./with-cdk.component.scss']
})
export class WithCdkComponent implements OnInit {
  data: number[] = [];
  lastPageIdx = 0;
  loading = false;
  hasMore = true;
  @ViewChild(CdkVirtualScrollViewport) viewport?: CdkVirtualScrollViewport;

  constructor(private dataFetchService: DataFetchService) {}

  ngOnInit(): void {
    this.loadNextPage();
  }

  loadNextPage() {
    if (this.loading || !this.hasMore) return;

    this.loading = true;

    this.dataFetchService.fetchDataPage(this.lastPageIdx).subscribe({
      next: (page) => {
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

  onScroll(_: number) {
    const preloadThreshold = 5;
    if (!this.viewport) {
      return;
    }

    const renderedEnd = this.viewport.getRenderedRange().end;
    const remaining = this.data.length - renderedEnd;

    if (remaining <= preloadThreshold) {
      this.loadNextPage();
    }
  }

  trackByValue(_: number, item: number): number {
    return item;
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
}
