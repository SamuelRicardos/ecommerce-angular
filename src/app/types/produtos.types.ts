export type Produtos = {
  id?: string;
  nome: string;
  descricao: string;
  categorias: string[];
  preco: number;
  quantidadeEstoque?: number;
  imagemUrl: string;
};
