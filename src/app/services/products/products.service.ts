import { Injectable, signal } from '@angular/core';
import { Product } from '../../shared/models/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  productsSig = signal<Product[]>([]);
  currentProductSig = signal<Product | undefined>(undefined);

  addProduct(product: Product) {
    this.productsSig.update((products) => [...products, product]);
  }

  removeProduct(id: string) {
    this.productsSig.update((products) =>
      products.filter((product) => product.id !== id)
    );
  }

  updateProduct(product: Product) {
    this.productsSig.update((products) =>
      products.map((p) => (p.id === product.id ? product : p))
    );
  }
}
