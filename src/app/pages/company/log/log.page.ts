import {Component, ViewChild, OnInit, Inject} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {TabsService} from '../../../tabs/tabs.service';
import {AuthService} from '../../auth/auth.service';
import {LogService} from './log.service';

@Component({
  selector: 'app-company-log',
  templateUrl: 'log.page.html',
  styleUrls: ['log.page.scss']
})
export class CompanyLogPage {
  token = this.authSvc.token();
  data;
  totalPages = 1;
  params = {
    key: this.token.key,
    id: this.route.snapshot.params.id,
    page: 1
  };

  constructor(private title: Title,
              private route: ActivatedRoute,
              @Inject('FILE_PREFIX_URL') public FILE_PREFIX_URL,
              private tabsSvc: TabsService,
              private authSvc: AuthService,
              private logSvc: LogService) {
  }

  ionViewDidEnter() {
    this.title.setTitle('修改记录');
    this.tabsSvc.set(false);
    this.logSvc.list(this.params).subscribe(res => {
      this.data = res.list;
      this.totalPages = res.totalPages;
    });
  }

  loadData(event) {
    setTimeout(() => {
      event.target.complete();
      if (this.params.page >= this.totalPages) {
        event.target.disabled = true;
      } else {
        this.params.page++;
        this.logSvc.list(this.params).subscribe(res => {
          this.data = this.data.concat(res.list);
        });
      }
    }, 500);
  }

}
