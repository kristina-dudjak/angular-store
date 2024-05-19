import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
} from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { Product } from '../../shared/models/Product';
import { User } from '../../shared/models/User';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  firestore = inject(Firestore);
  products = collection(this.firestore, 'products');
  users = collection(this.firestore, 'users');

  getUsers(): Observable<User[]> {
    return collectionData(this.users, {
      idField: 'id',
    }) as Observable<User[]>;
  }

  getProducts(): Observable<Product[]> {
    return collectionData(this.products, {
      idField: 'id',
    }) as Observable<Product[]>;
  }

  addUser(uid: string, email: string): void {
    const newUser = {
      email,
      isAdmin: false,
    };
    from(setDoc(doc(this.users, uid), newUser));
  }

  async getUser(uid: string) {
    const a = await getDoc(doc(this.users, uid));
    const user: User = {
      uid,
      email: a.data()!['email'],
      isAdmin: a.data()!['isAdmin'],
    };
    return user;
  }

  async getProduct(id: string) {
    const a = await getDoc(doc(this.products, id));
    const product: Product = {
      id,
      name: a.data()!['name'],
      price: a.data()!['price'],
      description: a.data()!['description'],
    };
    return product;
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

  removeProduct(productId: string) {
    return from(deleteDoc(doc(this.firestore, `products/${productId}`)));
  }

  updateProduct(product: Product) {
    const { id, ...productWithoutId } = product;
    return from(
      setDoc(doc(this.firestore, `products/${product.id}`), productWithoutId)
    );
  }
}
