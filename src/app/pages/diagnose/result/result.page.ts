import {Component, OnInit} from '@angular/core';
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

    constructor(private storage: StorageService,
                private router: Router,
                private dialogSvc: DialogService) {

    }

    ngOnInit(): void {
        this.getData();
    }

    getData() {
        const result = this.storage.getObject('result');
        if (result.suggestions) {
            result.suggestions = result.suggestions.replace(/\\r\\n/gi, '<br>');
            this.result = result;
        }
    }

    home() {
        this.router.navigate(['pages/index/index']);
    }

    toRecord() {
        this.router.navigate(['pages/record/list']);
    }

}
