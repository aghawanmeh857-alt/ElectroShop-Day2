import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  signal,
} from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { CartSelection } from '../product.model';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails implements OnChanges {
  @Input() productName = 'Laptop';
  @Input() productDescription = 'Dell Laptop, Core i7, 16GB RAM';
  @Input() productPrice = 850;
  @Input() isAvailable = true;
  @Input() productImage = 'images/laptop.jpg';
  @Output() readonly addToCart = new EventEmitter<CartSelection>();

  readonly quantity = signal(1);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productName']) this.quantity.set(1);
  }

  increaseQuantity(): void {
    this.quantity.update((quantity) => quantity + 1);
  }

  decreaseQuantity(): void {
    this.quantity.update((quantity) => Math.max(1, quantity - 1));
  }

  addProduct(): void {
    if (!this.isAvailable) return;
    this.addToCart.emit({ name: this.productName, quantity: this.quantity() });
  }
}
