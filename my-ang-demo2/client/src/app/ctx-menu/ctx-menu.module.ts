import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { SharedModule } from '../shared/shared.module';
import { ContextMenuModule } from '@perfectmemory/ngx-contextmenu';

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ContextMenuModule
  ],
  exports: [
    MainComponent
  ]
})
export class CtxMenuModule { }
