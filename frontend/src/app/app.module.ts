import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';  // Para gerenciar as rotas
import { FormsModule } from '@angular/forms';  // IMPORTANTE: Adicione FormsModule aqui

@NgModule({

  imports: [
    FormsModule  , 
    BrowserModule,
    AppRoutingModule// Seu módulo de rotas
  ],
})
export class AppModule {}
