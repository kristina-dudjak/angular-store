import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { AdminItemComponent } from '../admin-item/admin-item.component';

@Component({
  selector: 'app-admin-list',
  standalone: true,
  imports: [CommonModule, AdminItemComponent],
  templateUrl: './admin-list.component.html',
  styleUrl: './admin-list.component.css',
})
export class AdminListComponent {
  authService = inject(AuthService);

  admins = computed(() => this.authService.usersSig());
}
