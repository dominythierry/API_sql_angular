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

    this.startAutoSlide();
  }





  // Carrossel de produtos - Coleção Classy Winter

  produtos = [
    { imagem: 'https://i.pinimg.com/736x/53/2e/78/532e786537fa2071b598d8399cf6244b.jpg', nome: 'Conjunto Aurora Alpina', preco: 'R$ 429,70' },
    { imagem: 'https://i.pinimg.com/736x/1d/d0/8e/1dd08e688069a99e562a2bef1024037d.jpg', nome: 'Meia Calça Belle', preco: 'R$ 69,60' },
    { imagem: 'https://i.pinimg.com/736x/0f/38/11/0f38114efb4d86997459b2c668b71c69.jpg', nome: 'Vestido Étoile d’Hiver', preco: 'R$ 309,90' },
    { imagem: 'https://i.pinimg.com/736x/bc/4e/fb/bc4efb7c0c96259b331ae675fa69cd55.jpg', nome: 'Colares Brume Luxe', preco: 'R$ 459,90' },
    { imagem: 'https://i.pinimg.com/736x/f0/f5/76/f0f576d476c0194b8f39cabc86570e58.jpg', nome: 'Vestido Sussurro de Lã', preco: 'R$ 289,60' },
    { imagem: 'https://i.pinimg.com/736x/0e/20/c3/0e20c3b9b7c2f98f6ec932855c8734a0.jpg', nome: 'Bolsa Golden Couro', preco: 'R$ 254,90' },
    { imagem: 'https://i.pinimg.com/736x/d4/99/3e/d4993ed11a3bbf2da39b86c755fa3259.jpg', nome: 'Sueter Classique', preco: 'R$ 149,90' },
    { imagem: 'https://i.pinimg.com/736x/49/02/01/4902018c6c6281a2107b174fac9d06e8.jpg', nome: 'Rosé Scarpin Boots', preco: 'R$ 314,90' }
  ];

  currentIndex = 0;
  visibleCards = 5;

  moveCarousel(direction: number) {
    const total = this.produtos.length;
  
    // Atualiza o índice com rotação
    this.currentIndex = (this.currentIndex + direction + total) % total;
  }

  get visibleProdutos() {
    const total = this.produtos.length;
    let visible = [];
  
    for (let i = 0; i < this.visibleCards; i++) {
      visible.push(this.produtos[(this.currentIndex + i) % total]);
    }
  
    return visible;
  }




  // Carrossel de Slides - Layout da página

  currentIndex1: number = 0;
  intervalId: any;


  slides: string[] = [
    'https://i.pinimg.com/736x/2c/58/da/2c58da8de194ee889fc9fcd577252e9b.jpg',
    'https://i.pinimg.com/736x/b9/85/d4/b985d42d15e8870469be67a0bbfce377.jpg',
    'https://i.pinimg.com/736x/dc/62/19/dc62192b94b1bffadd6996dc2490ca48.jpg'
  ];


  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  startAutoSlide(): void {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 3000); // 3 segundos
  }

  nextSlide(): void {
    this.currentIndex1 = (this.currentIndex1 + 1) % this.slides.length;
  }

  prevSlide(): void {
    this.currentIndex1 = (this.currentIndex1 - 1 + this.slides.length) % this.slides.length;
  }
}
