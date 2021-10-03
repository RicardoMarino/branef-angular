import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/clientes.services';

@Component({
  selector: 'app-remover',
  templateUrl: './remover.component.html',
  styleUrls: ['./remover.component.css']
})
export class RemoverComponent {

  cliente: Cliente = new Cliente();
  errors: any[] = [];

  constructor(
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.cliente = this.route.snapshot.data['cliente'];
  }

  remover() {
    this.clienteService.remover(this.cliente.id)
      .subscribe(
        () => this.processSuccess(),
        fail => this.processFail(fail)
      )
  }

  processSuccess() {
    this.errors = [];

    let toast = this.toastr.success('Cliente excluído com sucesso!', 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/lista']);
      });
    }
  }

  processFail(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }
}
