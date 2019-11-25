import {Component, Inject} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {LocationStrategy} from '@angular/common';
import {TabsService} from '../../../tabs/tabs.service';
import {AuthService} from '../../auth/auth.service';
import {CaseService} from '../../company/case/case.service';

@Component({
  selector: 'app-industry-item',
  templateUrl: 'item.page.html',
  styleUrls: ['item.page.scss']
})
export class IndustryItemPage {
  id = this.route.snapshot.params.id;
  token = this.authSvc.token();
  data;
  colors = ['basic', 'primary', 'accent', 'warn', 'link'];

  constructor(private title: Title,
              private route: ActivatedRoute,
              private location: LocationStrategy,
              private tabsSvc: TabsService,
              @Inject('FILE_PREFIX_URL') public FILE_PREFIX_URL,
              private authSvc: AuthService,
              private caseSvc: CaseService) {
  }

  ionViewDidEnter() {
    this.tabsSvc.set(false);
    this.caseSvc.get(this.token.key, this.id).subscribe(res => {
      res.caseContent = res.caseContent.replace(/\/wisp\/admin\/fileupload\/previewFile/gi, '/api/wisp/admin/fileupload/previewFile');
      res.inspireContent = res.inspireContent.replace(/\/wisp\/admin\/fileupload\/previewFile/gi, '/api/wisp/admin/fileupload/previewFile');
      this.title.setTitle(res.caseName);
      this.data = res;
    });
  }

  back() {
    this.location.back();
  }

}
