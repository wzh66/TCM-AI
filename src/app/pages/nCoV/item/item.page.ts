import {Component, Inject} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {WxService} from '../../../@core/modules/wx';
import {TabsService} from '../../../tabs/tabs.service';
import {AuthService} from '../../auth/auth.service';
import {NCoVService} from '../ncov.service';

@Component({
    selector: 'app-nCov-item',
    templateUrl: 'item.page.html',
    styleUrls: ['item.page.scss']
})
export class NCoVItemPage {
    id = this.route.snapshot.params.id;
    data;

    constructor(private title: Title,
                private route: ActivatedRoute,
                private wxSvc: WxService,
                private tabsSvc: TabsService,
                @Inject('FILE_PREFIX_URL') public FILE_PREFIX_URL,
                private authSvc: AuthService,
                private nCovSvc: NCoVService,
                private router: Router) {
    }

    ionViewDidEnter() {
        this.title.setTitle('政策详情');
        this.tabsSvc.set(false);
        this.nCovSvc.item(this.id).subscribe(res => {
            console.log(res);
            this.data = res;
        });
        this.wxSvc.config({
            title: '',
            desc: '',
            link: '',
            imgUrl: ''
        }).then(() => {
            console.log('注册成功');
            // 其它操作，可以确保注册成功以后才有效
            // this.status = '注册成功';
        }).catch((err: string) => {
            console.log(`注册失败，原因：${err}`);
            // this.status = `注册失败，原因：${err}`;
        });
    }

    share() {
        this.wxSvc.config({
            title: '我又得到幸运码啦！',
            desc: '我在优聚专享花',
            link: '',
            imgUrl: ''
        }).then(() => {
            console.log('注册成功');
            // 其它操作，可以确保注册成功以后才有效
            // this.status = '注册成功';
        }).catch((err: string) => {
            console.log(`注册失败，原因：${err}`);
            // this.status = `注册失败，原因：${err}`;
        });
        this.wxSvc.show({}).subscribe(res => {
            console.log(res);
        });
    }

    index() {
        this.router.navigate(['/pages/nCoV/index']);
    }
}
