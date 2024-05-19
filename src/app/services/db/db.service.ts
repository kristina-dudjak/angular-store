import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
} from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { Product } from '../../shared/models/Product';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  firestore = inject(Firestore);
  products = collection(this.firestore, 'products');

  getProducts(): Observable<Product[]> {
    return collectionData(this.products, {
      idField: 'id',
    }) as Observable<Product[]>;
  }

  addProduct(
    name: string,
    price: number,
    description: string
  ): Observable<string> {
    const newProd = {
      name,
      price,
      description,
    };
    return from(addDoc(this.products, newProd).then((res) => res.id));
  }
}
