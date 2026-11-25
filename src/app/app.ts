import { Component, signal } from '@angular/core';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { ProductDetails } from './product-details/product-details';
import { ShoppingCart } from './shopping-cart/shopping-cart';
import { CartItem, CartSelection, Product } from './product.model';

const PRODUCTS = {
  laptop: {
    name: 'Laptop',
    description: 'Dell Laptop, Core i7, 16GB RAM',
    price: 850,
    isAvailable: true,
    image: 'images/laptop.jpg',
  },
  headphones: {
    name: 'Wireless Headphones',
    description: 'Bluetooth Headphones',
    price: 120,
    isAvailable: true,
    image: 'images/headphones.jpg',
  },
} satisfies Record<string, Product>;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Header, ProductDetails, ShoppingCart, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  readonly productName = signal(PRODUCTS.laptop.name);
  readonly productDescription = signal(PRODUCTS.laptop.description);
  readonly productPrice = signal(PRODUCTS.laptop.price);
  readonly productAvailability = signal(PRODUCTS.laptop.isAvailable);
  readonly productImage = signal(PRODUCTS.laptop.image);
  readonly cartItems = signal<CartItem[]>([]);
  readonly cartMessage = signal('');

  selectProduct(key: keyof typeof PRODUCTS): void {
    const product = PRODUCTS[key];
    this.productName.set(product.name);
    this.productDescription.set(product.description);
    this.productPrice.set(product.price);
    this.productAvailability.set(product.isAvailable);
    this.productImage.set(product.image);
    this.cartMessage.set('');
  }

  addToCart(selection: CartSelection): void {
    if (!this.productAvailability()) return;

    const item: CartItem = {
      name: selection.name,
      quantity: selection.quantity,
      price: this.productPrice(),
    };

    this.cartItems.update((items) => {
      const exists = items.some((entry) => entry.name === item.name);
      return exists
        ? items.map((entry) =>
            entry.name === item.name
              ? { ...entry, quantity: entry.quantity + item.quantity }
              : entry,
          )
        : [...items, item];
    });

    this.cartMessage.set(`${item.quantity} × ${item.name} added to your cart.`);
  }
}
