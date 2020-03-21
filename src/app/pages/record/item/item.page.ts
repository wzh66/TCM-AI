import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RecordService} from '../record.service';
import {LocationStrategy} from '@angular/common';
import {StorageService} from '../../../@core/utils/storage.service';

@Component({
    selector: 'app-record-item',
    templateUrl: './item.page.html',
    styleUrls: ['./item.page.scss'],
})
export class RecordItemPage {
    id = this.route.snapshot.params.id;
    record;
    key = this.storage.get('key1');

    constructor(private route: ActivatedRoute,
                private recordSvc: RecordService,
                private location: LocationStrategy,
                private storage: StorageService) {
        this.recordSvc.getFeatureDetail(this.id, this.key).subscribe(res => {
            this.record = JSON.parse(res.diagnosisDetail);
            if (this.record.suggestions) {
                this.record.suggestions = this.record.suggestions.replace(/\\r\\n/gi, '<br>');
            }
        });
    }

    back() {
        this.location.back();
    }
}
