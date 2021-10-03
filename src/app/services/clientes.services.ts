import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Cliente } from "../models/cliente";
import { BaseService } from "./base.services";
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ClienteService extends BaseService {

  constructor(private http: HttpClient) { super(); }

  obterTodos(): Observable<Cliente[]> {
    return this.http
      .get<Cliente>(this.UrlServiceV1 + 'clientes', super.getHeaderJson())
      .pipe(
        map(super.extractData),
        catchError(super.serviceError)
      );
  }
  obterPorId(id: string): Observable<Cliente> {
    return this.http
      .get<Cliente>(this.UrlServiceV1 + 'clientes/' + id, super.getHeaderJson())
      .pipe(
        map(this.extractData),
        catchError(super.extractData)
      );
  }  
  adicionar(cliente: Cliente): Observable<Cliente> {
    return this.http
      .post(this.UrlServiceV1 + 'clientes', cliente, this.getHeaderJson())
      .pipe(
        map(super.extractData),
        catchError(super.serviceError)
      );
  }

  atualizar(cliente: Cliente): Observable<Cliente> {
    return this.http
      .put(this.UrlServiceV1 + 'clientes/' + cliente.id, cliente, super.getHeaderJson())
      .pipe(
        map(this.extractData),
        catchError(super.extractData)
      );
  }

  remover(id: string): Observable<Cliente> {
    return this.http
      .delete(this.UrlServiceV1 + 'clientes/' + id, super.getHeaderJson())
      .pipe(
        map(this.extractData),
        catchError(super.extractData)
      );
  }  

}
