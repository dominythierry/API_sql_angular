import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuarios.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [FormsModule]
})
export class RegisterComponent implements OnInit {
  usuario = {
    id: 0,
    nome: '',
    login: '',
    senha: '',
    email: ''
  };

  senhaAtual: string = '';
  novaSenha: string = '';
  confirmarSenha: string = '';

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.usuario.id = +userId;
    } else {
      console.warn('ID do usuário não encontrado no localStorage');
    }
  }

  onSubmit() {
    this.usuarioService.cadastrarUsuario(this.usuario).subscribe(
      (response) => {
        console.log('Usuário cadastrado com sucesso', response);
        if (response && response.id) {
          this.usuario.id = response.id;
          localStorage.setItem('userId', response.id);
        }
      },
      (error) => {
        console.error('Erro ao cadastrar usuário', error);
      }
    );
  }

  trocarSenha() {
    if (this.novaSenha !== this.confirmarSenha) {
      alert('Nova senha e confirmação não coincidem!');
      return;
    }

    if (!this.usuario.id) {
      alert('ID do usuário não disponível.');
      return;
    }

    const payload = {
      id: this.usuario.id,
      senha: this.novaSenha
    };

    this.usuarioService.trocarSenha(payload).subscribe(
      () => alert('Senha atualizada com sucesso!'),
      (error) => {
        console.error('Erro ao trocar senha:', error);
        if (error.error?.mensagem) {
          alert('Erro ao trocar senha: ' + error.error.mensagem);
        } else if (typeof error.error === 'string') {
          alert('Erro ao trocar senha: ' + error.error);
        } else {
          alert('Erro ao trocar senha: Algo deu errado');
        }
      }
    );
  }

  deletarConta() {
    if (!confirm('Tem certeza que deseja excluir sua conta? Essa ação é irreversível.')) {
      return;
    }

    this.usuarioService.deletarUsuario(this.usuario.id).subscribe(
      () => {
        alert('Conta excluída com sucesso!');
        localStorage.clear();
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Erro ao excluir conta:', error);
        alert('Erro ao excluir conta: ' + (error.error?.mensagem || 'Erro inesperado'));
      }
    );
  }
}
