import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuarios.service';  // Corrija o caminho do serviço, se necessário
import { FormsModule } from '@angular/forms';  



@Component({
  selector: 'app-register',
  templateUrl:'./register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [FormsModule]  // <-- Import FormsModule here
})
export class RegisterComponent {
  usuario = {
    nome: '',
    login: '',
    senha: '',
    email: ''
  };

  constructor(private usuarioService: UsuarioService) {}

  onSubmit() {
    // Aqui você pode chamar o serviço para enviar os dados ao backend
    this.usuarioService.cadastrarUsuario(this.usuario).subscribe(
      (response) => {
        console.log('Usuário cadastrado com sucesso', response);
      },
      (error) => {
        console.error('Erro ao cadastrar usuário', error);
      }
    );
  }
}
