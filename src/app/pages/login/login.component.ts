import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  loginForm: FormGroup;
  error = '';

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.value;
    if (this.auth.login(email, password)) {
      this.router.navigate(['/']).then(() => {
        window.dispatchEvent(new Event('storage'));
        const nav = document.querySelector('app-navbar') as any;
        if (nav) nav.isLoggedIn = true;
        console.log("Hi");
      });
    }
    else {
      this.error = 'Invalid email or password';
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

}
