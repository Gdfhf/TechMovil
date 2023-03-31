import { Injectable } from '@angular/core';
import { Proveedor } from '../Interfaces/Proveedor';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProveedorService {
  proveedores : Proveedor[] = [{
    Id: 1,
    CodigoProveedor: 11,
    RazonSocial: "Medico",
    Rfc: "123d456",
    Direccion: "Pancho Villa",
    Email: "prov1@gmail.com"
  },
  {
    Id: 2,
    CodigoProveedor: 22,
    RazonSocial: "Joker",
    Rfc: "654s321",
    Direccion: "Villa La Villa",
    Email: "prov2@gmail.com"
  }];
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
    if(busqueda.length != 0){
      return true;
    }
    return false;
  }

  agregarProveedor(proveedor: Proveedor){
    const headers = { 'Content-type': 'application/json' };
    const body = JSON.stringify(proveedor);
    console.log(proveedor);
    this.http.post(this.proveedorURL,body,{'headers':headers});
    //Modificar la lógica
    console.log("agregarProveedor del servicse");
  }

  seleccionarProveedor(id:number): Observable<Proveedor>{
    console.log(this.proveedorURL+id);
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
  borrarArticulo(proveedor: Proveedor): void{
    const index = this.getIndex(proveedor);
    Swal.fire({
      title: '¿Deseas eliminar este elemento de la tabla?',
      text: "Esto no es reversible",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, yeet it!'
      }).then((result) => {
        if (result.isConfirmed) {
          //Poner un Delete aqui
          this.proveedores.splice(index, 1);
        }
      })
  }

}
