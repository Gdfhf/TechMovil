import { Component, Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Articulo } from '../Interfaces/Articulo';
import { ArticulosService } from '../service/articulos.service';


@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})

export class TablaComponent {
  articulos : Articulo[] = [];

  articuloSeleccionado: Articulo ={
    Codigo: 0, Descripcion: "", Precio: 0
  }

  @Output() seleccion = new EventEmitter();

  constructor(private articuloService : ArticulosService,
              private router: Router){
    //
  }
  ngOnInit() :void {
    //this.articulos = this.articuloService.returnData(); Como se hacia sin el observable
    this.articuloService.returnData().subscribe( (data) => {
      this.articulos = data;
    });
  }

  borrarArticulo(articulo: Articulo){
    Swal.fire({
      title: '¿Deseas eliminar este elemento de la tabla?',
      text: "Esto no es reversible",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, yeet it!'
      }).then((result) => {
        if(result.isConfirmed){
          this.articuloService.borrarArticulo(articulo).subscribe(data => {
            console.log(data)
            this.articulos.splice(this.articulos.indexOf(articulo),1)
            Swal.fire(
              'Producto eliminado',
              '¡Se eliminó el producto correctamente!',
              'success'
            )    
          });
        }
      });
    /*
    const confirmacion = confirm(`¿Estas seguro de borrar el articulo? ${articulo.Descripcion}`)
    if (confirmacion) {
      // this.articulos = this.articulos.filter(a => a.idProductos != articulo.idProductos);
      this.articuloService.borrarArticulo(articulo).subscribe(data => console.log(data));
      this.articulos.splice(this.articulos.indexOf(articulo),1)
    }
    */
  }

  seleccionarArticulo(articulo: Articulo): void{
    this.articuloSeleccionado = {
      ...articulo
    }
    this.router.navigate(["modificararticulo/" + articulo.Codigo]);
    //this.seleccion.emit(this.articuloSeleccionado);

  }
}
