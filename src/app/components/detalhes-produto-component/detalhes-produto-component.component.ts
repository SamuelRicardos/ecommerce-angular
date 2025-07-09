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
import { HeaderComponent } from '../../shared/header/header.component';
import { CartService } from '../../services/cart.service';
import { HomeService } from '../../services/home.service';

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
    MatToolbarModule,
    RouterModule,
    MatInputModule,
    HeaderComponent
  ],
  templateUrl: './detalhes-produto-component.component.html',
  styleUrl: './detalhes-produto-component.component.scss'
})
export class DetalhesProdutoComponent implements OnInit {
  produtos: any;
  categorias: string[] = [];
  produtosOriginais: Produtos[] = [];
  searchTerm = '';
  cartCount = 0;

  constructor(
    private route: ActivatedRoute, 
    private produtoService: ProdutosService, 
    private cartService: CartService, 
    private router: Router,
    private homeService: HomeService
  ) { }

  ngOnInit(): void {
    this.carregarCategorias()
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.produtoService.getProdutoPorId(id).subscribe({
        next: (res) => (this.produtos = res),
        error: (err) => console.error('Erro ao buscar produto', err),
      });
    }

    this.itemsCarrinho()
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

  getProdutosPorCategoria(categoria: string) {
    return this.produtos.filter((p: { categorias: string | string[]; }) => p.categorias?.includes(categoria));
  }

  carregarCategorias() {
    this.homeService.getProdutosEmDestaque().subscribe((produtos) => {
      const todasCategorias = produtos.flatMap((p) => p.categorias || []);
      this.categorias = [...new Set(todasCategorias)];
    });
}

onSearchChange(termo: string) {
  this.searchTerm = termo.trim().toLowerCase();

  if (this.searchTerm === '') {
    this.produtos = this.produtosOriginais;
  } else {
    this.produtos = this.produtosOriginais.filter(p =>
      p.nome.toLowerCase().includes(this.searchTerm)
    );
  }
}

clearSearch() {
  this.searchTerm = '';
  this.onSearchChange(this.searchTerm);
}

itemsCarrinho() {
  this.cartService.cartItems$.subscribe(items => {
    this.cartCount = items.length;
  });
}
}
