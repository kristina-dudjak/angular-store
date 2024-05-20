import { Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './guards/auth.guard';
import { ProductsComponent } from './views/products/products.component';
import { ProductComponent } from './views/product/product.component';
import { ProductFormComponent } from './views/product-form/product-form.component';
import { ProductInfoComponent } from './components/product-info/product-info.component';
import { AdminsComponent } from './views/admins/admins.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'products',
    component: HomeComponent,
    children: [
      { path: '', component: ProductsComponent },
      {
        path: 'new',
        component: ProductFormComponent,
      },
      {
        path: ':productId',
        component: ProductComponent,
        children: [
          {
            path: '',
            component: ProductInfoComponent,
          },
          {
            path: 'edit',
            component: ProductFormComponent,
          },
        ],
      },
    ],
    canActivate: [authGuard],
  },
  {
    path: 'admins',
    component: HomeComponent,
    children: [{ path: '', component: AdminsComponent }],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
