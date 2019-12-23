import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {StorageService} from '../../@core/utils/storage.service';
import {LoadingService} from '../../@core/data/loading.service';
import {AuthService} from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss']
})
export class AuthPage {
  form: FormGroup;

  constructor(private router: Router,
              private storageSvc: StorageService,
              private loadingSvc: LoadingService,
              private authSvc: AuthService) {
    this.form = new FormGroup({
      account: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(16)]),
      pwd: new FormControl('', [Validators.required])
    });
  }

  ionViewDidEnter() {
    this.storageSvc.clear();
  }

  login() {
    if (this.form.invalid) {
      return false;
    }

    this.loadingSvc.show('登录中', 0).then();
    this.authSvc.login(this.form.value).subscribe(res => {
      this.loadingSvc.hide();
      // 设置用户Token信息
      if (res.code === '0000') {
        this.authSvc.updateLoginStatus(res.result);
        this.router.navigate(['/pages/company/list']);
      }

    });

  }

}
