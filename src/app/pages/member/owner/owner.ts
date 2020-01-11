import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ModalController, NavParams} from '@ionic/angular';

@Component({
  selector: 'app-owner',
  templateUrl: 'owner.html',
  styleUrls: ['owner.scss']
})
export class OwnerComponent {
  form: FormGroup = new FormGroup({
    owner: new FormControl('', [Validators.required])
  });

  constructor(private modalController: ModalController,
              private navParams: NavParams) {
    this.form.get('owner').setValue(this.navParams.data.owner);
  }

  confirm() {
    this.modalController.dismiss(this.form.get('owner').value).then();
  }

  cancel() {
    this.modalController.dismiss('').then();
  }

}
