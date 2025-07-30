import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { AlertDialogComponent } from '../feedback/alert-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule, MatCardModule,
            MatFormFieldModule,MatInputModule,MatButtonModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  hide = signal(true);

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

  togglePasswordVisibility(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

}
