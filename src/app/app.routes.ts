import { Routes } from '@angular/router';
import { ProdutosComponent } from './components/produtos/produtos.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';

export const routes: Routes = [
    {
        path: "produtos",
        component: ProdutosComponent
    },
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
    }
];
