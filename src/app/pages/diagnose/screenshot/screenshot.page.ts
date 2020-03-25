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
    url;
    position = {
        x: 0,
        y: 0
    };

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
        const width = this.imgRef.nativeElement.naturalWidth;
        const height = this.imgRef.nativeElement.naturalHeight;
        // @ts-ignore
        const canvas: HTMLCanvasElement = document.getElementById('canvas');
        const context = canvas.getContext('2d');
        const img = document.getElementById('img');
        const contentWidth = this.content.el.clientWidth;
        const contentHeight = this.content.el.clientHeight;
        const w = this.drag.nativeElement.offsetWidth,
            h = this.drag.nativeElement.offsetHeight;
        const sw = (width / contentWidth) * w, sh = (width / contentWidth) * w;
        console.log(this.sx, this.sy, sw, sh);
        canvas.width = sw;
        canvas.height = sh;
        // @ts-ignore
        context.drawImage(img, this.sx, this.sy, sw, sh, 0, 0, sw, sh);
        // this.loadingSvc.show('loading', 0);
        // @ts-ignore
        console.log(canvas.toDataURL('image/png', 1.0));
        this.url = canvas.toDataURL('image/png', 1.0);
        /*this.request(this.imageSrc);*/
    }

    move(e) {
        let transform = e.source.element.nativeElement.style.transform;
        transform = transform.slice(transform.indexOf('(') + 1);
        transform = transform.slice(0, transform.indexOf(')'));
        transform = transform.split(',');
        this.sx = parseInt(transform[0]);
        this.sy = parseInt(transform[1]);
        console.log(this.sx, this.sy);
    }
}
