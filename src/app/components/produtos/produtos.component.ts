import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Produtos } from '../../types/produtos.types';
import { ProdutosService } from '../../services/produtos.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatChipsModule
    
  ],
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.scss'
})
export class ProdutosComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  todasCategorias = ['Eletrônicos', 'Roupas', 'Beleza', 'Livros', 'Casa'];

  produtoAtual: Produtos = {
  nome: '',
  preco: 0,
  imagemUrl: '',
  descricao: '',
  categorias: []
};

  editando = false;

  produtos = new MatTableDataSource<Produtos>([]);

  displayedColumns: string[] = ['imagem', 'nomeCodigo', 'categorias', 'quantidadeEstoque', 'preco', 'acoes'];

  constructor(private produtoService: ProdutosService) { }

  ngOnInit(): void {
    this.listarProdutos();
  }

  ngAfterViewInit() {
    this.produtos.paginator = this.paginator;
  }

  listarProdutos() {
    this.produtoService.getProdutos().subscribe((data) => {
      this.produtos.data = data;
    });
  }

  salvarProduto() {
    if (this.editando) {
      this.produtoService.atualizarProduto(this.produtoAtual).subscribe(() => {
        this.listarProdutos();
        this.resetarFormulario();
      });
    } else {
      this.produtoService.criarProduto(this.produtoAtual).subscribe(() => {
        this.listarProdutos();
        this.resetarFormulario();
      });
    }
  }

  editarProduto(produto: Produtos) {
    this.produtoAtual = { ...produto };
    this.editando = true;
  }

  deletarProduto(id?: string) {
    if (!id) return;
    this.produtoService.deletarProduto(id).subscribe(() => {
      this.listarProdutos();
    });
  }

  resetarFormulario() {
  this.produtoAtual = {
    nome: '',
    preco: 0,
    imagemUrl: '',
    descricao: '',
    categorias: []
  };
  this.editando = false;
  }
}
