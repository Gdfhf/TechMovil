import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Articulo } from '../Interfaces/Articulo';
import { ArticulosService } from '../service/articulos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})

export class FormularioComponent {
  @Input() articuloSeleccionado: Articulo ={
    Codigo: 0, Descripcion: "", Precio: 0
  }

  articuloMod: Articulo = {
    ...this.articuloSeleccionado
  }



  constructor(private articuloService : ArticulosService,
              private activedRoute: ActivatedRoute,
              private router: Router){
              }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.activedRoute.params.subscribe(params => {
      const id: number = params["id"];
      this.status = id == undefined ? "agregar" : "modificar";
      this.articuloSeleccionado = id == undefined ?
                                        //Si es undefined
                                        this.articuloSeleccionado:
                                        this.articuloSeleccionado = {
                                          ...this.articuloService.seleccionar(id)
                                        }
                                        this.articuloMod = {
                                          ...this.articuloSeleccionado
                                        }
    });
  }



  msgAlert:Boolean = false;
  msgText: string = "";
  status:string = "";

  agregarArticulo(): void{
    if(this.articuloSeleccionado.Codigo == 0 || this.articuloSeleccionado.Descripcion == '' || this.articuloSeleccionado.Precio == 0){
      this.msgText = "Los campos están vacíos."
      this.msgAlert = true;
      return;
    }

    if(this.articuloService.validacion(this.articuloSeleccionado)){
      this.msgText = "El código ya existe."
      this.msgAlert = true;
      return;
    }
    //else
    /*
    this.articuloService.agregarArticulo({
    ...this.articuloSeleccionado
    });
    */
   
    this.articuloService.agregarArticulo( {...this.articuloSeleccionado }).subscribe(data => {
      Swal.fire(
        'Producto Agregado',
        '¡Se agregó el articulo correctamente!',
        'success'
      )
      this.limpiarCajas();
      this.regresar();
    });

    /*
    //Se pusieron debajo del subscribe para que se haga despues
    //de obtener los datos del service
    Swal.fire(
      'Producto Agregado',
      '¡Se agregó el articulo correctamente!',
      'success'
    )
    this.limpiarCajas();
    this.regresar();
    */
  }

  modificarArticulo(){
    Swal.fire({
      title: '¿Está seguro de modificar el articulo?',
      text: "De '"  + this.articuloService.seleccionar(this.articuloSeleccionado.Codigo).Descripcion + "' a: '" +this.articuloSeleccionado.Descripcion +"'",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, modify it!'
      }).then((result) => {
        if (result.isConfirmed) {
          //console.log(this.articuloMod, this.articuloSeleccionado);
          this.articuloService.modificarArticulo(this.articuloMod, this.articuloSeleccionado).subscribe(data => {console.log(data)});;
          this.limpiarCajas();
          this.regresar();
          
          Swal.fire(
            'Modificado!',
            'El producto se modificó exitosamente.',
            'success'
          )
          
        }
      })
  }

  regresar(){
    this.router.navigate(["articulos"]);
  }

  limpiarCajas(){
    this.articuloSeleccionado = {
      Codigo: 0 , Descripcion: "", Precio: 0
    }
  }

  cerrarAlert(){
    this.msgAlert = false;
  }
}
