import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {StorageService} from '../../../@core/utils/storage.service';
import {Router} from '@angular/router';
import {DialogService} from '../../../@core/modules/dialog';

declare var $: any;

@Component({
    selector: 'app-diagnose-screenshot',
    templateUrl: './screenshot.page.html',
    styleUrls: ['./screenshot.page.scss'],
})
export class DiagnoseScreenshotPage {
    imageSrc = this.storage.get('imageSrc');
    @ViewChild('img', {static: false}) private imgRef;
    @ViewChild('drag', {static: false}) private drag: ElementRef;
    @ViewChild('content', {static: false}) private content;
    @ViewChild('boundary', {static: false}) private boundary;
    sx;
    sy;
    url;
    position = {
        x: 0,
        y: 0
    };

    constructor(private storage: StorageService,
                private router: Router,
                private dialogSvc: DialogService,
                @Inject('PREFIX_URL') private PREFIX_URL,) {
    }

    ionViewDidEnter() {
        // @ts-ignore
        document.getElementById('img').src = this.imageSrc;
        const image = new Image();
        image.src = this.imageSrc;
        image.onload = () => {
            const width = this.boundary.nativeElement.clientWidth;
            const height = this.boundary.nativeElement.clientHeight;
            console.log(width, height);
            this.position = {
                x: (width - 270) / 2,
                y: (height - 270) / 2
            };
            this.sx = (width - 270) / 2;
            this.sy = (height - 270) / 2;
        };
    }

    request(data) {
        const that = this;
        $.ajax({
            type: 'POST',
            url: this.PREFIX_URL + 'uploadFile',
            data: {
                file: data,
                key: this.storage.get('key1'),
                type: 'feature_image',
                dir: 'feature_image'
            },
            async: true,
            success(res) {
                that.dump(res);
            },
            error(err) {
                alert('系统错误');
            }
        });
    }

    dump(res) {
        const result = JSON.parse(res);
        if (!result.result) {
            this.dialogSvc.show({
                content: 'Please take another picture！', cancel: '', confirm: 'I know'
            }).subscribe(value => {
                if (value.value) {
                    this.router.navigate(['/pages/diagnose/camera'], {queryParams: {show: false}});
                }
            });
        } else {
            this.storage.set('fileId', result.result);
            this.router.navigate(['/pages/diagnose/question']);
        }

    }

    rephotograph() {
        this.router.navigate(['/pages/diagnose/camera'], {queryParams: {show: false}});
    }

    confirm() {
        // @ts-ignore
        const canvas: HTMLCanvasElement = document.getElementById('canvas');
        const context = canvas.getContext('2d');
        const img = document.getElementById('img');
        const w = this.drag.nativeElement.offsetWidth,
            h = this.drag.nativeElement.offsetHeight;
        canvas.width = w;
        canvas.height = h;
        // @ts-ignore
        context.drawImage(img, this.sx, this.sy, w, h, 0, 0, w, h);
        // @ts-ignore
        this.url = canvas.toDataURL('image/png', 1.0);
        this.request(this.url);
    }

    move(e) {
        let transform = e.source.element.nativeElement.style.transform;
        transform = transform.slice(transform.indexOf('(') + 1);
        transform = transform.slice(0, transform.indexOf(')'));
        transform = transform.split(',');
        this.sx = parseInt(transform[0], 10);
        this.sy = parseInt(transform[1], 10);
    }
}
