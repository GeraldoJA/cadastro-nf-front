import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente.model';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-cliente-read',
  templateUrl: './cliente-read.component.html',
  styleUrls: ['./cliente-read.component.css']
})
export class ClienteReadComponent implements OnInit {

  clientes: Cliente[] = []
  
  displayedColumns: string[] = ['id', 'razaoSocial', 'CNPJ', 'TipoRegimeTributario', 'email'];

  constructor( private service: ClienteService ) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.service.findAll().subscribe( resposta => {
      console.log(resposta);
      this.clientes = resposta;
    })
  }
  
}
