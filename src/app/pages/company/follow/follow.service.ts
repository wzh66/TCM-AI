import {Injectable, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {mergeMap as observableMargeMap} from 'rxjs/operators';

import {resultProcess} from '../../../utils/utils';

@Injectable({providedIn: 'root'})
export class FollowService {
  constructor(@Inject('PREFIX_URL') private PREFIX_URL, private http: HttpClient) {
  }

  list(body): Observable<any> {
    return this.http.post(this.PREFIX_URL + 'getFollowList', body)
      .pipe(observableMargeMap((res: any) => {
        return this.processResult(res);
      }));
  }

  group(body): Observable<any> {
    return this.http.post(this.PREFIX_URL + 'getFollowGroupList', body)
      .pipe(observableMargeMap((res: any) => {
        return this.processResult(res);
      }));
  }

  get(id): Observable<any> {
    return this.http.get(this.PREFIX_URL + 'getAssCust' + '&id=' + id).pipe(observableMargeMap((res: any) => {
      return this.processResult(res);
    }));
  }

  add(body): Observable<any> {
    return this.http.post(this.PREFIX_URL + 'addFollow', body).pipe(observableMargeMap((res: any) => {
      return this.processResult(res);
    }));
  }

  protected processResult(res): Observable<any> {
    return resultProcess(res);
  }
}
