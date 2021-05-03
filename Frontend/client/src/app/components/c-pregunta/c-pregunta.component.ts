import { Component, OnInit, ɵɵqueryRefresh } from '@angular/core';
import { GamesService } from '../../services/games.service'
@Component({
  selector: 'app-c-pregunta',
  templateUrl: './c-pregunta.component.html',
  styleUrls: ['./c-pregunta.component.css']
})
export class CPreguntaComponent implements OnInit {

  constructor(private consultaService: GamesService) { }
  preguntas:any=[];
  encuestas:any=[];

  estado=true;
  estado2=!this.estado;

  pregunta: any = {
    id_pregunta: '',
    pregunta: '',
    id_encuesta: ''
  }; 

  ngOnInit(): void {
    this.refresh();
  }

  refresh(){
    this.consultaService.getPreguntas().subscribe(
      res => {this.preguntas=res; console.log(res)},
      err => console.log(err)
    ); 

    this.consultaService.getEncuestas().subscribe(
      res => {this.encuestas=res; console.log(res)},
      err => console.log(err)
    ); 
    
    this.estado=true;
    this.estado2=false;

    this.pregunta = {
      id_pregunta: '',
      pregunta: '',
      id_encuesta: ''
    }; 
  }

  delete(id_pregunta){
    this.pregunta.id_pregunta=id_pregunta;
    this.consultaService.DeleteQuestion(this.pregunta).subscribe(
      res => { console.log(res);this.refresh();alert('Eliminado');},
      err => console.log(err)
    ); 
    
    
  }

  edit(id_pregunta, pregunta, id_encuesta){
    this.pregunta = {
      id_pregunta: id_pregunta,
      pregunta: pregunta,
      id_encuesta: id_encuesta
    }; 
    console.log(this.pregunta);
  }

  update(){
    this.consultaService.UpdateQuestion(this.pregunta).subscribe(
      res => { console.log(res); this.refresh();},
      err => console.log(err)
    ); 
    this.refresh();
  }

  add(){
    this.consultaService.AddQuestion(this.pregunta).subscribe(
      res => { console.log(res); this.refresh();},
      err => console.log(err)
    ); 
    this.refresh();
  }
}
