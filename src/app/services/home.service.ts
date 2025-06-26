import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produtos } from '../types/produtos.types';
import { ProdutosService } from './produtos.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor(private produtosService: ProdutosService) {}

  getProdutosEmDestaque(): Observable<Produtos[]> {
    return this.produtosService.getProdutos();
  }
}
