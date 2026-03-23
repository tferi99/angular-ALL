import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { SharedModule } from '../shared/shared.module';
import { MyPanelComponent } from './my-panel/my-panel.component';
import { MyYellowChildComponent } from './my-yellow-child/my-yellow-child.component';
import { RenderMyChildComponent } from './render-my-child/render-my-child.component';

@NgModule({
  declarations: [
    MainComponent,
    MyPanelComponent,
    MyYellowChildComponent,
    RenderMyChildComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    MainComponent
  ]
})
export class TemplatingModule { }
