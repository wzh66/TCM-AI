import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ThemeModule} from '../../../../@theme/theme.module';
import {CompanyCaseItemPage} from './item.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    ThemeModule,
    RouterModule.forChild([{path: '', component: CompanyCaseItemPage}])
  ],
  declarations: [CompanyCaseItemPage]
})
export class CompanyCaseItemPageModule {
}
