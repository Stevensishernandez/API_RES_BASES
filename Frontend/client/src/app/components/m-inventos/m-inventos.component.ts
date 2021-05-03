import { Component, OnInit, ɵɵqueryRefresh } from '@angular/core';
import { GamesService } from '../../services/games.service'

@Component({
  selector: 'app-m-inventos',
  templateUrl: './m-inventos.component.html',
  styleUrls: ['./m-inventos.component.css']
})
export class MInventosComponent implements OnInit {

  constructor(private consultaService: GamesService) { }

  Inventos:any=[];
  Inventores:any=[];

  Invento:any={
    id_invento: '',
    id_inventor: '', 
    nombre: '',
    anio: '',
    new:'',
  }
  ngOnInit(): void {
    this.refresh();
  }

  refresh(){
    this.consultaService.getInventos().subscribe(
      res => {this.Inventos=res; console.log(res)},
      err => console.log(err)
    ); 

    this.consultaService.getInventores().subscribe(
      res => {this.Inventores=res; console.log(res)},
      err => console.log(err)
    ); 
    this.Invento={
      id_invento: '',
      id_inventor: '',
      nombre: '',
      anio: '',
      new:'',
    }
  }

  update(){
    this.consultaService.UpdateInvento(this.Invento).subscribe(
      res => { console.log(res);
        this.consultaService.UpdateInvencion(this.Invento).subscribe(
          res => { console.log(res); this.refresh();},
          err => console.log(err)
        ); 
      },
      err => console.log(err)
    ); 

    
  }

  edit(id_invento,id_inventor, nombre,anio){
    this.Invento={
      id_invento: id_invento,
      id_inventor: id_inventor,
        nombre: nombre,
        anio: anio,
        new:id_inventor,
      
    }
  }

}
