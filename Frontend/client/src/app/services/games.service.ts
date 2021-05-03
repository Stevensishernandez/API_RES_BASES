import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  API_URL = 'http://localhost:3000/'
  constructor(private http: HttpClient) {
  }

  getTemp1(){
    return this.http.get(`${this.API_URL}buscarAlbum`);
  }

  getPokemones(){
    return this.http.get('https://pokeapi.co/api/v2/pokemon?loffset=0');
  }

  getC1(){
    return this.http.get(`${this.API_URL}c1`);
  }

  getC2(){
    return this.http.get(`${this.API_URL}c2`);
  }
  
  getC3(){
    return this.http.get(`${this.API_URL}c3`);
  }
  
  getC4(){
    return this.http.get(`${this.API_URL}c4`);
  }
  
  getC5(){
    return this.http.get(`${this.API_URL}c5`);
  }
  
  getC6(){
    return this.http.get(`${this.API_URL}c6`);
  }
  
  getC7(){
    return this.http.get(`${this.API_URL}c7`);
  }
  
  getC8(){
    return this.http.get(`${this.API_URL}c8`);
  }
  
  getC9(){
    return this.http.get(`${this.API_URL}c9`);
  }
  
  getC10(){
    return this.http.get(`${this.API_URL}c10`);
  }
  
  getC11(){
    return this.http.get(`${this.API_URL}c11`);
  }
  
  getC12(){
    return this.http.get(`${this.API_URL}c12`);
  }
  
  getC13(){
    return this.http.get(`${this.API_URL}c13`);
  }
  
  getC14(){
    return this.http.get(`${this.API_URL}c14`);
  }
  
  getC15(){
    return this.http.get(`${this.API_URL}c15`);
  }
  
  getC16(){
    return this.http.get(`${this.API_URL}c16`);
  }
  
  getC17(){
    return this.http.get(`${this.API_URL}c17`);
  }
  
  getC18(){
    return this.http.get(`${this.API_URL}c18`);
  }
  
  getC19(){
    return this.http.get(`${this.API_URL}c19`);
  }
  
  getC20(){
    return this.http.get(`${this.API_URL}c20`);
  }

  getPais(){
    return this.http.get(`${this.API_URL}paises`);
  }

  getRegiones(){
    return this.http.get(`${this.API_URL}regiones`);
  }

  getAddContry(pais:any){
    return this.http.post(`${this.API_URL}AddContry`,pais);
  }

  DeleteContry(pais:any){
    return this.http.post(`${this.API_URL}DeleteContry`,pais);
  }

  UpdateContry(pais:any){
    return this.http.post(`${this.API_URL}UpdateContry`,pais);
  }

  getPreguntas(){
    return this.http.get(`${this.API_URL}Preguntas`);
  }

  getEncuestas(){
    return this.http.get(`${this.API_URL}encuestas`);
  }

  AddQuestion(question:any){
    return this.http.post(`${this.API_URL}AddQuestion`,question);
  }

  DeleteQuestion(question:any){
    return this.http.post(`${this.API_URL}DeleteQuestion`,question);
  }

  UpdateQuestion(question:any){
    return this.http.post(`${this.API_URL}UpdateQuestion`,question);
  }

  getInventos(){
    return this.http.get(`${this.API_URL}Inventos`);
  }

  getInventores(){
    return this.http.get(`${this.API_URL}Inventores`);
  }

  UpdateInvento(Invento:any){
    return this.http.post(`${this.API_URL}UpdateInvento`,Invento);
  } 
  
  UpdateInvencion(Invento:any){
    return this.http.post(`${this.API_URL}UpdateInvencion`,Invento);
  }

  getAnswers(){
    return this.http.get(`${this.API_URL}Respuestas`);
  }

  getOptions(Invento:any){
    return this.http.post(`${this.API_URL}Opciones`,Invento);
  } 
  
  UpdateOption(Invento:any){
    return this.http.post(`${this.API_URL}UpdateAnswer`,Invento);
  }
}
