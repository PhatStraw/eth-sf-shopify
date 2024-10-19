export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface Store {
  id: string;
  name: string;
  products: Product[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  store?: Store;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
