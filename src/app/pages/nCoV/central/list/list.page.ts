import {Component, ViewChild, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {IonInfiniteScroll, LoadingController, ModalController} from '@ionic/angular';
import {StorageService} from '../../../../@core/utils/storage.service';
import {TabsService} from '../../../../tabs/tabs.service';
import {AuthService} from '../../../auth/auth.service';
import {NCoVService} from '../../ncov.service';
import {PickerService} from '../../../../@core/modules/picker';
import {DATA} from '../../../../@core/data/cn';

@Component({
  selector: 'app-nCov-central-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class NCoVCentralListPage {
  data;
  list;
  selectedIndustries = [];
  params = {
    amountOrder: 'desc',
    timeOrder: 'desc',
    word: '',
    page: 1
  };

  @ViewChild(IonInfiniteScroll, {static: true}) infiniteScroll: IonInfiniteScroll;

  constructor(private title: Title,
              private modalController: ModalController,
              private storageSvc: StorageService,
              private tabsSvc: TabsService,
              private pickerSvc: PickerService,
              private authSvc: AuthService,
              private nCoVSvc: NCoVService,
              private loadingController: LoadingController) {
  }

  ionViewDidEnter() {
    this.title.setTitle('中央政策');
    this.tabsSvc.set(false);

    this.getData();
  }

  getData() {
    this.params.page = 1;
    this.infiniteScroll.disabled = false;
    this.presentLoading();
    this.nCoVSvc.central(this.params).subscribe(res => {
      this.data = res.list;
    });
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: '正在努力加载中',
      duration: 1000
    });
    await loading.present();
    await loading.onDidDismiss();
  }

  search(e) {
    this.params.word = e.detail.value;
    this.getData();
  }

  loadData(event) {
    setTimeout(() => {
      event.target.complete();
      this.params.page++;
      this.nCoVSvc.central(this.params).subscribe(res => {
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
