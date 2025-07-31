import { Component, signal } from '@angular/core';
import { AlertDialogComponent } from '../feedback/alert-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-forgot-password',
  imports: [
    CommonModule, ReactiveFormsModule, MatDialogModule, MatCardModule,
    MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  hide = signal(true);
  hideConfirmPassword = signal(true);
  errorMessage = signal('');
  passwordError = signal<string>('');

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required])
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {
    merge(
      this.form.get('email')!.statusChanges,
      this.form.get('email')!.valueChanges
    ).pipe(takeUntilDestroyed()).subscribe(() => this.updateErrorMessage());
    
    merge(
      this.form.get('password')!.statusChanges,
      this.form.get('password')!.valueChanges
    ).pipe(takeUntilDestroyed()).subscribe(() => this.updatePasswordError());
  }

  togglePasswordVisibility(field: 'password' | 'confirm', event: MouseEvent) {
    if (field === 'password') {
      this.hide.set(!this.hide());
    } else {
      this.hideConfirmPassword.set(!this.hideConfirmPassword());
    }
    event.stopPropagation();
  }

  updateErrorMessage() {
    const emailControl = this.form.get('email');
    if (emailControl?.hasError('email')) {
      this.errorMessage.set('Formato de e-mail inválido.');
    } else {
      this.errorMessage.set('');
    }
  }

  updatePasswordError() {
    const passwordControl = this.form.get('password');
    if (passwordControl?.hasError('minlength')) {
      this.passwordError.set('A senha deve conter pelo menos 8 caracteres.');
    } else {
      this.passwordError.set('');
    }
  }

  onNewPassword(): void {
    if (this.form.invalid) {
      this.dialog.open(AlertDialogComponent, {
        data: { message: 'Preencha todos os campos corretamente.' }
      });
      return;
    }

    const { password, confirmPassword } = this.form.value;

    if (password !== confirmPassword) {
      this.dialog.open(AlertDialogComponent, {
        data: { message: 'As senhas não coincidem.' }
      });
      return;
    }

    // Abre o diálogo de sucesso
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      data: { message: 'Alteração de senha realizada com sucesso' }
    });

    // Aguarda o fechamento do diálogo antes de navegar
    dialogRef.afterClosed().subscribe(() => {
      this.router.navigateByUrl('/login');
    });
  }
}