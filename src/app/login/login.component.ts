import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AlertDialogComponent } from '../feedback/alert-dialog.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(
    private authService: AuthService, 
    private router: Router,
    private dialog: MatDialog
  ) {}

  onLogin(): void {
    this.authService.login(this.username, this.password).subscribe((isValid) => {
      if (isValid) {
        this.router.navigateByUrl('/author/controller-news');
      } else {
        this.dialog.open(AlertDialogComponent, {
          data: { message: 'Usuário ou senha inválidos' }
        });
      }
    });
  }
}
