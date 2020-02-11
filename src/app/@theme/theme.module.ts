import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {IonicModule} from '@ionic/angular';
import {
  MatFormFieldModule,
  MatButtonModule,
  MatInputModule,
  MatIconModule,
  MatCheckboxModule,
  MatChipsModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatBadgeModule,
  MatCardModule
} from '@angular/material';

const MATERIAL_PART = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatCheckboxModule,
  MatChipsModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatBadgeModule,
  MatCardModule
];

import {UploaderModule} from './modules/uploader';
import {SatDatepickerModule, SatNativeDateModule} from 'saturn-datepicker';
import {NgxEchartsModule} from 'ngx-echarts';
import {WxModule} from '../@core/modules/wx';
import {COMPONENTS, ENTRY_COMPONENTS, PIPES} from './index';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MATERIAL_PART,
    IonicModule,
    UploaderModule,
    SatDatepickerModule,
    SatNativeDateModule,
    NgxEchartsModule,
    WxModule.forRoot()
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MATERIAL_PART,
    UploaderModule,
    SatDatepickerModule,
    SatNativeDateModule,
    NgxEchartsModule,
    WxModule,
    ...COMPONENTS,
    ...PIPES
  ],
  declarations: [...COMPONENTS, ...ENTRY_COMPONENTS, ...PIPES],
  entryComponents: [ENTRY_COMPONENTS]
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ThemeModule,
      providers: []
    } as ModuleWithProviders;
  }
}
