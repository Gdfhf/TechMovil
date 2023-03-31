import { Injectable } from '@angular/core';
import { Articulo } from '../Interfaces/Articulo';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticulosService {
  articulos: Articulo[] = [];

  baseURL:string = "http://localhost:3000/api/productos";

  constructor(private http : HttpClient) {
    //
  }

  returnData() : Observable<Articulo[]>{
    return this.http.get<Articulo[]>(this.baseURL);
    //return this.articulos;
  }

  validacion(articulo: Articulo): boolean{
    //Modificar la logica creo
    const busqueda = this.articulos.filter(obj => obj.Codigo == articulo.Codigo);
    if(busqueda.length != 0){
      return true;
    }
    return false;
  }

  agregarArticulo(articulo : Articulo): Observable<any>{
    //this.articulos.push(articulo);
    const headers = { 'Content-type': 'application/json' };
    const body = JSON.stringify(articulo);
    return this.http.post(this.baseURL,body,{'headers': headers});
  }

  seleccionar(idProductos: number): Articulo {
    this.returnData().subscribe(data => {
      this.articulos = data
    })
    return { ...this.articulos.find(art => art.Codigo == idProductos)! };
  }


  //Considerar si este realmente se ocupa
  getIndex(articulo: Articulo): number {
    let index = 0;
    console.log(this.articulos);
    this.articulos.forEach(ar => {
      console.log(ar);
      console.log(articulo);
      if (ar.Codigo === articulo.Codigo) {
        index = this.articulos.indexOf(ar);
      }
    });
    return index;
  }

  modificarArticulo(articulo : Articulo, articuloMod: Articulo){
    console.log(articulo,articuloMod);
    //Modificar la logica aqui
    const index = articulo.Codigo;
    return this.http.put<Articulo>(this.baseURL+`/${index}`,articuloMod);
  }

  //Cambiar la logica
  //El swal es para la confirmacion de usuario
  borrarArticulo(articulo: Articulo){
    const index = articulo.Codigo;
    // this.articulos.splice(index, 1);
    return this.http.delete<Articulo>(this.baseURL+`/${index}`);
  }
}
