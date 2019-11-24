import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {PlanItemPage} from './item.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{path: '', component: PlanItemPage}])
  ],
  declarations: [PlanItemPage]
})
export class PlanItemPageModule {
}
