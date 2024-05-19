import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DbService } from '../../services/db/db.service';
import { ProductsService } from '../../services/products/products.service';
import { ProductListComponent } from '../../components/product-list/product-list.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink, ProductListComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  dbService = inject(DbService);
  productsService = inject(ProductsService);

  ngOnInit(): void {
    this.dbService.getProducts().subscribe((products) => {
      this.productsService.productsSig.set(products);
    });
  }
}
