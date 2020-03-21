import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import {DiagnoseQuestionPage,} from './question.page';
import {RouterModule} from '@angular/router';
import {MatRadioModule} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        RouterModule.forChild([{path: '', component: DiagnoseQuestionPage}]),
        MatRadioModule,
        ReactiveFormsModule,
    ],
  declarations: [DiagnoseQuestionPage]
})
export class DiagnoseQuestionPageModule {}
