import { Component, OnInit } from '@angular/core';
// ... outros imports

@Component({
  selector: 'app-header', // <<< CONFIRME QUE ESTÁ 'app-header'
  standalone: true,
  imports: [], // Importa outros módulos necessários, como CommonModule se necessário
  templateUrl: './header.html', // Caminho para o template HTML do componente
  styleUrls: ['./header.css'] // Caminho para o CSS do componente
  
  // ...
})
export class HeaderComponent implements OnInit {
  title: string = 'Recipe Book App';
  isMenuOpen: boolean = false;

  constructor() { }

  ngOnInit(): void {
    // Initialization logic if needed
    this.isMenuOpen = false;
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }
}
