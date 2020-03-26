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
        const width = this.videoRef.nativeElement.videoWidth;
        const height = this.videoRef.nativeElement.videoHeight;
        // @ts-ignore
        const canvas: HTMLCanvasElement = document.getElementById('canvas');
        const context = canvas.getContext('2d');
        const video = document.getElementById('video');
        const contentWidth = this.content.el.clientWidth;
        const contentHeight = this.content.el.clientHeight;
        const w = this.tongue.nativeElement.offsetWidth,
            h = this.tongue.nativeElement.offsetHeight;
        const sw = (width / contentWidth) * w, sh = (width / contentWidth) * h;
        canvas.width = width;
        canvas.height = height;
        // @ts-ignore
        // context.drawImage(video, ((width - sw) / 2), height / 2, sw, sh, 0, 0, sw, sh);
        context.drawImage(video, (width - contentWidth) / 2, height / 4, contentWidth, contentHeight, 0, 0, contentWidth, contentHeight);
        // @ts-ignore
        // document.getElementById('image').src = canvas.toDataURL('image/png', 1.0);
        this.storage.set('imageSrc', canvas.toDataURL('image/png', 1.0));
        this.loadingSvc.show('loading', 1000).then();
        this.router.navigate(['/pages/diagnose/screenshot']);
    }
}
