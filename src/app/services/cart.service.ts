import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly storageKey = 'cart';
  private cartItemsSubject = new BehaviorSubject<any[]>(this.loadCartFromStorage());
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor() {}

  private loadCartFromStorage(): any[] {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : [];
  }

  getItems(): any[] {
    return this.cartItemsSubject.value;
  }

  addToCart(produto: any) {
    const items = this.getItems();
    const existing = items.find(p => p.id === produto.id);

    if (existing) {
      existing.quantidade = (existing.quantidade || 1) + 1;
    } else {
      produto.quantidade = 1;
      items.push(produto);
    }

    this.updateCartStorage(items);
  }

  updateCart(produto: any) {
    const updated = this.getItems().map(item =>
      item.id === produto.id ? { ...item, quantidade: produto.quantidade } : item
    );
    this.updateCartStorage(updated);
  }

  removeFromCart(produto: any) {
    const updated = this.getItems().filter(p => p.id !== produto.id);
    this.updateCartStorage(updated);
  }

  clearCart() {
    this.updateCartStorage([]);
  }

  getCartCount(): number {
    return this.getItems().length;
  }

  private updateCartStorage(items: any[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(items));
    this.cartItemsSubject.next(items);
  }
}
