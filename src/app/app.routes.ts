import { Routes } from '@angular/router';
import { ProdutosComponent } from './components/produtos/produtos.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { DetalhesProdutoComponent } from './components/detalhes-produto-component/detalhes-produto-component.component';

export const routes: Routes = [
    {
        path: "",
        component: HomeComponent
    },
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "cadastro",
        component: CadastroComponent
    },
    {
        path: "produtos",
        component: ProdutosComponent
    },
    { 
        path: 'produto/:id',
        component: DetalhesProdutoComponent
    },
];
