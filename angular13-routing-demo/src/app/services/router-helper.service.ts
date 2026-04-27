import {Injectable} from '@angular/core';
import {LocationStrategy} from "@angular/common";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class RouterHelperService {

  constructor(
    private readonly _locationStrategy: LocationStrategy,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  get locationStrategy(): string {
    return this._locationStrategy.constructor.name;
  }

  extractQueryParams(): Params {
    this.dumpPathInfo();

    const params = this.route.snapshot.queryParams;
    console.log('=====> extractedParams:', params);

    return params;
  }

  dumpPathInfo(): void {
    console.log('============================================================================');
    console.log('>>>>>>>>>>>>>>>>>>>> URL:', window.location.href);
    console.log('>>>>>>>>>>>>>>>>>>>> PATH search:', window.location.search);
    console.log('>>>>>>>>>>>>>>>>>>>> ROUTE queryParams:', this.route.snapshot.queryParams);
    console.log('============================================================================');
  }

  /**
   * Redirects to the given path, preserving the current query parameters.
   * You can remove specific query parameters by passing them in the `removeQueryParams`.
   *
   * @param targetPath
   * @param removeQueryParams
   */
  redirectWithCurrentQueryParams(targetPath: string, removeQueryParams?: string[]) {
    let queryParams = this.route.snapshot.queryParams;

    // removing the specified query parameters
    if (removeQueryParams) {
      // Clone snapshot params so we never mutate Angular's internal route state object.
      queryParams = { ...this.route.snapshot.queryParams };
      removeQueryParams.forEach(param => delete queryParams[param]);
    }

    console.log(`>>> redirectWithCurrentQueryParams(${targetPath}) queryParams:`, queryParams);
    this.router.navigate([targetPath], {
      queryParams
    });

  }
}
