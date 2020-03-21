import {Injectable, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {mergeMap as observableMargeMap} from 'rxjs/operators';

import {resultProcess, formData} from '../../utils/utils';

@Injectable({providedIn: 'root'})
export class IndexService {
    constructor(@Inject('PREFIX_URL') private PREFIX_URL, private http: HttpClient) {
    }

    getImgList(): Observable<any> {
        return this.http.get(this.PREFIX_URL + 'indexImgList').pipe(observableMargeMap((res: any) => {
            return this.processResult(res);
        }));
    }

    getNewsList(): Observable<any> {
        return this.http.get(this.PREFIX_URL + 'newsIndexList').pipe(observableMargeMap((res: any) => {
            return this.processResult(res);
        }));
    }


    protected processResult(res): Observable<any> {
        return resultProcess(res);
    }
}
