import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent implements OnInit {
  cartCount = 0;
  isLoggedIn = false;

  constructor(
    private cartService: CartService,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.cartService.getCart().subscribe(items => {
      this.cartCount = items.reduce((acc, it) => acc + it.qty, 0);
    });

    this.isLoggedIn = this.auth.checkLogin();

    window.addEventListener('storage', () => {
      this.isLoggedIn = this.auth.checkLogin();
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isLoggedIn = this.auth.checkLogin();
      }
    });
  }

  toggleLogin() {
    if (this.isLoggedIn) {
      this.auth.logout();
      this.isLoggedIn = false;
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/login']);
    }
  }

}
