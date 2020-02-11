import {Component, Inject} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {StorageService} from '../../../@core/utils/storage.service';
import {ToastService} from '../../../@core/modules/toast';
import {TabsService} from '../../../tabs/tabs.service';
import {PickerService} from '../../../@core/modules/picker';
import {AuthService} from '../../auth/auth.service';
import {NCoVService} from '../ncov.service';
import {DATA} from '../../../@core/data/cn';
@Component({
  selector: 'app-nCov-get',
  templateUrl: 'get.page.html',
  styleUrls: ['get.page.scss']
})
export class NCoVGetPage {
  address;
  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    mobile: new FormControl('', [Validators.required, Validators.pattern(/[0-9]*/), Validators.maxLength(32)]),
    companyName: new FormControl('', [Validators.required]),
    province: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    area: new FormControl('', [])
  });

  constructor(private title: Title,
              private route: ActivatedRoute,
              private router: Router,
              private storageSvc: StorageService,
              private tabsSvc: TabsService,
              @Inject('FILE_PREFIX_URL') public FILE_PREFIX_URL,
              private toastSvc: ToastService,
              private pickSvc: PickerService,
              private authSvc: AuthService,
              private nCovSvc: NCoVService) {
  }

  ionViewDidEnter() {
    this.title.setTitle('订阅所在城市政策汇编');
    this.tabsSvc.set(false);
  }

  pickerShow() {
    this.pickSvc.showCity(DATA).subscribe(res => {
      console.log(res);
      this.form.get('province').setValue(res.items[0].name);
      this.form.get('city').setValue(res.items[1].name);
      this.form.get('area').setValue(res.items[2] ? res.items[2].name : '');
      this.address = this.form.get('province').value + this.form.get('city').value + this.form.get('area').value;
    });
  }

  submit() {
    if (this.form.invalid) {
      return false;
    }

    this.toastSvc.loading();
    this.nCovSvc.add(this.form.value).subscribe(res => {
      console.log(res);
      this.storageSvc.set('nCoV', JSON.stringify(res.list));
      this.router.navigate(['/pages/nCoV/list']);
    });
  }

}
