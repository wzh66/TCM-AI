import {Component, Inject} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {LocationStrategy} from '@angular/common';
import {ModalController} from '@ionic/angular';
import {TabsService} from '../../../tabs/tabs.service';
import {AuthService} from '../../auth/auth.service';
import {CompanyService} from '../../company/company.service';
import {CaseService} from '../../company/case/case.service';
import {IndustryComponent} from '../../../@theme/components/industry/industry';

@Component({
  selector: 'app-industry-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class IndustryListPage {

  token = this.authSvc.token();
  data;
  total;
  params = {
    key: this.token.key,
    ids: '',
    page: 1
  };
  selectedIndustries = [];
  colors = ['basic', 'primary', 'accent', 'warn', 'link'];
  listHeader = '行业案例';

  constructor(private title: Title,
              private route: ActivatedRoute,
              private location: LocationStrategy,
              private modalController: ModalController,
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
    this.tabsSvc.set(true);
    this.getData();
  }

  async presentModal() {
    const modal = await this.modalController.create({
      showBackdrop: true,
      component: IndustryComponent,
      componentProps: {items: this.selectedIndustries}
    });
    await modal.present();
    const {data} = await modal.onDidDismiss(); // 获取关闭传回的值
    this.selectedIndustries = data;
    this.getListHeader();
  }

  getListHeader() {
    let content = '行业案例';
    let ids = '';
    if (this.selectedIndustries.length > 0) {
      content = '';
      this.selectedIndustries.forEach(industry => {
        if (content) {
          content = content + ',' + industry.industryName;
          ids = ids + ',' + industry.id;
        } else {
          content = content + industry.industryName;
          ids = ids + industry.id;
        }
      });
    }
    this.params.ids = ids;
    this.listHeader = content;
    this.getData();
  }

}
