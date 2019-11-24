import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {ErrorInterceptor} from './error.interceptors';

export const INTERCEPTORS = [
  {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
];
