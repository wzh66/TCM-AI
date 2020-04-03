import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import {RouterModule} from '@angular/router';

import {DiagnoseResultPage} from './result.page';
import {GalleryModule} from '../../../@core/modules/gallery';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild([{path: '', component: DiagnoseResultPage}]),
        GalleryModule,
    ],
  declarations: [DiagnoseResultPage]
})
export class DiagnoseResultModule {}
