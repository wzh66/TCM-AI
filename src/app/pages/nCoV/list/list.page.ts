import {Component, ViewChild, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {IonInfiniteScroll, ModalController} from '@ionic/angular';
import {StorageService} from '../../../@core/utils/storage.service';
import {TabsService} from '../../../tabs/tabs.service';
import {AuthService} from '../../auth/auth.service';
import {NCoVService} from '../ncov.service';
import {PickerService} from '../../../@core/modules/picker';
import {DATA} from '../../../@core/data/cn';

@Component({
  selector: 'app-nCov-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class NCoVListPage {
  data;
  list;
  selectedIndustries = [];
  params = {
    amountOrder: 'desc',
    timeOrder: 'desc',
    word: '',
    province: '',
    city: '',
    area: '',
    page: 1
  };

  @ViewChild(IonInfiniteScroll, {static: true}) infiniteScroll: IonInfiniteScroll;

  constructor(private title: Title,
              private modalController: ModalController,
              private storageSvc: StorageService,
              private tabsSvc: TabsService,
              private pickerSvc: PickerService,
              private authSvc: AuthService,
              private nCoVSvc: NCoVService) {
  }

  ionViewDidEnter() {
    this.title.setTitle('最新政策');
    this.tabsSvc.set(false);

    if (this.storageSvc.get('nCoV')) {
      this.data = JSON.parse(this.storageSvc.get('nCoV'));
      if (this.data.length < 1) {
        this.getData();
      }
    } else {
      this.getData();
    }

    const list = JSON.parse(JSON.stringify(DATA));
    list.forEach(province => {
      province.sub.unshift({
        name: '不选',
        code: province.code,
        sub: []
      });
      province.sub.forEach(city => {
        if (city.sub) {
          city.sub.unshift({
            name: '不选',
            code: city.code
          });
        }
      });
    });

    this.list = list;
  }

  getData() {
    this.params.page = 1;
    this.infiniteScroll.disabled = false;
    this.nCoVSvc.list(this.params).subscribe(res => {
      this.data = res.list;
    });
  }

  search(e) {
    this.params.word = e.detail.value;
    this.getData();
  }

  cityPicker() {
    this.pickerSvc.showCity(this.list).subscribe(res => {
      this.params.province = res.items[0].name;
      this.params.city = res.items[1].name;
      this.params.area = res.items[2] ? res.items[2].name : '';
      this.getData();
    });
  }

  loadData(event) {
    setTimeout(() => {
      event.target.complete();
      this.params.page++;
      this.nCoVSvc.list(this.params).subscribe(res => {
        this.data = this.data.concat(res.list);
        if (this.params.page >= res.totalPages) {
          event.target.disabled = true;
        }
      });
    }, 500);
  }

  ionViewDidLeave() {
    this.storageSvc.remove('nCoV');
  }
}
