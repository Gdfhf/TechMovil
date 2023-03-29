import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TablaComponent } from './tabla/tabla.component';
import { FormularioComponent } from './formulario/formulario.component';
import { TablaProveedoresComponent } from './tabla-proveedores/tabla-proveedores.component';
import { FormularioProveedoresComponent } from './formulario-proveedores/formulario-proveedores.component';

const routes :  Routes = [
  {path: 'articulos', component: TablaComponent},
  {path:  'agregararticulo', component:  FormularioComponent},
  {path: 'proveedores', component: TablaProveedoresComponent},
  {path:  'agregarproveedores', component:  FormularioProveedoresComponent},
  {path: "modificararticulo/:id", component: FormularioComponent},
  {path: "modificarproveedor/:id", component: FormularioProveedoresComponent},
  {path: '**', redirectTo : ''}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
