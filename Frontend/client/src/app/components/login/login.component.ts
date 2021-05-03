import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }
  email='';
  password = '';
  ngOnInit(): void {
    
  }

  login(){
    console.log(this.email + this.password);
    if(this.email=='admin' && this.password =='admin'){
      document.location.href="/consultas"
    }else{
      alert('Credenciales no coiciden');
    }
  }

}
