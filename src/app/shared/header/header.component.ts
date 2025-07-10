import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatBadgeModule } from '@angular/material/badge';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatBadgeModule,
    FormsModule,
    RouterModule,
    CommonModule,
    MatTooltipModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  usuarioLogado = false;
  nomeUsuario = '';

  @Input() categorias: string[] = [];
  @Input() cartCount: number = 0;
  @Input() searchTerm: string = '';

  @Output() categoriaSelecionada = new EventEmitter<string>();
  @Output() limparFiltro = new EventEmitter<void>();
  @Output() irParaLogin = new EventEmitter<void>();
  @Output() searchChange = new EventEmitter<string>();
  @Output() clearSearchEvent = new EventEmitter<void>();
  @Output() logout = new EventEmitter<void>();

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartCount = items.length;
    });

    this.obterUsuarioLogado()
  }

  onSearchChange() {
    this.searchChange.emit(this.searchTerm);
  }

  clearSearch() {
    this.searchTerm = '';
    this.limparFiltro.emit();
  }

  filtrarPorCategoria(categoria: string) {
    this.categoriaSelecionada.emit(categoria);
  }

  obterUsuarioLogado() {
    const nome = localStorage.getItem('nome');
    if (nome) {
      this.usuarioLogado = true;
      this.nomeUsuario = nome;
    }
  }

  sair() {
    localStorage.removeItem('nome');
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    this.usuarioLogado = false;
    this.nomeUsuario = '';
    this.logout.emit();
  }
}
