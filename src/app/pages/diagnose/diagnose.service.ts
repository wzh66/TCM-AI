import {Injectable, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {mergeMap as observableMargeMap} from 'rxjs/operators';

import {resultProcess, formData} from '../../utils/utils';

@Injectable({providedIn: 'root'})
export class DiagnoseService {
    constructor(@Inject('PREFIX_URL') private PREFIX_URL, private http: HttpClient) {
    }

    list(body): Observable<any> {
        return this.http.post(this.PREFIX_URL + 'register', body)
            .pipe(observableMargeMap((res: any) => {
                return resultProcess(res);
            }));
    }

    submit(body): Observable<any> {
        return this.http.post(this.PREFIX_URL + 'submit', body)
            .pipe(observableMargeMap((res: any) => {
                return resultProcess(res);
            }));
    }

    getMember(key): Observable<any> {
        return this.http.get(this.PREFIX_URL + 'getMember&key=' + key).pipe(observableMargeMap((res: any) => {
            return this.processResult(res);
        }));
    }

    getQuestionList(key): Observable<any> {
        return this.http.get(this.PREFIX_URL + 'questionList&key=' + key).pipe(observableMargeMap((res: any) => {
            return this.processResult(res);
        }));
    }

    protected processResult(res): Observable<any> {
        return resultProcess(res);
    }
}
