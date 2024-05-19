import { Component, OnInit, computed, effect, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidationService } from '../../services/validation/validation.service';
import { FirstUpperPipe } from '../../shared/pipes/first-upper.pipe';
import { DbService } from '../../services/db/db.service';
import { ProductsService } from '../../services/products/products.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule, FirstUpperPipe, CommonModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
})
export class ProductFormComponent implements OnInit {
  formBuilder = inject(FormBuilder);
  router = inject(Router);
  isSubmitted = false;
  dbService = inject(DbService);
  productService = inject(ProductsService);
  productForm: FormGroup | undefined = undefined;

  product = computed(() => this.productService.currentProductSig());

  constructor() {
    effect(() => {
      if (this.product() && !this.router.url.includes('new')) {
        this.productForm!.setValue({
          name: this.product()!.name,
          price: this.product()!.price,
          description: this.product()!.description,
        });
      }
    });
  }

  ngOnInit() {
    this.productForm = this.formBuilder.group(
      {
        name: ['', [Validators.required, Validators.maxLength(32)]],
        price: [
          1,
          [
            Validators.required,
            Validators.min(1),
            Validators.pattern('^[0-9]+([.,][0-9]{1,2})?$|[^0-9]+'),
          ],
        ],
        description: ['', [Validators.required, Validators.maxLength(160)]],
      },
      {
        validators: [
          ValidationService.validator('name'),
          ValidationService.validator('price'),
          ValidationService.validator('description'),
        ],
        updateOn: 'change',
      }
    );
  }

  onSubmit() {
    this.isSubmitted = true;
    const rawForm = this.productForm!.getRawValue();
    if (this.productForm!.valid) {
      if (this.product()) {
        this.dbService
          .updateProduct({ id: this.product()!.id, ...rawForm })
          .subscribe(() => {
            this.productService.updateProduct(this.product()!);
            this.router.navigateByUrl('products');
          });
      } else {
        this.dbService
          .addProduct(rawForm.name!, rawForm.price!, rawForm.description!)
          .subscribe((id) => {
            this.productService.addProduct({ id, ...rawForm });
            this.router.navigateByUrl('products');
          });
      }
    }
  }
}
