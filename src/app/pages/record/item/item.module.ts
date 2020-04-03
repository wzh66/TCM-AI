import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import {ThemeModule} from '../../../@theme/theme.module';
import {RouterModule} from '@angular/router';
import {RecordItemPage} from './item.page';
import {GalleryModule} from '../../../@core/modules/gallery';




@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        ThemeModule,
        RouterModule.forChild([{path: '', component: RecordItemPage}]),
        GalleryModule
    ],
  declarations: [RecordItemPage]
})
export class RecordItemPageModule {}
