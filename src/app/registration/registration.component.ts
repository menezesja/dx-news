import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { merge } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { AlertDialogComponent } from '../feedback/alert-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FooterSignup } from '../footer-signup/footer-signup.component';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatDialogModule, MatCardModule,
    MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, FooterSignup
  ],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationComponent {
  hide = signal(true);
  hideConfirmPassword = signal(true);
  errorMessage = signal('');
  passwordError = signal<string>('');

  form = new FormGroup({
    username: new FormControl('', [Validators.required]),
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

  onRegister(): void {
    if (this.form.invalid) {
      this.dialog.open(AlertDialogComponent, {
        data: { message: 'Preencha todos os campos corretamente.' }
      });
      return;
    }

    const { username, email, password, confirmPassword } = this.form.value;

    if (password !== confirmPassword) {
      this.dialog.open(AlertDialogComponent, {
        data: { message: 'As senhas não coincidem.' }
      });
      return;
    }

    this.authService.register(username!, email!, password!).subscribe((success) => {
      if (success) {
        this.dialog.open(AlertDialogComponent, {
          data: { message: 'Cadastro realizado com sucesso!' }
        });
        this.router.navigateByUrl('/login');
      } else {
        this.dialog.open(AlertDialogComponent, {
          data: { message: 'Usuário ou e-mail já existem.' }
        });
      }
    });
  }
}
