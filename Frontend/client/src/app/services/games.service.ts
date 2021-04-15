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
}
