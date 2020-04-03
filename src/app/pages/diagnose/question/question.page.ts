import {Component, OnInit} from '@angular/core';
import {DiagnoseService} from '../diagnose.service';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import {StorageService} from '../../../@core/utils/storage.service';
import {Router} from '@angular/router';
import {LocationStrategy} from '@angular/common';

@Component({
    selector: 'app-diagnose-question',
    templateUrl: './question.page.html',
    styleUrls: ['./question.page.scss'],
})
export class DiagnoseQuestionPage {
    questions = [];
    selectedIndex = 0;
    form: FormGroup = new FormGroup({});
    testResult = {};

    constructor(private diagxSvc: DiagnoseService,
                private storage: StorageService,
                private router: Router,
                private location: LocationStrategy,) {
        this.getData();
    }

    getData() {
        this.diagxSvc.getQuestionList(this.storage.get('key1')).subscribe(res => {
            this.questions = res;
            res.forEach(item => {
                if (item.type === 1) {
                    this.form.setControl(item.id,
                        new FormControl('',
                            [Validators.required]));
                } else {
                    this.form.setControl(item.id,
                        new FormControl('',
                            [Validators.required]));
                }
            });
            console.log(this.questions);
        });
    }

    change(question, answer) {
        if (!this.testResult[question.id]) {
            this.testResult[question.id] = [];
        }
        const index = this.testResult[question.id].indexOf(answer.value);
        if (index === -1) {
            this.testResult[question.id].push(answer.value);
        } else {
            this.testResult[question.id].splice(index, 1);
        }
        this.form.get(question.id).setValue((() => {
            let value = '';
            this.testResult[question.id].forEach(item => {
                if (!value) {
                    value = item;
                } else {
                    value = value + ',' + item;
                }
            });
            return value;
        })());
    }

    next(e) {
        if (e) {
            this.submit();
        } else {
            this.selectedIndex = this.selectedIndex + 1;
        }

    }

    back() {
        this.router.navigate(['pages/index/index']);
    }

    submit() {
        console.log(this.form.value);
        const body = {
            key: this.storage.get('key1'),
            fileId: this.storage.get('fileId') ? this.storage.get('fileId') : '',
            tongueFileId: this.storage.get('tongueFileId') ? this.storage.get('tongueFileId') : '',
            featureList: (() => {
                const data = [];
                // tslint:disable-next-line:forin
                for (const key in this.form.value) {
                    data.push({
                        questionId: key,
                        answer: this.form.get(key).value
                    });
                }
                return data;
            })()
        };
        this.diagxSvc.submit(body).subscribe(res => {
            if (res) {
                this.storage.setObject('result', JSON.parse(JSON.stringify(res)));
                this.router.navigate(['/pages/diagnose/result']);
            }
        });

    }
}
