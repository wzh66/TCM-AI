import {Component} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ModalController, NavParams} from '@ionic/angular';
import {AuthService} from '../../../pages/auth/auth.service';
import {IndustryService} from './industry.service';
import {listToTree, getIndex} from '../../../utils/utils';

@Component({
  selector: 'app-industry',
  templateUrl: 'industry.html',
  styleUrls: ['industry.scss']
})
export class IndustryComponent {
  token = this.authSvc.token();
  industries;
  selected = {};
  items = [];
  form: FormGroup = new FormGroup({});

  constructor(private modalController: ModalController,
              private navParams: NavParams,
              private authSvc: AuthService,
              private industrySvc: IndustryService) {
    industrySvc.list(this.token.key).subscribe(res => {
      this.industries = listToTree(res);
    });
    this.items = this.navParams.data.items;
    this.getSelected();
  }

  checked(item) {
    const index = getIndex(this.items, 'id', item.id);
    if (index >= 0) {
      this.items.splice(index, 1);
    } else {
      this.items.push(item);
    }
  }

  getSelected() {
    this.items.forEach(item => {
      this.selected[item.id] = true;
    });
  }

  cancel() {
    this.modalController.dismiss(this.items).then();
  }

  confirm() {
    this.modalController.dismiss(this.items).then();
  }

}
