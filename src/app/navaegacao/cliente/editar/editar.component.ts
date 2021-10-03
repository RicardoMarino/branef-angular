import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { fromEvent, merge, Observable } from 'rxjs';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/clientes.services';
import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/utils/generic-form-validation';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html'
})
export class EditarComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  errors: any[] = [];
  clienteForm: FormGroup;
  cliente: Cliente = new Cliente();

  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};

  unsavedChanges: boolean;

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
  ) {
    this.validationMessages = {
      nome: {
        required: 'Informe o Nome'
      },
      porte: {
        required: 'Innforme o Porte do Cliente'
      }
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
    this.cliente = this.route.snapshot.data['cliente'];
  }

  ngOnInit(): void {

    this.clienteForm = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(200), Validators.minLength(3)]],
      porte: ['', [Validators.required]]
    });

    this.preenncherForm();
  }

  ngAfterViewInit() {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.processarMensagens(this.clienteForm);
    });
  }

  atualizar() {
    if (this.clienteForm.dirty && this.clienteForm.valid) {
      this.cliente = Object.assign({}, this.cliente, this.clienteForm.value);

      this.clienteService.atualizar(this.cliente)
        .subscribe(
          () => this.processSuccess(),
          fail => this.processFail(fail)
        );
    }
  }

  preenncherForm() {
    this.clienteForm.patchValue({
      id: this.cliente.id,
      nome: this.cliente.nome,
      porte: this.cliente.porte
    })
  }

  processSuccess() {
    this.errors = [];

    let toast = this.toastr.success('Cliente atualizado com sucesso!', 'Sucesso!');
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
