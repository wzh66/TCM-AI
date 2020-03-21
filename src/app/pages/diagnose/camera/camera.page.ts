import {Component, Inject} from '@angular/core';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import {StorageService} from '../../../@core/utils/storage.service';
import {Router} from '@angular/router';
import {DialogService} from '../../../@core/modules/dialog';

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
    constructor(private cameraSvc: Camera,
                @Inject('PREFIX_URL') private PREFIX_URL,
                private storage: StorageService,
                private router: Router,
                private dialogSvc: DialogService) {
        this.camera();
    }

    camera() {
        navigator.mediaDevices.getUserMedia({audio: false, video: true})
            .then((stream) => {
                console.log(stream);
                const video = document.querySelector('video');
                video.srcObject = stream;
                video.play();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    photo() {
        // @ts-ignore
        const canvas: HTMLCanvasElement = document.getElementById('canvas');
        canvas.width = 750;
        canvas.height = 1440;
        const context = canvas.getContext('2d');
        const video = document.getElementById('video');
        console.log(video);
        // @ts-ignore
        context.drawImage(video, 0, 0, 750, 1440);
        // @ts-ignore
        document.getElementById('image').src = canvas.toDataURL('image/png', 1.0);
        // @ts-ignore
        this.request(document.getElementById('image').src, (res) => {
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
        if (!res.result) {
            this.dialogSvc.show({
                content: 'Please take another picture！', cancel: '', confirm: 'I know'
            }).subscribe();
            return false;
        }
        this.storage.set('fileId', JSON.parse(res).result);
        this.router.navigate(['/pages/diagnose/question']);
    }
}
