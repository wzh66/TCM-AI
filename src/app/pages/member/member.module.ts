import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ThemeModule} from '../../@theme/theme.module';
import {MemberPage} from './member.page';
import {OwnerComponent} from './owner/owner';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ThemeModule,
    RouterModule.forChild([{path: '', component: MemberPage}])
  ],
  declarations: [MemberPage, OwnerComponent],
  entryComponents: [OwnerComponent]
})
export class MemberPageModule {
}
