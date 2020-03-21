import {Component, Inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LocationStrategy} from '@angular/common';
import {NewsService} from '../news.service';

@Component({
    selector: 'app-news-list',
    templateUrl: './list.page.html',
    styleUrls: ['./list.page.scss'],
})
export class NewsListPage implements OnInit {
    news = [];

    constructor(private location: LocationStrategy,
                private newsSvc: NewsService,
                @Inject('FILE_PREFIX_URL') public FILE_PREFIX_URL) {
        this.newsSvc.get().subscribe(res => {
            this.news = res.list;
            console.log(this.news);
        });
    }


    ngOnInit() {
    }

    back() {
        this.location.back();
    }


}
