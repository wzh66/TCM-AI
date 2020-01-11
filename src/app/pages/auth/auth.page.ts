import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';

import {UaService} from '../../@core/data/ua.service';
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
  token = {
    faceImg: this.route.snapshot.queryParams.faceImg,
    id: this.route.snapshot.queryParams.id,
    key: this.route.snapshot.queryParams.key,
    name: this.route.snapshot.queryParams.name,
    openid: this.route.snapshot.queryParams.openid
  };

  constructor(private router: Router,
              private route: ActivatedRoute,
              private uaSvc: UaService,
              private storageSvc: StorageService,
              private loadingSvc: LoadingService,
              private authSvc: AuthService) {
    this.form = new FormGroup({
      account: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(16)]),
      pwd: new FormControl('', [Validators.required]),
      openid: new FormControl(this.token.openid, [])
    });
  }

  ionViewDidEnter() {
    this.storageSvc.clear();
    /* if (this.uaSvc.isWx()) {
      if (this.token.openid) {
        if (this.token.key) {
          this.authSvc.updateLoginStatus(this.token);
          this.router.navigate(['/pages/company/list']);
        }
      } else {
        window.location.href = 'http://jmwr2f.natappfree.cc/wisp/intf/auth?callbackUrl=' + window.location.href;
      }
    } */
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
