import { Component, OnInit } from '@angular/core';

import { GamesService } from '../../services/games.service'

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css']
})
export class ConsultasComponent implements OnInit {

  constructor(private conexion: GamesService) { }
  thead1;
  thead2;
  thead3;
  thead4;
  valor;

  ngOnInit(): void {
    this.conexion.getTemp1().subscribe(
      res => {
        this.thead1='Uno';
        this.thead2='dos';
        this.thead3='tres';
        this.thead4='cuatro';
        this.valor = <Datos>res;
        console.log(res);
      },
      err => console.error(err)
    );
  }

}

interface Datos{
  pais_del_invento?:any;
  invento?:any;
    inventor?:any;
    profecional?:any;
    jefe?:any;
    fecha?:any;
    salario?:any;
    comision?:any;
    area?:any;
    ranking?:any;
    año?:any;
    paisinvento  ?:any;
    paisinventor  ?:any;
    region  ?:any;
    capital  ?:any;
    poblacion?:any;
    territorio?:any;
    frontera  ?:any;
    norte  ?:any;
    sur ?:any;
    este ?:any;
    oeste ?:any;
}