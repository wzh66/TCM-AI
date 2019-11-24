import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ThemeModule} from '../../../../@theme/theme.module';
import {CompanyCaseListPage} from './list.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    ThemeModule,
    RouterModule.forChild([{path: '', component: CompanyCaseListPage}])
  ],
  declarations: [CompanyCaseListPage]
})
export class CompanyCaseListPageModule {
}
