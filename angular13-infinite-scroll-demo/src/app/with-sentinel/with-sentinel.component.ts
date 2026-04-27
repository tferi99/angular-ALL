import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataFetchService, DataPage } from '../services/data-fetch.service';

const SENTINEL_BOTTOM_MARGIN_PX = 100;
const SENTINEL_ROOT_MARGIN = `0px 0px ${SENTINEL_BOTTOM_MARGIN_PX}px 0px`;

const LOG_PREFIX = '[with-sentinel] ';

@Component({
  selector: 'ntw-with-sentinel',
  templateUrl: './with-sentinel.component.html',
  styleUrls: ['./with-sentinel.component.scss']
})
export class WithSentinelComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('scrollContainer') private scrollContainerRef?: ElementRef<HTMLElement>;
  @ViewChild('sentinel') private sentinelRef?: ElementRef<HTMLElement>;

  data: number[] = [];
  lastPageIdx = 0;
  loading = false;
  hasMore = true;

  private sentinelVisible = false;
  private sentinelObserver?: IntersectionObserver;

  constructor(private readonly dataFetchService: DataFetchService) { }

  ngOnInit(): void {
    // dump settings
    this.dataFetchService.dumpFetchServiceParams(LOG_PREFIX);
    console.log(LOG_PREFIX + 'Sentinel load margin: ' + SENTINEL_ROOT_MARGIN,);

    this.loadNextPage('initial load');
  }

  ngAfterViewInit(): void {
    this.createSentinelObserver();
  }

  ngOnDestroy(): void {
    this.sentinelObserver?.disconnect();
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

  private createSentinelObserver(): void {
    const container = this.scrollContainerRef?.nativeElement;
    const sentinel = this.sentinelRef?.nativeElement;

    if (!container || !sentinel || typeof IntersectionObserver === 'undefined') {
      return;
    }

    this.sentinelObserver?.disconnect();
    this.sentinelObserver = new IntersectionObserver(
      () => {
        this.sentinelVisible = this.isSentinelCurrentlyVisible();
        console.log(LOG_PREFIX + 'IntersectionObserver ---> sentinelVisible: ' + this.sentinelVisible.toString());
        this.tryLoadNextPage('IntersectionObserver');
      },
      {
        root: container,
        threshold: 0,
        rootMargin: SENTINEL_ROOT_MARGIN
      }
    );

    this.sentinelObserver.observe(sentinel);
  }

  private tryLoadNextPage(calledFrom: string): void {
    this.sentinelVisible = this.isSentinelCurrentlyVisible();

    console.log(LOG_PREFIX + 'try next page from: ' + calledFrom, {
      pageToFetch: this.lastPageIdx,
      fetchedItems: this.data.length,
      sentinelVisible: this.sentinelVisible,
      loading: this.loading,
      hasMore: this.hasMore
    });

    if (!this.sentinelVisible || this.loading || !this.hasMore) {
      console.log(LOG_PREFIX + 'try next page fetch - STOPPED: ' + calledFrom, {
        sentinelVisible: this.sentinelVisible,
        loading: this.loading,
        hasMore: this.hasMore
      });
      return;
    }

    this.loadNextPage(calledFrom);
  }

  private isSentinelCurrentlyVisible(): boolean {
    const container = this.scrollContainerRef?.nativeElement;
    const sentinel = this.sentinelRef?.nativeElement;

    if (!container || !sentinel) {
      return this.sentinelVisible;
    }

    const rootRect = container.getBoundingClientRect();
    const sentinelRect = sentinel.getBoundingClientRect();
    const effectiveRootTop = rootRect.top;
    const effectiveRootBottom = rootRect.bottom + SENTINEL_BOTTOM_MARGIN_PX;

    return sentinelRect.bottom > effectiveRootTop && sentinelRect.top < effectiveRootBottom;
  }

  private loadNextPage(calledFrom: string): void {
    if (this.loading || !this.hasMore) {
      return;
    }

    const pageToFetch = this.lastPageIdx;
    console.log(LOG_PREFIX + `========== loadNextPage(${calledFrom}) START ==========`, { page: pageToFetch });

    this.loading = true;

    this.dataFetchService.fetchDataPage(pageToFetch).subscribe({
      next: (page: DataPage) => {
        console.log(LOG_PREFIX + `loadNextPage(${calledFrom}) - page fetched: `, {
          page: pageToFetch,
          receivedItems: page.data.length,
          hasMoreAfterPage: page.hasMore
        });

        this.data = [...this.data, ...page.data];
        this.hasMore = page.hasMore;
        this.lastPageIdx++;
      },
      error: (error: unknown) => {
        console.error(LOG_PREFIX + `loadNextPage(${calledFrom}) - page fetch error`, { page: pageToFetch, error });
        this.loading = false;
      },
      complete: () => {
        console.log(LOG_PREFIX + `---------- loadNextPage(${calledFrom}) END ----------`, {
          page: pageToFetch,
          totalItems: this.data.length,
          hasMore: this.hasMore
        });
        this.loading = false;

        // Defer to next frame
        // so layout updates and isSentinelCurrentlyVisible() reads fresh geometry
        requestAnimationFrame(() => {
          this.tryLoadNextPage('loadNextPage completed -> try again');
        });
      }
    });
  }

  dumpIsSentinelCurrentlyVisible(): void {
    const container = this.scrollContainerRef?.nativeElement;
    const sentinel = this.sentinelRef?.nativeElement;
    console.log(LOG_PREFIX + 'Sentinel is currently visible: ' + (sentinel && container ? this.isSentinelCurrentlyVisible().toString() : 'N/A'));
  }
}
