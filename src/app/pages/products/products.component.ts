import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Router, ActivatedRoute } from '@angular/router';

declare var bootstrap: any;

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})

export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filtered: Product[] = [];
  searchTerm = '';
  selectedProduct: Product | null = null;
  modalRef: any;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.products = this.productService.getProducts();
    this.filtered = [...this.products];

    // this.route.queryParams.subscribe(q => {
    //   if (q['highlight']) {
    //     const id = +q['highlight'];
    //     console.log('highlight product', id);
    //   }
    // });

    this.route.params.subscribe(params => {
      const id = +params['id'];
      if (id) {
        const product = this.products.find(p => p.id === id);
        if (product) {
          this.openDetails(product);
        } else {
          this.router.navigate(['/not-found']);
        }
      }
    });


  }

  onSearch(e: Event) {
    const val = (e.target as HTMLInputElement).value.toLowerCase();
    this.searchTerm = val;
    this.filtered = this.products.filter(p => p.name.toLowerCase().includes(val) || (p.description || '').toLowerCase().includes(val));
  }

  onAdd(product: Product) {
    this.cartService.addToCart(product);
  }

  openDetails(product: Product) {
    this.selectedProduct = product;

    setTimeout(() => {
      const modalEl = document.getElementById('productModal');
      if (modalEl) {
        this.modalRef = new bootstrap.Modal(modalEl);
        this.modalRef.show();
      }
    }, 0);
  }
}
