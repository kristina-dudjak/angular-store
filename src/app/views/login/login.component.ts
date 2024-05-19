import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { PasswordRegex } from '../../shared/const/PasswordRegex';
import { AuthService } from '../../services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { ValidationService } from '../../services/validation/validation.service';
import { CommonModule } from '@angular/common';
import { DbService } from '../../services/db/db.service';
import { NewLinePipe } from '../../shared/pipes/new-line.pipe';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule, NewLinePipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  authService = inject(AuthService);
  formBuilder = inject(FormBuilder);
  dbService = inject(DbService);
  router = inject(Router);
  isSubmitted = false;
  loginForm = this.formBuilder.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(PasswordRegex),
        ],
      ],
    },
    {
      validators: [
        ValidationService.validator('email'),
        ValidationService.validator('password'),
      ],
      updateOn: 'change',
    }
  );

  onSubmit() {
    this.isSubmitted = true;
    const rawForm = this.loginForm.getRawValue();
    if (this.loginForm.valid)
      this.authService
        .login(rawForm.email!, rawForm.password!)
        .subscribe(({ user }) => {
          this.dbService.getUser(user.uid).then((user) => {
            this.authService.currentUserSig.set(user);
            this.router.navigateByUrl('/products');
          });
        });
  }
}
