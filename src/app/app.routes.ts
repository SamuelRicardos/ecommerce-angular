import { Routes } from '@angular/router';
import { ProdutosComponent } from './components/produtos/produtos.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    {
        path: "produtos",
        component: ProdutosComponent
    },
    {
        path: "",
        component: HomeComponent
    }
];
