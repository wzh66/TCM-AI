import {Component, ViewChild, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {IonInfiniteScroll} from '@ionic/angular';
import {ModalController} from '@ionic/angular';
import {TabsService} from '../../../tabs/tabs.service';
import {PickerService} from '../../../@core/modules/picker';
import {AuthService} from '../../auth/auth.service';
import {CompanyService} from '../company.service';

import {DATA} from '../../../@core/data/cn';
import {IndustryComponent} from '../../../@theme/components/industry/industry';

@Component({
  selector: 'app-company-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class CompanyListPage {
  token = this.authSvc.token();
  slideOpts = {
    initialSlide: 1,
    slidesPerView: 4,
    speed: 400
  };

  data;

  province;
  city;
  area;
  selectedIndustries = [];
  params = {
    key: this.token.key,
    company: '',
    province: '',
    city: '',
    area: '',
    industryIds: [],
    industryNames: [],
    page: 1
  };

  provinces = this.getList(DATA);
  target;
  @ViewChild(IonInfiniteScroll, {static: true}) infiniteScroll: IonInfiniteScroll;

  constructor(private title: Title,
              private modalController: ModalController,
              private tabsSvc: TabsService,
              private pickerSvc: PickerService,
              private authSvc: AuthService,
              private companySvc: CompanyService) {
  }

  ionViewDidEnter() {
    this.title.setTitle('签单助手');
    this.tabsSvc.set(true);
    this.getData();
  }

  getList(list) {
    const items = [];
    list.forEach(item => {
      items.push({
        label: item.name,
        value: item.code,
        sub: item.sub
      });
    });
    return items;
  }

  showPicker(type, selectable) {
    if (!selectable) {
      return false;
    }
    let data = this.provinces;
    if (type === 'city') {
      data = this.getList(this.province.sub);
    }
    if (type === 'area') {
      data = this.getList(this.city.sub);
    }
    this.pickerSvc.show([data]).subscribe(res => {
      console.log(res);
      this[type] = res.items[0];
      this.params[type] = res.items[0].label;
      this.params.page = 1;
      this.infiniteScroll.disabled = false;
      this.getData();
    });
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
    this.setIndustries();
  }

  setIndustries() {
    const ids = [];
    this.selectedIndustries.forEach(item => {
      ids.push(item.id);
    });
    this.params.industryIds = ids;
    this.params.page = 1;
    this.infiniteScroll.disabled = false;
    this.getData();
  }

  change(e) {
    this.params.page = 1;
    this.params.company = e.detail.value;
    this.infiniteScroll.disabled = false;
    this.getData();
  }

  getData() {
    this.companySvc.list(this.params).subscribe(res => {
      this.data = res.list;
    });
  }

  loadData(event) {
    this.target = event.target;
    setTimeout(() => {
      event.target.complete();
      this.params.page++;
      this.companySvc.list(this.params).subscribe(res => {
        this.data = this.data.concat(res.list);
        if (this.params.page >= res.totalPages) {
          event.target.disabled = true;
        }
      });
    }, 500);
  }
}
