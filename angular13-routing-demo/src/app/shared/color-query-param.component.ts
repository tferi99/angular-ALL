import {Directive, HostBinding, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {RouterHelperService} from "../services/router-helper.service";

export const COLOR_QUERY_PARAM = 'color';

@Directive()
export abstract class ColorQueryParamComponent implements OnInit, OnDestroy {
  @HostBinding('style.background-color') bgColorFromParam = 'white';
  @HostBinding('style.display') readonly hostDisplay = 'block';
  protected readonly defaultColor = 'white';
  private readonly destroy$ = new Subject<void>();

  protected constructor(
    public readonly route: ActivatedRoute,
    public routerHelperService: RouterHelperService,
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap
      .pipe(takeUntil(this.destroy$))
      .subscribe((paramMap) => {
        this.bgColorFromParam = this.resolveColor(paramMap);
        console.log('############### color resolved:', this.bgColorFromParam, '###############');
      });

    this.routerHelperService.dumpPathInfo();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected resolveColor(paramMap: ParamMap): string {
    const mergedParams = this.getMergedQueryParams(paramMap);
    const color = mergedParams[COLOR_QUERY_PARAM];

    return color?.trim() || this.defaultColor;
  }

  protected getMergedQueryParams(paramMap: ParamMap = this.route.snapshot.queryParamMap): Record<string, string | undefined> {
    const queryParams: Record<string, string | undefined> = {};

    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.forEach((value, key) => {
        queryParams[key] = value;
      });
    }

    paramMap.keys.forEach((key) => {
      const value = paramMap.get(key);
      if (value !== null) {
        queryParams[key] = value;
      }
    });

    return queryParams;
  }
}

