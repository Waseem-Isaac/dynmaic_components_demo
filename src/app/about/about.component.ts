import { Component, OnInit, ViewChild, ViewContainerRef, Compiler, NgModule, ComponentFactoryResolver, ComponentRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit , AfterViewInit{
  @ViewChild('dynamic_cmpt1', {read: ViewContainerRef , static : false}) dynamic_cmpt1: ViewContainerRef;
  @ViewChild('dynamic_cmpt2', {read: ViewContainerRef , static : false}) dynamic_cmpt2: ViewContainerRef;
  cmpt1Ref : ComponentRef<DynamicComponent1> = null;
  cmpt2Ref : ComponentRef<DynamicComponent2> = null;
  constructor(private _compiler: Compiler, private resolver: ComponentFactoryResolver, private c: ChangeDetectorRef) { }

  ngOnInit() {
  }

  ngAfterViewInit(){
    this.createComponent1();
    this.createComponent2();

    this.c.detectChanges();
  }

  // using comiler 
  createComponent1() {
    let container = this.dynamic_cmpt1;
    const mod = this._compiler.compileModuleAndAllComponentsSync(DynamicComponent1Module);
    const factory = mod.componentFactories.find(
      c => c.componentType === DynamicComponent1
    );
    this.cmpt1Ref = container.createComponent(factory);
  }

  // Without compiler - create components without module
  createComponent2(){
    let container = this.dynamic_cmpt2;
    const factory = this.resolver.resolveComponentFactory(DynamicComponent2);
    this.cmpt2Ref = container.createComponent(factory);
  }

  // destroyCompnent(c_Identity: number){
  //   const cmpts = {'1' : this.cmpt1Ref , '2' :this.cmpt2Ref}

  //   cmpts[c_Identity].destroy();    
  // }
}

// ===============================================
// Component 1 (compile on runtime with its module)
@Component({
  selector: 'dynamic-cmpt1',
  template: `<h2>Dynamic component 1 Created</h2> <input type='text' [(ngModel)]="test" hidden>`,
  styles: ['h2 { padding : 20px; background-color: #fafafa; border : 1px solid #eee}']
})
export class DynamicComponent1 {}

@NgModule({ 
  imports: [FormsModule],
  declarations: [DynamicComponent1] 
})
export class DynamicComponent1Module {}
// ===============================================


// ===============================================
// Component 2 create on runtime without its module 
@Component({
  selector: 'dynamic-cmpt2',
  template: `<h2>Dynamic component 2 Created</h2> <input type='text' [(ngModel)]="test" hidden>`,
  styles: ['h2 { padding : 20px; background-color: #fafafa; border : 1px solid #eee}']
})
export class DynamicComponent2 {}
// ===============================================
