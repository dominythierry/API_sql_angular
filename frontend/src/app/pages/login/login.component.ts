import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  
import { UsuarioService } from '../../services/usuarios.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  login: string = '';
  senha: string = '';
  erro: string = '';

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  onSubmit() {
    this.usuarioService.login(this.login, this.senha).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('userId', res.id);
        localStorage.setItem('nome', res.nome);
        localStorage.setItem('login', res.login);
        this.router.navigate(['/']); // redireciona para a home
      },
      error: (err) => {
        this.erro = 'Login ou senha inválidos';
        console.error('Erro no login:', err);
      }
    });
  }
}