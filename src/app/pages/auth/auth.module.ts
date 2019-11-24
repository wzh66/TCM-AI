import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {ThemeModule} from '../../@theme/theme.module';
import {AuthPage} from './auth.page';

@NgModule({
  imports: [
    IonicModule,
    ThemeModule,
    RouterModule.forChild([{path: '', component: AuthPage}])
  ],
  declarations: [AuthPage]
})
export class AuthPageModule {
}
