import { CommonModule, UpperCasePipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    UpperCasePipe,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  authService = inject(AuthService);
  router = inject(Router);
  user = computed(() => this.authService.currentUserSig());

  signOut() {
    this.authService
      .signOut()
      .subscribe(() => this.router.navigateByUrl('/login'));
  }
}
