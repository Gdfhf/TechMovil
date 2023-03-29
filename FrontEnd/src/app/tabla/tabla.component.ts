import { Component, Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
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
      console.log(data);
      this.articulos = data;
    });
  }

  borrarArticulo(articulo: Articulo): void{
    this.articuloService.borrarArticulo(articulo);
  }
  
  seleccionarArticulo(articulo: Articulo): void{
    this.articuloSeleccionado = {
      ...articulo
    }
    this.router.navigate(["modificararticulo/" + articulo.Codigo]);
    //this.seleccion.emit(this.articuloSeleccionado);
    
  }
}
