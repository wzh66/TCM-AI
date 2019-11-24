import {Injectable} from '@angular/core';
import {Observable, BehaviorSubject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class TabsService {
  state = new BehaviorSubject<boolean>(true);

  constructor() {
  }

  set(state) {
    this.state.next(state);
  }

  get(): Observable<any> {
    return this.state.asObservable();
  }
}
