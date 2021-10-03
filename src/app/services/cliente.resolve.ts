import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Cliente } from "../models/cliente";
import { ClienteService } from "./clientes.services";

@Injectable()
export class ClienteResolve implements Resolve<Cliente> {

  constructor(private clienteServie: ClienteService) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.clienteServie.obterPorId(route.params['id']);
  }

}
