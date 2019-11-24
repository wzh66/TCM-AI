import {Injectable, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {mergeMap as observableMargeMap} from 'rxjs/operators';
import {resultProcess} from '../../../utils/utils';

@Injectable({providedIn: 'root'})
export class LogService {
  constructor(@Inject('PREFIX_URL') private PREFIX_URL, private http: HttpClient) {
  }

  list(body): Observable<any> {
    return this.http.post(this.PREFIX_URL + 'getAssCustLogList', body)
      .pipe(observableMargeMap((res: any) => {
        return resultProcess(res);
      }));
  }
}
