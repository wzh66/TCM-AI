import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {IonicModule} from '@ionic/angular';
import {ThemeModule} from '../../../@theme/theme.module';
import {RouterModule} from '@angular/router';
import {DiagnoseListPage} from './list.page';
import {MatRadioModule} from '@angular/material';


@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        ThemeModule,
        RouterModule.forChild([{path: '', component: DiagnoseListPage}]),
        MatRadioModule
    ],
    declarations: [DiagnoseListPage]
})
export class DiagnoseListPageModule {
}
