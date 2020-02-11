import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(@Inject('FILE_PREFIX_URL') private FILE_PREFIX_URL,
              private http: HttpClient) {
  }

  get(): Observable<any> {
    return this.http.get('/assets/china.json');
  }
}
