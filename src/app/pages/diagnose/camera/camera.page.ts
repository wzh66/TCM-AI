import {Component, ElementRef, Inject, ViewChild} from '@angular/core';
import {StorageService} from '../../../@core/utils/storage.service';
import {Router} from '@angular/router';
import {LoadingService} from '../../../@core/utils/loading.service';


declare var $: any;
$.extend({
    send(url, jsonObject, method, callback) {
        const data = method.toUpperCase() == 'GET' ? jsonObject : JSON.stringify(jsonObject);
        // @ts-ignore
        request(url, data, method, callback, 'application/json;charset=UTF-8', true);
    },
    upload(file, callback) {
        // @ts-ignore
        request(file, callback);
    }
});


@Component({
    selector: 'app-diagnose-camera',
    templateUrl: './camera.page.html',
    styleUrls: ['./camera.page.scss'],
})
export class DiagnoseCameraPage {
    show = false;
    video = null;
    @ViewChild('video', {static: false}) private videoRef;
    @ViewChild('tongue', {static: false}) private tongue: ElementRef;
    @ViewChild('content', {static: false}) private content;

    constructor(@Inject('PREFIX_URL') private PREFIX_URL,
                private storage: StorageService,
                private router: Router,
                private loadingSvc: LoadingService) {
    }

    ionViewDidEnter() {
        this.camera();
    }

    camera() {
        navigator.mediaDevices.getUserMedia({audio: false, video: {facingMode: 'user'}})
            .then((stream) => {
                this.video = document.querySelector('video');
                this.video.srcObject = stream;
            })
            .catch((err) => {
                console.log(err);
            });
    }

    onclick() {
        this.show = true;
        this.video.play();
    }

    photo() {
        const vw = this.videoRef.nativeElement.videoWidth;
        const vh = this.videoRef.nativeElement.videoHeight;
        // @ts-ignore
        const canvas: HTMLCanvasElement = document.getElementById('canvas');
        const context = canvas.getContext('2d');
        const video = document.getElementById('video');
        const cw = this.content.el.clientWidth;
        const ch = this.content.el.clientHeight;
        const rate = cw / vw;
        const draw = {
            x: vw * ((1 - rate) / 2),
            y: vh * ((1 - rate) / 2),
            dw: vw * rate,
            dh: vh - vh * ((1 - rate) / 2)
        };
        canvas.width = draw.dw;
        canvas.height = draw.dh;

        // @ts-ignore
        // context.drawImage(video, ((width - sw) / 2), height / 2, sw, sh, 0, 0, sw, sh);
        context.drawImage(video, draw.x, draw.y, draw.dw, draw.dh, 0, 0, draw.dw, draw.dh);
        // @ts-ignore
        // document.getElementById('image').src = canvas.toDataURL('image/png', 1.0);
        this.storage.set('imageSrc', canvas.toDataURL('image/png', 1.0));
        this.loadingSvc.show('loading', 1000).then();
        this.router.navigate(['/pages/diagnose/screenshot']);
    }
}
