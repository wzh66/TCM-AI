import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {FormGroup, FormControl, Validators, ValidationErrors} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {LocationStrategy} from '@angular/common';
import {TabsService} from '../../../tabs/tabs.service';
/*import {DialogService} from '../../../@core/data/dialog.service';*/
import {DialogService} from '../../../@core/modules/dialog';
import {LoadingService} from '../../../@core/data/loading.service';
import {ModalService} from '../../../@core/data/modal.service';
import {PickerService} from '../../../@core/modules/picker';
import {AuthService} from '../../auth/auth.service';
import {DictService} from '../../../@core/data/dict.service';
import {CompanyService} from '../company.service';
import {debounceTime, filter, map, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {IndustryComponent} from '../../../@theme/components/industry/industry';
import {IndustryService} from '../../../@theme/components/industry/industry.service';
import {ModalController} from '@ionic/angular';
import {DATA} from '../../../@core/data/cn';
import {getIndex} from '../../../utils/utils';

@Component({
  selector: 'app-company-edit',
  templateUrl: 'edit.page.html',
  styleUrls: ['edit.page.scss']
})
export class CompanyEditPage implements OnInit {
  id = this.route.snapshot.params.id;
  industries;
  selectedIndustries = [];
  token = this.authSvc.token();
  form: FormGroup = new FormGroup({
    key: new FormControl(this.token.key, [Validators.required]),
    id: new FormControl('', [Validators.required]),
    company: new FormControl('', [Validators.required, Validators.pattern(/^[\u4e00-\u9fa5]+$/)]),
    industryIds: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.pattern(/^[\u4e00-\u9fa5]+$/)]),
    mobile: new FormControl('', [Validators.required, Validators.pattern(/[0-9]*/), Validators.maxLength(32)]),
    province: new FormControl('', [Validators.required]),
    area: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    address: new FormControl('', []),
    remark: new FormControl('', [])
  });

  submitted = false;

  constructor(private title: Title,
              private route: ActivatedRoute,
              private router: Router,
              private location: LocationStrategy,
              private tabsSvc: TabsService,
              private modalSvc: ModalService,
              private modalController: ModalController,
              private loadingSvc: LoadingService,
              private dialogSvc: DialogService,
              private pickerSvc: PickerService,
              private dictSvc: DictService,
              private industrySvc: IndustryService,
              private authSvc: AuthService,
              private companySvc: CompanyService) {
    title.setTitle(this.id === '0' ? '新增企业信息' : '编辑企业信息');
    tabsSvc.set(false);
  }

  ngOnInit() {
    this.form.get('company').valueChanges.pipe(
      filter(text => text.length > 1),
      debounceTime(1000),
      distinctUntilChanged()).subscribe(company => {
      this.companySvc.validatorName(this.token.key, company).subscribe(res => {
        if (res && res.id !== this.id) {
          // this.sameCompany = res;
          this.form.get('company').setErrors(null);
        } else {
          // this.sameCompany = false;
        }
      });
    });
    this.industrySvc.list(this.token.key)
      .pipe(map(res => this.industries = res))
      .subscribe(industries => {
        if (this.id !== '0') {
          this.form.get('id').enable();
          this.companySvc.get(this.token.key, this.id).subscribe(res => {
            if (res) {
              for (const key in this.form.value) {
                if (res[key]) {
                  this.form.get(key).setValue(res[key]);
                  if (key === 'industryIds') {
                    const selectedIndustries = [];
                    console.log(this.industries);
                    res[key].split(',').forEach(id => {
                      const index = getIndex(this.industries, 'id', parseInt(id, 10));
                      selectedIndustries.push(this.industries[index]);
                    });
                    this.selectedIndustries = selectedIndustries;
                    this.setIndustries();
                  }
                }
              }
            }
          });
        } else {
          this.form.get('id').disable();
        }
      });
  }

  cityPicker() {
    this.form.get('province').markAsTouched();
    this.pickerSvc.showCity(DATA, '', '', {cancel: '取消', confirm: '确认'}).subscribe(res => {
      this.form.get('province').setValue(res.items[0].label);
      this.form.get('city').setValue(res.items[1].label);
      this.form.get('area').setValue(res.items[2].label);
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
    this.form.get('industryIds').markAsTouched();
    this.selectedIndustries = data;
    this.setIndustries();
  }

  remove(item) {
    const index = getIndex(this.selectedIndustries, 'id', item.id);
    if (index >= 0) {
      this.selectedIndustries.splice(index, 1);
    }
    this.setIndustries();
  }

  setIndustries() {
    const ids = [];
    this.selectedIndustries.forEach(item => {
      ids.push(item.id);
    });
    this.form.get('industryIds').setValue(ids);
  }

  submit() {
    if (this.submitted) {
      this.router.navigate(['/pages/company/qualification', this.form.get('id').value],
        {queryParams: {type: 0}});
      return false;
    }
    if (this.form.invalid) {
      return false;
    }
    this.loadingSvc.show('提交中...', 0).then();
    this.companySvc.research(this.form.value).subscribe(res => {
      this.loadingSvc.hide();
      if (res) {
        this.form.get('id').setValue(res.id);
        this.submitted = true;
        this.dialogSvc.show({content: this.id === '0' ? '添加' : '修改' + ' "' + this.form.get('company').value + '" 成功', cancel: '', confirm: '我知道了'}).subscribe(() => {
          if (this.id !== '0') {
            this.location.back();
          }
        });
      }
    });
  }

}
