import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  username = '';
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  onRegister(): void {
    this.authService.register(this.username, this.email, this.password).subscribe((success) => {
      if (!this.username.trim() || !this.email.trim() || !this.password.trim()) {
        alert('Todos os campos são obrigatórios. Por favor, preencha corretamente.');
        return;
      }
      if (success) {
        alert('Cadastro realizado com sucesso!');
        this.router.navigateByUrl('/login');
      } else {
        alert('Usuário ou e-mail já existem.');
      }
    });
  }
}
