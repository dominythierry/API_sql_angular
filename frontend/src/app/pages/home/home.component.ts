import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuarios.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  styleUrl: './home.component.css',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  usuarios: any[] = [];

  constructor(private usuarioService: UsuarioService) {}

ngOnInit() {
  this.usuarioService.getUsuarios().subscribe({
      next: (data) => {
        console.log('Usuários recebidos:', data); // debug!
        this.usuarios = data as any[];
      },
      error: (err) => {
        console.error('Erro ao carregar usuários', err);
      }
    });
  }
}