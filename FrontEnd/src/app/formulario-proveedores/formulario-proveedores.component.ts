import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Proveedor } from '../Interfaces/Proveedor';
import { ProveedorService } from '../proveedor-service/proveedor-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario-proveedores',
  templateUrl: './formulario-proveedores.component.html',
  styleUrls: ['./formulario-proveedores.component.css']
})
export class FormularioProveedoresComponent {
  @Input() proveedorSeleccionado: Proveedor ={
    Id:0, CodigoProveedor: 0, RazonSocial: "", Rfc: "", Direccion: "", Email: ""
  }

  constructor(private proveedorService : ProveedorService,
              private activedRoute: ActivatedRoute,
              private router: Router){
    }

  ngOnInit(): void {
    this.activedRoute.params.subscribe(params => {
      console.log(params);
      const id: number = params["id"];
      this.status = id == undefined ? "agregar" : "modificar";
      this.proveedorService.seleccionarProveedor(id).subscribe( (data) => {
        //
        this.proveedorSeleccionado = id == undefined ?
                                          //Si es undefined
                                          this.proveedorSeleccionado:
                                          //Si no es undefined.
                                          data;
      })
    });
  }
  msgAlert:Boolean = false;
  msgText: string = "";
  status:string = "";

  cerrarAlert(){
    this.msgAlert = false;
  }

  agregarProveedor(){
    this.proveedorService.agregarProveedor(this.proveedorSeleccionado);
  }

  modificarProveedor(){
    Swal.fire({
      title: '¿Está seguro de modificar el articulo?',
      text: "El id no puede ser modificado",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, modify it!'
      }).then((result) => {
        if(result.isConfirmed) {
          this.proveedorService.modificarArticulo(this.proveedorSeleccionado);
          this.regresar();
        }
      })
  }

  limpiarCajas(){
    this.proveedorSeleccionado ={
      Id:0, CodigoProveedor: 0, RazonSocial: "", Rfc: "", Direccion: "", Email: ""
    }
  }

  regresar(){
    this.router.navigate(["proveedores"]);
  }
}
