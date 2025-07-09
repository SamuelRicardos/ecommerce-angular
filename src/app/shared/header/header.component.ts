import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() categorias: string[] = [];
  @Input() cartCount: number = 0;
  @Input() searchTerm: string = '';

  @Output() categoriaSelecionada = new EventEmitter<string>();
  @Output() limparFiltro = new EventEmitter<void>();
  @Output() irParaLogin = new EventEmitter<void>();
  @Output() searchChange = new EventEmitter<string>();
  @Output() clearSearchEvent = new EventEmitter<void>();

  onSearchChange() {
    this.searchChange.emit(this.searchTerm);
  }

  clearSearch() {
    this.searchTerm = '';
    this.clearSearchEvent.emit();
  }

  filtrarPorCategoria(categoria: string) {
    this.categoriaSelecionada.emit(categoria);
  }
}
