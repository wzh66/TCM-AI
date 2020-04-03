import {Component, Inject, OnInit} from '@angular/core';
import {StorageService} from '../../../@core/utils/storage.service';
import {Router} from '@angular/router';
import {DialogService} from '../../../@core/modules/dialog';

@Component({
    selector: 'app-diagnose-result',
    templateUrl: './result.page.html',
    styleUrls: ['./result.page.scss'],
})
export class DiagnoseResultPage implements OnInit {
    result;
    record;
    originalImg;
    localImg;
    show = false;
    file;

    constructor(private storage: StorageService,
                private router: Router,
                private dialogSvc: DialogService,
                @Inject('FILE_PREFIX_URL') public FILE_PREFIX_URL) {

    }

    ngOnInit(): void {
        this.getData();
    }

    getData() {
        const result = this.storage.getObject('result');
        const record = JSON.parse(result.diagnosisDetail);
        this.originalImg = result.imgs;
        this.localImg = result.tongueImgs;
        if (record.suggestions) {
            record.suggestions = record.suggestions.replace(/\\r\\n/gi, '<br>');
        }
        this.record = record;
    }

    home() {
        this.router.navigate(['pages/index/index']);
    }

    toRecord() {
        this.router.navigate(['pages/record/list']);
    }

    showGallery(file) {
        this.show = true;
        this.file = file;
    }
}
