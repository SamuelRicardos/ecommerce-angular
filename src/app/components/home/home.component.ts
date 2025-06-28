import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { HomeService } from '../../services/home.service';
import { Produtos } from '../../types/produtos.types';
import { MatFormField } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatFormField,
    MatInputModule,
    MatMenuModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  produtos: Produtos[] = [];
  produtosOriginais: Produtos[] = [];
  categorias: string[] = [];
  searchTerm = '';

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.carregarProdutos();
  }

  carregarProdutos(): void {
    this.homeService.getProdutosEmDestaque().subscribe((produtos) => {
      this.produtosOriginais = produtos;
      this.produtos = produtos;

      const todasCategorias = produtos.flatMap((p) => p.categorias || []);
      this.categorias = [...new Set(todasCategorias)];
    });
  }

  filtrarPorCategoria(categoria: string) {
    this.produtos = this.produtosOriginais.filter(produto =>
      produto.categorias?.includes(categoria)
    );
  }

  onSearchChange() {
    const termo = this.searchTerm.trim().toLowerCase();

    if (termo === '') {
      this.produtos = this.produtosOriginais;
    } else {
      this.produtos = this.produtosOriginais.filter(p =>
        p.nome.toLowerCase().includes(termo)
      );
    }

  }

  clearSearch() {
    this.searchTerm = '';
    this.onSearchChange();
  }
}
