import {Component} from '@angular/core';
import {Inject} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {LocationStrategy} from '@angular/common';
import {TabsService} from '../../../../tabs/tabs.service';
import {AuthService} from '../../../auth/auth.service';
import {CompanyService} from '../../company.service';
import {CaseService} from '../case.service';

@Component({
  selector: 'app-company-case-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class CompanyCaseListPage {
  token = this.authSvc.token();
  id = this.route.snapshot.params.id;
  company;
  ids;
  data;
  total;
  params = {
    key: this.token.key,
    ids: '',
    page: 1
  };

  colors = ['basic', 'primary', 'accent', 'warn', 'link'];

  constructor(private title: Title,
              private route: ActivatedRoute,
              private location: LocationStrategy,
              private tabsSvc: TabsService,
              @Inject('FILE_PREFIX_URL') public FILE_PREFIX_URL,
              private authSvc: AuthService,
              private companySvc: CompanyService,
              private caseSvc: CaseService) {
  }

  getData() {
    this.caseSvc.list(this.params).subscribe(res => {
      this.data = res.list;
      this.total = res.total;
    });
  }

  ionViewDidEnter() {
    this.title.setTitle('查看行业案例');
    this.tabsSvc.set(false);
    this.companySvc.get(this.token.key, this.id).subscribe(res => {
      this.company = res;
      console.log(this.company);
      this.params.ids = res.industryIds;
      this.getData();
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
      this.caseSvc.list(this.params).subscribe(res => {
        this.data = this.data.concat(res.list);
        if (this.params.page >= res.totalPages) {
          event.target.disabled = true;
        }
      });
    }, 500);
  }

}
