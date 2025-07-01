import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { LoginService } from '../../services/login.service'; // ajuste o caminho conforme seu projeto
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule
  ]
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(6)]]
  }) as FormGroup<{ email: FormControl<string>; senha: FormControl<string> }>;

  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private loginService: LoginService
  ) {}

  login() {
    if (this.loginForm.invalid) return;

    this.isSubmitting = true;

    // Extrair os valores explicitamente para garantir que são string
    const loginRequest = {
      email: this.loginForm.value.email!,
      senha: this.loginForm.value.senha!
    };

    this.loginService.login(loginRequest).subscribe({
      next: (res) => {
        this.isSubmitting = false;
        localStorage.setItem('token', res.token);
        localStorage.setItem('email', res.email);

        this.snackBar.open('Login realizado com sucesso!', 'Fechar', { duration: 3000, panelClass: ['snack-success'] });
        this.router.navigate(['/categorias']);
      },
      error: (err) => {
        this.isSubmitting = false;
        this.snackBar.open('Usuário ou senha incorretos', 'Fechar', { duration: 3000, panelClass: ['snack-error'] });
        console.error('Erro no login:', err);
      }
    });
  }

  goToCadastro() {
    this.router.navigate(['/cadastro']);
  }

  goToEsqueciSenha() {
    this.router.navigate(['/esqueci-senha']);
  }

  voltar() {
    this.router.navigate(['/']); // ou usar Location.back() se preferir
  }
}
