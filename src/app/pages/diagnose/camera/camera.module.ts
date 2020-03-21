import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {DiagnoseCameraPage} from './camera.page';
import {RouterModule} from '@angular/router';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild([{path: '', component: DiagnoseCameraPage}]),
    ],
    declarations: [DiagnoseCameraPage]
})
export class DiagnoseCameraPageModule {
}
