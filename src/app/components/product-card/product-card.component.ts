import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Product } from '../../models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: false,
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})

export class ProductCardComponent implements OnChanges {
  @Input() product!: Product;
  @Output() add = new EventEmitter<Product>();
  @Output() seeMore = new EventEmitter<number>();
  @Output() showDetails = new EventEmitter<Product>();
  hover: boolean = false;

  constructor(private router: Router) { }

  ngOnChanges(changes: SimpleChanges) {
    // if (changes['product']) {
    //   console.log('product changed', changes['product'].currentValue);
    // }
  }

  onAdd() {
    this.add.emit(this.product);
  }

  onShowDetails() {
    this.showDetails.emit(this.product);
  }

  onViewDetails() {
    this.router.navigate(['/product', this.product.id]);
  }
}

