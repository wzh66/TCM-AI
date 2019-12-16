import {Component} from '@angular/core';
import {Inject} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {LocationStrategy} from '@angular/common';
import {TabsService} from '../../../../tabs/tabs.service';
import {AuthService} from '../../../auth/auth.service';
import {FollowService} from '../follow.service';

@Component({
  selector: 'app-company-follow-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class CompanyFollowListPage {
  token = this.authSvc.token();
  id = this.route.snapshot.params.id;
  isOwner = this.route.snapshot.queryParams.owner;
  data;

  params = {
    key: this.isOwner ? this.token.key : '',
    id: this.id,
    page: 1
  };

  constructor(private title: Title,
              private route: ActivatedRoute,
              private location: LocationStrategy,
              private tabsSvc: TabsService,
              @Inject('FILE_PREFIX_URL') public FILE_PREFIX_URL,
              private authSvc: AuthService,
              private followSvc: FollowService) {
  }

  ionViewDidEnter() {
    this.title.setTitle('跟进记录');
    this.tabsSvc.set(false);
    this.followSvc.list(this.params).subscribe(res => {
      this.data = res.list;
    });
  }

  back() {
    this.location.back();
  }

  add() {
  }

  loadData(event) {
    setTimeout(() => {
      event.target.complete();
      this.params.page++;
      this.followSvc.list(this.params).subscribe(res => {
        this.data = this.data.concat(res.list);
        if (this.params.page >= res.totalPages) {
          event.target.disabled = true;
        }
      });
    }, 500);
  }

}
