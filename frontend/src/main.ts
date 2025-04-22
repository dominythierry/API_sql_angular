// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';



platformBrowserDynamic()
  .bootstrapModule(AppModule) // Inicializar o AppModule
  .catch(err => console.error(err));

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(), // Habilita HttpClient no Angular standalone
    provideRouter(routes)
  ]
});



