import {Component, OnInit} from '@angular/core';
import {LocationStrategy} from '@angular/common';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DiagnoseService} from '../diagnose.service';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {DialogService} from '../../../@core/modules/dialog';
import {Router} from '@angular/router';
import {StorageService} from '../../../@core/utils/storage.service';


declare var qq: any;
declare var $: any;

@Component({
    selector: 'app-diagnose-list',
    templateUrl: './list.page.html',
    styleUrls: ['./list.page.scss'],
    providers: [Geolocation]
})
export class DiagnoseListPage implements OnInit {
    form: FormGroup;
    geo;

    constructor(private location: LocationStrategy,
                private diagnoseSvc: DiagnoseService,
                private dialogSvc: DialogService,
                private router: Router,
                private storage: StorageService) {
    }

    ngOnInit(): void {
        this.form = new FormGroup({
            name: new FormControl('', [Validators.required, Validators.maxLength(64)]),
            sex: new FormControl('', [Validators.required]),
            age: new FormControl('', [Validators.required]),
            phone: new FormControl('', [Validators.required, Validators.maxLength(20)]),
            email: new FormControl('', []),
            location: new FormControl(this.geo, []),
        });
        this.auth();
    }

    ionViewDidEnter() {
        $('#phone').intlTelInput({
            utilsScript: '/assets/js/build/js/utils.js',
            preferredCountries: ['id'],
            nationalMode: false
        });
    }

    getPosition() {
        const geo = new qq.maps.Geolocation('PDBBZ-2NVWV-7GAPA-UKVP5-YED6S-FRB6L', 'danius');
        geo.getIpLocation((position) => {
            if (position) {
                this.dialogSvc.show({
                    content: 'Successful positioning！', cancel: '', confirm: 'I know'
                }).subscribe();
            }
            const body = {
                lat: JSON.parse(JSON.stringify(position)).lat,
                lng: JSON.parse(JSON.stringify(position)).lng
            };
            this.geo = body;
        }, (err) => {
            console.log(err);
            this.dialogSvc.show({content: JSON.stringify(err), cancel: '', confirm: 'I know'}).subscribe();
        }, {failTipFlag: true});
    }

    back() {
        this.location.back();
    }

    submit() {
        let value = this.form.get('phone').value;
        value = value.replace('+', '');
        this.form.get('phone').setValue(value);
        this.form.get('location').setValue(this.geo);

        if (this.form.get('name').invalid) {
            this.dialogSvc.show({
                content: 'Please fill in your name', cancel: '', confirm: 'I know'
            }).subscribe();
            return false;
        }
        if (this.form.get('sex').invalid) {
            this.dialogSvc.show({
                content: 'Please select in your sex', cancel: '', confirm: 'I know'
            }).subscribe();
            return false;
        }
        if (this.form.get('age').invalid) {
            this.dialogSvc.show({
                content: 'Please fill in your age', cancel: '', confirm: 'I know'
            }).subscribe();
            return false;
        }
        if (this.form.get('phone').invalid || isNaN(this.form.get('phone').value)) {
            this.dialogSvc.show({
                content: 'Please fill in your phone number correctly', cancel: '', confirm: 'I know'
            }).subscribe();
            return false;
        }
        /*const re = /^\w+@[a-z0-9]+\.[a-z]{2,4}$/;
        if (!re.test(this.form.get('email').value)) {
            this.dialogSvc.show({
                content: 'Please fill in your E-mail correctly', cancel: '', confirm: 'I know'
            }).subscribe();
            return false;
        }*/
        if (!this.form.get('location').value) {
            this.dialogSvc.show({
                content: 'Please get your location', cancel: '', confirm: 'I know'
            }).subscribe();
            return false;
        }
        this.diagnoseSvc.list(this.form.value).subscribe(res => {
            if (res) {
                console.log(res.key);
                this.storage.set('key1', res.key);
                this.router.navigate(['/pages/diagnose/question']);
            }
        });
    }

    auth() {
        if (this.storage.get('key1')) {
            this.router.navigate(['/pages/diagnose/question']);
        }
    }
}
