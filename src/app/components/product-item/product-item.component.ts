import { Component, Input, inject } from '@angular/core';
import { Product } from '../../shared/models/Product';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css',
})
export class ProductItemComponent {
  @Input({ required: true }) product!: Product;
  router = inject(Router);
  route = inject(ActivatedRoute);

  redirect() {
    this.router.navigate([this.product.id], { relativeTo: this.route });
  }
}
