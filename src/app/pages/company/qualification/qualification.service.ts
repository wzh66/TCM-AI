import {Injectable, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {mergeMap as observableMargeMap} from 'rxjs/operators';
import {resultProcess} from '../../../utils/utils';

@Injectable({providedIn: 'root'})
export class QualificationService {
  constructor(@Inject('PREFIX_URL') private PREFIX_URL, private http: HttpClient) {
  }

  list(key, id, type): Observable<any> {
    return this.http.get(this.PREFIX_URL + 'getCredsByCustId&key=' + key + '&custId=' + id + '&demension=' + type)
      .pipe(observableMargeMap((res: any) => {
        return resultProcess(res);
      }));
  }

  item(key, type, credId?): Observable<any> {
    return this.http.get(this.PREFIX_URL + 'getCredById&key=' + key + '&demension=' + type + '&credId=' + (credId ? credId : ''))
      .pipe(observableMargeMap((res: any) => {
        return resultProcess(res);
      }));
  }

  add(body): Observable<any> {
    return this.http.post(this.PREFIX_URL + 'addCred', body)
      .pipe(observableMargeMap((res: any) => {
        return resultProcess(res);
      }));
  }

  create(key, id): Observable<any> {
    return this.http.get(this.PREFIX_URL + 'genReport' + '&key=' + key + '&credId=' + id)
      .pipe(observableMargeMap((res: any) => {
        return resultProcess(res);
      }));
  }
}
