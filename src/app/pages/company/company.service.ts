import {Injectable, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {mergeMap as observableMargeMap} from 'rxjs/operators';

import {resultProcess, formData} from '../../utils/utils';

@Injectable({providedIn: 'root'})
export class CompanyService {
  constructor(@Inject('PREFIX_URL') private PREFIX_URL, private http: HttpClient) {
  }

  list(params): Observable<any> {
    return this.http.post(this.PREFIX_URL + 'getAssCustList', params)
      .pipe(observableMargeMap((res: any) => {
        return this.processResult(res);
      }));
  }

  get(key, id): Observable<any> {
    return this.http.get(this.PREFIX_URL + 'getAssCust' + '&key=' + key + '&id=' + id).pipe(observableMargeMap((res: any) => {
      return this.processResult(res);
    }));
  }

  find(name): Observable<any> {
    return this.http.get('https://api-v1.wispclouds.com/api/v1/company/getDetailByCompanyName?companyName=' + name);
  }

  research(body): Observable<any> {
    return this.http.post(this.PREFIX_URL + 'addAssCust', body).pipe(observableMargeMap((res: any) => {
      return this.processResult(res);
    }));
  }

  update(body): Observable<any> {
    return this.http.post(this.PREFIX_URL + 'updateAssCust', body).pipe(observableMargeMap((res: any) => {
      return this.processResult(res);
    }));
  }

  delete(key, id): Observable<any> {
    return this.http.post(this.PREFIX_URL + 'delAssCust', formData({key: key, id: id})).pipe(observableMargeMap((res: any) => {
      return this.processResult(res);
    }));
  }

  validatorName(key, company): Observable<any> {
    return this.http.post(this.PREFIX_URL + 'findByCompName', {key: key, company: company}).pipe(observableMargeMap((res: any) => {
      return this.processResult(res);
    }));
  }

  protected processResult(res): Observable<any> {
    return resultProcess(res);
  }
}
