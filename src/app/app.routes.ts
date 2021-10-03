import { Routes } from "@angular/router"; 
import { AdicionarComponent } from "./navaegacao/cliente/adicionar/adicionar.component";
import { EditarComponent } from "./navaegacao/cliente/editar/editar.component";
import { ListaComponent } from "./navaegacao/cliente/lista/lista.component";
import { RemoverComponent } from "./navaegacao/cliente/remover/remover.component";
import { ClienteResolve } from "./services/cliente.resolve";
export const rootRouterConfig: Routes = [
    { path: '', redirectTo: '/lista', pathMatch: 'full'},
    { path: 'lista', component: ListaComponent},
    { path: 'adicionar', component: AdicionarComponent},
    { 
        path: 'editar/:id', component: EditarComponent,
        resolve: {
            cliente: ClienteResolve
        }
    },
    { 
        path: 'remover/:id', component: RemoverComponent,
        resolve: {
            cliente: ClienteResolve
        }
    },    
];