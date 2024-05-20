import { Component, Input, inject } from '@angular/core';
import { User } from '../../shared/models/User';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-item',
  standalone: true,
  imports: [],
  templateUrl: './admin-item.component.html',
  styleUrl: './admin-item.component.css',
})
export class AdminItemComponent {
  @Input({ required: true }) admin!: User;
  router = inject(Router);
  route = inject(ActivatedRoute);

  redirect() {}
}
