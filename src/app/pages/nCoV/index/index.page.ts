import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {TabsService} from '../../../tabs/tabs.service';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-nCoV-list',
  templateUrl: 'index.page.html',
  styleUrls: ['index.page.scss']
})
export class NCoVIndexPage {

  constructor(private title: Title,
              private tabsSvc: TabsService,
              private authSvc: AuthService) {
  }

  ionViewDidEnter() {
    this.title.setTitle('政策列表');
    this.tabsSvc.set(false);
  }
}
