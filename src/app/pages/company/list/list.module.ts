import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ThemeModule} from '../../../@theme/theme.module';
import {CompanyListPage} from './list.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    ThemeModule,
    RouterModule.forChild([{path: '', component: CompanyListPage}])
  ],
  declarations: [CompanyListPage]
})
export class CompanyListPageModule {
}
