import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../usuario.model'; // Importe a interface

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private API_URL = 'http://localhost:3000'; // URL do backend

  constructor(private http: HttpClient) {}

  // Método para buscar todos os usuários
  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.API_URL}/usuarios`);
  }

  // Método para cadastrar um novo usuário
  cadastrarUsuario(usuario: Usuario): Observable<any> {
    return this.http.post(`${this.API_URL}/usuarios/cadastro`, usuario);
  }
}
