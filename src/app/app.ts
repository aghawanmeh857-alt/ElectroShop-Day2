import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  storeName = 'ElectroShop';
  storeDescription = 'Your favorite electronics store';
  storeAddress = 'Amman, Jordan';
  totalProducts = 5;
  isStoreOpen = true;
  currency = 'USD';

  productNames: string[] = [
    'Laptop',
    'Smartphone',
    'Headphones',
    'Smart Watch',
    'Keyboard'
  ];

  productPrices: number[] = [750, 450, 80, 120, 45];

  featuredProduct = {
    name: 'Laptop',
    price: 750,
    description: 'High-performance laptop'
  };

  discountPercentage = 10;

  discountedPrice = 0;
  mostExpensivePrice = 0;
  cheapestPrice = 0;
  totalProductsValue = 0;

  constructor() {
    this.discountedPrice =
      this.featuredProduct.price -
      (this.featuredProduct.price * this.discountPercentage) / 100;

    this.mostExpensivePrice = this.productPrices[0];
    this.cheapestPrice = this.productPrices[0];

    for (let i = 0; i < this.productPrices.length; i++) {
      const price = this.productPrices[i];

      this.totalProductsValue += price;

      if (price > this.mostExpensivePrice) {
        this.mostExpensivePrice = price;
      }

      if (price < this.cheapestPrice) {
        this.cheapestPrice = price;
      }
    }
  }
}
