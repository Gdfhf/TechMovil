import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  isShown: boolean = false;

  mostrarSideBar(){
    console.log("lol");
    this.isShown = !this.isShown;
  }
}
