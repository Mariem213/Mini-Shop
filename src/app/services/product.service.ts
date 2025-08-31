import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    { id: 1, name: 'Wooden Chair', price: 120, img: 'assets/chair.png', description: 'Comfortable wooden chair' },
    { id: 2, name: 'Round Table', price: 350, img: 'assets/table.png', description: 'Stylish round table' },
    { id: 3, name: 'Leather Sofa', price: 900, img: 'assets/sofa.png', description: '3-seater leather sofa' },
    { id: 4, name: 'King Bed', price: 700, img: 'assets/bed.jpg', description: 'Comfortable king size bed' },
    { id: 5, name: 'Shelf Unit', price: 200, img: 'assets/shelf.png', description: 'Storage shelf' },
    { id: 6, name: 'Office Lamp', price: 45, img: 'assets/lamp.png', description: 'LED desk lamp' }
  ];

  constructor() { }

  getProducts(): Product[] {
    return [...this.products];
  }

  getProductById(id: number): Product | undefined {
    return this.products.find(p => p.id === id);
  }
}
