import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatListModule,
    MatDividerModule,
  ],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  nomeUsuario = '';
  endereco = '';
  metodoPagamento = 'cartao';

  itens: any[] = [];

  frete = 10;
  desconto = 5;

  constructor(
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.itens = this.cartService.getItems().map(item => ({
      ...item,
      quantidade: item.quantidade || 1
    }));

    const userName = localStorage.getItem('nome') || '';
    this.nomeUsuario = userName;
    
    this.endereco = 'Rua Exemplo, 123, Bairro Centro, Cidade - UF';
  }

  get total() {
    return this.itens.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
  }

  get totalPedido() {
    return this.total + this.frete - this.desconto;
  }

  finalizarPedido() {
    if (!this.nomeUsuario || !this.endereco) {
      alert('Por favor, preencha seu nome e endereço.');
      return;
    }
    alert(`Pedido finalizado com sucesso! Total: R$ ${this.totalPedido.toFixed(2)}`);
    this.cartService.clearCart();  // Limpa o carrinho após finalizar
    this.router.navigate(['/']);
  }
}
