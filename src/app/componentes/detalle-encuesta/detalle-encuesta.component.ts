import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EncuestaService } from 'src/app/servicios/encuesta.service';
import { UsuarioService } from '../../servicios/usuario.service';
import { Encuesta } from '../../model/encuesta.model';

@Component({
  selector: 'app-detalle-encuesta',
  templateUrl: './detalle-encuesta.component.html',
  styleUrls: ['./detalle-encuesta.component.scss'],
  providers: [UsuarioService, EncuestaService]
})
export class DetalleEncuestaComponent implements OnInit {
  public encuestaModel
  public token;
  public idEncuestaRuta: string;

  constructor(
    public _activatedRoute: ActivatedRoute,
    public _encuestaService: EncuestaService,
    public _usuarioService: UsuarioService
  ) { 
    this.token = this._usuarioService.getToken();
    this.encuestaModel = new Encuesta(
      '',
      '',
      '',
      { si: 0, no: 0, ninguna: 0, usuariosEncuestados: [] },
      [{ textoComentario: '', idUsuarioComentario: '' }],
      ''    );
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(dataRuta => {
      //de la ruta activa me traera la variable encuesta
      console.log(dataRuta.get('idEncuesta'));
      this.idEncuestaRuta = dataRuta.get('idEncuesta')
      this.obtenerEncuestaId(this.idEncuestaRuta)
    })
  }

  obtenerEncuestaId(idEncuesta){
    this._encuestaService.obtenerEncuestaId(this.token, idEncuesta).subscribe(
      response => {
        this.encuestaModel = response.encuestaEncontrada;
        console.log(response);

      }
    )
  }

}
