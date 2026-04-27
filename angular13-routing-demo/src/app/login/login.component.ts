import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService, VALID_PASSWORD, VALID_USERNAME} from '../services/auth.service';
import {AUTH_TARGET_URL_PARAM} from '../guards/auth.guard';
import {ColorQueryParamComponent} from "../shared/color-query-param.component";
import {RouterHelperService} from "../services/router-helper.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends ColorQueryParamComponent implements OnInit {
  username: string = VALID_USERNAME;
  password: string = VALID_PASSWORD;
  errorMessage: string = '';
  isLoading: boolean = false;
  targetUrl: string = '';

  VALID_USERNAME = VALID_USERNAME;
  VALID_PASSWORD = VALID_PASSWORD;

  constructor(
    private authService: AuthService,
    private router: Router,
    public override readonly route: ActivatedRoute,
    public override routerHelperService: RouterHelperService,
  ) {
    super(route, routerHelperService);
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this.targetUrl = this.route.snapshot.queryParams[AUTH_TARGET_URL_PARAM] || '/home';
    console.log(`LoginComponent initialized with targetUrl: ${this.targetUrl}`);

    // If already authenticated, redirect to home
    if (this.authService.isAuthenticated()) {
      this.routerHelperService.redirectWithCurrentQueryParams(this.targetUrl);
    }
  }

  onLogin(): void {
    this.errorMessage = '';
    this.isLoading = true;

    // Simulate async login
    setTimeout(() => {
      const success = this.authService.login(this.username, this.password);

      if (success) {
        this.routerHelperService.redirectWithCurrentQueryParams(this.targetUrl, [AUTH_TARGET_URL_PARAM]);
      } else {
        this.errorMessage = this.authService.lastErrorMessage;
        this.isLoading = false;
      }
    }, 300);
  }
}
