import { Component, OnInit, computed, inject } from '@angular/core';
import { DbService } from '../../services/db/db.service';
import { AuthService } from '../../services/auth/auth.service';
import { AdminListComponent } from '../../components/admin-list/admin-list.component';
import { RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ValidationService } from '../../services/validation/validation.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admins',
  standalone: true,
  imports: [RouterLink, AdminListComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './admins.component.html',
  styleUrl: './admins.component.css',
})
export class AdminsComponent implements OnInit {
  dbService = inject(DbService);
  authService = inject(AuthService);
  adminForm: FormGroup | undefined = undefined;
  formBuilder = inject(FormBuilder);
  isSubmitted = false;

  users = computed(() => this.authService.usersSig());

  ngOnInit(): void {
    this.adminForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
      },
      {
        validators: [ValidationService.validator('email')],
        updateOn: 'change',
      }
    );

    this.dbService.getUsers().subscribe((users) => {
      this.authService.usersSig.set(users);
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.adminForm?.valid) {
      const user = this.users().find(
        (user) => user.email === this.adminForm!.value.email
      );
      if (user) this.dbService.updateUser(user);
    }
  }
}
