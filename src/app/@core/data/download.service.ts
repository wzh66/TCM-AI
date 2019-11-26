import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor(@Inject('FILE_PREFIX_URL') private FILE_PREFIX_URL,
              private http: HttpClient) {
  }

  item(id): Observable<any> {
    return this.http.get(this.FILE_PREFIX_URL + id, {responseType: 'blob'});
  }
}
