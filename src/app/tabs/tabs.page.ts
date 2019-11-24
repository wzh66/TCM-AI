import {Component} from '@angular/core';
import {TabsService} from './tabs.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  state;

  constructor(private tabsSvc: TabsService) {
    tabsSvc.get().subscribe(res => {
      this.state = res;
    });
  }

}
