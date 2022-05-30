import { PadreComponent } from './views/padre/padre.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioComponent } from './views/formulario/formulario/formulario.component';

const routes: Routes = [
  {
    path: '',
    component: PadreComponent,
    
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
