import { Component } from '@angular/core';
import { Produtos } from '../../types/produtos.types';
import { ProdutosService } from '../../services/produtos.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.scss'
})
export class ProdutosComponent {
  produtos: Produtos[] = [];
  produtoAtual: Produtos = { nome: '', preco: 0, codigo: ''};
  editando = false;

  constructor(private produtoService: ProdutosService) {}

  ngOnInit(): void {
    this.listarProdutos();
  }

  listarProdutos() {
    this.produtoService.getProdutos().subscribe((data) => {
      this.produtos = data;
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
    this.produtoAtual = { nome: '', preco: 0, codigo: '' };
    this.editando = false;
  }
}
