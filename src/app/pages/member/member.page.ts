import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {ModalController} from '@ionic/angular';
import {PickerService} from '../../@core/modules/picker';
import {TabsService} from '../../tabs/tabs.service';
import {StorageService} from '../../@core/utils/storage.service';
import {DictService} from '../../@core/data/dict.service';
import {AuthService} from '../auth/auth.service';
import {MemberService} from './member.service';
import {FollowService} from '../company/follow/follow.service';
import {DialogService} from '../../@core/modules/dialog';
import {IonInfiniteScroll} from '@ionic/angular';
import {DatePipe} from '@angular/common';
import {OwnerComponent} from './owner/owner';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from 'saturn-datepicker';


@Component({
  selector: 'app-member',
  templateUrl: './member.page.html',
  styleUrls: ['./member.page.scss'],
  providers: [DatePipe,
    {provide: MAT_DATE_LOCALE, useValue: 'zh_CN'},
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS}
  ]
})
export class MemberPage {
  token = this.authSvc.token();
  data;
  now = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  @ViewChild(IonInfiniteScroll, {static: true}) infiniteScroll: IonInfiniteScroll;
  labels;
  params = {
    key: this.token.key,
    page: 1,
    followTime: this.now + ',' + this.now,
    followLabel: '',
    createByName: this.token.name
  };
  form: FormGroup;

  constructor(private router: Router,
              private storageSvc: StorageService,
              private title: Title,
              private modalController: ModalController,
              private pickerSvc: PickerService,
              @Inject('FILE_PREFIX_URL') public FILE_PREFIX_URL,
              private dictSvc: DictService,
              private tabsSvc: TabsService,
              private authSvc: AuthService,
              private memberSvc: MemberService,
              private dialogSvc: DialogService,
              private followSvc: FollowService,
              private datePipe: DatePipe,
              fb: FormBuilder) {
    this.form = fb.group({
      date: [{begin: new Date(), end: new Date()}]
    });
  }

  ionViewDidEnter() {
    this.title.setTitle('个人中心');
    this.tabsSvc.set(true);
    this.params.page = 1;
    this.dictSvc.get('followLabel').subscribe(res => {
      const labels = [{label: '所有', value: ''}];
      res.result.forEach(item => {
        labels.push({
          label: item.dictName,
          value: item.dictValue
        });
        this.labels = labels;
      });
    });
    this.getData();
  }

  getData() {
    this.params.page = 1;
    this.followSvc.group(this.params).subscribe(res => {
      console.log(res);
      this.data = res.list;
    });
  }

  timeChange(e) {
    console.log(e.value);
    this.params.followTime = this.datePipe.transform(e.value.begin, 'yyyy-MM-dd') + ',' +
      this.datePipe.transform(e.value.end, 'yyyy-MM-dd');
    this.getData();
  }

  async presentModal() {
    const modal = await this.modalController.create({
      showBackdrop: true,
      component: OwnerComponent,
      componentProps: {owner: this.params.createByName}
    });
    await modal.present();
    const {data} = await modal.onDidDismiss(); // 获取关闭传回的值
    this.params.createByName = data;
    this.getData();
    // this.form.get('industryIds').markAsTouched();
    // this.selectedIndustries = data;
    // this.setIndustries();
  }

  showPicker() {
    this.pickerSvc.show([this.labels], '').subscribe(res => {
      // this.form.get(target).setValue(res.value);
      console.log(res);
      this.params.followLabel = res.items[0].value;
      this.getData();
    });
  }

  loadData(event) {
    setTimeout(() => {
      event.target.complete();
      this.params.page++;
      this.followSvc.group(this.params).subscribe(res => {
        this.data = this.data.concat(res.list);
        if (this.params.page >= res.totalPages) {
          event.target.disabled = true;
        }
      });
    }, 500);
  }

  segmentChanged(e) {
    /*console.log(e.detail.value);
    if (e.detail.value === 'time') {
      this.timeShow();
    }*/
  }

  ionViewDidLeave() {
    this.infiniteScroll.disabled = false;
  }
}
