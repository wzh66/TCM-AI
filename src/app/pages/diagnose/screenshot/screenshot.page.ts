import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {StorageService} from '../../../@core/utils/storage.service';
import {Router} from '@angular/router';
import {DialogService} from '../../../@core/modules/dialog';
import {LoadingService} from '../../../@core/utils/loading.service';

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
    sx;
    sy;

    constructor(private storage: StorageService,
                private router: Router,
                private dialogSvc: DialogService,
                private loadingSvc: LoadingService,
                @Inject('PREFIX_URL') private PREFIX_URL,) {
    }

    ionViewDidEnter() {
        // @ts-ignore
        document.getElementById('img').src = this.imageSrc;
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
            this.loadingSvc.hide();
            this.dialogSvc.show({
                content: 'Please take another picture！', cancel: '', confirm: 'I know'
            }).subscribe(value => {
                if (value.value) {
                    this.router.navigate(['/pages/diagnose/camera']);
                }
            });
        } else {
            this.loadingSvc.hide();
            this.storage.set('fileId', result.result);
            this.router.navigate(['/pages/diagnose/question']);
        }

    }

    rephotograph() {
        this.router.navigate(['/pages/diagnose/camera']);
    }

    confirm() {
        console.log('img:', this.imgRef);
        const width = this.imgRef.nativeElement.naturalWidth;
        const height = this.imgRef.nativeElement.naturalHeight;
        // @ts-ignore
        const canvas: HTMLCanvasElement = document.getElementById('canvas');
        const context = canvas.getContext('2d');
        const img = document.getElementById('img');
        console.log('content:', this.content);
        const contentWidth = this.content.el.clientWidth;
        const contentHeight = this.content.el.clientHeight;
        console.log('drag:', this.drag);
        const w = this.drag.nativeElement.offsetWidth,
            h = this.drag.nativeElement.offsetHeight;
        const sw = (width / contentWidth) * w, sh = (width / contentWidth) * h;
        canvas.width = width;
        canvas.height = height;
        // @ts-ignore
        context.drawImage(img, this.sx, this.sy, 270, 270, 0, 0, 270, 270);
        // this.loadingSvc.show('loading', 0);
        // @ts-ignore
        document.getElementById('image').src = canvas.toDataURL('image/png', 1.0);
        /*this.request(this.imageSrc);*/
    }

    move(e) {
        console.log(e);
        this.sx = e.event.target.offsetLeft;
        this.sy = e.event.target.offsetTop;
    }
}