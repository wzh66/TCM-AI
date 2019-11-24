import {Component, ViewChild, OnInit, Inject} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import {LocationStrategy} from '@angular/common';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {TabsService} from '../../../tabs/tabs.service';
import {LoadingService} from '../../../@core/data/loading.service';
/*import {DialogService} from '../../../@core/data/dialog.service';*/
import {DialogService} from '../../../@core/modules/dialog';
import {PickerService} from '../../../@core/modules/picker';
import {AuthService} from '../../auth/auth.service';
import {QualificationService} from './qualification.service';
import {getIndex} from '../../../utils/utils';

@Component({
  selector: 'app-company-qualification',
  templateUrl: 'qualification.page.html',
  styleUrls: ['qualification.page.scss']
})
export class CompanyQualificationPage {
  id = this.route.snapshot.params.id;
  type = this.route.snapshot.queryParams.type;
  token = this.authSvc.token();
  data;
  formGroup: FormGroup;
  form: FormGroup = new FormGroup({});
  conditions;
  year = (new Date()).getFullYear();
  years = (() => {
    const years = [];
    for (let i = 0; i < 10; i++) {
      years.push({
        label: this.year - i + '年',
        value: this.year - i
      });
    }
    return years;
  })();

  constructor(private title: Title,
              private route: ActivatedRoute,
              private router: Router,
              private location: LocationStrategy,
              private fb: FormBuilder,
              @Inject('FILE_PREFIX_URL') public FILE_PREFIX_URL,
              private loadingSvc: LoadingService,
              private dialogSvc: DialogService,
              private pickerSvc: PickerService,
              private tabsSvc: TabsService,
              private authSvc: AuthService,
              private qualificationSvc: QualificationService) {
    this.formGroup = new FormGroup({
      key: new FormControl(this.token.key, [Validators.required]),
      id: new FormControl('', []),
      demension: new FormControl(this.type, [Validators.required]),
      custId: new FormControl(this.id, [Validators.required]),
      uniqueKey: new FormControl(this.type === '0' ? (new Date()).getFullYear() : '', [Validators.required]),
      conditions: new FormControl('', [Validators.required])
    });
  }

  setupForm(conditions) {
    conditions.forEach(condition => {
      if (condition.fieldType === '0001') {
        this.form.setControl(condition.conditionId, new FormControl(!!parseInt(condition.conditionVal, 10),
          [!!condition.required ? Validators.required : Validators.nullValidator]));
      } else {
        this.form.setControl(condition.conditionId, new FormControl(condition.conditionVal,
          [!!condition.required ? Validators.required : Validators.nullValidator]));
      }
    });
  }

  datePicker(target) {
    const index = getIndex(this.years, 'value', this.formGroup.get(target).value);
    this.pickerSvc.show([this.years], '', [index]).subscribe(res => {
      this.formGroup.get(target).setValue(res.value);
    });
  }

  ionViewDidEnter() {
    this.title.setTitle(this.type === '0' ? '企业资质信息' : this.type === '1' ? '项目' : '员工');
    this.tabsSvc.set(false);
    this.qualificationSvc.list(this.token.key, this.id, this.type).subscribe(res => {
      if (res[0]) {
        this.formGroup.get('id').setValue(res[0].credId);
        this.formGroup.get('uniqueKey').setValue(res[0].uniqueKey);
        this.conditions = res[0].conditions;
        this.setupForm(res[0].conditions);
      } else {
        this.qualificationSvc.item(this.token.key, this.type).subscribe(result => {
          this.conditions = result.conditions;
          this.setupForm(result.conditions);
        });
      }
    });
  }

  getConditions() {
    const conditions = [];
    for (const key in this.form.value) {
      if (key) {
        conditions.push({
          conditionId: key,
          conditionVal: typeof this.form.get(key).value === 'boolean' ?
            (this.form.get(key).value ? 1 : 0) : this.form.get(key).value
        });
      }
    }
    return JSON.stringify(conditions);
  }

  create(id) {
    this.loadingSvc.show('方案生成中...', 0).then();
    this.qualificationSvc.create(this.token.key, id).subscribe(res => {
      this.loadingSvc.hide();
      if (res) {
        this.dialogSvc.show({content: '成功生成方案' + res.name, cancel: '', confirm: '我知道了'}).subscribe(() => {
          this.router.navigate(['/pages/plan/list', this.id], {queryParams: {type: this.type}});
        });
      }
    });
  }

  submit() {
    const conditions = this.getConditions();
    this.formGroup.get('conditions').setValue(conditions);
    if (this.form.invalid || this.formGroup.invalid) {
      return false;
    }
    this.loadingSvc.show('提交中...', 0).then();
    this.qualificationSvc.add(this.formGroup.value).subscribe(res => {
      this.loadingSvc.hide();
      if (res) {
        this.create(res);
      }
    });
  }

}
