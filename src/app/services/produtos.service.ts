import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produtos } from '../types/produtos.types';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {
  private apiUrl = 'http://localhost:8080/produtos';

  constructor(private http: HttpClient) { }

  getProdutos(): Observable<Produtos[]> {
    return this.http.get<Produtos[]>(this.apiUrl);
  }

  getProdutoPorId(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  criarProduto(produto: Produtos): Observable<Produtos> {
    return this.http.post<Produtos>(this.apiUrl, produto);
  }

  atualizarProduto(produto: Produtos): Observable<Produtos> {
    return this.http.put<Produtos>(`${this.apiUrl}/${produto.id}`, produto);
  }

  deletarProduto(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
