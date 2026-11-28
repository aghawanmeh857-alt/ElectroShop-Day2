import { Component } from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';

@Component({
  selector: 'app-product-list',
  imports: [NgClass, NgStyle],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductList {

  products = [
    {
      id: 1,
      name: 'Laptop',
      description: 'High-performance laptop',
      price: 850,
      category: 'Electronics',
      isAvailable: true,
      discount: 15,
      image: 'images/laptop.jpg'
    },
    {
      id: 2,
      name: 'Smartphone',
      description: 'Latest smartphone',
      price: 450,
      category: 'Electronics',
      isAvailable: true,
      discount: 0,
      image: 'images/smartphone.jpg'
    },
    {
      id: 3,
      name: 'Headphones',
      description: 'Wireless headphones',
      price: 120,
      category: 'Accessories',
      isAvailable: false,
      discount: 10,
      image: 'images/headphones.jpg'
    },
    {
      id: 4,
      name: 'Smart Watch',
      description: 'Smart fitness watch',
      price: 180,
      category: 'Accessories',
      isAvailable: true,
      discount: 20,
      image: 'images/smartwatch.jpg'
    },
    {
      id: 5,
      name: 'Tablet',
      description: 'Portable touchscreen tablet',
      price: 300,
      category: 'Electronics',
      isAvailable: false,
      discount: 5,
      image: 'images/tablet.svg'
    },
    {
      id: 6,
      name: 'Keyboard',
      description: 'Mechanical keyboard',
      price: 65,
      category: 'Accessories',
      isAvailable: true,
      discount: 0,
      image: 'images/keyboard.jpg'
    },
    {
      id: 7,
      name: 'Gaming Mouse',
      description: 'Precision gaming mouse',
      price: 45,
      category: 'Accessories',
      isAvailable: true,
      discount: 10,
      image: 'images/gaming-mouse.svg'
    },
    {
      id: 8,
      name: 'Monitor',
      description: 'Full HD desktop monitor',
      price: 220,
      category: 'Electronics',
      isAvailable: false,
      discount: 0,
      image: 'images/monitor.svg'
    }
  ];

  orderStatus: string = 'Pending';
  selectedCategory: string = 'All Products';

  buyProduct(productName: string): void {
    alert('You selected: ' + productName);
  }

}
