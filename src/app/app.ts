import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule para diretivas como ngIf, ngFor, etc.
import { RouterOutlet } from '@angular/router'; // Importa RouterOutlet para usar no template
import { HeaderComponent } from './header/header'; // Importa o HeaderComponent

@Component({
  selector: 'app-root',
  standalone: true, // Marca este componente como independente
  imports: [CommonModule, RouterOutlet, HeaderComponent], // Declara as dependências que este componente usa
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  title = 'recipe-book-app';
}

