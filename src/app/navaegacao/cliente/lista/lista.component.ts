import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/clientes.services';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
})
export class ListaComponent implements OnInit {

  public clientes: Cliente[];
  errorMessage: string;

  constructor(
    private clienteService: ClienteService
  ) { }

  ngOnInit(): void {
    this.clienteService.obterTodos()
      .subscribe(
        respose => this.clientes = respose,
        error => this.errorMessage = error
      )
  }

}
