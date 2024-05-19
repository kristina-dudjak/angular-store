import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  private route = inject(ActivatedRoute);
  productId!: string;

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.productId = params.get('productId')!;
    });
  }
}
