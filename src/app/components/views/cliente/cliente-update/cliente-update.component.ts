import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../cliente.model';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-cliente-update',
  templateUrl: './cliente-update.component.html',
  styleUrls: ['./cliente-update.component.css']
})
export class ClienteUpdateComponent implements OnInit {

  cliente: Cliente = {    
    razaoSocial: '',
    cnpj: '',
    tipoRegimeTributario: '',
    email: ''
  }

  constructor(
    private service: ClienteService, 
    private route: ActivatedRoute, 
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cliente.id = this.route.snapshot.paramMap.get('id')!
    this.findById()
  }

  findById(): void {
    this.service.findById(this.cliente.id!).subscribe((resposta) => {
      this.cliente.razaoSocial = resposta.razaoSocial
      this.cliente.cnpj = resposta.cnpj
      this.cliente.tipoRegimeTributario = resposta.tipoRegimeTributario
      this.cliente.email = resposta.email
    })
  }

  update(): void {
    this.service.update(this.cliente).subscribe((resposta) => {
      this.router.navigate(['clientes'])
      this.service.mensagem('Cliente atualizado com sucesso!')
    }, err => {
      this.service.mensagem('Validar se todos os campos estão preenchidos corretamente!')
    })
  }

  cancel(): void {
    this.router.navigate(['clientes'])
  }

}
