import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Router, ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {TabsService} from '../../../tabs/tabs.service';

@Component({
  selector: 'app-plan-company-item',
  templateUrl: 'item.page.html',
  styleUrls: ['item.page.scss']
})
export class PlanItemPage {
  id = this.route.snapshot.params.id;
  data;

  constructor(private title: Title,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private tabsSvc: TabsService) {
  }

  ionViewDidEnter() {
    this.title.setTitle('企业详情');
    this.tabsSvc.set(false);
  }

}
