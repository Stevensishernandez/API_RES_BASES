import { Component, OnInit } from '@angular/core';
import { GamesService } from '../../services/games.service'

@Component({
  selector: 'app-m-respuestas',
  templateUrl: './m-respuestas.component.html',
  styleUrls: ['./m-respuestas.component.css']
})
export class MRespuestasComponent implements OnInit {

  constructor(private consultaService: GamesService) { }


  Respuestas:any=[];
  Opciones:any=[];

  correcta:any ={
    id_opcion: '',
    id_pregunta: '',
    old: '',
    nombre: ''
  };

  ngOnInit(): void {
    this.refresh();
  }

  refresh(){
    this.consultaService.getAnswers().subscribe(
      res => {this.Respuestas=res; console.log(res)},
      err => console.log(err)
    ); 

    this.correcta ={
      id_opcion: '',
      id_pregunta: '',
      old: '',
      nombre: ''
    };

    this.Opciones=[];
  }

  edit(id_opcion,id_pregunta, pregunta){
    
    console.log(this.correcta);
    this.consultaService.getOptions(this.correcta).subscribe(
      res => {this.Opciones=res;
        this.correcta ={
          id_opcion: id_opcion,
          id_pregunta: id_pregunta,
          old: id_opcion,
          nombre: pregunta
        };
        ;console.log(res)},
      err => console.log(err)
    ); 

  }

  Update(){
    this.consultaService.UpdateOption(this.correcta).subscribe(
      res => { console.log(res);
        this.consultaService.UpdateInvencion(this.correcta).subscribe(
          res => { console.log(res); this.refresh();},
          err => console.log(err)
        ); 
      },
      err => console.log(err)
    ); 
  }

}
