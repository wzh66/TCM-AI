import {Component, Inject, ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {LocationStrategy} from '@angular/common';
import {Title} from '@angular/platform-browser';
import {TabsService} from '../../../tabs/tabs.service';
import {DownloadService} from '../../../@core/data/download.service';
import {AuthService} from '../../auth/auth.service';
import {PlanService} from '../plan.service';
import {IonInfiniteScroll} from '@ionic/angular';

declare var $: any;

@Component({
  selector: 'app-plan-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class PlanListPage {
  token = this.authSvc.token();
  data;

  params = {
    key: this.token.key,
    id: this.route.snapshot.params.id,
    demension: '0',
    page: 1
  };

  @ViewChild(IonInfiniteScroll, {static: true}) infiniteScroll: IonInfiniteScroll;

  constructor(private title: Title,
              private route: ActivatedRoute,
              private router: Router,
              private location: LocationStrategy,
              private downloadSvc: DownloadService,
              @Inject('FILE_PREFIX_URL') public FILE_PREFIX_URL,
              private tabsSvc: TabsService,
              private authSvc: AuthService,
              private planSvc: PlanService) {
  }

  ionViewDidEnter() {
    this.title.setTitle('查看培育方案');
    this.tabsSvc.set(false);

    this.planSvc.list(this.params).subscribe(res => {
      this.data = res.list;
    });
  }

  segmentChanged(e) {
    this.params.demension = e.detail.value;
    this.params.page = 1;
    this.infiniteScroll.disabled = false;
    this.planSvc.list(this.params).subscribe(res => {
      this.data = res.list;
    });
  }

  download(id, name) {
    this.downloadSvc.item(id).subscribe(res => {
      const a = document.createElement('a');
      const url = window.URL.createObjectURL(res);
      const filename = name + '.docx';
      a.href = url;
      a.download = filename;
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }

  loadData(event) {
    setTimeout(() => {
      event.target.complete();
      this.params.page++;
      this.planSvc.list(this.params).subscribe(res => {
        this.data = this.data.concat(res.list);
        if (this.params.page >= res.totalPages) {
          event.target.disabled = true;
        }
      });
    }, 500);
  }

}
