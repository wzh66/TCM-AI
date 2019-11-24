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

import {COMPONENTS, ENTRY_COMPONENTS, PIPES} from './index';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MATERIAL_PART,
    IonicModule
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MATERIAL_PART,
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
