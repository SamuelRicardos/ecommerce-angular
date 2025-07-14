import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule, Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { HeaderComponent } from "../../shared/header/header.component";
import { Produtos } from '../../types/produtos.types';
import { ProdutosService } from '../../services/produtos.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    FormsModule,
    RouterModule,
    HeaderComponent
  ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  produtosOriginais: Produtos[] = [];
  produtos: any[] = [];
  categorias: string[] = [];
  searchTerm = '';
  cartCount = 0;
  estoqueMap = new Map<string, number>();

  constructor(
    private cartService: CartService,
    private router: Router,
    private produtoService: ProdutosService
  ) { }

  ngOnInit(): void {
    this.carregarProdutosComEstoque();
    this.carregarProdutosDoCarrinho()
    this.itemsCarrinho()
  }

  comprarAgora(produto: any) {
    this.router.navigate(['/checkout', produto.id]);
  }

aumentarQuantidade(produto: any) {
  const estoqueDisponivel = this.estoqueMap.get(produto.id!) || 0;

  if (produto.quantidade < estoqueDisponivel) {
    produto.quantidade++;
    this.cartService.updateCart(produto);
  }
}

diminuirQuantidade(produto: any) {
  if (produto.quantidade > 1) {
    produto.quantidade--;
    this.cartService.updateCart(produto);
  } else {
    this.removerDoCarrinho(produto);
  }
}

  carregarProdutosDoCarrinho(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.produtos = items.map(p => ({
        ...p,
        quantidade: p.quantidade || 1
      }));
    });
  }

  carregarProdutosComEstoque(): void {
  this.cartService.cartItems$.subscribe(items => {
    this.produtos = items.map(p => ({
      ...p,
      quantidade: p.quantidade || 1
    }));

    // Chamar API e montar mapa de estoque
    this.produtoService.getProdutos().subscribe(apiProdutos => {
      apiProdutos.forEach(p => {
        return this.estoqueMap.set(p.id!, p.quantidadeEstoque!); // ou o nome do campo de estoque na API
      });
    });
  });
}

  removerDoCarrinho(produto: any) {
    this.cartService.removeFromCart(produto);
  }

  irParaLogin() {
    this.router.navigate(['/login']);
  }

  limparFiltro() {
    this.produtos = [...this.cartService.getItems()];
  }

  filtrarPorCategoria(categoria: string) {
    this.produtos = this.cartService.getItems().filter(p =>
      p.categorias?.includes(categoria)
    );
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

  itemsCarrinho() {
    this.cartService.cartItems$.subscribe(items => {
      this.cartCount = items.length;
    });
  }

  voltarParaHome() {
    this.router.navigate(['/']);
  }

  clearSearch() {
    this.searchTerm = '';
    this.onSearchChange(this.searchTerm);
  }

calcularTotal(): number {
  return this.produtos.reduce((total, produto) => {
    const carrinhoQtd = produto.quantidade || 1;
    const estoqueQtd = this.estoqueMap.get(produto.id!) || 0;
    const quantidadeValida = Math.min(carrinhoQtd, estoqueQtd);

    return total + produto.preco * quantidadeValida;
  }, 0);
}

  fecharPedido() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/checkout']);
    }
  }
}
