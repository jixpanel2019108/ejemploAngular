import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../servicios/usuario.service';
import { Usuario } from '../../model/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
  providers: [UsuarioService]
})
export class RegistroComponent implements OnInit {
  public usuario: Usuario;

  constructor(private _usuarioService: UsuarioService,
    private _router: Router) { 
    this.usuario = new Usuario ("","","","","","","");
   }

  ngOnInit(): void {
 
  }

  registrar(){
    this._usuarioService.registro(this.usuario).subscribe(
      response =>{
        console.log(response);
        this._router.navigate(['/login'])
      },
      error=>{
        console.log(<any>error);
        
      }
    )
  }

}
