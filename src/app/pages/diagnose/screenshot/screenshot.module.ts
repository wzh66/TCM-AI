import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import {DiagnoseScreenshotPage} from './screenshot.page';
import {RouterModule} from '@angular/router';
import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{path: '', component: DiagnoseScreenshotPage}]),
    DragDropModule,
  ],
  declarations: [DiagnoseScreenshotPage]
})
export class DiagnoseScreenshotPageModule {}
