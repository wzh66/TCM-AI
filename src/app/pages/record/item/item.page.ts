import {Component, Inject, OnInit} from '@angular/core';
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
    originalImg;
    localImg;
    show = false;
    file;
    constructor(private route: ActivatedRoute,
                private recordSvc: RecordService,
                private location: LocationStrategy,
                private storage: StorageService,
                @Inject('FILE_PREFIX_URL') public FILE_PREFIX_URL) {
        this.recordSvc.getFeatureDetail(this.id, this.key).subscribe(res => {
            this.record = JSON.parse(res.diagnosisDetail);
            this.originalImg = res.imgs;
            this.localImg = res.tongueImgs;
            if (this.record.suggestions) {
                this.record.suggestions = this.record.suggestions.replace(/\\r\\n/gi, '<br>');
            }
        });
    }

    back() {
        this.location.back();
    }

    showGallery(file) {
        this.show = true;
        this.file = file;
    }
}
