import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ThemeModule} from '../../../@theme/theme.module';
import {CompanyEditPage} from './edit.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    ThemeModule,
    RouterModule.forChild([{path: '', component: CompanyEditPage}]),
  ],
  declarations: [CompanyEditPage]
})
export class CompanyEditPageModule {
}
