import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: { product: Product, qty: number }[] = [];
  private cart$ = new BehaviorSubject<{ product: Product, qty: number }[]>([]);

  constructor() { }

  getCart(): Observable<{ product: Product, qty: number }[]> {
    return this.cart$.asObservable();
  }

  addToCart(product: Product) {
    const found = this.items.find(i => i.product.id === product.id);
    if (found) {
      found.qty++;
    } else {
      this.items.push({ product, qty: 1 });
    }
    this.cart$.next(this.items);
  }

  clearCart() {
    this.items = [];
    this.cart$.next(this.items);
  }
}
