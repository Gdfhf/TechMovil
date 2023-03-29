import { Component, ViewChild } from '@angular/core';
import { Articulo } from './Interfaces/Articulo';
import { SidebarComponent } from './sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  @ViewChild("sidebar") sideBar : SidebarComponent | undefined;

  articuloSeleccionado: Articulo ={
    Codigo: 0, Descripcion: "", Precio: 0
  }

  seleccion(articulo:Articulo){
    console.log(articulo);
    this.articuloSeleccionado = articulo;
  }
 
  mostrarSideBar(){
    console.log("Eeeee")
    if(this.sideBar?.mostrarSideBar === undefined){
      console.log("inde");
    }
    this.sideBar?.mostrarSideBar();
  }

}