import { Component, OnInit } from '@angular/core';

import { GamesService } from '../../services/games.service'

@Component({
  selector: 'app-cpais',
  templateUrl: './cpais.component.html',
  styleUrls: ['./cpais.component.css']
})
export class CPaisComponent implements OnInit {

  constructor(private consultaService: GamesService) { }

  paises:any=[];
  regiones:any=[];
  estado=true;
  estado2=!this.estado;
  pais: any = {
    id_pais: '',
    nombre: '',
    capital: '',
    poblacion: '', 
    area: '',
    id_region: ''
  };

  ngOnInit(): void {
    this.refresh();
  }

  refresh(){
    this.consultaService.getPais().subscribe(
      res => {this.paises=res; console.log(res)},
      err => console.log(err)
    ); 

    this.consultaService.getRegiones().subscribe(
      res => {this.regiones=res; console.log(res)},
      err => console.log(err)
    ); 
    
    this.estado=true;
    this.estado2=false;

    this.pais= {
      id_pais: '',
      nombre: '',
      capital: '',
      poblacion: '', 
      area: '',
      id_region: ''
    };
  }

  delete(idPais){
    console.log(idPais);
    this.pais.id_pais=idPais;
    this.consultaService.DeleteContry(this.pais).subscribe(
      res => { console.log(res);this.refresh();},
      err => console.log(err)
    ); 
    
  }

  edit(idPais,nombre,capital,poblacion, area, id_region){
    console.log(idPais);
    this.pais.id_pais=idPais;
    this.pais.nombre=nombre;
    this.pais.capital=capital;
    this.pais.poblacion=poblacion; 
    this.pais.area=area;
    this.pais.id_region=id_region;
    this.estado=false;
    this.estado2=true;
  }

  EditPais(){
    this.consultaService.UpdateContry(this.pais).subscribe(
      res => { console.log(res); this.refresh();},
      err => console.log(err)
    ); 
    this.refresh();
  };

  addContry(){
    
    this.consultaService.getAddContry(this.pais).subscribe(
      res => { console.log(res); this.refresh();},
      err => console.log(err)
    ); 
    this.refresh();
  }

}

