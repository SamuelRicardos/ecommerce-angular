// src/app/services/cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartService {

  private readonly storageKey = 'cart_items';
  private cartItems = new BehaviorSubject<any[]>(this.loadCartFromStorage());
  cartItems$ = this.cartItems.asObservable();

  constructor() {
    this.cartItems$.subscribe(items => {
      localStorage.setItem(this.storageKey, JSON.stringify(items));
    });
  }

  addToCart(product: any) {
    const current = this.cartItems.value;
    this.cartItems.next([...current, product]);
  }

  private loadCartFromStorage(): any[] {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : [];
  }

  getCartCount(): number {
    return this.cartItems.value.length;
  }

  getItems(): any[] {
    return this.cartItems.getValue();
  }

  removeFromCart(produto: any) {
    const current = this.cartItems.value;
    const updated = current.filter(p => p.id !== produto.id);
    this.cartItems.next(updated);
  }

  clearCart() {
    this.cartItems.next([]);
    localStorage.removeItem(this.storageKey);
  }
}
