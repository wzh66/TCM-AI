import {Component, ElementRef, Inject, ViewChild} from '@angular/core';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import {StorageService} from '../../../@core/utils/storage.service';
import {Router} from '@angular/router';
import {DialogService} from '../../../@core/modules/dialog';
import {LoadingService} from '../../../@core/utils/loading.service';


declare var $: any;
const contextPath = 'http://localhost:80/';
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
    providers: [Camera]
})
export class DiagnoseCameraPage {
    show = false;
    video = null;
    @ViewChild('video', {static: false}) private videoRef;
    @ViewChild('tongue', {static: false}) private tongue: ElementRef;
    @ViewChild('content', {static: false}) private content;
    constructor(private cameraSvc: Camera,
                @Inject('PREFIX_URL') private PREFIX_URL,
                private storage: StorageService,
                private router: Router,
                private dialogSvc: DialogService,
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
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext('2d');
        const video = document.getElementById('video');
        const contentWidth = this.content.el.clientWidth;
        const contentHeight = this.content.el.clientHeight;
        console.log(this.videoRef);
        const x = this.tongue.nativeElement.offsetLeft,
            y = this.tongue.nativeElement.offsetTop,
            w = this.tongue.nativeElement.offsetWidth,
            h = this.tongue.nativeElement.offsetHeight;
        // @ts-ignore
        context.drawImage(video, (width / w) * x, (height / contentHeight) * height + height * 0.1, w, h, 0, 0, width, height);
        // @ts-ignore
        document.getElementById('image').src = canvas.toDataURL('image/png', 1.0);
        const data = canvas.toDataURL('image/png', 1.0);
        this.loadingSvc.show('loading', 0);
        this.request(data, (res) => {
            console.log('res:', res);
        });

    }

    request(data, callback) {
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
            }).subscribe();
        } else {
            this.loadingSvc.hide();
            this.storage.set('fileId', result.result);
            this.router.navigate(['/pages/diagnose/question']);
        }

    }
}
