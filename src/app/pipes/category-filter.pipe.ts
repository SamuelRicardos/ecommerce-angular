import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryFilter',
  standalone: true
})
export class CategoryFilterPipe implements PipeTransform {
  transform(produtos: any[], categoria: string): any[] {
    if (!produtos || !categoria) return [];
    return produtos.filter(p => p.categorias?.includes(categoria));
  }
}
