import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {path : '' , loadChildren: () => import ('./home/home.module').then(m => m.HomeModule)},
  {path : 'about' , loadChildren: () => import ('./about/about.module').then(m => m.AboutModule) },
  {path : '**' , redirectTo : ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
