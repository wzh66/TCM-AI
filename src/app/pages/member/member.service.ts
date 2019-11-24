import {Injectable, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {mergeMap as observableMargeMap} from 'rxjs/operators';
import {resultProcess} from '../../utils/utils';

@Injectable({providedIn: 'root'})
export class MemberService {
  constructor(@Inject('PREFIX_URL') private PREFIX_URL, private http: HttpClient) {
  }

  get(key): Observable<any> {
    return this.http.get(this.PREFIX_URL + 'getUser' + '&key=' + key)
      .pipe(observableMargeMap((res: any) => {
        return this.processResult(res);
      }));
  }

  protected processResult(res): Observable<any> {
    return resultProcess(res);
  }
}
