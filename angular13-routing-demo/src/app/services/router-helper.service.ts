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

  redirectWithCurrentQueryParams(targetPath: string) {
    const queryParams = this.route.snapshot.queryParams;
    console.log(`>>> redirectWithCurrentQueryParams(${targetPath}) queryParams:`, queryParams);
    this.router.navigate([targetPath], {
      queryParams
    });

  }
}
