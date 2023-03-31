import { Injectable } from '@angular/core';
import { Proveedor } from '../Interfaces/Proveedor';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProveedorService {

  proveedores : Proveedor[] = [];

  proveedorURL: string = "http://localhost:3000/api/proveedores/";

  constructor(private http : HttpClient) {
    //
  }

  returnData() : Observable<Proveedor[]>{
    return this.http.get<Proveedor[]>(this.proveedorURL);
  }

  validacion(proveedor: Proveedor): boolean{
    //Modificar la lógica creo
    const busqueda = this.proveedores.filter(obj => obj.CodigoProveedor == proveedor.CodigoProveedor);
    console.log(this.proveedores);
    if(busqueda.length != 0){
      return true;
    }
    return false;
  }

  agregarProveedor(proveedor: Proveedor){
    const headers = { 'Content-type': 'application/json' };
    const body = JSON.stringify(proveedor);
    console.log(proveedor);
    return this.http.post(this.proveedorURL,body,{'headers':headers});
    //Modificar la lógica
  }

  seleccionarProveedor(id:number): Observable<Proveedor>{
    return this.http.get<Proveedor>(this.proveedorURL+id);
    //La vieja
    //return {...this.proveedores.find(prov => prov.Id == id)!}
  }

  //Considerar si este realmente se ocupa
  getIndex(proveedor : Proveedor): number{
    let index = 0;
    this.proveedores.forEach(prov => {
      if(proveedor.CodigoProveedor == prov.CodigoProveedor){
        index = this.proveedores.indexOf(prov);
      }
    });
    return index;
  }

  modificarArticulo(proveedor : Proveedor){
    const headers = { 'Content-type': 'application/json' };
    const body = JSON.stringify(proveedor);
    return this.http.put<Proveedor>(this.proveedorURL, body, {'headers':headers});

    //Modificar la logica creo
    //const index = this.getIndex(proveedor);
    //this.proveedores[index] = {...proveedor}
  }

  //Cambiar la logica
  //El swal es para la confirmacion de usuario
  borrarArticulo(proveedor: Proveedor){
    const index = proveedor.CodigoProveedor;
    // this.articulos.splice(index, 1);
    return this.http.delete<Proveedor>(this.proveedorURL+`/${index}`);
  }

}
