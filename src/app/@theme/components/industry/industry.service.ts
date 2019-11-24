import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {resultProcess} from '../../../utils/utils';
import {mergeMap as observableMargeMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IndustryService {

  constructor(@Inject('PREFIX_URL') private PREFIX_URL,
              private http: HttpClient) {
  }

  list(key): Observable<any> {
    return this.http.get(this.PREFIX_URL + 'getIndustryList' + '&key=' + key).pipe(observableMargeMap((res: any) => {
      return resultProcess(res);
    }));
  }
}
