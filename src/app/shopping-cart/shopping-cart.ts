import { Component, Input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { CartItem } from '../product.model';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './shopping-cart.html',
  styleUrl: './shopping-cart.css',
})
export class ShoppingCart {
  @Input() items: readonly CartItem[] = [];

  get totalPrice(): number {
    return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  get totalQuantity(): number {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }
}
