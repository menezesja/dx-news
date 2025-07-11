import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly tokenKey = 'auth';

  login(username: string, password: string): boolean {
    // Simulação de autenticação estática
    const valid = username === 'admin' && password === '1234';

    if (valid) {
      localStorage.setItem(this.tokenKey, 'true');
    }

    return valid;
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem(this.tokenKey) === 'true';
  }
}
