import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ListaComponent } from './cliente/lista/lista.component';
import { AdicionarComponent } from './cliente/adicionar/adicionar.component';
import { EditarComponent } from './cliente/editar/editar.component';
import { RemoverComponent } from './cliente/remover/remover.component';


@NgModule({
    declarations: [
        MenuComponent,
        HomeComponent,
        FooterComponent,
        NotFoundComponent,
        ListaComponent,
        AdicionarComponent,
        EditarComponent,
        RemoverComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    exports: [
        MenuComponent,
        HomeComponent,
        FooterComponent,
        NotFoundComponent,
        ListaComponent,
        AdicionarComponent,
        EditarComponent,
        RemoverComponent
    ]
  })
  export class NavegacaoModule { }
  