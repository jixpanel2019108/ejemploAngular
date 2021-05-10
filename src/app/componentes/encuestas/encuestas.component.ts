import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../servicios/usuario.service';
import { EncuestaService } from '../../servicios/encuesta.service';
import { Encuesta } from '../../model/encuesta.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-encuestas',
  templateUrl: './encuestas.component.html',
  styleUrls: ['./encuestas.component.scss'],
  providers: [EncuestaService, UsuarioService]
})
export class EncuestasComponent implements OnInit {
  public token;
  public encuestasModelGet: Encuesta;
  public escuestasModelAdd:Encuesta;
  public encuestasModelGetId: Encuesta;
  public modeloComentario = {
    idEncuesta: '',
    textoComentario:''
  }

  constructor(
    private _encuestaService: EncuestaService,
    private _usuarioService: UsuarioService,
    private _router: Router
  ) {
    this.token = this._usuarioService.getToken()
    //si vamos a recibir una variable a la vista es instanciarla
    this.escuestasModelAdd = new Encuesta('','','',{si:0, no:0,ninguna:0,usuariosEncuestados:[]},[{textoComentario:'',idUsuarioComentario:''}],'')
   }

  ngOnInit(): void {
    this.obtenerEncuestas();
  }

  obtenerEncuestas(){
    this._encuestaService.obtenerEncuestas(this.token).subscribe(
      response => {
        this.encuestasModelGet = response.encuestasEncontradas//encuentras encontradas viene del contralador de encuestas
        console.log(response);
      },
      error =>{
        console.log(<any>error);
      }
    )
  }

  agregarEncuestas(){
    this._encuestaService.agregarEncuestas(this.escuestasModelAdd, this.token).subscribe(
      response=>{
        this.escuestasModelAdd.titulo = "";
        this.escuestasModelAdd.descripcion = "";
        console.log(response);
        this.obtenerEncuestas()
        
      }
    )
  }

  obtenerEncuesta(idEncuesta){
    this._encuestaService.obtenerEncuestaId(this.token,idEncuesta).subscribe(
      response => {
        this.encuestasModelGetId = response.encuestaEncontrada;
        console.log(response);
        
      }
    )
  }

  agregarComentario(){
    this.modeloComentario.idEncuesta = String(this.encuestasModelGetId._id)

    this._encuestaService.agregarComentario(this.token,this.modeloComentario).subscribe(
      response => {
        console.log(response);
        
      }
    )
  }

//Una manera de navegar con parametros
  navegarDetalleEncuesta(idEncuesta){
  this._router.navigate(['/detalleEncuesta',idEncuesta])
  }
}
