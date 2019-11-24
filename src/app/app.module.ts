import {NgModule, QueryList, Query} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {RouteReuseStrategy} from '@angular/router';
import {RouteStrategy} from './@core/strategies/route.strategy';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {MaskModule} from './@core/modules/mask';
import {DialogModule} from './@core/modules/dialog';
import {PickerModule} from './@core/modules/picker';
import {AppRoutingModule} from './app-routing.module';
import {CoreModule} from './@core/core.module';
import {ThemeModule} from './@theme/theme.module';
import {AppComponent} from './app.component';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    IonicModule.forRoot({
      mode: 'ios'
    }),
    PickerModule,
    MaskModule,
    DialogModule,
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    QueryList,
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    {provide: 'PREFIX_URL', useValue: '/api/wisp/intf/call?action='},
    {provide: 'FILE_PREFIX_URL', useValue: '/api/wisp/admin/fileupload/previewFile?id='}
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
