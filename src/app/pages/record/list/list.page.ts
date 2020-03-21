import {Component, Inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LocationStrategy} from '@angular/common';
import {RecordService} from '../record.service';
import {RecordPageRoutingModule} from '../record-routing.module';
import {StorageService} from '../../../@core/utils/storage.service';
import {DialogService} from '../../../@core/modules/dialog';

@Component({
    selector: 'app-record-list',
    templateUrl: './list.page.html',
    styleUrls: ['./list.page.scss'],
})
export class RecordListPage {
    key = this.storage.get('key1');
    record;

    constructor(private location: LocationStrategy,
                private recordSvc: RecordService,
                private storage: StorageService,
                private dialogSvc: DialogService,
                private router: Router) {
        this.getData();
    }

    back() {
        this.location.back();
    }

    getData() {
        if (!this.key) {
            this.dialogSvc.show({
                content: 'No record！', cancel: '', confirm: 'I know'
            }).subscribe(value => {
                if (value.value) {
                    this.router.navigate(['/pages/index/index']);
                }
            });
            return false;
        }
        this.recordSvc.get(this.key).subscribe(res => {
            this.record = res.list;
            this.record.forEach(item => {
                item.diagnosisDetail = JSON.parse(item.diagnosisDetail);
                return item;
            });
            console.log(this.record);
        });
    }


}