import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  usuario?: string
  password? :string

  ngOnInit(): void {
  }

  login(): void {
    alert("Usuario: " + this.usuario + " Contraseña: " + this.password)    
  }

}
