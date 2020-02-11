import {Injectable, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {mergeMap as observableMargeMap} from 'rxjs/operators';
import {resultProcess} from '../../utils/utils';

@Injectable({providedIn: 'root'})
export class NCoVService {
  constructor(@Inject('PREFIX_URL') private PREFIX_URL, private http: HttpClient) {
  }

  get(): Observable<any> {
    return this.http.post(this.PREFIX_URL + 'getPolicySurvey', {word: '【疫情政策】'})
    .pipe(observableMargeMap((res: any) => {
      return resultProcess(res);
    }));
  }

  list(body): Observable<any> {
    return this.http.post(this.PREFIX_URL + 'getActivityPolicyList', body)
    .pipe(observableMargeMap((res: any) => {
      return resultProcess(res);
    }));
  }

  central(body): Observable<any> {
    return this.http.post(this.PREFIX_URL + 'getCountryPolicyList', body)
    .pipe(observableMargeMap((res: any) => {
      return resultProcess(res);
    }));
  }

  work(body): Observable<any> {
    return this.http.post(this.PREFIX_URL + 'getEmploymentProblemList', body)
    .pipe(observableMargeMap((res: any) => {
      return resultProcess(res);
    }));
  }

  workItem(id): Observable<any> {
    return this.http.get(this.PREFIX_URL + 'getEmploymentProblemDetail' + '&id=' + id)
    .pipe(observableMargeMap((res: any) => {
      return resultProcess(res);
    }));
  }

  item(id): Observable<any> {
    return this.http.get(this.PREFIX_URL + 'getActivityPolicy' + '&id=' + id)
    .pipe(observableMargeMap((res: any) => {
      return resultProcess(res);
    }));
  }

  add(body): Observable<any> {
    return this.http.post(this.PREFIX_URL + 'addPolicy', body)
    .pipe(observableMargeMap((res: any) => {
      return resultProcess(res);
    }));
  }
}
