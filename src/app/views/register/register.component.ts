import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PasswordRegex } from '../../shared/const/PasswordRegex';
import { AuthService } from '../../services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ValidationService } from '../../services/validation/validation.service';
import { DbService } from '../../services/db/db.service';
import { User } from '../../shared/models/User';
import { NewLinePipe } from '../../shared/pipes/new-line.pipe';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule, NewLinePipe],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  authService = inject(AuthService);
  dbService = inject(DbService);
  formBuilder = inject(FormBuilder);
  router = inject(Router);
  isSubmitted = false;
  registerForm = this.formBuilder.group(
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
    const rawForm = this.registerForm.getRawValue();
    if (this.registerForm.valid)
      this.authService
        .register(rawForm.email!, rawForm.password!)
        .subscribe(({ user }) => {
          const u: User = {
            uid: user.uid,
            email: rawForm.email!,
            isAdmin: false,
          };
          this.dbService.addUser(u.uid, u.email);
          this.authService.currentUserSig.set(u);
          this.router.navigateByUrl('/products');
        });
  }
}
