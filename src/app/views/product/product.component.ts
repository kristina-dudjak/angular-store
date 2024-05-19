import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { DbService } from '../../services/db/db.service';
import { ProductsService } from '../../services/products/products.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  dbService = inject(DbService);
  productService = inject(ProductsService);
  private route = inject(ActivatedRoute);
  productId!: string;

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.productId = params.get('productId')!;
      this.dbService.getProduct(this.productId).then((product) => {
        this.productService.currentProductSig.set(product);
      });
    });
  }
}
