import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Proveedor } from '../Interfaces/Proveedor';
import { ProveedorService } from '../proveedor-service/proveedor-service';

@Component({
  selector: 'app-tabla-proveedores',
  templateUrl: './tabla-proveedores.component.html',
  styleUrls: ['./tabla-proveedores.component.css']
})
export class TablaProveedoresComponent {
  proveedores : Proveedor[] = [];

  proveedorSeleccionado: Proveedor ={
    Id:0, CodigoProveedor: 0, RazonSocial: "", Rfc: "", Direccion: "", Email: ""
  }

  @Output() seleccion = new EventEmitter();

  constructor(private proveedorService : ProveedorService,
              private router: Router){
    //
  }

  ngOnInit() :void {
    this.proveedorService.returnData().subscribe( (data) => {
      console.log(data);
      this.proveedores = data;
    });
  }

  seleccionarProveedor(proveedor: Proveedor){
    this.proveedorSeleccionado = {
      ...proveedor
    }
    this.router.navigate(["modificarproveedor/" + proveedor.Id]);

  }

  borrarProveedor(proveedor: Proveedor){
    const confirmacion = confirm(`¿Estas seguro de borrar el proveedor? ${proveedor.CodigoProveedor}`)
    if (confirmacion) {
      // this.articulos = this.articulos.filter(a => a.idProductos != articulo.idProductos);
      this.proveedorService.borrarArticulo(proveedor).subscribe(data => console.log(data));
      this.proveedores.splice(this.proveedores.indexOf(proveedor),1)
    }
  }
}
