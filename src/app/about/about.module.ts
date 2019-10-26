import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { AboutComponent, DynamicComponent2 } from './about.component';
import { AboutRoutingModule } from './about-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AboutComponent,
    DynamicComponent2,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AboutRoutingModule
  ],
  entryComponents: [DynamicComponent2],
  providers: [],
})
export class AboutModule { }
