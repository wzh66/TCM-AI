import {Component, Inject, OnInit} from '@angular/core';
import {IndexService} from './index.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-index',
    templateUrl: './index.page.html',
    styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {
    imgs = [];
    news = [];
    slideOpts = {
        autoplay: {
            delay: 3000,
        },
    };
    questions = [];

    constructor(private indexSvc: IndexService,
                @Inject('FILE_PREFIX_URL') public FILE_PREFIX_URL,
                private router: Router) {
        this.indexSvc.getImgList().subscribe(res => {
            this.imgs = res;
            console.log(this.imgs);
        });
        this.indexSvc.getNewsList().subscribe(res => {
            this.news = res;
            console.log(res);
        });
    }

    ngOnInit() {
    }

    toNewList() {
        this.router.navigate(['/pages/news/list']);
    }

    toRecord(){
        this.router.navigate(['/pages/record/list']);
    }

}
