import {Injectable, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {mergeMap as observableMargeMap} from 'rxjs/operators';

import {resultProcess, formData} from '../../utils/utils';

@Injectable({providedIn: 'root'})
export class NewsService {
    constructor(@Inject('PREFIX_URL') private PREFIX_URL, private http: HttpClient) {
    }

    get(): Observable<any> {
        return this.http.get(this.PREFIX_URL + 'newsList').pipe(observableMargeMap((res: any) => {
            return this.processResult(res);
        }));
    }

    getNewsDetail(id): Observable<any> {
        return this.http.get(this.PREFIX_URL + 'getNewsDetail&id=' + id).pipe(observableMargeMap((res: any) => {
            return this.processResult(res);
        }));
    }


    protected processResult(res): Observable<any> {
        return resultProcess(res);
    }
}
