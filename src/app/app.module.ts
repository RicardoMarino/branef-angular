import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';
import { APP_BASE_HREF } from '@angular/common';
import { NavegacaoModule } from './navaegacao/navegacao.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClienteService } from './services/clientes.services';
import { HttpClientModule } from '@angular/common/http';
import { ClienteResolve } from './services/cliente.resolve';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    NavegacaoModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: false}),    
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgbModule,
    HttpClientModule,

  ],
  providers: [
    {provide: APP_BASE_HREF, useValue: '/'},
    ClienteService,
    ClienteResolve
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
