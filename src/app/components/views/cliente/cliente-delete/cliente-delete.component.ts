import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../cliente.model';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-cliente-delete',
  templateUrl: './cliente-delete.component.html',
  styleUrls: ['./cliente-delete.component.css']
})
export class ClienteDeleteComponent implements OnInit {

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

  delete(): void {
    this.service.delete(this.cliente.id!).subscribe((resposta) => {
      this.router.navigate(['clientes'])
      this.service.mensagem('Cliente deletado com sucesso!')
    }, err => {
      this.service.mensagem(err.error.error)
    })
  }

  cancel(): void {
    this.router.navigate(['clientes'])
  }

}
