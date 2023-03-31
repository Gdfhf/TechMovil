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

  proveedorMod: Proveedor = {
    ...this.proveedorSeleccionado
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
                                          this.proveedorSeleccionado = {
                                            ...data
                                          }
                                          this.proveedorMod = {
                                            ...data
                                          }
      });
    });
    // this.proveedorMod = {
    //   ...this.proveedorSeleccionado
    // }
  }

  msgAlert:Boolean = false;
  msgText: string = "";
  status:string = "";

  cerrarAlert(){
    this.msgAlert = false;
  }

  agregarProveedor(){
    if (this.proveedorSeleccionado.CodigoProveedor == 0 || this.proveedorSeleccionado.Direccion == '' || this.proveedorSeleccionado.Email == '' || this.proveedorSeleccionado.RazonSocial == '' || this.proveedorSeleccionado.Rfc == '') {
      this.msgText = "Los campos están vacios.";
      this.msgAlert = true;
      return;
    }

    if (this.proveedorService.validacion(this.proveedorSeleccionado)) {
      this.msgText = "El proveedor ya existe.";
      this.msgAlert = true;
      return;
    }

    this.proveedorService.agregarProveedor(this.proveedorSeleccionado).subscribe(data => {
      console.log(data)
      Swal.fire(
        'Proveedor agregado!',
        '¡Se agregó el proveedor correctamente!',
        'success'
      )
      this.limpiarCajas();
      this.regresar();
    });
  }

  modificarProveedor(){
    Swal.fire({
      title: '¿Está seguro de modificar el proveedor?',
      text: "Asegurese de tener los datos correctos",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, modify it!'
      }).then((result) => {
        if(result.isConfirmed) {
          console.log(this.proveedorMod,this.proveedorSeleccionado);
          this.proveedorService.modificarArticulo(this.proveedorMod, this.proveedorSeleccionado).subscribe(data => {
            console.log(data)
            this.regresar();
            Swal.fire(
              'Modificado!',
              'El proveedor se modificó exitosamente.',
              'success'
            )
          });
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
