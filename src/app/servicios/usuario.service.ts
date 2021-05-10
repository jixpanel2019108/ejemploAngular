import { Injectable } from '@angular/core';
import { GLOBAL } from "./global.service"
import { Usuario } from '../model/usuario.model';
import { Observable } from "rxjs"
import { HttpClient, HttpHeaders } from "@angular/common/http"  //httpClient para poder acceder a las rutas

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public url: String;
  public headersVariable = new HttpHeaders().set('Content-Type','application/json') //se hace para trabajar en el mismo tipo de datos
   public identidad;
   public token;

  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
   }

   registro(usuario: Usuario):  Observable<any> {
      let params = JSON.stringify(usuario)

      return this._http.post(this.url + '/registrarUsuario', params, {headers: this.headersVariable})
   }

   obtenerUsuario(): Observable<any>{
      return this._http.get(this.url + '/obtenerUsuarios', {headers: this.headersVariable}) 
   }

   obtenerUsuarioId(id: String): Observable<any>{

      return this._http.get(this.url + '/obtenerUsuarioId/'+ id, {headers:this.headersVariable})
   }

   login(usuario, obtenerToken=null): Observable<any>{
      if (obtenerToken != null){
         usuario.obtenerToken = obtenerToken;
      }
      let params = JSON.stringify(usuario)
      return this._http.post(this.url + '/login', params, {headers: this.headersVariable} )
   }

   getIdentidad(){
      var identidad2 = JSON.parse(localStorage.getItem("identidad"))
      if(identidad2 != undefined){
         this.identidad = identidad2;
      }else{
         this.identidad = null;
      }

      return this.identidad;
   }

   getToken(){
      var token2 = localStorage.token;
      if(token2 != undefined){
         this.token = token2;
      }else{
         this.token = null;
      }

      return this.token;
   }

   editarUsuario(usuario: Usuario): Observable<any>{
      let params = JSON.stringify(usuario);
      let headersToken = this.headersVariable.set('Authorization', this.getToken())
      return this._http.put(this.url+ '/editarUsuarioADMIN/'+ usuario._id, params, {headers: headersToken})
   }

   eliminarUsuario(id:String): Observable<any>{
      let headersToken = this.headersVariable.set('Authorization', this.getToken())
      return this._http.delete(this.url+'/eliminarUsuarioAdmin/'+ id, {headers: headersToken} )
   }
}
