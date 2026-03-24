import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ActivatedRoute, Router} from "@angular/router";
import {RouterHelperService} from "./router-helper.service";

export const VALID_USERNAME = 'user';
export const VALID_PASSWORD = '12345';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authenticated = false;

  private readonly authStateSubject = new BehaviorSubject<boolean>(this.authenticated);
  public readonly isAuthenticated$: Observable<boolean> = this.authStateSubject.asObservable();
  private _lastErrorMessage = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private routerHelperService: RouterHelperService
  ) {}

  login(username: string, password: string): boolean {
    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
      this.authStateSubject.next(true);
      this.authenticated = true;
      this._lastErrorMessage = '';
      return true;
    }
    this._lastErrorMessage = `Invalid credentials. Try username: ${VALID_USERNAME}, password: ${VALID_PASSWORD}`;
    return false;
  }

  logout(): void {
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>> LOGOUT <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
    this.authStateSubject.next(false);
    this.authenticated = false;

    this.routerHelperService.redirectWithCurrentQueryParams('/login');
  }

  isAuthenticated(): boolean {
    return this.authenticated;
  }

  get lastErrorMessage(): string {
    return this._lastErrorMessage;
  }
}

