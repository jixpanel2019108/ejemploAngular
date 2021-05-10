import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/usuario.model';
import { UsuarioService } from '../../servicios/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  providers:[UsuarioService]
})
export class UsuariosComponent implements OnInit {
  public usuarios;
  public idUsuarioModel: Usuario;
  constructor(private _usuarioService: UsuarioService) { 
    this.idUsuarioModel = new Usuario("","","","","","","")
  }

  ngOnInit(): void {
    this.obtenerUsuarios()
  }
  obtenerUsuarios(){
    this._usuarioService.obtenerUsuario().subscribe(
      response => {
        this.usuarios = response.usuariosEncontrados;
        console.log(response.usuariosEncontrados)
        //Esta variable me trae la respuesta de nodejs
      },
      error => {
        console.log(<any> error);
        
      }
    )
  }

  obtenerUsuarioId(idUsuario){
    this._usuarioService.obtenerUsuarioId(idUsuario).subscribe(
      response =>{
        this.idUsuarioModel = response.usuarioEncontrado;
        console.log(response);
      }
    )
  }

  editarUsuario(){
    this._usuarioService.editarUsuario(this.idUsuarioModel).subscribe(
      response => {
        console.log(response);
        this.obtenerUsuarios();
      }
    )
  }

  eliminarUsuario(idUsuario){
    this._usuarioService.eliminarUsuario(idUsuario).subscribe(
      response=>{
        console.log(response);
        this.obtenerUsuarios()
        
      }
    )
  }
}
