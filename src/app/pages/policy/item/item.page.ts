import {Component, Inject} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {TabsService} from '../../../tabs/tabs.service';
import {AuthService} from '../../auth/auth.service';
import {PolicyService} from '../policy.service';

@Component({
  selector: 'app-policy-item',
  templateUrl: 'item.page.html',
  styleUrls: ['item.page.scss']
})
export class PolicyItemPage {
  token = this.authSvc.token();
  id = this.route.snapshot.params.id;
  data;

  constructor(private title: Title,
              private route: ActivatedRoute,
              private tabsSvc: TabsService,
              @Inject('FILE_PREFIX_URL') public FILE_PREFIX_URL,
              private authSvc: AuthService,
              private policySvc: PolicyService) {
  }

  ionViewDidEnter() {
    this.tabsSvc.set(false);
    this.policySvc.get(this.token.key, this.id).subscribe(res => {
      console.log(res);
      this.data = res;
    });
  }

}
