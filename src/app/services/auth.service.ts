import { Injectable } from '@angular/core';

interface User {
  name: string;
  email: string;
  password: string;
  phones: string[];
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  users: any[] = [];

  register(user: User): boolean {
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    if (users.find((u: User) => u.email === user.email)) {
      return false;
    }

    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    return true;
  }

  login(email: string, password: string): boolean {
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem('userLoggedIn', email);
      return true;
    }
    return false;
  }

  checkLogin(): boolean {
    return localStorage.getItem('userLoggedIn') !== null;
  }

  logout() {
    localStorage.removeItem('userLoggedIn');
  }

  getLoggedUser(): User | null {
    const email = localStorage.getItem('userLoggedIn');
    if (!email) return null;
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    return users.find(u => u.email === email) || null;
  }
}
