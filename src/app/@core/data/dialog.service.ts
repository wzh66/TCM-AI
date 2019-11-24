/*
import {Injectable} from '@angular/core';
import {AlertController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  dialog;

  constructor(public alertController: AlertController) {
  }

  show(option, callback?) {
    const buttons = [];
    if (option.cancel) {
      buttons.push({
        text: option.cancel ? option.cancel : '',
        role: 'cancel',
        handler: blah => {
          if (callback) {
            this.alertController.getTop().then();
            callback(false);
          }
        }
      });
    }
    if (option.confirm) {
      buttons.push({
        text: option.confirm ? option.confirm : '确定',
        handler: value => {
          if (callback) {
            this.alertController.dismiss().then();
            callback(true);
          }
        }
      });
    }
    this.alertController.create({
      header: option.title ? option.title : '',
      message: option.content,
      buttons
    }).then(res => {
      res.dismiss().then();
      res.present().then();
    });
  }
}
*/
