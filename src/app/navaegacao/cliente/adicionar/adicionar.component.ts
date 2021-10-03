import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControlName, FormGroup, Validators, Form} from '@angular/forms';

import { fromEvent, merge, Observable } from 'rxjs';

import { ToastrService } from 'ngx-toastr';

import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/utils/generic-form-validation';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/clientes.services';

@Component({
  selector: 'app-adicionar',
  templateUrl: './adicionar.component.html',
})
export class AdicionarComponent implements OnInit, AfterViewInit {

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
    private toastr: ToastrService
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
  }

  ngOnInit(): void {
    this.clienteForm = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(200), Validators.minLength(3)]],
      porte: ['', [Validators.required]]
    });
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));
    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.processarMensagens(this.clienteForm);
    });
  }

  adicionar() {
    if (this.clienteForm.dirty && this.clienteForm.valid) {
      this.cliente = Object.assign({}, this.cliente, this.clienteForm.value);
      this.clienteService.adicionar(this.cliente)
        .subscribe(
          () => { this.processSuccess() },
          fail => this.processFail(fail)
        );
    }
  }

  processSuccess() {
    this.clienteForm.reset();
    this.errors = [];
    let toast = this.toastr.success('Cliente cadastrado com sucesso!', 'Sucesso!');
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
