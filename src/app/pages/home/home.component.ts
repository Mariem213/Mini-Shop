import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

declare var bootstrap: any;

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  featured: Product[] = [];
  selectedProduct: Product | null = null;
  modalRef: any;

  constructor(
    private productService: ProductService,
    private router: Router,
    private cartService: CartService
  ) { }

  ngOnInit() {
    const all = this.productService.getProducts();
    this.featured = all.slice(0, 4);
  }

  onAdd(product: Product) {
    this.cartService.addToCart(product);
  }

  // onSeeMoreProduct(productId: number) {
  //   this.router.navigate(['/products'], { queryParams: { highlight: productId } });
  // }

  onSeeAll() {
    this.router.navigate(['/products']);
  }

  // openDetails(product: Product | any) {
  openDetails(product: Product) {

    this.selectedProduct = product;

    setTimeout(() => {
      const modalEl = document.getElementById('productModal');
      if (modalEl) {
        this.modalRef = new bootstrap.Modal(modalEl, { backdrop: 'static', keyboard: true });
        this.modalRef.show();
      }
    }, 0);
  }

}