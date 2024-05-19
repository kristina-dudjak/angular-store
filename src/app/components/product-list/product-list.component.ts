import { Component, computed, inject } from '@angular/core';
import { ProductsService } from '../../services/products/products.service';
import { CommonModule } from '@angular/common';
import { ProductItemComponent } from '../product-item/product-item.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductItemComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  productsService = inject(ProductsService);

  products = computed(() => {
    const products = this.productsService.productsSig();
    return products;
  });
}
