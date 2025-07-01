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
import { Router, RouterModule } from '@angular/router';

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
    MatMenuModule,
    RouterModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  produtos: Produtos[] = [];
  produtosOriginais: Produtos[] = [];
  categorias: string[] = [];
  searchTerm = '';
  currentSlide = 0;

  banners = [
    {
      image: 'https://img.freepik.com/fotos-gratis/conceito-de-compras-fecha-retrato-jovem-linda-e-atraente-garota-ruiva-sorrindo-olhando-para-a-camera_1258-118763.jpg',
      title: 'Explore uma seleção exclusiva de produtos'
    },
    {
      image: 'https://img.freepik.com/fotos-gratis/conceito-de-compras-fecha-retrato-jovem-linda-e-atraente-garota-ruiva-sorrindo-olhando-para-a-camera_1258-126800.jpg',
      title: 'Promoções incríveis esperando por você'
    },
    {
      image: 'https://img.freepik.com/fotos-premium/vista-superior-do-conceito-de-compras-online-com-cartao-de-credito-telefone-inteligente-e-computador-isolado-no-fundo-da-mesa-amarela-do-escritorio_315337-3591.jpg',
      title: 'Confira nossos lançamentos exclusivos'
    }
  ];

  constructor(private homeService: HomeService, private router: Router) { }

  ngOnInit(): void {
    this.carregarProdutos();
    this.carregarProdutos();
    setInterval(() => this.nextSlide(), 4000);
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

  getProdutosPorCategoria(categoria: string) {
    return this.produtos.filter(p => p.categorias?.includes(categoria));
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

  limparFiltro() {
    this.produtos = [...this.produtosOriginais];
  }

  clearSearch() {
    this.searchTerm = '';
    this.onSearchChange();
  }

  irParaLogin() {
    this.router.navigate(['/login']);
    console.log("oi")
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.banners.length;
  }

  prevSlide(): void {
    this.currentSlide = (this.currentSlide - 1 + this.banners.length) % this.banners.length;
  }
}
