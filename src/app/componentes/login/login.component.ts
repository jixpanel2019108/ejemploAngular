import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../servicios/usuario.service';//2
import { Usuario } from '../../model/usuario.model';
import Swal from "sweetalert2";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UsuarioService]  //1
})
export class LoginComponent implements OnInit {
  public usuarioModel: Usuario //cuando utilicemos un dato tipo X aqui usuario lo declaramos en el constructoir
  public token;
  public identidad;

  constructor(private _usuarioService: UsuarioService,
    private _router:Router) { 
    this.usuarioModel = new Usuario("","","","","","","")
  }

  ngOnInit(): void {
  }

  getToken(){
    this._usuarioService.login(this.usuarioModel,'true').subscribe(
      response => {
        this.token = response.token;
        localStorage.setItem('token', this.token)
        
      },
      error=>{
        console.log(<any>error);
        
      }
    )
  }
  login(){
    this._usuarioService.login(this.usuarioModel).subscribe(
      response=>{
        this.identidad = response.usuarioEncontrado;
        localStorage.setItem('identidad', JSON.stringify(this.identidad))
        this.getToken();
        Swal.fire(
          'Login Exitoso!',
          'Te has logeado!',
          'success'
        )
        this._router.navigate(['/usuarios'])
      },
      error => {
        Swal.fire(
          'Contrasenia incorrecta!',
          'ingrese correctamente!',
          'error'
        )
      }
    )
  }

}
