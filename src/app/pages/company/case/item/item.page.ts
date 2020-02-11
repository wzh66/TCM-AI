import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {LocationStrategy} from '@angular/common';

import {PickerService} from '../../../../@core/modules/picker';
import {TabsService} from '../../../../tabs/tabs.service';
import {DictService} from '../../../../@core/data/dict.service';
import {AuthService} from '../../../auth/auth.service';
import {CaseService} from '../case.service';

@Component({
  selector: 'app-company-case-item',
  templateUrl: 'item.page.html',
  styleUrls: ['item.page.scss']
})
export class CompanyCaseItemPage {
  id = this.route.snapshot.params.id;
  token = this.authSvc.token();
  data;

  constructor(private title: Title,
              private route: ActivatedRoute,
              private location: LocationStrategy,
              private pickerSvc: PickerService,
              private tabsSvc: TabsService,
              private dictSvc: DictService,
              private authSvc: AuthService,
              private caseSvc: CaseService) {
  }

  ionViewDidEnter() {
    this.title.setTitle('添加跟进记录');
    this.tabsSvc.set(false);
    this.caseSvc.get(this.token.key, this.id).subscribe(res => {
      console.log(res);
    });
  }

}
