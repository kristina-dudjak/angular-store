import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidationService } from '../../services/validation/validation.service';
import { FirstUpperPipe } from '../../shared/pipes/first-upper.pipe';
import { DbService } from '../../services/db/db.service';
import { ProductsService } from '../../services/products/products.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule, FirstUpperPipe],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
})
export class ProductFormComponent {
  formBuilder = inject(FormBuilder);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  isSubmitted = false;
  dbService = inject(DbService);
  productService = inject(ProductsService);
  productForm = this.formBuilder.group(
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

  onSubmit() {
    this.isSubmitted = true;
    const rawForm = this.productForm.getRawValue();
    if (this.productForm.valid) {
      this.dbService
        .addProduct(rawForm.name!, rawForm.price!, rawForm.description!)
        .subscribe((id) => {
          this.productService.addProduct(
            id,
            rawForm.name!,
            rawForm.price!,
            rawForm.description!
          );
          this.router.navigate(['../'], { relativeTo: this.activatedRoute });
        });
    }
  }
}
