import { Injectable, signal } from '@angular/core';
import { Product } from '../../shared/models/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  productsSig = signal<Product[]>([]);

  addProduct(id: string, name: string, price: number, description: string) {
    const newProd: Product = {
      id,
      name,
      price,
      description,
    };
    this.productsSig.update((products) => [...products, newProd]);
  }

  removeProduct(id: string) {
    this.productsSig.update((products) =>
      products.filter((product) => product.id !== id)
    );
  }
}
