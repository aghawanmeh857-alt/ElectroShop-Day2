export interface Product {
  name: string;
  description: string;
  price: number;
  isAvailable: boolean;
  image: string;
}

export interface CartSelection {
  name: string;
  quantity: number;
}

export interface CartItem extends CartSelection {
  price: number;
}
