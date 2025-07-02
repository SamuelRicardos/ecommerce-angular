import { Component, OnInit } from '@angular/core';
import { ProdutosService } from '../../services/produtos.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatCard } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormField } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Produtos } from '../../types/produtos.types';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-detalhes-produto-component',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatIconModule,
    MatDividerModule,
    MatCard,
    MatButtonModule,
    MatMenuModule,
    MatFormField,
    MatToolbarModule,
    RouterModule,
    MatInputModule
  ],
  templateUrl: './detalhes-produto-component.component.html',
  styleUrl: './detalhes-produto-component.component.scss'
})
export class DetalhesProdutoComponent implements OnInit {
  produtos: any;
  categorias: string[] = [];
  produtosOriginais: Produtos[] = [];
  searchTerm = '';

  constructor(private route: ActivatedRoute, private produtoService: ProdutosService, private router: Router) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.produtoService.getProdutoPorId(id).subscribe({
        next: (res) => (this.produtos = res),
        error: (err) => console.error('Erro ao buscar produto', err),
      });
    }
  }

  irParaLogin() {
    this.router.navigate(['/login']);
    console.log("oi")
  }

  limparFiltro() {
    this.produtos = [...this.produtosOriginais];
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
