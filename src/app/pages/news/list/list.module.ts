import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import {ThemeModule} from '../../../@theme/theme.module';
import {RouterModule} from '@angular/router';
import {NewsListPage} from './list.page';




@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ThemeModule,
    RouterModule.forChild([{path: '', component: NewsListPage}])
  ],
  declarations: [NewsListPage]
})
export class NewsListPageModule {}
