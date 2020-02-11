import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Router, ActivatedRoute} from '@angular/router';
import {LocationStrategy} from '@angular/common';
import {FormGroup, FormControl, Validators} from '@angular/forms';

import {PickerService} from '../../../../@core/modules/picker';
import {ToastService} from '../../../../@core/modules/toast';
import {DialogService} from '../../../../@core/modules/dialog';
import {TabsService} from '../../../../tabs/tabs.service';
import {DictService} from '../../../../@core/data/dict.service';
import {AuthService} from '../../../auth/auth.service';
import {FollowService} from '../follow.service';

@Component({
  selector: 'app-company-follow-item',
  templateUrl: 'item.page.html',
  styleUrls: ['item.page.scss']
})
export class CompanyFollowItemPage {
  id = this.route.snapshot.params.id;
  token = this.authSvc.token();
  data;
  form: FormGroup;
  labels;

  constructor(private title: Title,
              private route: ActivatedRoute,
              private location: LocationStrategy,
              private toastSvc: ToastService,
              private dialogSvc: DialogService,
              private pickerSvc: PickerService,
              private tabsSvc: TabsService,
              private dictSvc: DictService,
              private authSvc: AuthService,
              private followSvc: FollowService) {
    this.form = new FormGroup({
      key: new FormControl(this.token.key, [Validators.required]),
      id: new FormControl(this.id, [Validators.required]),
      followPerson: new FormControl(this.token.name, [Validators.required]),
      followTime: new FormControl('', [Validators.required]),
      followLabel: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required])
    });
  }

  showPicker(target) {
    this.pickerSvc.show([this.labels], '').subscribe(res => {
      this.form.get(target).setValue(res.value);
    });
  }

  datePicker(target) {
    this.pickerSvc.showDateTime('datetime').subscribe(res => {
      console.log(res);
      this.form.get(target).setValue(res.formatValue);
    });
  }

  ionViewDidEnter() {
    this.title.setTitle('添加跟进记录');
    this.tabsSvc.set(false);
    this.dictSvc.get('followLabel').subscribe(res => {
      const labels = [];
      res.result.forEach(item => {
        labels.push({
          label: item.dictName,
          value: item.dictValue
        });
        this.labels = labels;
        console.log(this.labels);
      });
    });
  }

  submit() {
    if (this.form.invalid) {
      return false;
    }
    this.toastSvc.show('提交中...', 0);
    this.followSvc.add(this.form.value).subscribe(res => {
      this.toastSvc.hide();
      if (res) {
        this.dialogSvc.show({content: '您已成功提交！', cancel: '取消', confirm: '我知道了'}).subscribe(state => {
          if (state) {
            this.location.back();
          }
        });
      }
    });
  }

}
