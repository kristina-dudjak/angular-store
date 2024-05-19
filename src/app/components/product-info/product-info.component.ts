import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProductsService } from '../../services/products/products.service';
import { DbService } from '../../services/db/db.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-product-info',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-info.component.html',
  styleUrl: './product-info.component.css',
})
export class ProductInfoComponent {
  router = inject(Router);
  dbService = inject(DbService);
  authService = inject(AuthService);
  productsService = inject(ProductsService);

  product = computed(() => this.productsService.currentProductSig());
  user = computed(() => this.authService.currentUserSig());

  deleteProduct() {
    if (this.user()!.isAdmin) {
      this.dbService.removeProduct(this.product()!.id).subscribe(() => {
        this.productsService.removeProduct(this.product()!.id);
        this.router.navigateByUrl('/products');
      });
    }
  }
}
